import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

beforeEach('Начало теста', function () {
        cy.visit('/');//зашли на сайт
        cy.get(main_page.forgot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');//проверяю чвет кнопки восстановить пароль
          });
afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible');//есть крестик и виден для пользователя 
          });
   
 it('Верный пароль и верный логин', function () {
         
    cy.get(main_page.email).type(data.login);//ввели верный логин
    cy.get(main_page.password).type(data.password);//ввели верный пароль
    cy.get(main_page.login_button).click();//нажать войти

    cy.get(result_page.title).contains('Авторизация прошла успешно');// проверить что после авторизации вижу корректный текст
    cy.get(result_page.title).should('be.visible'); //текст виден пользователю      
})  
 
 it('Неверный пароль и верный логин', function () {
   
    cy.get(main_page.email).type(data.login);//ввели верный логин
    cy.get(main_page.password).type('iLoveqastudi1234');//ввели неверный пароль
    cy.get(main_page.login_button).click();//нажать войти

    cy.get(result_page.title).contains('Такого логина или пароля нет');// проверить что после авторизации вижу корректный текст
    cy.get(result_page.title).should('be.visible'); //текст виден пользователю
})  

it('Верный пароль и неверный логин', function () {
  
    cy.get(main_page.email).type('dians73798@icloud.com');//ввели несуществующий в системе логин
    cy.get(main_page.password).type(data.password);//ввели верный пароль
    cy.get(main_page.login_button).click();//нажать войти

    cy.get(result_page.title).contains('Такого логина или пароля нет');// проверить что после авторизации вижу корректный текст
    cy.get(result_page.title).should('be.visible'); //текст виден пользователю
})  

it('Проверка, что в логине есть @, валидация', function () {
   
    cy.get(main_page.email).type('germandolnikov.ru');//ввели невалидный логин без @
    cy.get(main_page.password).type(data.password);//ввели верный пароль
    cy.get(main_page.login_button).click();//нажать войти

    cy.get(result_page.title).contains('Нужно исправить проблему валидации');// проверить что после авторизации вижу корректный текст
    cy.get(result_page.title).should('be.visible'); //текст виден пользователю
})  

it('Проверка формы восстановления пароля', function () {
  
    cy.get(main_page.forgot_pass_btn).click();//нажать забыли пароль
    cy.get(recovery_password_page.email).type(data.login);//ввести почту для восстановления
    cy.get(recovery_password_page.send_button).click();//нажать отправить код

    cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');// проверить на совпадение текст
    cy.get(result_page.title).should('be.visible'); //текст виден пользователю
})  

it('Проверка на приведение к строчным буквам', function () {
    
    cy.get(main_page.email).type('GerMan@Dolnikov.ru');//ввели логин с разным регистром
    cy.get(main_page.password).type(data.password);//ввели верный пароль
    cy.get(main_page.login_button).click();//нажать войти

    cy.get(result_page.title).contains('Авторизация прошла успешно');// проверить что после авторизации вижу корректный текст
    cy.get(result_page.title).should('be.visible'); //текст виден пользователю   
})  
})
 
 // запуск через теринал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome
 
// Найти поле логин и ввести правильный логин
// Найти поле пароль и ввести правильный пароль
// Найти кнопку войти и нажать войти
// Проверить, что авторизация прошла успешно, хочу проверить что текст на странице авторизации совпадает с верным текстом