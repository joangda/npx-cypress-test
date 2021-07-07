export class formLayoutsPage {
    submitInLineFormWithNameAndEmail (name, email){
        cy.contains('nb-card', 'Inline form').find('form').then(form => {
            cy.wrap(form).find('[placeholder="Jane Doe"]').type(name)
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[type="checkbox"]').check({force:true})
            cy.wrap(form).submit() //Submit: method that only works for the FORM
        })
    }

    submitBasicFormWithEmailAndPassword (email, password){
        cy.contains('nb-card', 'Basic form').find('form').then(form => {
            //sempre a la linia de l'input (placeholder...)
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[placeholder="Password"]').type(password) 
            cy.wrap(form).find('[type="checkbox"]').check({force:true})
            cy.wrap(form).submit() //Submit: method that only works for the FORM
        })
    }
}

export const onFormLayoutsPage = new formLayoutsPage()