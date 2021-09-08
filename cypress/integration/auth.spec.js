// Gmail tests are not included for privacy reasons
describe('Authentification', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('user logs in anonymously with the Continue as Guest button and then logs out.', () => {
        cy.contains("button", "Continue as Guest").click();
        cy.findByText(/default timer/i).should("be.visible");
        cy.findByText(/g/i).click();
        cy.findByText(/Log Out/i).click();
    })

    it('User requests a forgotten password.', () => {
        cy.findByText(/forgot password/i).click();
        cy.findByText(/Reset Password/i).should('be.visible');
        cy.findByLabelText(/email/i).type("ivanisatester3@tester99.com");
        cy.contains("button", "Submit").click();
        cy.contains("Check your inbox for further instructions").should('be.visible');
        cy.findByText(/log in/i).click();
    })

    it('User signs up for a new account while making a mistake confirming password.', () => {
        cy.findByText(/Sign Up/i).click();
        cy.findByLabelText(/first name/i).type("ivan");
        cy.findByLabelText(/last name/i).type('t');
        //you must use a new fake email everytime or else it will fail. There is an option to generate a new email by using a counter to attach to the email name that will keep incrementing, but this is just a personal project which doesn't really need such measures.
        cy.findByLabelText(/email/i).type("ivanisatester4@tester99.com");
        cy.findByTestId("pass").type("pringles123");
        cy.findByTestId("pass-confirm").type("pringles1234");
        cy.findByText(/Sign Up/i).click();
        cy.findByText(/passwords do not match/i).should('be.visible');
        cy.findByTestId("pass-confirm").clear().type("pringles123");
        cy.findByText(/Sign Up/i).click();
        cy.findByText(/default timer/i).should("be.visible");
        cy.findByTestId("dropdown-btn").click();
        cy.findByText(/Log Out/i).click();
    })

    it('User tries to sign up for a new account that already exists.', () => {
        cy.findByText(/Sign Up/i).click();
        cy.findByLabelText(/first name/i).type("ivan");
        cy.findByLabelText(/last name/i).type('t');
        cy.findByLabelText(/email/i).type("ivanisatester1@tester99.com");
        cy.findByTestId("pass").type("pringles123");
        cy.findByTestId("pass-confirm").type("pringles123");
        cy.findByText(/Sign Up/i).click();
        cy.findByText(/Failed to create an account/i).should('be.visible');
    })

    it('User tests all navigation links in the auth section.', () => {
        cy.findByText(/Sign Up/i).click();
        cy.findByText(/Log In/i).click();
        cy.findByText(/Forgot Password/i).click();
        cy.findByText(/Log In/i).click();
        cy.findByText(/Forgot Password/i).click();
        cy.findByText(/Sign Up/i).click();
    })

    it('User logs into an existing account.', () => {
        cy.findByLabelText(/email/i).type("ivanisatester@tester99.com");
        cy.findByLabelText(/password/i).type('pringles123');
        cy.contains("button", "Sign In").click();
    })
})