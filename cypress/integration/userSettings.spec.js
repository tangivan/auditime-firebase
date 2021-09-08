//Google linking has not been included
describe('General User Settings', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('Linking a guest account to an email and password ', () => {
        cy.contains("button", "Continue as Guest").click();
        cy.findByTestId("dropdown-btn").click();
        cy.findByText(/link account/i).click();

        cy.findByLabelText(/username/i).type("audit time");
        cy.findByLabelText(/email/i).type("auditime1@auditime.com");
        cy.findByTestId("pass").type("pringles123");
        cy.findByTestId("pass-confirm").type("pringles123");
        cy.findByText(/Submit/i).click();
        cy.findByText(/successfully linked./i).should("be.visible");
        cy.findByText(/back/i).click();
        cy.findByTestId("dropdown-btn").click();
        cy.findByText(/Log Out/i).click();
    })

    it('Updating password for an existing account ', () => {
        cy.findByLabelText(/email/i).type("ivanisatester2@tester99.com");
        cy.findByLabelText(/password/i).type('pringles321');
        cy.contains("button", "Sign In").click();
        cy.findByTestId("dropdown-btn").click();
        cy.findByText(/update profile/i).click();

        cy.findByTestId("pass").type("pringles123");
        cy.findByTestId("pass-confirm").type("pringles123");
        cy.findByRole("button", { name: "Update" }).click();
        cy.findByText(/you have successfully updated your account./i).should("be.visible");
        cy.findByText(/cancel update/i).click();
        cy.findByTestId("dropdown-btn").click();
        cy.findByText(/Log Out/i).click();
    })

    it('Updating email for an existing account ', () => {
        cy.findByLabelText(/email/i).type("ivanisatester12@tester99.com");
        cy.findByLabelText(/password/i).type('pringles123');
        cy.contains("button", "Sign In").click();
        cy.findByTestId("dropdown-btn").click();
        cy.findByText(/update profile/i).click();

        cy.findByLabelText(/email/i).clear().type("ivanisatester13@tester99.com");
        cy.findByRole("button", { name: "Update" }).click();
        cy.findByText(/you have successfully updated your account./i).should("be.visible");
        cy.findByText(/cancel update/i).click();
        cy.findByTestId("dropdown-btn").click();
        cy.findByText(/Log Out/i).click();
    })
})