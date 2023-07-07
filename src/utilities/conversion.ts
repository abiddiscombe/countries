// src/utilities/conversion.ts

export function stringToNumberArray(rawString: string) {
    try {
        const array = rawString.split(',');
        return array.map((element) => {
            return parseFloat(element);
        });
    } catch {
        return [];
    }
}
