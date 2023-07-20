/**
 * Used to perform a deep comparison of two objects by value
 *
 * ---
 * @param first First object
 * @param second Second object
 * @returns `true` if both objects have the same values, and `false` otherwise
 */
export function objectsEqual<T extends { [key: string]: any }>(
  first: T,
  second: T
) {
  if (
    !first ||
    !second ||
    typeof first !== "object" ||
    typeof second !== "object"
  ) {
    return first === second;
  }

  for (let key of Object.keys(first)) {
    if (typeof first[key] === "object") {
      if (!objectsEqual(first[key], second[key])) {
        return false;
      }
    } else {
      if (first[key] !== second[key]) {
        return false;
      }
    }
  }

  for (let key of Object.keys(second)) {
    if (typeof second[key] === "object") {
      if (!objectsEqual(first[key], second[key])) {
        return false;
      }
    } else {
      if (second[key] !== first[key]) {
        return false;
      }
    }
  }

  return true;
}
