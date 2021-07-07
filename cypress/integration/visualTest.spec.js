// using cypress-plugin-snapshots
Cypress.config('defaultCommandTimeout', 15000);
describe ('visual test', () => {
    it ('should test snapshot', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        // with this file we try to verify that the 'Using the Grid' section of the Web page looks as expected
        cy.contains('nb-card', 'Using the Grid').then( firstForm => {
            // for 'Using the Grid' section snapshot
            cy.wrap(firstForm).toMatchImageSnapshot()
            // for snapshot of the entire page
            cy.document().toMatchImageSnapshot()
        })
    })
    it.only ('should test with Percy', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        cy.contains('nb-card', 'Using the Grid').then( firstForm => {
            // wait till the page is loaded and Percy can take the snapshot
            cy.wait(1000)
            cy.percySnapshot('FormLayouts')
        })
    })
})

// The lines below go to cypress.json for Lesson 42
// "cypress-plugin-snapshots": {
//     "imageConfig": {
//       "threshold": 0.001
//     }
//   }