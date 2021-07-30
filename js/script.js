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

console.log("Длина строки addExpenses: " + addExpenses.length);

console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");

console.log(addExpenses.toLowerCase().split(", "));

console.log("Дневной доход составляет: " + budgetDay + " рублей");

