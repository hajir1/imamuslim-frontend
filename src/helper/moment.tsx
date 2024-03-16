const date = new Date();
const getYears = date.getFullYear();
const getMonth = date.toLocaleDateString("id-ID", { month: "long" });
const getDate = date.getDate();
const getDay = date.toLocaleDateString("id-ID", { weekday: "long" });

export const timeZone = ` ${getDay},${getDate}-${getMonth}-${getYears}  `;

