import {
    PURCHASE,
    RETOUR,
    EMAIL,
    TALK,
    CALL
} from "../assets/types";

export const truncateText = (text, maxLength) => !text ? "" : (text.length <= maxLength ? text : `${text.substring(0, maxLength - 3)}...`);

export const swapInState = (arr, set, i, j) => {
    const copy = [...arr];
    const temp = copy[i];

    copy[i] = copy[j];
    copy[j] = temp;

    set(copy);
};

export const translateEventNames = (name) => {
    if (name === PURCHASE)
        return "KaufEvent";
    if (name === RETOUR)
        return "RetourEvent";
    if (name === EMAIL)
        return "EmailEvent";
    if (name === TALK)
        return "TalkEvent";
    if (name === CALL)
        return "CallEvent";
}

export const divideTimespan = (timespan) => {
    const { start, end } = timespan;

    const startDate = new Date(start);
    const endDate = new Date(end);

    const totalDuration = endDate - startDate;

    const subDuration = totalDuration / 5;

    const result = [];
    for (let i = 0; i < 5; i++) {
        const subStart = new Date(startDate.getTime() + i * subDuration);
        const subEnd = new Date(startDate.getTime() + (i + 1) * subDuration);
        result.push({
            start: subStart.toISOString(),
            end: subEnd.toISOString(),
        });
    }

    return result;
};