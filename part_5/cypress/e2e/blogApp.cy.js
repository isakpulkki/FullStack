Cypress.Commands.add('createBlog', (content) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: content,
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('loggedUser')).token
      }`,
    },
  });
  cy.visit('');
});

describe('Blog application... ', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/reset`);
    const user = {
      name: 'Root',
      username: 'Root',
      password: 'Secret',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user);
    cy.visit('');
  });

  it('...Shows a login form.', function () {
    cy.contains('Login');
  });

  it('...Fails with wrong password when logging in.', function () {
    cy.contains('Login').click();
    cy.get('#username').type('Root');
    cy.get('#password').type('Wrong');
    cy.get('#login').click();

    cy.contains('Wrong username or password.');
  });

  it('...Successes with proper user when logging in.', function () {
    cy.contains('Login').click();
    cy.get('#username').type('Root');
    cy.get('#password').type('Secret');
    cy.get('#login').click();
    cy.contains('Root logged in.');
  });
  describe('...Logs user in, and...', function () {
    beforeEach(function () {
      cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
        username: 'Root',
        password: 'Secret',
      }).then((response) => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body));
        cy.visit('');
      });
    });
    it('...Proper blog can be created.', function () {
      cy.contains('Add a new blog').click();
      cy.get('#title').type('Testikirja');
      cy.get('#author').type('Panu Ruusunen');
      cy.get('#url').type('www.testikirja.fi');
      cy.get('#add').click();
      cy.contains('Testikirja');
    });
    describe('...When proper blog is created...', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Testikirja',
          author: 'Panu Ruusunen',
          url: 'wwww.testikirja.fi',
        });
      });
      it('...The blog can be liked.', function () {
        cy.contains('Show').click();
        cy.contains('Likes: 0');
        cy.contains('Like').click();
        cy.contains('Likes: 1');
      });
      it('...The blog can be deleted.', function () {
        cy.contains('Show').click();
        cy.contains('Testikirja');
        cy.contains('Delete').click();
        cy.contains('Testikirja').should('not.exist');
      });
      it('...Only the adder can see the delete button.', function () {
        cy.contains('Show').click();
        cy.contains('Delete');
        cy.contains('Logout').click();
        cy.contains('Delete').should('not.exist');
      });
      it('...And multiple others, the blogs are sorted by their like count.', function () {
        cy.createBlog({
          title: 'Kissakirja',
          author: 'Joni Kuusanen',
          url: 'wwww.kissakirja.fi',
          likes: 10,
        });
        cy.createBlog({
          title: 'Koirakirja',
          author: 'Toni Puusanen',
          url: 'wwww.koirakirja.fi',
          likes: 5,
        });
        cy.contains('Kissakirja').parent().find('button').click();
        cy.contains('Koirakirja').parent().find('button').click();
        cy.contains('Testikirja').parent().find('button').click();
        cy.get('.blog').eq(0).should('contain', 'Kissakirja');
        cy.get('.blog').eq(1).should('contain', 'Koirakirja');
        cy.get('.blog').eq(2).should('contain', 'Testikirja');
      });
    });
  });
});
