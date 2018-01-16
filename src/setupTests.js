import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactGA from "react-ga";

configure({ adapter: new Adapter() });
ReactGA.initialize("foo", { testMode: true });
ReactGA.ga("send", "pageview", "/mypage");
jest.mock("react-ga");

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;
