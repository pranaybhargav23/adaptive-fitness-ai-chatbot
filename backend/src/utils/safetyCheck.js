const bannedKeywords = [
  "diabetes",
  "heart disease",
  "fracture",
  "injury",
  "medicine",
  "supplement",
  "tablet",
  "painkiller"
];

export function isUnsafe(question) {
  return bannedKeywords.some(word =>
    question.toLowerCase().includes(word)
  );
}
