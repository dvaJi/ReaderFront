import { filterOptions } from '@components/ui/select-panel/fuzzy-match-utils';

const options = [
  { label: 'Grapes 🍇', value: 'grapes' },
  { label: 'Mango 🥭', value: 'mango' },
  { label: 'Strawberry 🍓', value: 'strawberry' }
];

it('should filter options', () => {
  const filteredOptions = filterOptions(options, 'mango');

  expect(filteredOptions.length).toBe(1);
  expect(filteredOptions).toStrictEqual([options[1]]);
});
