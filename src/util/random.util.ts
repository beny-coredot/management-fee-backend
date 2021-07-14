const randomInt = require('random-int');

const allLowerAlpha = [..."abcdefghijklmnopqrstuvwxyz"];
const allNumbers = [..."0123456789"];
const base = [...allNumbers, ...allLowerAlpha];

export class RandomUtil {
    static getRandomValue(min: number, max: number) {
        return randomInt(min, max);
    }

    static getRandomStringValue(length: number) {
        return [...Array(length)]
            .map(i => base[Math.random()*base.length|0])
            .join('');
    }
}