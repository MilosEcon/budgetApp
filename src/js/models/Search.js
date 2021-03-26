export const data = { 
    items: {
        income: [],
        expense: []
    },
    total: {
        income: 0,
        expense: 0
    },
    budget: 0,
    percentage: 0
}

const randomColor = () => {
    const color = `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`
    return color;
}

class Income {
    constructor(id, desc, val) {
        this.id = id;
        this.desc = desc;
        this.value = val
        this.color = randomColor();
    }
}

class Expense {
    constructor(id, desc, val) {
        this.id = id;
        this.desc = desc;
        this.value = val
        this.color = randomColor();
    }
}

export const generateItem = (type, desc, val) => {
    let newItem, ID;
    if (type === 'income') {
        if (data.items.income.length > 0) {
            ID = data.items.income[parseInt(data.items.income.length) - 1].id + 1;
        } else {
            ID = 0;
        }
        newItem = new Income(ID, desc, val);
    } else if (type === 'expense') {
        if (data.items.expense.length > 0) {
            ID = data.items.expense[parseInt(data.items.expense.length) - 1].id + 1;
        } else {
            ID = 0;
        }
        newItem = new Expense(ID, desc, val);
    }
    data.items[type].push(newItem);
    return newItem;
}

export const calculateBudget = type => {

    // 1. recalculate total income or expenses depending on what is changing
    data.total[type] = data.items[type].reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);

    // 2. calculate diference between total income and total expense 
    data.budget = data.total.income - data.total.expense;

    // 3. caluclate percentage of expenses in relation to incomes
    if (data.total.income > 0) {
        data.percentage = Math.round((data.total.expense / data.total.income) * 100);
    } else {
        data.percentage = -1;
    }
}

export const getBudget = () => ({
        totalInc: data.total.income,
        totalExp: data.total.expense,
        budget: data.budget,
        percentage: data.percentage
    });

export const calcPercentage = () => {
    const totalInc = data.total.income;
    const totalExp = data.total.expense;
    if (totalInc > totalExp) {
        data.percentage = Math.round((totalExp / totalInc) * 100);
    } else {
        data.percentage = 100;
    }
}

export const getPercentage = () => data.percentage;

export const dataDeleteItems = (type, id) => {
    id = parseInt(id);
    const typeOfData = data.items[type]; //income or expense
    const indexOfElement = typeOfData.findIndex(element => element.id === id);
    typeOfData.splice(indexOfElement, 1);
}