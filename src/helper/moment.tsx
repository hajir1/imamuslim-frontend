const date = new Date();
const getYears = date.getFullYear();
const getMonthIdn = date.toLocaleDateString("id-ID", { month: "long" });
const getMonth = date.getMonth();
const getDate = date.getDate();
const getDayIdn = date.toLocaleDateString("id-ID", { weekday: "long" });

export { getDayIdn, getMonthIdn, getDate, getMonth, getYears };
