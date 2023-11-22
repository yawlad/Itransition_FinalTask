const compareByDates = (created_at_a: string, created_at_b: string) => {
  const dateA = created_at_a ? new Date(created_at_a) : null;
  const dateB = created_at_b ? new Date(created_at_b) : null;

  if (
    dateA instanceof Date &&
    !isNaN(dateA.getTime()) &&
    dateB instanceof Date &&
    !isNaN(dateB.getTime())
  ) {
    return dateA.getTime() - dateB.getTime();
  }
  return 0;
};

export default compareByDates;
