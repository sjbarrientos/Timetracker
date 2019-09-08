let milisecondsToTime = (time) => {
    let ms = time % 1000;
    time = (time - ms) / 1000;
    let s = time % 60;
    time = (time - s) / 60;
    let m = time % 60;
    let h = (time - m) / 60

    return { h, m, s };

}

let timeToMiliseconds = (h, m, s) => {
    
    m += + (h * 60);
    s += m * 60;
    let ms = s * 1000;
    return ms;
};

module.exports = {
    milisecondsToTime,
    timeToMiliseconds
}