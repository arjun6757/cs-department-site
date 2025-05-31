export function formattedDate(date) {
    if (!(date instanceof Date)) return;
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}

export function getPrevDate(date) {
    if (!(date instanceof Date)) return;
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return new Date(year, month, day - 1)
}

export function getNextDate(date) {
    if (!(date instanceof Date)) return;
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return new Date(year, month, day + 1)
}

export function getLastWeekDate(date) {
    if (!(date instanceof Date)) return;
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return new Date(year, month, day - 7);
}

export function getLastMonthDate(date) {
    if (!(date instanceof Date)) return;
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return new Date(year, month - 1, day);
}