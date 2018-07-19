import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactGA from "react-ga";
import jsdom from "jsdom";

configure({ adapter: new Adapter() });
ReactGA.initialize("foo", { testMode: true });
ReactGA.ga("send", "pageview", "/series");
jest.mock("react-ga");

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

global.scrollTo = jest.fn();
global.localStorage = localStorageMock;
global.XMLHttpRequest = undefined;

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;