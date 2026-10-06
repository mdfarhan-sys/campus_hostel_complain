export const generateComplaintId = (counter = null) => {
  const year = new Date().getFullYear();
  if (counter !== null && !isNaN(counter)) {
    const formattedNum = String(counter).padStart(5, '0');
    return `CF-${year}-${formattedNum}`;
  }
  // Fallback random 5-digit sequence
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `CF-${year}-${randomNum}`;
};
