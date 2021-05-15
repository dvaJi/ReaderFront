import { act } from 'react-dom/test-utils';

export const actions = async (wrapper, _actions) => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    _actions();
    wrapper.update();
  });
};
