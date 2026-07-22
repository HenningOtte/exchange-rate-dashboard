export function getCurrentDate() {
  const date = new Date();
  date.setDate(date.getDate() - 1);

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${date.getFullYear()}-${month}-${day}`;
}
