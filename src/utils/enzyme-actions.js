import { act } from 'react-dom/test-utils';

export const actions = async (wrapper, _actions) => {
  act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    _actions();
    wrapper.update();
  });
};
