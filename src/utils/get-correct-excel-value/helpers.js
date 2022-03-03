const { format, addDays } = require("date-fns");

const getInitialsFromName = (fullname = "") => {
  return fullname
    .split(/\s+/)
    .map((name, index) => (index ? name.substring(0, 1).toUpperCase() + "." : name))
    .join(" ");
};

module.exports = { getInitialsFromName };
