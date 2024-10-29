function convertToTime(timeString) {
  // Assuming the input is in 'hh:mm AM/PM' format, e.g., '09:00 AM'
  const [time, modifier] = timeString.split(" ");
  let [hours, minutes] = time.split(":");

  // Convert hours to 24-hour format
  if (modifier === "PM" && hours !== "12") {
    hours = parseInt(hours, 10) + 12;
  }
  if (modifier === "AM" && hours === "12") {
    hours = "00";
  }

  // Return the time in 'HH:MM:SS' format
  return `${hours}:${minutes}:00`;
}

export { convertToTime };
