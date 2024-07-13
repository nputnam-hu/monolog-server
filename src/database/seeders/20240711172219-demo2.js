"use strict";
const fs = require("fs");
const path = require("path");

const notesData = require("../data/demo-notes2");
const draftsData = require("../data/demo-drafts2");
const documentPromptsData = require("../data/demo-documentprompts2");
const documentSuggestionsData = require("../data/demo-documentsuggestions2");

const DEMO_DOCUMENT_DRAFT_NOTES_IDX = 0;
const DEMO_DOCUMENT_SUGGESTION_DRAFTS_IDX = 0;
const DEMO_DOCUMENT_PROMPT_SUGGESTIONS_IDX = 0;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const notes = notesData;
    const { id: noteId } = notes[DEMO_DOCUMENT_DRAFT_NOTES_IDX];
    const drafts = draftsData.map((p) => ({
      ...p,
      noteId,
    }));
    const { id: draftId } = drafts[DEMO_DOCUMENT_SUGGESTION_DRAFTS_IDX];
    const documentPrompts = documentPromptsData.map((p) => ({
      ...p,
      draftId,
    }));
    const { id: documentPromptId } =
      documentPrompts[DEMO_DOCUMENT_PROMPT_SUGGESTIONS_IDX];
    const documentSuggestions = documentSuggestionsData.map((s) => ({
      ...s,
      documentPromptId,
    }));

    // Insert data into the table
    await queryInterface.bulkInsert("Notes", notes, {});
    await queryInterface.bulkInsert("Drafts", drafts, {});
    await queryInterface.bulkInsert("DocumentPrompts", documentPrompts, {});
    await queryInterface.bulkInsert(
      "DocumentSuggestions",
      documentSuggestions,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Notes", null, {});
  },
};
