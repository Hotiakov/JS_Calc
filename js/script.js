let money;
let income = "инвестиции";
let addExpenses = "Проезд в метро, Коммуналка, Интернет, Продукты питания";
let deposit = true;
let mission = 151515;
let period = 8;
let budgetDay = money / 30;

let expenses = [];

const isNumber = function (n) {
    return !isNaN(+n) && isFinite(n);
};

const showTypeOf = function (data) {
    console.log(data, typeof data);
};

const getExpensesMonth = function () {
    let result = 0;

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt("Введите обязательную статью расходов");
        let tmp;
        do {
            tmp = prompt("Во сколько это обойдется");
            if (!isNumber(tmp))
                confirm("Некорректно введенные данные! Повторите попытку");
            else
                break;
        } while (1);

        result += +tmp;
    }
    return result;
};

const getAccumulatedMonth = function (money, expensesMonth) {
    return money - expensesMonth;
};

const getTargetMonth = function (accumulatedMonth, mission) {
    return Math.ceil(mission / accumulatedMonth);
};

const getStatusIncome = function (budgetDay) {
    if (budgetDay >= 0 && budgetDay < 600)
        return ("К сожалению у вас уровень дохода ниже среднего");
    else if (budgetDay >= 600 && budgetDay < 1200)
        return ("У вас средний уровень дохода");
    else if (budgetDay >= 1200)
        return ("У вас высокий уровень дохода");
    else
        return ("Что-то пошло не так:(");
};

const start = function () {
    do {
        money = +(prompt("Ваш месячный доход?"));
    } while (isNaN(money) || money === null || money < 0);
};


start();

addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");

deposit = confirm("Есть ли у вас депозит в банке?");

let expensesMonth = getExpensesMonth();

let accumulatedMonth = getAccumulatedMonth(money, expensesMonth);

let targetMonth = getTargetMonth(accumulatedMonth, mission);

budgetDay = Math.floor(accumulatedMonth / 30);


showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.toLowerCase().split(", "));
console.log("Сумма расходов за месяц: " + expensesMonth);
console.log("Ежедневный доход примерно составляет: " + budgetDay);
if (targetMonth > 0)
    console.log("Цель будет достигнута за " + targetMonth + " месяцев(-а)");
else
    console.log("Цель не будет достигнута");
console.log(getStatusIncome(budgetDay));