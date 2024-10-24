export default function kmp(text: string, pattern: string): number {
  if (pattern.length === 0) return 0;

  const buildLPS = (pattern: string): number[] => {
    const lps = new Array(pattern.length).fill(0);
    let length = 0; // Length of the previous longest prefix suffix
    let i = 1;

    while (i < pattern.length) {
      if (pattern[i] === pattern[length]) {
        length++;
        lps[i] = length;
        i++;
      } else {
        if (length !== 0) {
          length = lps[length - 1]; // Use the previous lps value
        } else {
          lps[i] = 0;
          i++;
        }
      }
    }
    return lps;
  };

  const lps = buildLPS(pattern);
  let i = 0; // Index for text
  let j = 0; // Index for pattern
  let count = 0;

  while (i < text.length) {
    if (pattern[j] === text[i]) {
      i++;
      j++;
    }

    if (j === pattern.length) {
      count++; // Found a match
      j = lps[j - 1]; // Look for the next match
    } else if (i < text.length && pattern[j] !== text[i]) {
      if (j !== 0) {
        j = lps[j - 1]; // Use lps to avoid unnecessary comparisons
      } else {
        i++;
      }
    }
  }

  return count; // Return total matches found
}
