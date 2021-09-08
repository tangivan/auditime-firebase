
describe('Navbar and general navigation links', () => {
    it('Assert correct urls for every navigation button and link ', () => {
        //start test logged out
        //general links
        cy.visit('/');
        cy.findByText(/sign up/i).click();
        cy.url().should('include', '/signup');
        cy.findByText(/log in/i).click();
        cy.url().should('include', '/login');
        cy.findByText(/forgot password/i).click();
        cy.url().should('include', '/forgot-password');
        cy.findByText(/log in/i).click();
        cy.url().should('include', '/login');

        //navbar links
        cy.findByText(/continue as guest/i).click();
        cy.findByText(/analytics/i).click();
        cy.url().should('include', '/analytics');
        cy.findByText(/timers/i).click();
        cy.url().should('include', '/');

        //navbar drop-down menu links
        cy.findByTestId("dropdown-btn").click();
        cy.findByText(/link account/i).click();
        cy.url().should('include', '/link-account');
        cy.findByText(/back/i).click();
        cy.url().should('include', '/');
        cy.findByTestId("dropdown-btn").click();
        cy.findByText(/log out/i).click();
        cy.url().should('include', '/login');

        //logged in user (not a guest) update-profile link
        cy.findByLabelText(/email/i).type("ivanisatester@tester99.com");
        cy.findByLabelText(/password/i).type('pringles123');
        cy.contains("button", "Sign In").click();
        cy.findByTestId("dropdown-btn").click();
        cy.findByText(/update profile/i).click();
        cy.url().should('include', '/update-profile');
        cy.findByText(/cancel update/i).click();
        cy.findByTestId("dropdown-btn").click();
        cy.findByText(/log out/i).click();
        cy.url().should('include', '/login');
    })
})