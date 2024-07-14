import faker from 'faker-br';
import Faker from 'faker-br/lib';


context('Teste qastage/VAGA QA (BuildBox)', () => {
  beforeEach(() => {
    cy.visit('https://qastage.buildbox.one/18/cadastro/')
    cy.clearCookies()
    cy.get('[data-cy="button-btn-enroll"]').click()
  });

  let email = faker.internet.email()
  let email2 = faker.internet.email()
  let password = faker.internet.password()

  it('Deve efetuar cadastro com sucesso', () => {

    //Primeira página de cadastro
    cy.get('[data-cy="input-signup-personal-data-firstName"]').type(faker.name.firstName())
    cy.get('[data-cy="input-signup-personal-data-lastName"]').type(faker.name.lastName())
    cy.get('[data-cy="input-signup-personal-data-birthDate"]').type('30111995')
    cy.get('[data-cy="input-signup-personal-data-cpf"]').type(faker.br.cpf())
    cy.get('[data-cy="input-signup-personal-data-email"]').type(email)
    cy.get('[data-cy="input-signup-personal-data-email-confirm"]').type(email)
    cy.get('[data-cy="input-signup-personal-data-password"]').type(password)
    cy.get('[data-cy="input-signup-personal-data-password-confirm"]').type(password)
    cy.contains('button', 'Selecione a proficiência')
      .click()
      cy.get('#dropdown-button-1 > .overflow-y-scroll > :nth-child(4)').click()
    cy.get('[data-cy="input-signup-personal-data-lgpd"]').check()
    cy.contains('button', 'Próximo')
      .click()
    
    //Segunda página de cadastro (Após clicar em "Próximo")

    cy.get('[data-cy="input-signup-address-cep"]').type('30750340')
    cy.get('[data-cy="input-signup-address-neighborhood"]').type('Caiçaras')
    cy.get('[data-cy="input-signup-address-number"]').type('23')
    .wait(1000)
    cy.get('[data-cy="button-signup_submit_button_3"]')
      .click()

      cy.get('.w-full > .flex-col')
      .should('exist')
      .should('include.text', "Thank you for joining us!")  
  });

  it('Deve preencher CPF inválido', () => {
    cy.get('[data-cy="input-signup-personal-data-cpf"]').type('654.848.484-525')
    cy.get('[data-cy="input-signup-personal-data-email"]').click()
    cy.get('.input-error')
      .should('exist')
      .should('include.text', 'CPF inválido.')
  });

  it('Deve preencher CPF com formato inválido', () => {
    cy.get('[data-cy="input-signup-personal-data-cpf"]').type('654.848.484')
    cy.get('.input-error')
      .should('exist')
      .should('include.text', 'Precisa corresponder ao formato esperado')
  });

  it('Deve preencher a data de nascimento com formato errado', () => {
    cy.get('[data-cy="input-signup-personal-data-birthDate"]').type('04302020')
    cy.get('.input-error')
      .should('exist')
      .should('include.text', 'Data de nascimento inválida.')
  });

  it('', () => {
    cy.get('[data-cy="input-signup-personal-data-birthDate"]').type('04022032')
    cy.get('.input-error')
    .should('exist')
    .should('include.text', 'Data de nascimento inválida.')
  });

  it('Deve preencher o email em formato errado', () => {
    cy.get('[data-cy="input-signup-personal-data-email"]').type('testmail.com')
    cy.get(':nth-child(1) > .form-container > .input-error')
      .should('exist')
      .should('have.text', 'Precisa ser email')
  });


  it('Deve preencher o campo "CEP" de forma errada', () => {
    cy.get('[data-cy="input-signup-personal-data-firstName"]').type(faker.name.firstName())
    cy.get('[data-cy="input-signup-personal-data-lastName"]').type(faker.name.lastName())
    cy.get('[data-cy="input-signup-personal-data-birthDate"]').type('30111995')
    cy.get('[data-cy="input-signup-personal-data-cpf"]').type(faker.br.cpf())
    cy.get('[data-cy="input-signup-personal-data-email"]').type(email2)
    cy.get('[data-cy="input-signup-personal-data-email-confirm"]').type(email2)
    cy.get('[data-cy="input-signup-personal-data-password"]').type(password)
    cy.get('[data-cy="input-signup-personal-data-password-confirm"]').type(password)
    cy.contains('button', 'Selecione a proficiência')
      .click()
      cy.get('#dropdown-button-1 > .overflow-y-scroll > :nth-child(4)').click()
    cy.get('[data-cy="input-signup-personal-data-lgpd"]').check()
    cy.contains('button', 'Próximo')
      .click()

    cy.get('[data-cy="input-signup-address-cep"]').type('307503')
    cy.get('[data-cy="input-signup-address-neighborhood"]').type('Caiçaras')
    cy.get('.toast')
        .should('exist')
        .should('have.text', 'CEP não encontrado.')
  });
});


context('Testes de responsividade mobile', () => {
  beforeEach(() => {
    cy.visit('https://qastage.buildbox.one/18/cadastro/')
    cy.clearCookies()
    cy.get('[data-cy="button-btn-enroll"]').click()
  });

  it('Iphone 7', () => {
    cy.viewport('iphone-7')
    cy.contains("Dados Pessoais e de acesso")
    .should('exist')
  });

  it('Ipad Mini', () => {
    cy.viewport('ipad-mini')
    cy.contains("Dados Pessoais e de acesso")
    .should('exist')
  });
  it('Samsung S10', () => {
    cy.viewport('samsung-s10')
    cy.contains("Dados Pessoais e de acesso")
    .should('exist')
  });
})