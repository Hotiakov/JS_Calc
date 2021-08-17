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

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

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


    restoreData() {
        if (this.checkCookie()) {
            if (getCookie("isLoad") === "true") {
                this.setDataResult();
            }
            else {
                this.setDataEnter();
            }
        }
        else
            this.clearSavedData();
    }

    saveDataResult() {
        this.clearSavedData();
        localStorage.setItem("budgetMonthVal", budgetMonthVal.value);
        localStorage.setItem("budgetDayVal", budgetDayVal.value);
        localStorage.setItem("expensesMonthVal", expensesMonthVal.value);
        localStorage.setItem("additionalIncomeVal", additionalIncomeVal.value);
        localStorage.setItem("additionalExpensesVal", additionalExpensesVal.value);
        localStorage.setItem("incomePeriodVal", incomePeriodVal.value);
        localStorage.setItem("targetMonthVal", targetMonthVal.value);

        document.cookie = "budgetMonthVal=" + budgetMonthVal.value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = "budgetDayVal=" + budgetDayVal.value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = "expensesMonthVal=" + expensesMonthVal.value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = "additionalIncomeVal=" + additionalIncomeVal.value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = "additionalExpensesVal=" + additionalExpensesVal.value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = "incomePeriodVal=" + incomePeriodVal.value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = "targetMonthVal=" + targetMonthVal.value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = "isLoad=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    }
    saveDataEnter() {
        if (!this.checkCookie()) {
            this.clearSavedData();
            return;
        }
        if (getCookie("isLoad") === "true")
            return;
        this.clearSavedData();
        localStorage.setItem("checkDeposit", checkDeposit.checked);
        localStorage.setItem("salaryAmount", salaryAmount.value);
        localStorage.setItem("depositBank", depositBank.value);
        localStorage.setItem("depositAmount", depositAmount.value);
        localStorage.setItem("depositPercent", depositPercent.value);
        localStorage.setItem("targetAmount", targetAmount.value);
        localStorage.setItem("periodSelect", periodSelect.value);
        localStorage.setItem("additionalExpensesItem", additionalExpensesItem.value);
        document.cookie = "periodSelect=" + periodSelect.value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = "targetAmount=" + targetAmount.value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = "depositPercent=" + depositPercent.value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = "depositAmount=" + depositAmount.value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = "depositBank=" + depositBank.value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = "checkDeposit=" + checkDeposit.checked + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = "salaryAmount=" + salaryAmount.value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = "additionalExpensesItem=" + additionalExpensesItem.value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = "isLoad=false; expires=Fri, 31 Dec 9999 23:59:59 GMT";

        let expensesTitles = "";
        let expensesAmount = "";
        let incomeTitles = "";
        let incomeAmount = "";
        [...expensesItems].forEach((item) => {
            expensesTitles += item.querySelector(".expenses-title").value + "|";
            expensesAmount += item.querySelector(".expenses-amount").value + "|";
        });
        [...incomeItems].forEach((item) => {
            incomeTitles += item.querySelector(".income-title").value + "|";
            incomeAmount += item.querySelector(".income-amount").value + "|";
        });

        let AII = additionalIncomeItems[0].value + "|" + additionalIncomeItems[1].value;
        localStorage.setItem("additionalIncomeItems", AII);
        localStorage.setItem("incomeTitles", incomeTitles);
        localStorage.setItem("incomeAmount", incomeAmount);
        localStorage.setItem("expensesTitles", expensesTitles);
        localStorage.setItem("expensesAmount", expensesAmount);
        document.cookie = "additionalIncomeItems=" + AII + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = "incomeTitles=" + incomeTitles + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = "incomeAmount=" + incomeAmount + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = "expensesTitles=" + expensesTitles + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = "expensesAmount=" + expensesAmount + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    }
    setDataResult() {
        let inputs = document.querySelectorAll('[type="text"]');
        inputs.forEach((item) => {
            item.disabled = true;
        });
        checkDeposit.disabled = true;
        calculateBtn.style.display = 'none';
        cancelBtn.style.display = 'inline-block';

        budgetMonthVal.value = localStorage.getItem("budgetMonthVal");
        budgetDayVal.value = localStorage.getItem("budgetDayVal");
        expensesMonthVal.value = localStorage.getItem("expensesMonthVal");
        additionalIncomeVal.value = localStorage.getItem("additionalIncomeVal");
        additionalExpensesVal.value = localStorage.getItem("additionalExpensesVal");
        incomePeriodVal.value = localStorage.getItem("incomePeriodVal");
        targetMonthVal.value = localStorage.getItem("targetMonthVal");
    }
    setDataEnter() {
        checkDeposit.checked = (localStorage.getItem("checkDeposit") === "true");
        depositBank.value = localStorage.getItem("depositBank");
        if (checkDeposit) {
            this.depositHandler();
            if (depositBank.value === "other") {
                depositPercent.style.display = "inline-block";
            }
        }
        salaryAmount.value = localStorage.getItem("salaryAmount");
        if (salaryAmount.value)
            calculateBtn.disabled = false;
        depositBank.value = localStorage.getItem("depositBank");
        depositAmount.value = localStorage.getItem("depositAmount");
        depositPercent.value = localStorage.getItem("depositPercent");
        targetAmount.value = localStorage.getItem("targetAmount");
        periodSelect.value = localStorage.getItem("periodSelect");
        periodAmount.textContent = periodSelect.value;
        additionalExpensesItem.value = localStorage.getItem("additionalExpensesItem");

        let expensesTitles = localStorage.getItem("expensesTitles").split("|");
        let expensesAmount = localStorage.getItem("expensesAmount").split("|");
        let incomeTitles = localStorage.getItem("incomeTitles").split("|");
        let incomeAmount = localStorage.getItem("incomeAmount").split("|");
        let AII = localStorage.getItem("additionalIncomeItems").split("|");
        for (let i = 2; i < Math.max(expensesTitles.length, expensesAmount.length); i++) {
            if (expensesTitles[i - 2] === "" && expensesAmount[i - 2] === "") {
                expensesTitles.splice(i - 2, 1);
                expensesAmount.splice(i - 2, 1);
                i--;
                continue;
            }
            this.addExpIncBlock(expensesItems, expensesAddBtn);
        }
        for (let i = 2; i < Math.max(incomeTitles.length, incomeAmount.length); i++) {
            if (incomeTitles[i - 2] === "" && incomeAmount[i - 2] === "") {
                incomeTitles.splice(i - 2, 1);
                incomeAmount.splice(i - 2, 1);
                i--;
                continue;
            }
            this.addExpIncBlock(incomeItems, incomeAddBtn);
        }
        [...expensesItems].forEach((item, index) => {
            item.querySelector(".expenses-title").value = expensesTitles[index] || "";
            item.querySelector(".expenses-amount").value = expensesAmount[index] || "";
        });
        [...incomeItems].forEach((item, index) => {
            item.querySelector(".income-title").value = incomeTitles[index] || "";
            item.querySelector(".income-amount").value = incomeAmount[index] || "";
        });
        additionalIncomeItems[0].value = AII[0] || "";
        additionalIncomeItems[1].value = AII[1] || "";
    }
    checkCookie() {
        let cookie = document.cookie.split("; ");
        if (cookie.length !== localStorage.length + 1) //+1 т.к. isLoad
            return false;
        let keys = Object.keys(localStorage);
        for (let key of keys) {
            if (localStorage.getItem(key) !== getCookie(key))
                return false;
        }
        return true;
    }
    clearSavedData() {
        localStorage.clear();
        let cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
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
        if (!this.getInfoDeposit()) {
            return;
        }
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
        this.saveDataResult();
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

        this.deposit = false;
        this.depositHandler();
        depositPercent.style.display = "none";
        this.clearSavedData();
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
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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
    getInfoDeposit() {
        if (this.deposit) {
            if (!isNumber(depositAmount.value)) {
                alert("Сумма депозита должна быть числом!");
                return false;
            }
            this.percentDeposit = depositAmount.value;
            if (!isNumber(depositPercent.value)) {
                alert("Процент по депозиту должен быть числом!");
                calculateBtn.disabled = true;
                return false;
            }
            if (depositPercent.value < 0 || depositPercent.value > 100) {
                alert("Процент должен быть числом от 0 до 100!");
                calculateBtn.disabled = true;
                return false;
            }
            this.moneyDeposit = depositPercent.value;
            return true;
        }
        return true;
    }
    calcSavedMoney() {
        return this.budget * periodSelect.value;
    }
    clearAppData() {
        this.income = {};
        this.incomeAdd = [];
        this.expenses = {};
        this.expensesAdd = [];
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.incomeMonth = 0;
    }
    changePercent() {
        const selectValue = this.value;
        if (selectValue === "other") {
            depositPercent.style.display = "inline-block";
            depositPercent.value = 0;
        }
        else {
            depositPercent.style.display = "none";
            depositPercent.value = selectValue;
        }
    }
    depositHandler() {
        if (checkDeposit.checked) {
            depositBank.style.display = "inline-block";
            depositAmount.style.display = "inline-block";
            this.deposit = true;
            depositBank.addEventListener("change", this.changePercent);
        }
        else {
            calculateBtn.disabled = false;
            depositBank.style.display = "none";
            depositAmount.style.display = "none";
            depositBank.value = "";
            depositAmount.value = "";
            this.deposit = false;
            depositBank.removeEventListener("change", this.changePercent);
        }
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

        checkDeposit.addEventListener('change', this.depositHandler.bind(this));

        depositPercent.addEventListener("input", () => {
            if (salaryAmount.value !== "")
                calculateBtn.disabled = false;
        });
        window.addEventListener("unload", this.saveDataEnter.bind(this));
    }
}



const appData = new AppData();
appData.eventListeners();
appData.restoreData();


