module.exports = [
  {
    id: 1,
    modelResponseRaw: ``,
    suggestionHeader: `Streamline the introduction`,
    suggestionDescription: `Eliminate redundancy and tighten the introductory paragraph to quickly establish the thesis.`,
    documentDiffRaw: `
    -In today's evolving private markets, a notable dislocation is unfolding. This dislocation stems from a misalignment between the capital raised and the investable opportunities available. Essentially, there is an oversupply of capital and a shortage of suitable investment targets. This imbalance is particularly apparent at the venture capital, middle market, and lower middle market stages. Let's dig deeper into why this is happening, the consequences, and the opportunities it presents.
    +Today's private markets face a notable dislocation due to a misalignment between raised capital and investable opportunities, creating an oversupply of capital and a shortage of suitable targets, particularly in venture capital and middle markets. Let's explore why this is happening, its consequences, and the opportunities it presents.
    `,
    documentDiffStructured: JSON.stringify([
      {
        remove: {
          value:
            "In today's evolving private markets, a notable dislocation is unfolding. This dislocation stems from a misalignment between the capital raised and the investable opportunities available. Essentially, there is an oversupply of capital and a shortage of suitable investment targets. This imbalance is particularly apparent at the venture capital, middle market, and lower middle market stages. Let's dig deeper into why this is happening, the consequences, and the opportunities it presents.",
        },
        add: {
          value:
            "Today's private markets face a notable dislocation due to a misalignment between raised capital and investable opportunities, creating an oversupply of capital and a shortage of suitable targets, particularly in venture capital and middle markets. Let's explore why this is happening, its consequences, and the opportunities it presents.",
        },
      },
    ]),
    status: `pending`,
    statusUpdatedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    modelResponseRaw: ``,
    suggestionHeader: `Condense the section on venture capital and private equity`,
    suggestionDescription: `Combine related ideas to reduce wordiness while maintaining essential details.`,
    documentDiffRaw: `
    #### Venture Capital:
    -The venture capital sector is poised for a shake-up. With higher risk-free rates, investors demand higher returns from alternative assets on a risk-adjusted basis. This will likely lead to fewer funds surviving to raise additional rounds and a decline in startup valuations. The AUM raised and return expectations from the prior ZIRP (zero interest rate policy) era clash with today's opportunities.
    +Higher risk-free rates in venture capital mean investors now demand better returns on a risk-adjusted basis, likely leading to fewer surviving funds and declining startup valuations. The raised AUM and expected returns from the prior ZIRP (zero interest rate policy) era clash with today's opportunities.
    
    #### Private Equity:
    -The private equity landscape is similarly transformed. The desire to manage alternative assets is widespread—from heavyweight firms like BlackRock and KKR to MBAs aspiring to lead search funds. As a result, competition is fierce, yet the pipeline for new, high-return companies is not expanding proportionally. This environment forces firms to evolve strategies, often relying on esoteric deals and sophisticated financial engineering to sustain returns.
    +Private equity is similarly transformed, with widespread interest from firms like BlackRock to MBAs. Competition is fierce yet the pipeline for high-return companies isn’t expanding proportionally, forcing firms to rely on esoteric deals and sophisticated financial engineering to sustain returns.
    `,
    documentDiffStructured: JSON.stringify([
      {
        remove: {
          value: `The venture capital sector is poised for a shake-up. With higher risk-free rates, investors demand higher returns from alternative assets on a risk-adjusted basis. This will likely lead to fewer funds surviving to raise additional rounds and a decline in startup valuations. The AUM raised and return expectations from the prior ZIRP (zero interest rate policy) era clash with today's opportunities.`,
        },
        add: {
          value:
            "Higher risk-free rates in venture capital mean investors now demand better returns on a risk-adjusted basis, likely leading to fewer surviving funds and declining startup valuations. The raised AUM and expected returns from the prior ZIRP (zero interest rate policy) era clash with today's opportunities.",
        },
      },
      {
        remove: {
          value: `The private equity landscape is similarly transformed. The desire to manage alternative assets is widespread—from heavyweight firms like BlackRock and KKR to MBAs aspiring to lead search funds. As a result, competition is fierce, yet the pipeline for new, high-return companies is not expanding proportionally. This environment forces firms to evolve strategies, often relying on esoteric deals and sophisticated financial engineering to sustain returns.`,
        },
        add: {
          value:
            "Private equity is similarly transformed, with widespread interest from firms like BlackRock to MBAs. Competition is fierce yet the pipeline for high-return companies isn’t expanding proportionally, forcing firms to rely on esoteric deals and sophisticated financial engineering to sustain returns.",
        },
      },
    ]),
    status: `pending`,
    statusUpdatedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    modelResponseRaw: ``,
    suggestionHeader: `Tighten the section on middle market challenges`,
    suggestionDescription: `Merge sentences and eliminate extraneous details to convey the challenges and strategies concisely.`,
    documentDiffRaw: `
    -Competition at the middle market level is intensifying. To achieve desired returns, firms must now:
    -1. Secure proprietary deal flow to avoid overpaying,
    -2. Implement operational improvements via operating partners and teams.
    -
    -However, because financing is costly, more equity is needed, decreasing expected returns. Operating contributions may become commoditized, pressuring margins. As a result, firms tend to acquire less mature companies and invest effort into scaling them—a stark departure from relying predominantly on financial engineering.
    +Intensifying middle market competition requires firms to secure proprietary deal flow and implement operational improvements through operating partners. Costly financing means more equity is needed, decreasing expected returns. Consequently, firms are shifting towards acquiring less mature companies to scale them, diverging from a reliance on financial engineering.
    `,
    documentDiffStructured: JSON.stringify([
      {
        remove: {
          value: `Competition at the middle market level is intensifying. To achieve desired returns, firms must now:`,
        },
        add: {
          value: "",
        },
      },
      {
        remove: {
          value: `1. Secure proprietary deal flow to avoid overpaying,`,
        },
        add: {
          value: "",
        },
      },
      {
        remove: {
          value: `2. Implement operational improvements via operating partners and teams.`,
        },
        add: {
          value: "",
        },
      },
      {
        remove: {
          value: `However, because financing is costly, more equity is needed, decreasing expected returns. Operating contributions may become commoditized, pressuring margins. As a result, firms tend to acquire less mature companies and invest effort into scaling them—a stark departure from relying predominantly on financial engineering.`,
        },
        add: {
          value:
            "Intensifying middle market competition requires firms to secure proprietary deal flow and implement operational improvements through operating partners. Costly financing means more equity is needed, decreasing expected returns. Consequently, firms are shifting towards acquiring less mature companies to scale them, diverging from a reliance on financial engineering.",
        },
      },
    ]),
    status: `pending`,
    statusUpdatedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
