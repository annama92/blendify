/**
 * Get the current Unix timestamp in seconds.
 */
export default function getUnixTimestamp() {
  // .getTime() returns Unix timestamp in milliseconds: divide by 1000 to convert to seconds
  return Math.floor(new Date().getTime() / 1000);
}