import { onDatepickerPage } from "../support/page_objects/datepickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

const runOn = (browser, fn) => {
    if (Cypress.isBrowser(browser)) {
        fn()
    }
}

const ignoreOn = (browser, fn) => {
    if (!Cypress.isBrowser(browser)) {
        fn()
    }
}

describe ('Test with Page Objects', () => {
    //to not copy the cy.visit('/') again and again
    beforeEach('open application', () => {
        cy.openHomePage()
    })

// when running firefox browser this test will be ignored
ignoreOn('edge', () => {  
    //to organize our browser menu
    it ('verify navigation across the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datepickerPage()
        navigateTo.toastrPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
    })
})
    it ('should submit Inline and Basic form and select tomorrow date in the calendar', () => {
        navigateTo.formLayoutsPage() //vas al doc formLayoutsPage.js
        onFormLayoutsPage.submitInLineFormWithNameAndEmail('Joan', 'test@test.com') //crides la constant onFormLayoutsPage i crides a la funció de dins la classe donant valors 
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'writtenPassword') //idem que en el cas de dalt
        navigateTo.datepickerPage()
        onDatepickerPage.selectCommonDatepickerDateFromToday(115)
        onDatepickerPage.selectDatepickerWithRangeFromToday(15, 115)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Joan', 'GdeAguero')
        onSmartTablePage.updateAgeByFirstName('Joan', 40)
        onSmartTablePage.deleteRowByIndex(1)
    })
})