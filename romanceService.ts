const ROMANTIC_ADJECTIVES = ["Eternal", "Divine", "Luminous", "Breathtaking", "Sacred", "Pure"];
const ROMANTIC_PHRASES = [
  "In every breath, I find a reason to love you more.",
  "You are the poem my heart has been trying to write.",
  "Our love is a sanctuary in a chaotic world.",
  "You are my favorite thought, my deepest peace."
];

export const enhancePoemLocally = (text: string): string => {
  // Adds a romantic signature and a random beautiful phrase
  const phrase = ROMANTIC_PHRASES[Math.floor(Math.random() * ROMANTIC_PHRASES.length)];
  return `${text}\n\n—\n${phrase}`;
};

export const generateAcrosticLocally = (word: string): string => {
  const letters = word.toUpperCase().split('');
  // Fix: Removed duplicate 'E' key which caused "An object literal cannot have multiple properties with the same name"
  const dictionary: Record<string, string> = {
    'A': 'Always yours, in every way.',
    'B': 'Breathtaking beauty in your eyes.',
    'C': 'Cherishing every second we share.',
    'D': 'Divine soul, my heart’s desire.',
    'E': 'Eternal love, growing stronger.',
    'F': 'Forever isn’t long enough.',
    'G': 'Grace follows every step you take.',
    'H': 'Home is wherever you are.',
    'I': 'Infinite joy found in your smile.',
    'J': 'Just you, now and always.',
    'L': 'Love that transcends time.',
    'O': 'Only you can make my world bright.',
    'V': 'Vision of perfection, my everything.',
    'R': 'Radiant light in my darkest days.',
    'Y': 'Yearning for your touch forever.'
  };

  return letters.map(l => dictionary[l] || `${l}... a part of our story.`).join('\n');
};
