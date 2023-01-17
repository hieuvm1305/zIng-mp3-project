export const getTimeSong = (time) => {
    if (time === 0) {
        return "00:00";
    }
    const checkMinute = time / 60;
    const checkSecond = time % 60;
    const minute = checkMinute < 10 ? `0${Math.floor(checkMinute)}` : `${Math.floor(checkMinute)}`;
    const second = checkSecond < 10 ? `0${Math.floor(checkSecond)}` : `${Math.floor(checkSecond)}`;
    return `${minute}:${second}`;
};