export const truncateText = (text, maxLength) => text.length <= maxLength ? text : `${text.substring(0, maxLength - 3)}...`;

export const swap = (arr, i, j) => {
    const temp = arr[i];

    arr[i] = arr[j];
    arr[j] = temp;
}