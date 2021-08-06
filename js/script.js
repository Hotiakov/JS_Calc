"use strict";

const isNumber = function (n) {
    return !isNaN(+n) && isFinite(n);
};

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 151515,
    period: 8,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {
        this.addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую").toLowerCase().split(", ");
        this.deposit = confirm("Есть ли у вас депозит в банке?");
        for (let i = 0; i < 2; i++) {
            let key = prompt("Введите обязательную статью расходов");
            let value;
            do {
                value = prompt("Во сколько это обойдется", "1000");
                if (!isNumber(value))
                    alert("Некорректно введенные данные! Повторите попытку");
                else
                    break;
            } while (1);
            this.expenses[key] = +value;
        }
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


};

let money;

const start = function () {
    do {
        money = +prompt("Ваш месячный доход?", "50000");
    } while (isNaN(money) || money === null || money < 0);
};

start();

appData.budget = money;

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();


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