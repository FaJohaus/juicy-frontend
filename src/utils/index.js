import {
    PURCHASE,
    RETOUR,
    EMAIL,
    TALK,
    CALL
} from "../assets/types";

export const truncateText = (text, maxLength) => text.length <= maxLength ? text : `${text.substring(0, maxLength - 3)}...`;

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