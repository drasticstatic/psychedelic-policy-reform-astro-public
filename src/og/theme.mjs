// Psychedelic Policy Reform's look for share cards: the Docket mode of the arrival kit's org.css
// (ink-blue slate, sage leaf, keystone gold), Source Serif 4 with Public Sans. Paths resolve against
// src/og/. Its signature (kit 1.2): the formal card, since this is a policy and evidence lane. A
// double gold hairline frames it, and the arch with its keystone set rises off the right edge.
export const CARD_THEME = {
  background: "#0e151c",
  heading: "#f3f6f8",
  text: "#d9e1e7",
  muted: "#9aa9b5",
  accent: "#e0b65e", // the keystone, the kicker, the rule and the footer
  leaf: "#84d1a5", // the sprout, and the stones that catch the light
  line: "rgba(227, 233, 238, 0.40)", // the arch's other stones
  fill: "rgba(227, 233, 238, 0.045)",
  glow: "rgba(224, 182, 94, 0.13)", // behind the arch
  leafGlow: "rgba(132, 209, 165, 0.13)", // top-left corner
  mark: "../../public/favicon.png",
  frame: true,
  fonts: {
    heading: { name: "Source Serif 4", files: { 400: "fonts/SourceSerif4-400.ttf", 600: "fonts/SourceSerif4-600.ttf" } },
    body: { name: "Public Sans", files: { 500: "fonts/PublicSans-500.ttf", 700: "fonts/PublicSans-700.ttf" } },
  },
};
