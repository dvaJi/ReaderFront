/// <reference types="cypress" />

describe('Home View', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render the home page', () => {
    cy.get('[class="navbar-brand"]').should('be.visible');
    cy.get('[class="comic-slide-wrapper-css"]').should('be.visible');
    cy.get('[class="LatestWorks mb-4"]').should('be.visible');
    cy.get('[class="Recommended mb-4"]').should('be.visible');
    cy.get('[class="Discord"]').should('be.visible');
  });
});
