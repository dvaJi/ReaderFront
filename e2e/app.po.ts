/*
 * Use the Page Object pattern to define the page under test.
 * See docs/coding-guide/e2e-tests.md for more info.
 */

import { browser, element, by } from 'protractor';

export class AppPage {
  constructor() {
    // Forces default language
    this.navigateTo();
    browser.executeScript(() => localStorage.setItem('language', 'en-US'));
  }

  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
