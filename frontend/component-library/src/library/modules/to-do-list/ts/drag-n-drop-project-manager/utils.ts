import { Validatable } from "./interfaces";

// This function queries a DOM element with a specified selector
/**
 * findOne
 * @description This function queries a DOM element with a specified selector and returns it
 * @param {string} selector
 * @param {Document} doc
 * @returns {T | null}
 * @template T
 * 
 * @example
 * // returns the first element with the class "foo"
 * findOne<HTMLDivElement>(".foo");
 */
export function findOne<T extends HTMLElement>(selector: string, doc: Document | HTMLElement | DocumentFragment = document): T | null {
  const element = doc.querySelector(selector);
  return element as T | null;
}


export function validate(validatableInput: Validatable) {
  let isValid = true;
  const { value, required, minLength, maxLength, min, max } = validatableInput;
  if (required) {
      isValid = isValid && value.toString().trim().length !== 0;
  }
  if (minLength != null && typeof value === "string") {
      isValid = isValid && value.length >= minLength;
  }
  if (maxLength != null && typeof value === "string") {
      isValid = isValid && value.length <= maxLength;
  }
  if (min != null && typeof value === "number") {
      isValid = isValid && value >= min;
  }
  if (max != null && typeof value === "number") {
      isValid = isValid && value <= max;
  }
  return isValid;
}