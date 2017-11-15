/**
 * @description: A function that change all character to lower case and
 * the first word to uppercase
 *
 * @function capitalizeFirstLetter
 * @param {String} character
 *
 * @return {Object} a string in lowercase and the First letter in Capital
 *
 */
 const capitalizeFirstLetter = (character) => {
   const string = character.toLowerCase();
   return string.charAt(0).toUpperCase() + string.slice(1);
 };

 export default capitalizeFirstLetter;
