/// <reference types="Cypress" />


describe("My First Test", function() {
    it('click the link "type"', function() {
        cy.visit('https://example.cypress.io/commands/querying')
        
        //cy.pause()
        
        //cy.contains('type').click()

        //Should be on a new URL which includes 'commands/actions'
        //cy.url().should('include', 'commands/actions')
        
        //cy.get('.action-email')
        //  .type('fake@email.com')
        //  .should('have.value', 'fake@email.com')

        cy.get('.query-list')
        .contains('bananas').should('have.class', 'third')

        // we can pass a regexp to `.contains()`
        cy.get('.query-list')
        .contains(/^b\w+/).should('have.class', 'third')

        cy.get('.query-list')
        .contains('apples').should('have.class', 'first')

        // passing a selector to contains will
        // yield the selector containing the text
        cy.get('#querying')
        .contains('ul', 'oranges')
        .should('have.class', 'query-list')

        cy.get('.query-button')
        .contains('Save Form')
        .should('have.class', 'btn')
            })
        })

/*
1. opens iherb.com
2. enters  in the search field: 'Omega 3'
3. presses enter
4. Changes price range in Filter
5. Accepts changes, checks that Filter applied
*/
