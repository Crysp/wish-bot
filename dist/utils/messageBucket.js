"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBucket = void 0;
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function excludeIndexes(list, indexes) {
    let result = list.slice();
    for (const index of indexes) {
        result = result.slice(0, index).concat(result.slice(index + 1));
    }
    return result;
}
function createBucket(variants) {
    const bucket = new Map();
    function getItem(uid) {
        let cachedIndexes = bucket.get(uid) || [];
        if (cachedIndexes.length >= variants.length) {
            cachedIndexes = [];
        }
        const list = cachedIndexes
            ? excludeIndexes(variants, cachedIndexes)
            : variants;
        const index = randomIntFromInterval(0, list.length - 1);
        bucket.set(uid, [...cachedIndexes, index]);
        return list[index];
    }
    return {
        getItem,
    };
}
exports.createBucket = createBucket;
