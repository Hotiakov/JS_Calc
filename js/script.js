let money = 50205;
let income = "инвестиции";
let addExpenses = "Проезд в метро, Коммуналка, Интернет, Продукты питания";
let deposit = true;
let mission = 151515;
let period = 8;
let budgetDay = money / 30;

const showTypeOf = function (data) {
    console.log(data, typeof data);
}

const getExpensesMonth = function (amounts) {
    let result = 0;
    for (let amount of amounts)
        result += amount;
    return result;
}

const getAccumulatedMonth = function (money, amounts) {
    return money - getExpensesMonth(amounts);
}

const getTargetMonth = function (accumulatedMonth, mission) {
    return Math.ceil(mission / accumulatedMonth);
}

const getStatusIncome = function (budgetDay) {
    if (budgetDay >= 0 && budgetDay < 600)
        return ("К сожалению у вас уровень дохода ниже среднего");
    else if (budgetDay >= 600 && budgetDay < 1200)
        return ("У вас средний уровень дохода");
    else if (budgetDay >= 1200)
        return ("У вас высокий уровень дохода");
    else
        return ("Что-то пошло не так:(");
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


money = Number(prompt("Ваш месячный доход?"));
if (isNaN(money))
    console.log('Неверно введенный месячный доход');

addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
console.log(addExpenses.toLowerCase().split(", "));

deposit = confirm("Есть ли у вас депозит в банке?");

expenses1 = prompt("Введите обязательную статью расходов");
amount1 = Number(prompt("Во сколько это обойдется?"));
if (isNaN(amount1))
    console.log('Неверно введенный месячный доход');

expenses2 = prompt("Введите обязательную статью расходов");
amount2 = Number(prompt("Во сколько это обойдется?"));
if (isNaN(amount2))
    console.log('Неверно введенный месячный доход');

console.log("Сумма расходов за месяц: " + getExpensesMonth([amount1, amount2]));

let accumulatedMonth = getAccumulatedMonth(money, [amount1, amount2]);

console.log("Цель будет достигнута за " + getTargetMonth(accumulatedMonth, mission) + " месяцев(-а)");

budgetDay = Math.floor(accumulatedMonth / 30);
console.log("Ежедневный доход примерно составляет: " + budgetDay);

console.log(getStatusIncome(budgetDay));