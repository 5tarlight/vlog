export const prettifyDate = (date: string) => {
  const token = date.split("-");
  const year = parseInt(token[0]);
  const month = parseInt(token[1]);
  const day = parseInt(token[2]);

  return `${year < 10 ? `0${year}` : year}-${
    month < 10 ? `0${month}` : month
  }-${day < 10 ? `0${day}` : day}`;
};
