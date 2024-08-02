import OpenAI from "openai";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function transcribeAudioFile(audioUrl) {
  const tmpPath = "/tmp/temp.m4a";
  const downloadPath = path.resolve(__dirname, tmpPath);

  const writer = fs.createWriteStream(downloadPath);

  await new Promise(async (resolve, reject) => {
    const { data } = await axios.get(audioUrl, {
      responseType: "stream",
    });
    data.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });

  const readStream = fs.createReadStream(downloadPath);

  const transcription = await openai.audio.transcriptions.create({
    file: readStream,
    response_format: "verbose_json",
    model: "whisper-1",
  });

  const transcript = {
    fullText: transcription.text,
    segments: transcription.segments,
    // paragraphs,
  };

  return { transcript, duration: transcription.duration };
}

export async function generateSuggestions({
  promptString,
  draftMarkdownString,
}) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a world class copyeditor bot designed to output JSON who is extremely good at helping writers edit their work to achieve concise, well-articulated essays with sharp prose that has a high-density of interesting ideas",
      },
      {
        role: "user",
        content: `For the below essay, suggest 3 individual line edit suggestions for how the user could edit their essay that respond to the prompt "${promptString}". Write your suggestions with a short summary explanation of what it does and then a text diff file showing the deletions and insertions in the document. Format your response as a JSON object that follows this schema { suggestions: [{ suggestionTitle: String, suggestionDescription: String, suggestionDiff: { before: String, after: String }}] }

        ${draftMarkdownString}`,
      },
    ],
    model: "gpt-4o",
    max_tokens: 4096,
    response_format: { type: "json_object" },
  });

  console.log({ completion, choice: completion.choices[0] });

  const resJSON = completion.choices[0]?.message.content;

  const { suggestions } = JSON.parse(resJSON);

  if (
    !suggestions ||
    !suggestions[0] ||
    !["suggestionTitle", "suggestionDescription", "suggestionDiff"].every(
      (key) => Boolean(suggestions[0][key])
    )
  ) {
    throw new Error(`Invalid GPT-4o response: ${JSON.stringify(resJSON)}`);
  }

  return suggestions.map((o) => ({
    suggestionHeader: o.suggestionTitle,
    suggestionDescription: o.suggestionDescription,
    documentDiffStructured: [
      {
        remove: { value: o.suggestionDiff.before },
        add: { value: o.suggestionDiff.after },
      },
    ],
  }));
}
