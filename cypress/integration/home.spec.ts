describe('Home page', () => {
  
  const URL = 'http://localhost:3001';

  before(() => {
    cy.visit(`${URL}`);
  });
  it('should verify basic structure', () => {
    cy.get(`*[data-test-id="logo"]`).should('have.text', 'Blocksyweb');
    cy.get(`*[data-test-id="btnComingSoon"]`).should('have.text', 'Coming soon!');
    cy.get('footer').should('exist');
  });
});