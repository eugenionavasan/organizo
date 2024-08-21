describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/login');
  });

  it('should display the email input field', () => {
    // Check if the input field with the specific id and class exists
    cy.get('input#identifier-field.cl-formFieldInput')
      .should('have.attr', 'type', 'text')
      .and('have.attr', 'name', 'identifier');

    cy.get('button.cl-formButtonPrimary')
      .should('have.attr', 'data-localization-key', 'formButtonPrimary')
      .and('contain.text', 'Continue');

    cy.get('div.cl-footerAction.cl-footerAction__signIn')
      .should('exist')
      .within(() => {
        cy.get('a.cl-footerActionLink')
          .should('have.attr', 'href')
          .and('include', 'sign-up')
          .debug();
        cy.get('a.cl-footerActionLink').click();
      });
    cy.get('label.cl-formFieldLabel__emailAddress-field').should(
      'have.text',
      'Email address'
    );
    cy.get('input#emailAddress-field.cl-formFieldInput')
      .should('have.attr', 'type', 'text')
      .and('have.attr', 'name', 'emailAddress');

    // Check if the password label exists
    cy.get('label.cl-formFieldLabel__password-field').should(
      'have.text',
      'Password'
    );

    // Check if the password input field exists
    cy.get('input#password-field.cl-formFieldInput')
      .should('have.attr', 'type', 'password')
      .and('have.attr', 'name', 'password');

    // Optionally check if the password show/hide button exists
    cy.get('button[aria-label="Show password"]').should('exist');

    cy.get(
      'a.cl-footerActionLink[data-localization-key="signUp.start.actionLink"]'
    )
      .should('exist')
      .click();
  });
});
