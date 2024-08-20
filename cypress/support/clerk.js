import { clerkClient } from '@clerk/clerk-js';

Cypress.Commands.add('loginWithClerk', (email, password) => {
  cy.visit('/login');
  cy.get('#sign-in-email').type(email);
  cy.get('#sign-in-password').type(password);
  cy.get('[data-testid="sign-in-button"]').click();
  cy.wait(2000); // Wait for the redirect
});

Cypress.Commands.add('logoutWithClerk', () => {
  cy.visit('/');
  cy.get('[data-testid="user-menu"]').click();
  cy.get('[data-testid="sign-out-button"]').click();
  cy.url().should('include', '/login');
});
