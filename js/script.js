let money = 50205;
let income = "инвестиции";
let addExpenses = "Проезд в метро, Коммуналка, Интернет, Продукты питания";
let deposit = true;
let mission = 151515;
let period = 8;

let budgetDay = money / 30;

console.log("Тип переменной money: " + typeof money);
console.log("Тип переменной income: " + typeof income);
console.log("Тип переменной deposit: " + typeof deposit);



console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");


console.log("Дневной доход составляет: " + budgetDay + " рублей");

money = Number(prompt("Ваш месячный доход?"));
if (isNaN(money))
    console.log('Неверно введенный месячный доход');

addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
console.log("Длина строки addExpenses: " + addExpenses.length);

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

let budgetMoney = money - amount1 - amount2;
console.log("Ежемесячный бюджет состовляет: " + budgetMoney);

console.log("Цель будет достигнута за " + Math.ceil(mission / budgetMoney) + " месяцев(-а)");

budgetDay = Math.floor(budgetMoney / 30);
console.log("Ежедневный доход примерно составляет: " + budgetDay);

if (budgetDay >= 0 && budgetDay < 600)
    console.log("К сожалению у вас уровень дохода ниже среднего");
else if (budgetDay >= 600 && budgetDay < 1200)
    console.log("У вас средний уровень дохода");
else if (budgetDay >= 1200)
    console.log("У вас высокий уровень дохода");
else
    console.log("Что-то пошло не так:(");
