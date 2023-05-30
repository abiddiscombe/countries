// src/utilities/conversion.ts

export { stringToNumberArray };

function stringToNumberArray(rawString: string) {
  try {
    const array = rawString.split(",");
    return array.map((element) => {
      if (isNaN(element)) throw Error();
      console.log(element);
      return parseFloat(element);
    });
  } catch {
    return [];
  }
}
