export const getDaysInMonth = (year,month) => {
    return new Date(year,month+1,0).getDate();
}

export const getFirstDayOfMonth = (year,month) => {
    return new Date(year,month,1).getDay();
}

export const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];