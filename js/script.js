"use strict";

const isNumber = function (n) {
    return !isNaN(+n) && isFinite(n);
};

const enterValidation = function (enterFlagString, question, defaultValue) {
    let answer;
    do {
        answer = prompt(question, defaultValue);
        if (enterFlagString) { //если требуется строка
            if (isNumber(answer))
                alert("Некорректно введенные данные! Требуется ввести текст, а не число. Повторите попытку");
            else
                break;
        }
        else { //если требуется число
            if (!isNumber(answer))
                alert("Некорректно введенные данные! Требуется ввести число. Повторите попытку");
            else
                break;
        }
    } while (1);
    return answer;
}

let money;

const start = function () {
    do {
        money = +prompt("Ваш месячный доход?", "50000");
    } while (isNaN(money) || money === null || money < 0);
};

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 151515,
    period: 8,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {

        if (confirm("Есть ли у вас дополнительный источник заработка?")) {

            let itemIncome = enterValidation(true, "Каков Ваш дополнительный заработок?", "Фриланс");
            let cashIncome = +enterValidation(false, "Сколько Вы на этом зарабатываете?", 10000);
            this.income[itemIncome] = cashIncome;
        }

        this.addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую").toLowerCase().split(", ");
        for (let i = 0; i < 2; i++) {
            let key = enterValidation(true, "Введите обязательную статью расходов");
            this.expenses[key] = +enterValidation(false, "Во сколько это обойдется", "1000");
        }
        this.deposit = confirm("Есть ли у вас депозит в банке?");
    },

    getBudget: function () {
        this.budgetMonth = this.budget - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    },

    getTargetMonth: function () {
        this.period = Math.ceil(this.mission / this.budgetMonth);
    },

    getExpensesMonth: function () {
        for (let value in this.expenses)
            this.expensesMonth += this.expenses[value];
    },

    getStatusIncome: function () {
        if (this.budgetDay >= 0 && this.budgetDay < 600)
            return ("К сожалению у вас уровень дохода ниже среднего");
        else if (this.budgetDay >= 600 && this.budgetDay < 1200)
            return ("У вас средний уровень дохода");
        else if (this.budgetDay >= 1200)
            return ("У вас высокий уровень дохода");
        else
            return ("Что-то пошло не так:(");
    },
    getInfoDeposit: function () {
        if (this.deposit) {
            this.percentDeposit = enterValidation(false, "Какой годовой процент по депозиту?", 10);
            this.moneyDeposit = enterValidation(false, "Какая сумма заложена?", 10000);
        }
    },
    calcSavedMoney: function () {
        return appData.budget * appData.period;
    }
};

appData.asking();
appData.getInfoDeposit();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();


console.log("Дополнительные расходы за месяц: " + appData.addExpenses.map(function (str) {
    return str[0].toUpperCase() + str.substr(1);
}).join(", "));

console.log("Сумма расходов за месяц: " + appData.expensesMonth);


console.log(appData.getStatusIncome());
if (appData.period > 0)
    console.log("Цель будет достигнута за " + appData.period + " месяцев(-а)");
else
    console.log("Цель не будет достигнута");

console.log("");

console.log("Наша программа включает в себя данные:");
for (let key in appData) {
    if (typeof appData[key] !== "object")
        console.log("Название поля: " + key + " | Значение поля: " + appData[key]);
    else {
        console.log("Название поля: " + key + " | Значение поля: ");
        console.log(appData[key]);
    }
}

//lesson09

const calculateBtn = document.getElementById('start');
const incomeAddBtn = document.getElementsByTagName('btn_plus')[0];
const expensesAddBtn = document.getElementsByTagName('btn_plus')[1];
const checkDeposit = document.querySelector('#deposit-check');
const additionalIncomeItems = document.querySelectorAll('.additional_income-item');

const budgetMonthVal = document.getElementsByClassName('.budget_month-value')[0];
const budgetDayVal = document.getElementsByClassName('.budget_day-value')[0];
const expensesMonthVal = document.getElementsByClassName('.expenses_month-value')[0];
const additionalIncomeVal = document.getElementsByClassName('.additional_income-value')[0];
const additionalExpensesVal = document.getElementsByClassName('.additional_expenses-value')[0];
const incomePeriodVal = document.getElementsByClassName('.income_period-value')[0];
const targetMonthVal = document.getElementsByClassName('.target_month-value')[0];

const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const exspensesTitle = document.querySelector('.expenses-title');
const exspensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');