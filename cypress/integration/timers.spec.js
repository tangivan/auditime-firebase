
describe('Timers', () => {
    it('Edit the name of the first timer in the list.', () => {
        //start test logged out
        cy.visit('/');
        cy.contains("button", "Continue as Guest").click();
        cy.findByText(/default timer/i).should("be.visible");
        cy.findByText(/default timer/i).should("be.visible");
        cy.findByTestId("edit").invoke('show').click({ force: true });
        cy.findByLabelText(/Timer Name/i).type("study");
        cy.findByText(/submit/i).click();
        cy.findByText(/study/i).should("be.visible");
    })

    it('Create a few new Timer', () => {
        cy.findByTestId("addBtn").click();
        cy.findByLabelText(/Timer Name/i).type("meditation");
        cy.findByText(/submit/i).click();
        cy.findByText(/meditation/i).should("be.visible");
        cy.findByTestId("addBtn").click();
        cy.findByLabelText(/Timer Name/i).type("workout");
        cy.findByText(/submit/i).click();
        cy.findByText(/workout/i).should("be.visible");
        cy.findByTestId("addBtn").click();
        cy.findByLabelText(/Timer Name/i).type("zoom meeting");
        cy.findByText(/submit/i).click();
        cy.findByText(/zoom meeting/i).should("be.visible");
    })

    it('Use the timer controller buttons to start, pause, and reset the timer.', () => {
        //start all 4 timers in different order
        cy.get(`[data-testid^="start-"]`).eq(0).click();
        cy.get(`[data-testid^="start-"]`).eq(1).click();
        cy.get(`[data-testid^="start-"]`).eq(0).click();
        cy.get(`[data-testid^="start-"]`).eq(0).click();

        //wait 1 second to pause, then 2 second for each other pause
        cy.wait(1000);
        cy.get(`[data-testid^="pause-"]`).eq(0).click();
        cy.wait(2000);
        cy.get(`[data-testid^="pause-"]`).eq(0).click();
        cy.wait(2000);
        cy.get(`[data-testid^="pause-"]`).eq(0).click();
        cy.wait(2000);
        cy.get(`[data-testid^="pause-"]`).eq(0).click();

        //reset 4th timer, then reset 1st timer
        cy.get(`[data-testid^="reset-"]`).eq(3).click();
        cy.get(`[data-testid^="reset-"]`).eq(0).click();

        //assert 4th and 1st timer have been reset
        cy.get(`[data-testid^="time-"]`).eq(0).contains("00 : 00 : 00").should("be.visible");
        cy.get(`[data-testid^="time-"]`).eq(3).contains("00 : 00 : 00").should("be.visible");
    })
})