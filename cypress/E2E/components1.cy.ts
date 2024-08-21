// Assure that you have the user to be testing registered on CLERCK!!!

describe('Sign-In Page', () => {
  beforeEach(() => {
    // Navigate to the sign-in page
    cy.visit('localhost:3000/login');
  });

  it('should enter an email address into the email input field', () => {
    // Ensure the email input field exists
    cy.get('input#identifier-field.cl-formFieldInput')
      .should('exist')
      .should('have.attr', 'type', 'text')
      .and('have.attr', 'name', 'identifier');

    // Type an existantthe email address into the input field
    cy.get('input#identifier-field.cl-formFieldInput').type(
      'placabaserota113@gmail.com' // Add existing email address
    );

    // Ensure the Continue button exists and click it
    cy.get('button.cl-formButtonPrimary') // Adjust the selector as needed
      .contains('Continue')
      .click();

    // Ensure the password input field exists
    cy.get('input#password-field.cl-formFieldInput')
      .should('exist')
      .should('have.attr', 'type', 'password')
      .and('have.attr', 'name', 'password');

    // Type the password of the existing account into the password input field
    cy.get('input#password-field.cl-formFieldInput').type(''); // Add the password

    // Click the Continue button for the password
    cy.get('button.cl-formButtonPrimary').contains('Continue').click();

    //Checking the endpoints
    cy.visit('localhost:3000/calendar');
    cy.visit('localhost:3000/dashboard');
    cy.visit('localhost:3000/customers');
    cy.visit('localhost:3000/booking');
  });
});
