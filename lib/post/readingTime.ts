export function getReadingTime(len: number) {
  const wordsPerMinute = 400; // Average reading speed
  const minutes = Math.ceil(len / wordsPerMinute);
  return minutes;
}
