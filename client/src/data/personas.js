/**
 * Frontend persona metadata.
 * Slug must match the backend persona key in server/prompts/personas.js
 */
const personas = [
  {
    slug: "anshuman",
    name: "Anshuman Singh",
    subtitle: "Tech Entrepreneur & Visionary",
    emoji: "🚀",
    color: "#a855f7",
    suggestions: [
      "What motivates you to work in edtech?",
      "How do you handle failure in a startup?",
      "What advice would you give aspiring entrepreneurs?",
      "How do you build a strong team culture?",
    ],
  },
  {
    slug: "abhimanyu",
    name: "Abhimanyu Saxena",
    subtitle: "Product Architect & Technologist",
    emoji: "⚡",
    color: "#6366f1",
    suggestions: [
      "How do you approach building a new product?",
      "What's your take on AI in education?",
      "How do you prioritize what to build?",
      "What does product-market fit really mean?",
    ],
  },
  {
    slug: "kshitij",
    name: "Kshitij Mishra",
    subtitle: "Curriculum Architect & Educator",
    emoji: "📚",
    color: "#06b6d4",
    suggestions: [
      "How do you design a good curriculum?",
      "Why do students struggle with programming?",
      "What makes a great teacher?",
      "How should we rethink assessments?",
    ],
  },
];

export default personas;
