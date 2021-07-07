/// <reference types="cypress" />
//JSON objects are the main type of API requests and API responses
describe('JSON objects', () => {
    it('JSON objects', () => {
        cy.openHomePage()
        const simpleObject = {"key": "value", "key2": "value2"} //json objects always this structure {:,:}
        const simpleArrayOfValues = ["one", "two", "three"]
        const arrayOfObjects = [{"key": "value"}, {"key2": "value2"}, {"key3": "value3"}]
        const typesOfData = {"string": "this is a string", "number": 11}
        const mix = {
            "firstName": "Artem",
            "lastName": "Bondar",
            "Age": 35,
            "Students": [
                {
                    "firstName": "Sara",
                    "lastName": "Conor"
                },
                {
                    "firstName": "Bruce",
                    "lastName": "Willis"
                }
            ]
        }
        //per mirar el print de la consola, al simulador NPX + Inspecciona + Console
        console.log(simpleObject.key2) //1 Value displaied in the console will be "value2"
        console.log(simpleObject["key2"]) //2
        console.log(simpleArrayOfValues[1]) //Gives the value "two"
        console.log(arrayOfObjects[2].key3)
        console.log(mix.Students[1].lastName)

        const lastNameOfSecondStudent = mix.Students[1].lastName
    })
})