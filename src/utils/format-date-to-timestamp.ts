export const formatDateToTimestamp = (date: string) => {
  return new Date(date).getTime() / 1000;
};
