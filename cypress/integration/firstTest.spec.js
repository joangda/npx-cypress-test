/// <reference types="cypress" />

describe('Our first suite', () => {

    it.only ('first test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by Tag Name
        cy.get('input')

        // by ID
        cy.get('#inputEmail1')

        //by Class name
        cy.get('.input-full-width')

        //by Attribute name
        cy.get('[placeholder]')

        //by Attribute name and value
        cy.get('[placeholder="Email"]')

        //by Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')
        
        //by Tag name and Attribute with value
        cy.get('input[placeholder="Email"]')

        //by two different attributes
        cy.get('[placeholder="Email"][fullwidth]')

        //by Tag name, Attribute with value, ID and Class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //The most recommended way by cypress
        cy.get('[data-cy="imputEmail1"]')

    })

    it('second test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
    
        cy.get('[data-cy="signInButton"]')
    
        cy.contains('Sign in')
    
        cy.contains('[status="warning"]','Sign in')
    
        cy.get('#inputEmail3')
        .parents('form')
        .find('button')
        .should('contain', 'Sign in')
        .parents('form')
        .find('nb-checkbox')
        .click()

        cy.contains('nb-card', 'Horizontal form')
        .find('[type="email"]')
              
    })

    it('then and wrap methods', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // cy.contains('nb-card', 'Using the Grid')
        // .find('[for="inputEmail1"]')
        // .should('contain', 'Email')

        // cy.contains('nb-card', 'Using the Grid')
        // .find('[for="inputPassword2"]') 
        // .should('contain', 'Password')  
        
        // cy.contains('nb-card', 'Basic form')
        // .find('[for="exampleInputEmail1"]')
        // .should('contain', 'Email address')
        
        // cy.contains('nb-card', 'Basic form')
        // .find('[for="exampleInputPassword1"]')
        // .should('contain', 'Password')
        
        //selenium
        // const firstForm = cy.contains('nb-card', 'Using the Grid')

        // cypress style

        cy.contains('nb-card', 'Using the Grid').then( firstForm => {
            // jQuery format
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()

            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.wrap(firstForm).find('[for="inputEmail1"]').should('contain', 'Email')
            cy.wrap(firstForm).find('[for="inputPassword2"]').should('contain', 'Password')

        
            cy.contains('nb-card', 'Basic form').then( secondForm => {
                // jQuery format
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).to.equal(passwordLabelSecond)

                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')

            })
        
        })

    })

    it ('invoke command', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1 
        cy.get('[for="exampleInputEmail1"]')
        .should('contain', 'Email address')
        .should('have.class', 'label')
        .and('have.text', 'Email address') // .and is like another should

        //2
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text()).to.equal('Email address');
            expect(label).to.have.class('label')
            expect(label).to.have.text('Email address')
        })

        //3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address');
        })

        //instruct a click to the computer and see if it has notified that the 'check me out' square is checked
        cy.contains('nb-card', 'Basic form')
        .find('nb-checkbox')
        .click()
        .find('.custom-checkbox')
        .invoke('attr', 'class')
        // .should('contain', 'checked')
        .then(classValue => {
            expect(classValue).to.contain('checked')
        })


    })

    it ('assert property', () => {
        function selectDayFromCurrent(day){
            /* function Date gives the current day whenever it is displayed
            with all the information it contains */
            let date = new Date()
            /* function getDate gives the date of the month we are in and 
            setDate changes the day's value of date we are in + 15 */
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            console.log(futureDay)
            //function getMonth gives a numeric value of the current month
            /* function toLocaleString (month: short) gives a string value of the month.
            E.g. Jun, Jul, Aug, Sep. It is mandatory using 'en-us' to make the program work.
            If not, as the pc language is Spanish and the program works with English, in this case
            it made an infinite loop because of the difference mayo (Spanish) and May (English) */
            let futureMonth = date.toLocaleString('en-us', {month: 'short'})
            console.log(futureMonth)
            /* to verify at the end that the date is correct as it is in the format below */
            let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()
            console.log(dateAssert)
            /* inpecciona al menu que s'obre i fer click dret sobre Jun 2021 i aleshores
            trobes nb-calendar-navigation com a identificador i després invoques l'atribut
            ng-reflect-date que és just a la línia de dalt i que té com a valor la data 
            en la que ens trobem */
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                console.log(dateAttribute)
                /*fem aquest if per si no ens trobem al mes que som ara i per tant, s'haurà de fer 
                click a la fletxeta de la dreta de Jun 2021 per passar al següent mes i 
                else en cas de que ja ens trobem al mes que toca*/
                if (!dateAttribute.includes(futureMonth)) {
                    cy.get('[data-name="chevron-right"]').click()
                    /*Before we had a problem as cypress runned well till this point were it picked the wrong date
                    despite beying in the correct month*/
                    // cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                    selectDayFromCurrent(day)
                }else {
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }
            })
            return dateAssert                
        }        
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        /*click dret i inpecciona sobre el Form Picker, on es col·loca la data. 
        Té com a parent elements nb-card que conté Common Datepicker, i està representada
        pel valor 'input'*/ 
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(77)                  
            // cy.get('nb-calendar-day-picker').contains('17').click()
            // cy.wrap(input).invoke('prop', 'value').should('contain', 'Jun 17, 2021')
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value', dateAssert) //same function as the above line
        })
    })

    it ('radio button', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
             cy.wrap(radioButtons)
                .first() //aquesta accio es per al primer dels tres radio types
                .check({force: true})
                .should('be.checked')

            cy.wrap(radioButtons)
                .eq(1) //equal index 1
                .check({force: true})

            cy.wrap(radioButtons)
                .first()
                .should('not.be.checked')
            
            cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled') //because the 3rd button is Disabled Option

        })

    })

    it ('check boxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        // cy.get('[type="checkbox"]').check({force:true}) //amb aquesta linia em surten errors. 
        // Utilitzem el d'abaix perque el check no desmarca, nomes marca caselles. 
        // Tot i aixo ell recomana utilitzar el check method
        cy.get('[type="checkbox"]').eq(0).click({force:true})
        //check methods only works with radiobuttons or checkboxes

    })

    it ('lists and dropdowns', () => {
        cy.visit('/')

        /*la funció del get és que t'identifica un element i aleshores sobre aquest
        element t'executa la funció que escrius a continuació, en aquest cas click() */
        /* On es fa click per canviar el color de la pàgina (abans que es desplegui el menú) 
        Busca un parent element, nav (parent element) nb-select (child element) */
        // cy.get('nav nb-select').click()

        //se'n va i fa clic dret sobre la opció Dark del menú
        //li surt com a parent element 'ul' que té com a unique element "options list"
        // cy.get('.options-list').contains('Dark').click()

        // cy.get('nav nb-select').click().should('contain', 'Dark')

        /* 1) Inspecciona sobre la part just sota de ngx.admin perquè és allà on es defineix el color.
        2) El color del background surt a la dreta del terminal, a Styles i és el #222b45.
        3) Googlejem #222b45 per tal d'agafar el color RGB (34, 43, 69) que és el que volem.
        4) El que identifiquem amb el get en aquest cas és el valor del lloc on es mostra el color =
        = parent element(nb-layout-header) + child element(nav) = nb-layout-header nav 
        5) should(have.css, name, value) en aquest cas el name és background-color que apareix a styles i al Filter 
        d'Styles l'has de buscar i ja et surt amb el valor rgb(34, 43, 69) sense necessitat de la cerca a google */
        // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        /* Now if we wanted to verify for each color we would have to copy-paste the 4 lines written aboven 3 times more (1 for each color)
        But there's another way (follow-up) */
        cy.get('nav nb-select').then( dropdown => {
            cy.wrap(dropdown).click()
            //volem iterar per cada opció, trobem on s'ubiquen(options-list) i per fer la iteració cridem a l'each
            cy.get('.options-list nb-option').each( (listItem, index) => {
                // trim() method -> removes the space that there is before each color in the browser terminal (" Light", " Dark"...)
                const itemText = listItem.text().trim()
                const colors = {
                    "Light":"rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }
                //fer click al listItem
                cy.wrap(listItem).click()
                //dropdown és on hi ha la llista de colors
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                //to not end up leaving the menu clicked
                if(index < 3) {
                    cy.wrap(dropdown).click()
                }

                /* then a 3rd method would be using <select> but to use it it has to 
                have a <select> method and in this case the method was nb-select.
                He tells it because it's very useful when you can work with it*/

            })
        })


    })

    it ('Web tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //Example to update/modify a table value
        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            //decidim utilitzar l'index de columna (6) perque no hi ha cap element unic amb el que poder distingir la columna
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')    
        })

        //Example to add a new row and verify it is added
        /*ja passem directament al find aquí perquè és senzill de trobar i només n'hi ha un de thead. En canvi abans n'hi havia
        varies de rows però ara també i per això s'ha posat la row de index 2. No se, va variant. Aqui ha tirat d'index perque
        no hi havia cap tret distintiu per aquesta row */
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Artem')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Bondar')
            cy.wrap(tableRow).find('.nb-checkmark').click()

        })
        //comprovar que a la pàgina web s'ha escrit una nova fila amb nom Artem i cognom Bondar
        cy.get('tbody tr').first().find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'Artem')
            cy.wrap(tableColumns).eq(3).should('contain', 'Bondar')
        })

        //test of the 'Smart table' from the host search function
        //0)llista d'edats
        //1)inspecciona a l'Age search i treu placeholder="Age" (unique element)
        //anem directes al fer 'thead + [placeholder="Age"]' perquè només tenim una cosa a tractar (Age search)
        //per esperar a que es faci bé la busqueda del que tenen 20, 30 o 40 anys
        const age = [20,30,40, 200]
        cy.wrap(age).each(age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each( tableRow => {
                if(age==200) {
                    cy.wrap(tableRow).should('contain', 'No data found')
                }else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
                

            })
        })
        
        
    })

    it ('tooltip', () => {
        //tooltip: el missatge que t'apareix al passar amb el ratolí per sobre d'una icona
        //volem automatitzar i saber quin text hi ha dins d'aquest missatge

        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips')
            /*un cop executes el programa per inspeccionar el tooltip se't crea el missatge i pots inspeccionar-lo.
            Hauràs de tornar a inspeccionar el tooltip un cop se t'obri la consola dins el npx. Comença per 'span...'*/
            .contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    /*Després vindria Dialog Boxes però no ho fa perquè diu que és molt simple. Senzillament has de inspeccionar la dialog box
    que s'obre quan fas click al botó que l'obra. (Modal&Overlays > Dialog > Open Dialog > Dialog Component)*/
    })

    it ('dialog box', () => {
    /*Els Popups són més complicats. Un Popup és per exemple quan vas a Tables&Data>Smart Table i vols eliminar una de les fileres
    que hi ha. Fas click a la icona d'eliminar i a continuació t'apareix un missatge preguntant-te si estàs segur de que ho vols eliminar.
    Això és un Popup. Els Popups no es poden trobar al DOM i no formen part del domini Web HTML i per tant no pots fer click dret i trobar 
    l'element dins del camp que toqui a la consola del browser*/
    
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //Automàticament Cypress va eliminant, fent jo click, sense preguntar si realment vols eliminar la fila.
        // cy.get('tbody tr').first().find('.nb-trash').click()
        
        /* 1. Bad method to handle the situation as this code will not fail if it wouldn't have the confirm alert because then the cy.on will not 
        tell us that there has been no detection of confirmation; only if there has been a message of confirmation */
        // cy.get('tbody tr').first().find('.nb-trash').click()
        // cy.on('window:confirm', (confirm) => { //també podria ser window:alert però en aquest cas és window:confirm
        //     expect(confirm).to.equal('Are you sure you want to delete?')
        // })

        /* 2. Stub() és una funció que té associats bastants arguments i la majoria d'ells per espiar a l'objecte en questió. En aquest cas mirem
        si la finestra de confirmació es mostra el missatge amb el que nosaltres ho comparem. I en aquest cas si la finestra amb el missatge no es
        mostrés, i gràces a la comanda cy.on('window:confirm', stub), el valor que apareixeria aquí per 'stub' seria empty. Aquest és un approach nèt*/
        // const stub = cy.stub()
        // cy.on('window:confirm', stub)
        // cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
        //     expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        // })

        /* 3. En cas de que volguem seleccionar cancel·lar a la finestra de confirmació. Quan fas el testing no s'esborra cap fila ja que
        s'ha donat la ordre de cancel·lar l'operació */
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', () => false)

    })

})