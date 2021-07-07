describe ('shadow dom', () => {
    it ('access shadow dom', () => {
        cy.visit('https://radogado.github.io/shadow-dom-demo/')
        /* we tried to run the command below (which is about an element included on the shadow dom) but 
        it didn't find it because Cypress cannot get access to shadow dom elements with standard commands */
        // cy.get('#container')
        // the commands below allow cypress to work with the shadow dom
        cy.get('#app').shadow().find('#container')
        /* if instead of '#app' we introduced 'body' which is the parent element of '#app', it wouldn't work
        because 'body' is not the shadow host for our shadow dom */
    })
})