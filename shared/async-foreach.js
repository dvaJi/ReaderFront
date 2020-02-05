/**
 * Same functionality as forEach, but runs only one callback at a time.
 * @param {Array} array - Array to iterate over.
 * @param {Function} callback - Function to apply each item in `array`. Accepts three arguments: `currentValue`, `index` and `array`.
 * @param {Object} [thisArg] - Value to use as *this* when executing the `callback`.
 * @return {Promise} - Returns a Promise with undefined value.
 */
async function asyncForeach(array, callback, thisArg) {
  for (var i = 0; i < array.length; i++) {
    if (i in array) {
      await callback.call(thisArg || this, await array[i], i, array);
    }
  }
}

exports.asyncForeach = asyncForeach;
