/// <reference types="Cypress" />
Cypress.Commands.add('iframe', { prevSubject: 'element' }, $iframe => {
    return new Cypress.Promise(resolve => {
        $iframe.on('load', () => {
            resolve($iframe.contents().find('body'));
        });
    });
});

describe('Atakama Download Test', function() {
    it('Traverse from homepage to download page', function() {
        //Arrange
        cy.visit('https://www.atakama.com')
        //Act
        cy.contains('Try For Free').click()

        cy.contains('Subscribe').click()

        cy.contains('Monthly Subscription').click()
        cy.wait(1000)
        
        //cy.get('#cb-frame').iframe().find('.cb-field__control').should('contain','First Name')
        // cy.get('#cb-frame')
        // .then($element => {
        //     const $body = $element.contents().find('body');
        //     let stripe = cy.wrap($body);
        //     console.log(stripe);
        // })
        // cy.get('iframe[id="cb-frame"]').then($iframe => {
        //     const $body = $iframe.contents()
        //     console.log($body)
        //     // cy.wrap($body)
        //     //   .find('input[name="given-name"]')
        //     //   .type('4242')
        //     //   .type('4242')
        //     //   .type('4242')
        //     //   .type('4242')
        //First page
        cy.get('iframe[id="cb-frame"]').iframe().as('firstTodo')
        cy.get('@firstTodo').find('input[name="given-name"]').type("a")
        cy.get('@firstTodo').find('input[name="family-name"]').type("b")
        cy.get('@firstTodo').find('.cb-button__primary').click()
        //Second-page
        cy.get('@firstTodo').find('input[name="billing email"]').type("tester@qa.com")
        cy.get('@firstTodo').find('input[name="phone"]').type("3471234567")
        cy.get('@firstTodo').find('input[name="billing organization"]').type("Atakama")
        cy.get('@firstTodo').find('input[name="billing address-line1"]').type("200 Park Ave")
        cy.get('@firstTodo').find('input[name="billing address-line1"]').type('{downarrow}{enter}');
        cy.get('@firstTodo').find('input[name="billing address-line2"]').type("20th floor")
        cy.get('@firstTodo').find('input[name="billing address-level2"]').type("New York")
        cy.get('@firstTodo').find('input[name="billing postal-code"]').type("11229")
        cy.get('@firstTodo').find('input[name="billing address-level1"]').type("New York")
        cy.get('@firstTodo').find('select[name="country"]').
        select('United States').should('have.value', 'US')
        cy.get('@firstTodo').find('.cb-button__primary').click()
        //Third page
        cy.get('@firstTodo').find('input[name="cc-number"]').type("42424242424242")
        cy.get('@firstTodo').find('.cb-field__month').type("03")
        cy.get('@firstTodo').find('.cb-field__year').type("23")
        cy.get('@firstTodo').find('.cb-button__primary').click()
        //Assert
        cy.url()
        .should('include', '/premium')
    })
})