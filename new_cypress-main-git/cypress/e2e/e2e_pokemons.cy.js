import * as data from "../helpers/default_data_pokemons.json"

describe('Проверка покупки аватара', function () {

    it('е2е покупка аватара для тренера', function () {
         cy.visit('https://pokemonbattle.ru/login'); //зайти на сайт
         cy.get(':nth-child(1) > .auth__input').type(data.login);//ввести верную почту
         cy.get('#password').type(data.password);//ввести верный пароль
         cy.get('.auth__button').click();//нажать войти
         cy.wait(2000);//время на подумать
         cy.get('.header__container > .header__id').click();//зайти в профиль
         cy.get('[href="/shop"]').click();//нажать смена аватара
         cy.get('.available > button').first().click({ force: true });//нажать купить 
         cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4620869113632996');//ввести номер карты
         cy.get(':nth-child(1) > .pay_base-input-v2').type('1025');//ввести срок карты
         cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125');//ввести cvv код
         cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('MINAKOVA DIANA');//ввести имя держателя карты
         cy.get('.pay-btn').click();//нажать оплатить
         cy.get('#cardnumber').type('56456');//ввести код из сообщения
         cy.get('.payment__submit-button').click();//нажать отправить
         cy.get('.payment__font-for-success').contains('Покупка прошла успешно');//получить верный текст
         cy.get('.payment__font-for-success').should('be.visible');//текст виден пользователю
     })
    })
