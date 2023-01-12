export const getArrSlider = (start, end, number) => {
    const limit = start > end ? number : end
    let output = []
    for (let i = start; i <= limit; i++) {
        output.push(i)
    }
    if (start > end) {
        for (let i = 0; i <= end; i++) {
            output.push(i)
        }
    }
    return output
}

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