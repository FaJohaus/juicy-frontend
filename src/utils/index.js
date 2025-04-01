export const truncateText = (text, maxLength) => text.length <= maxLength ? text : `${text.substring(0, maxLength - 3)}...`;

export const swapInState = (arr, set, i, j) => {
    const copy = [...arr];
    const temp = copy[i];

    copy[i] = copy[j];
    copy[j] = temp;

    set(copy);
}