"use strict";

let calculateBtn = document.getElementById('start'),
    cancelBtn = document.getElementById('cancel'),
    incomeAddBtn = document.getElementsByTagName('button')[0],
    expensesAddBtn = document.getElementsByTagName('button')[1],
    checkDeposit = document.querySelector('#deposit-check'),
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    budgetMonthVal = document.getElementsByClassName('budget_month-value')[0],
    budgetDayVal = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthVal = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeVal = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesVal = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodVal = document.getElementsByClassName('income_period-value')[0],
    targetMonthVal = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount');


const isNumber = function (n) {
    return !isNaN(+n) && isFinite(n);
};

const createRegularExp = function () {
    let reg = new RegExp("^[А-Яа-яЁё\\s,\\._\\-!?]+$");
    return function (str) {
        return str === "" || reg.test(str);
    }
}

const isStr = createRegularExp();

const AppData = function () {
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
};

AppData.prototype.start = function () {
    this.clearAppData();
    if (!isNumber(salaryAmount.value)) {
        alert("Неверрное введен месячный доход! Требуется ввести число!");
        return;
    }
    this.budget = +salaryAmount.value;
    if (!this.getExpenses()) {
        return;
    }
    // this.getInfoDeposit();
    if (!this.getIncome()) {
        return;
    }
    if (!this.getAddExpenses()) {
        return;
    }
    if (!this.getAddIncome()) {
        alert("Наименование возможных доходов должно содержать только русские буквы, пробелы и знаки препинания!");
        return;
    }
    this.getExpensesMonth();
    this.getBudget();
    this.getTargetMonth();

    this.showResult();
    let inputs = document.querySelectorAll('[type="text"]');
    inputs.forEach(function (item) {
        item.disabled = true;
    });
    checkDeposit.disabled = true;
    calculateBtn.style.display = 'none';
    cancelBtn.style.display = 'inline-block';
};

AppData.prototype.reset = function () {
    this.clearAppData();
    checkDeposit.disabled = false;
    periodSelect.value = 1;
    checkDeposit.checked = false;
    let inputs = document.querySelectorAll('[type="text"]');
    inputs.forEach(function (item) {
        item.value = '';
        item.disabled = false;
    });
    expensesItems.forEach(function (item, index) {
        if (index !== 0) {
            item.remove();
        } else {
            expensesAddBtn.style.display = 'inline-block';
        }
    });

    incomeItems.forEach(function (item, index) {
        if (index !== 0) {
            item.remove();
        } else {
            incomeAddBtn.style.display = 'inline-block';
        }
    });
    periodAmount.textContent = 1;
    cancelBtn.style.display = 'none';
    calculateBtn.style.display = 'inline-block';
};
AppData.prototype.showResult = function () {
    budgetMonthVal.value = this.budgetMonth;
    budgetDayVal.value = this.budgetDay;
    expensesMonthVal.value = this.expensesMonth;
    additionalExpensesVal.value = this.addExpenses.join(', ');
    additionalIncomeVal.value = this.addIncome.join(', ');
    targetMonthVal.value = this.getTargetMonth();
    incomePeriodVal.value = this.calcSavedMoney();
    periodSelect.addEventListener('input', function () {
        incomePeriodVal.value = this.calcSavedMoney();
    }.bind(this));
};
AppData.prototype.addExpensesBlock = function () {
    let newExpensesItem = expensesItems[0].cloneNode(true);
    newExpensesItem.querySelector('.expenses-title').value = "";
    newExpensesItem.querySelector('.expenses-amount').value = "";
    expensesAddBtn.insertAdjacentElement('beforebegin', newExpensesItem);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3)
        expensesAddBtn.style.display = 'none';

};
AppData.prototype.addIncomeBlock = function () {
    let newEIncomeItem = incomeItems[0].cloneNode(true);
    newEIncomeItem.querySelector('.income-title').value = "";
    newEIncomeItem.querySelector('.income-amount').value = "";
    incomeAddBtn.insertAdjacentElement('beforebegin', newEIncomeItem);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3)
        incomeAddBtn.style.display = 'none';

};
AppData.prototype.getExpenses = function () {
    let flag = true;
    expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        if (!isStr(itemExpenses)) {
            alert("Наименование обязательных расходов должно содержать только русские буквы, пробелы и знаки препинания!");
            flag = false;
        }
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (!isNumber(cashExpenses)) {
            alert("Сумма обязательного расхода должна быть числом!");
            flag = false;
        }
        if (flag)
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            }
    }, this);
    return flag;
};
AppData.prototype.getIncome = function () {
    let flag = true;
    incomeItems.forEach(function (item) {
        let itemIncome = item.querySelector('.income-title').value;
        if (!isStr(itemIncome)) {
            alert("Наименование дополнительного дохода должно содержать только русские буквы, пробелы и знаки препинания!");
            flag = false;
        }
        let cashIncome = +item.querySelector('.income-amount').value;
        if (!isNumber(cashIncome)) {
            alert("Сумма дополнительного дохода должна быть числом!");
            flag = false;
        }
        if (itemIncome !== '' && cashIncome !== '' && flag) {
            this.income[itemIncome] = +cashIncome;
        }
    }, this);
    if (flag)
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    return flag;
};
AppData.prototype.getAddExpenses = function () {
    if (!isStr(additionalExpensesItem.value)) {
        alert("Наименование возможных расходов должно содержать только русские буквы, пробелы и знаки препинания!");
        return false;
    }
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        }
    }, this);
    return true;
};
AppData.prototype.getAddIncome = function () {
    let flag = true;
    additionalIncomeItems.forEach(function (item) {
        let itemValue = item.value.trim();
        if (!isStr(itemValue)) {
            flag = false;
        }
        if (itemValue !== '' && flag) {
            this.addIncome.push(itemValue);
        }
    }, this);
    return flag;
};
AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function () {
    if (!isNumber(targetAmount.value)) {
        alert("Цель накопления должны быть числом!");
        return 0;
    }

    return Math.ceil(+targetAmount.value / this.budgetMonth);
};
AppData.prototype.getExpensesMonth = function () {
    for (let value in this.expenses)
        this.expensesMonth += this.expenses[value];
};
AppData.prototype.getStatusIncome = function () {
    if (this.budgetDay >= 0 && this.budgetDay < 600)
        return ("К сожалению у вас уровень дохода ниже среднего");
    else if (this.budgetDay >= 600 && this.budgetDay < 1200)
        return ("У вас средний уровень дохода");
    else if (this.budgetDay >= 1200)
        return ("У вас высокий уровень дохода");
    else
        return ("Что-то пошло не так:(");
};
AppData.prototype.getInfoDeposit = function () {
    if (this.deposit) {
        this.percentDeposit = enterValidation(false, "Какой годовой процент по депозиту?", 10);
        this.moneyDeposit = enterValidation(false, "Какая сумма заложена?", 10000);
    }
};
AppData.prototype.calcSavedMoney = function () {
    return this.budget * periodSelect.value;
};
AppData.prototype.clearAppData = function () {
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
};
AppData.prototype.eventListeners = function () {
    calculateBtn.addEventListener('click', this.start.bind(this));

    cancelBtn.addEventListener('click', this.reset.bind(this));

    expensesAddBtn.addEventListener('click', this.addExpensesBlock);

    incomeAddBtn.addEventListener('click', this.addIncomeBlock);

    periodSelect.addEventListener('input', function () {
        periodAmount.textContent = periodSelect.value;
    });

    calculateBtn.disabled = true;
    salaryAmount.addEventListener('input', function () {
        if (salaryAmount.value === "") {
            calculateBtn.disabled = true;
        }
        else {
            calculateBtn.disabled = false;
        }
    });
};

const appData = new AppData();
appData.eventListeners();


