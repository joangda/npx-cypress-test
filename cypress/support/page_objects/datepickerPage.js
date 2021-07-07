/*Jo ho vaig intentar fer pel meu compte (el datepicker with range) amb una altra funció per separat de manera que sortís una per cada comanda select de la class datepickerPage. 
La clau ha estat però el que ha fet ell. Trobar un factor comú que serveixi pels dos. Els dos tenen una classe que comença per day-cell o que únicament és day-cell. I després
per distingir-ho de els mesos anteriors o següents aquests sempre tenen el valor bounding month a l'atribut class */
function selectDayFromCurrent(day){
    let date = new Date()
    date.setDate(date.getDate() + day)
    let futureDay = date.getDate()
    console.log(futureDay)
    let futureMonth = date.toLocaleString('en-us', {month: 'short'})
    let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()
    cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
        if (!dateAttribute.includes(futureMonth)) {
            cy.get('[data-name="chevron-right"]').click()
            selectDayFromCurrent(day)
        }else {
            cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
        }
    })
    return dateAssert                
}

export class datepickerPage {
    selectCommonDatepickerDateFromToday (dayFromToday) {
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(dayFromToday)
            // cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value', dateAssert)
        })

    }

    selectDatepickerWithRangeFromToday (firstDay, secondDay) {
        cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
            cy.wrap(input).click()
            let dateAssertFirst = selectDayFromCurrent(firstDay)
            let dateAssertSecond = selectDayFromCurrent(secondDay)
            const finalDate = dateAssertFirst + ' - ' + dateAssertSecond
            // cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value', finalDate)
        })
    }

}

export const onDatepickerPage = new datepickerPage()