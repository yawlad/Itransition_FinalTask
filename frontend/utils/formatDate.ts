const formatDateJoined = (dateTimeString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const formattedDate: string = new Date(dateTimeString).toLocaleString(
    "en-US",
    options
  );

  return formattedDate.replace(/\//g, ".");
};

export default formatDateJoined;
