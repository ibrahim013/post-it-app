/**
 * @description: A function that change all character to lower case and
 * the first word to uppercase
 *
 * @function capitalizeFirstLetter
 *
 * @param {String} character
 *
 * @return {String} a string with First letter in Capital
 *
 */
 const capitalizeFirstLetter = character =>
 character.charAt(0).toUpperCase() + character.slice(1);


 export default capitalizeFirstLetter;
