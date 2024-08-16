describe('Navbar', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('can navigate to Home Page', () => {
        cy.visit('/about');
        cy.get('a').contains('DHSC Data Access Tool Alpha').click();
        cy.location('pathname').should('match', /\/$/);
        cy.contains(
            'main h1',
            'Welcome to the dhsc-alpha-frontend application.'
        ).should('be.visible');
    });

    it('can navigate to Ascof Page', () => {
        cy.get('a').contains('ASCOF Data Charts').click();
        cy.location('pathname').should('match', /\/ascof$/);
        cy.contains('main h1', 'ASCOF Data Charts').should('be.visible');
    });

    it('can navigate to About Page', () => {
        cy.get('a').contains('About Us').click();
        cy.location('pathname').should('match', /\/about$/);
        cy.contains('main h1', 'About us').should('be.visible');
    });

    it('can navigate to Chart Placeholders Page', () => {
        cy.get('a').contains('Chart Placeholders').click();
        cy.location('pathname').should('match', /\/chart-placeholders$/);
        cy.contains('main h1', 'Chart Placeholder Page').should('be.visible');
    });
});
