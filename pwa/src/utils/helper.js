
// TODO: Only used for testing, should be removed later
export const randomScalingFactor = function ()  {
    let randomInteger = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return randomInteger(-50, 50);
}
