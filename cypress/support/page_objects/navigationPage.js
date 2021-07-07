/*this is a new document for replacing the initial code of every 'it (...' function from the firstTest.spec.js
i.e. e.g. cy.contains('Forms').click(), cy.contains('Form layout').click()*/
function selectGroupMenuItem(groupName){
    cy.contains('a', groupName).then(menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then(value => {
            if (value.includes('left')){
                cy.wrap(menu).click()
            }
        })
    })
}

export class NavigationPage {
    
    formLayoutsPage() {
        // cy.contains('Forms').click()
        selectGroupMenuItem('Forms')
        cy.contains('Form Layouts').click()
    }

    datepickerPage() {
        // cy.contains('Forms').click()
        selectGroupMenuItem('Forms')
        cy.contains('Datepicker').click()
    }

    toastrPage() {
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Toastr').click()
    }

    smartTablePage() {
        selectGroupMenuItem('Tables & Data')
        cy.contains('Smart Table').click()
    }

    tooltipPage() {
        selectGroupMenuItem('Modal & Overlays')
        cy.contains('Tooltip').click()
    }
}

export const navigateTo = new NavigationPage()