"use strict";

const calculateBtn = document.getElementById('start'),
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
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');
let expensesItems = document.getElementsByClassName('expenses-items'),
    incomeItems = document.getElementsByClassName('income-items');

const isNumber = (n) => {
    return !isNaN(+n) && isFinite(n);
};

const createRegularExp = function () {
    let reg = new RegExp("^[А-Яа-яЁё\\s,\\._\\-!?]+$");
    return (str) => {
        return str === "" || reg.test(str);
    };
};

const isStr = createRegularExp();

class AppData {
    constructor() {
        this.income = {};
        this.incomeAdd = [];
        this.expenses = {};
        this.expensesAdd = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.incomeMonth = 0;
    }
    start() {
        this.clearAppData();
        if (!isNumber(salaryAmount.value)) {
            alert("Неверрное введен месячный доход! Требуется ввести число!");
            return;
        }
        this.budget = +salaryAmount.value;
        if (!this.getExpIncome()) {
            return;
        }
        if (!this.getAddExpIncome()) {
            return;
        }
        this.getExpensesMonth();
        this.getBudget();
        this.getTargetMonth();

        this.showResult();
        let inputs = document.querySelectorAll('[type="text"]');
        inputs.forEach((item) => {
            item.disabled = true;
        });
        checkDeposit.disabled = true;
        calculateBtn.style.display = 'none';
        cancelBtn.style.display = 'inline-block';
    }
    reset() {
        this.clearAppData();
        checkDeposit.disabled = false;
        periodSelect.value = 1;
        checkDeposit.checked = false;
        let inputs = document.querySelectorAll('[type="text"]');
        inputs.forEach(function (item) {
            item.value = '';
            item.disabled = false;
        });
        Array.from(expensesItems).forEach(function (item, index) {
            if (index !== 0) {
                item.remove();
            } else {
                expensesAddBtn.style.display = 'inline-block';
            }
        });

        Array.from(incomeItems).forEach(function (item, index) {
            if (index !== 0) {
                item.remove();
            } else {
                incomeAddBtn.style.display = 'inline-block';
            }
        });
        periodAmount.textContent = 1;
        cancelBtn.style.display = 'none';
        calculateBtn.style.display = 'inline-block';
    }
    showResult() {
        budgetMonthVal.value = this.budgetMonth;
        budgetDayVal.value = this.budgetDay;
        expensesMonthVal.value = this.expensesMonth;
        additionalExpensesVal.value = this.expensesAdd.join(', ');
        additionalIncomeVal.value = this.incomeAdd.join(', ');
        targetMonthVal.value = this.getTargetMonth();
        incomePeriodVal.value = this.calcSavedMoney();
        periodSelect.addEventListener('input', () => {
            incomePeriodVal.value = this.calcSavedMoney();
        });
    }
    addExpIncBlock(items, btn) {
        let newItem = items[0].cloneNode(true);
        const startString = newItem.className.split('-')[0];
        newItem.querySelector(`.${startString}-title`).value = "";
        newItem.querySelector(`.${startString}-amount`).value = "";
        btn.insertAdjacentElement('beforebegin', newItem);
        if (items.length === 3)
            btn.style.display = "none";
    }
    getExpIncome() {
        let flag = true;
        const getValue = (item) => {
            const startString = item.className.split("-")[0];
            let expIncItem = item.querySelector(`.${startString}-title`).value;
            if (!isStr(expIncItem)) {
                alert("Наименование должно содержать только русские буквы, пробелы и знаки препинания!");
                flag = false;
            }
            let cash = +item.querySelector(`.${startString}-amount`).value;
            if (!isNumber(cash)) {
                alert("Сумма должна быть числом!");
                flag = false;
            }
            if (expIncItem !== '' && cash !== '' && flag) {
                this[startString][expIncItem] = +cash;
            }
        };
        Array.from(incomeItems).forEach(getValue);
        if (!flag)
            return flag;
        Array.from(expensesItems).forEach(getValue);
        if (flag) {
            for (let key in this.income) {
                this.incomeMonth += +this.income[key];
            }
        }
        return flag;
    }
    getAddExpIncome() {
        let flag = true;
        const getValue = (item, isInput) => {
            let itemValue = isInput ? item.value.trim() : item.trim();
            if (!isStr(itemValue)) {
                flag = false;
            }
            if (itemValue !== '' && flag) {
                if (isInput)
                    this.incomeAdd.push(itemValue);
                else
                    this.expensesAdd.push(itemValue);
            }
        };
        additionalIncomeItems.forEach((item) => getValue(item, true));
        if (!flag) {
            alert("Наименование возможных доходов должно содержать только русские буквы, пробелы и знаки препинания!");
            return flag;
        }
        let expensesAdd = additionalExpensesItem.value.split(',');
        expensesAdd.forEach((item) => getValue(item, false));
        if (!flag) {
            alert("Наименование возможных расходов должно содержать только русские буквы, пробелы и знаки препинания!");
            return flag;
        }
        return flag;

    }
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    getTargetMonth() {
        if (!isNumber(targetAmount.value)) {
            alert("Цель накопления должны быть числом!");
            return 0;
        }

        return Math.ceil(+targetAmount.value / this.budgetMonth);
    }
    getExpensesMonth() {
        for (let value in this.expenses)
            this.expensesMonth += this.expenses[value];
    }
    getStatusIncome() {
        if (this.budgetDay >= 0 && this.budgetDay < 600)
            return ("К сожалению у вас уровень дохода ниже среднего");
        else if (this.budgetDay >= 600 && this.budgetDay < 1200)
            return ("У вас средний уровень дохода");
        else if (this.budgetDay >= 1200)
            return ("У вас высокий уровень дохода");
        else
            return ("Что-то пошло не так:(");
    }
    // getInfoDeposit() {
    //     if (this.deposit) {
    //         this.percentDeposit = enterValidation(false, "Какой годовой процент по депозиту?", 10);
    //         this.moneyDeposit = enterValidation(false, "Какая сумма заложена?", 10000);
    //     }
    // }
    calcSavedMoney() {
        return this.budget * periodSelect.value;
    }
    clearAppData() {
        this.income = {};
        this.incomeAdd = [];
        this.expenses = {};
        this.expensesAdd = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.incomeMonth = 0;
    }
    eventListeners() {
        calculateBtn.addEventListener('click', this.start.bind(this));

        cancelBtn.addEventListener('click', this.reset.bind(this));

        expensesAddBtn.addEventListener('click', () => this.addExpIncBlock(expensesItems, expensesAddBtn));

        incomeAddBtn.addEventListener('click', () => this.addExpIncBlock(incomeItems, incomeAddBtn));

        periodSelect.addEventListener('input', () => {
            periodAmount.textContent = periodSelect.value;
        });

        calculateBtn.disabled = true;
        salaryAmount.addEventListener('input', () => {
            if (salaryAmount.value === "") {
                calculateBtn.disabled = true;
            }
            else {
                calculateBtn.disabled = false;
            }
        });
    }
}



const appData = new AppData();
appData.eventListeners();


