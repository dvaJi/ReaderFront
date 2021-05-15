type TextStrings = {
  [prop: string]: string;
};
const strings: TextStrings = {
  selectSomeItems: 'Select...',
  allItemsAreSelected: 'All items are selected.',
  selectAll: 'Select All',
  search: 'Search'
};

function getString(key: keyof typeof strings, overrideStrings?: TextStrings) {
  if (overrideStrings && overrideStrings[key]) {
    return overrideStrings[key];
  }

  return strings[key];
}

export default getString;
