/* @ts-ignore */
/**
 * Same functionality as forEach, but runs only one callback at a time.
 */
export async function asyncForeach(array: any[], callback: any, thisArg: any) {
  const localThis = this as any;
  for (var i = 0; i < array.length; i++) {
    if (i in array) {
      await callback.call(thisArg || localThis, await array[i], i, array);
    }
  }
}
