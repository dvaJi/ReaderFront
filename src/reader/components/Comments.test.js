import React from "react";
import I18n from "redux-i18n";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { shallow } from "enzyme";
import Comments from "./Comments";
import { translations } from "../../translations";
import store from "../../store";


it("should render without throwing an error", () => {
  const wrapper = shallow(
    <Provider store={store}>
      <I18n translations={translations}>
        <Comments id={"chapter-id-rf"} title={"Title"} path={"/root"} />
      </I18n>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
