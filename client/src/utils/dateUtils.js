export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

export const formatDateTime = (dateString, timeString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  return `${formattedDate} at ${timeString}`;
}; 