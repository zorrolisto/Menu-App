export const moveInCertainNumberOfDaysADate = (
  dateSended,
  numberOfDaysToMove,
  isGoingBack
) => {
  const daysToMove = isGoingBack ? numberOfDaysToMove : -1 * numberOfDaysToMove;
  const dateMovedTimestamp = dateSended.getDate() - daysToMove;
  const newDateMovedTimestamp = dateSended.setDate(dateMovedTimestamp);
  const newDate = new Date(newDateMovedTimestamp - 5 * 60 * 60 * 1000);
  return newDate.toISOString().split("T")[0];
};
export const getDateOfThisMonday = () => {
  const today = new Date();
  const daysDistanceFromMonday = today.getDay() - 1;
  return moveInCertainNumberOfDaysADate(today, daysDistanceFromMonday, true);
};
export const goBackSevenDaysADate = (dateString) => {
  const date = new Date(dateString);
  return moveInCertainNumberOfDaysADate(date, 6, true);
};
export const goForwardSevenDaysADate = (dateString) => {
  const date = new Date(dateString);
  return moveInCertainNumberOfDaysADate(date, 8, false);
};
