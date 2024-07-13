module.exports = [
  {
    id: 4,
    modelResponseRaw: ``,
    suggestionHeader: `Suggestion 1`,
    suggestionDescription: `In the "Draft Generation for Writers" section, add concrete data on the number of drafts or content pieces a typical writer produces daily. This gives a quantitative context for the workflow's relevance.`,
    documentDiffRaw: ``,
    documentDiffStructured: JSON.stringify([
      {
        remove: {
          value: `**Draft Generation for Writers**: Writers can record their thoughts, ideas, and miscellaneous notes throughout the day. At the end of the day, the tool will compile these recordings into draft articles and suggest further readings.`,
        },
        add: {
          value:
            "**Draft Generation for Writers**: Writers can record their thoughts, ideas, and miscellaneous notes throughout the day. According to a survey by [source/organization], a typical long-form content writer produces around 2-3 drafts per day. At the end of the day, the tool will compile these recordings into draft articles and suggest further readings.",
        },
      },
    ]),
    status: `pending`,
    statusUpdatedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    modelResponseRaw: ``,
    suggestionHeader: `Suggestion 2`,
    suggestionDescription: `In the "Transcription and Processing" section, include specific data on the accuracy rate of NLP algorithms. This adds credibility and precision to the functional capabilities of the tool.`,
    documentDiffRaw: ``,
    documentDiffStructured: JSON.stringify([
      {
        remove: {
          value: `Natural language processing (NLP) algorithms analyze the text to:`,
        },
        add: {
          value:
            "Natural language processing (NLP) algorithms, which boast a [specific percentage]% accuracy rate according to [study/source], analyze the text to:",
        },
      },
    ]),
    status: `pending`,
    statusUpdatedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    modelResponseRaw: ``,
    suggestionHeader: `Suggestion 3`,
    suggestionDescription: `In the "Alpha Release" section, add quantitative goals for the initial user base size based on market research. This provides a concrete target and enhances the project's feasibility.`,
    documentDiffRaw: ``,
    documentDiffStructured: JSON.stringify([
      {
        remove: {
          value: `Build an initial user base (alpha base) among creatives.`,
        },
        add: {
          value:
            "Build an initial user base (alpha base) of approximately 100-150 users among creatives, based on market research and outreach projections.",
        },
      },
    ]),
    status: `pending`,
    statusUpdatedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
