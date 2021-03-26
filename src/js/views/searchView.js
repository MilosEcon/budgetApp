import {elements, circle} from './base';

export const getItems = () => ({
        type: document.querySelector(elements.type).dataset.type,
        desc: document.querySelector(elements.desc).value,
        val: parseFloat(document.querySelector(elements.val).value),
        curr: document.querySelector(elements.currWraper).dataset.curr
    });

export const addList = (obj, type) => {
    let html;
    if (type === 'income') {
        html = `<li class="item" id="income-${obj.id}"><div class="item__desc">${obj.desc}</div><div class="item__right">
        <div class="item__value">${formatNumber(obj.value, type)}</div><button class="item__delete">&times;</button></div></li>`;
        document.querySelector(elements.categoryInc).insertAdjacentHTML('beforeend', html);
    } else if (type === 'expense') {
        html = `<li class="item item--expense" id="expense-${obj.id}"><div class="item__desc">${obj.desc}</div><div class="item__right">
        <div class="item__value">${formatNumber(obj.value, type)}</div><button class="item__delete item__delete--expense">&times;</button></div></li>`;
        document.querySelector(elements.categoryExp).insertAdjacentHTML('beforeend', html);
    }
}

export const clearInput = () => {
    let desc = document.querySelector(elements.desc);
    desc.value = '';
    desc.focus();
    document.querySelector(elements.val).value = "";
}

export const formatNumber = (number, type) => {
    number = Math.abs(number);
    // Make all numbers to have two decimal
    number = number.toFixed(2);
    // Separate intiger and desimal part
    const numArr = number.split('.');
    const [int, decimal] = numArr;
    // Format int
    const newInt = (int.length > 3) ? `${int.substr(0, int.length - 3)},${int.substr(int.length - 3, 3)}` : int;
    const newNum = type === 'income' ? `+${newInt}.${decimal}` : `-${newInt}.${decimal}`;
    return newNum;
}

export const displayBudget = (budget, income, expense) => {
    // we define type to know if we going to display + or - in front budget
    const type = budget > 0 ? 'income' : 'expense';
    
    document.getElementById(elements.budgetResult).innerHTML = formatNumber(budget, type);
    document.getElementById(elements.totalIncome).innerHTML = formatNumber(income, 'income') ;
    document.getElementById(elements.totalExpense).innerHTML = formatNumber(expense, 'expense');
}

export const deleteItemUI = id => {
    const element = document.getElementById(id);
    element.parentNode.removeChild(element);
}

export const displayPercentage = percentage => {
    percentage = percentage / 100;
    document.querySelector(elements.circleExpPercent).style.strokeDashoffset = circle.circumference - (percentage * circle.circumference);
}

export const displayDate = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date();
    return `${date.getDate()}.${months[date.getMonth()]}.${date.getFullYear()}`;
}
