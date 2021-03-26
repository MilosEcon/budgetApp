export const elements = {
    addBtn: 'add__btn', //id
    type: '.add__type',
    desc: '.add__desc',
    val: '.add__num--val',
    signPlus: '.add__sign--plus',
    signMinus: '.add__sign--minus',
    addType: '.add__type',
    numPlus: '.add__num--plus',
    numMinus: '.add__num--minus',
    currNok: '.add__curr--nok',
    currEu: '.add__curr--eu',
    num: 'add__num', //id
    currWraper: '.add__curr-wraper',
    categoryInc: '.category__list--inc',
    categoryExp: '.category__list--exp',
    budgetResult: 'circle-result__number', //id
    totalIncome: 'total-income', //id
    totalExpense: 'total-expense', //id
    category: '.category',
    circleExpPercent: '.circle-result__circle--exp-track',
    date: '.header__date'
}

export const circleExpTrack = document.querySelector(elements.circleExpPercent); // for init()

const radius = circleExpTrack.r.baseVal.value;
const circumference = 2 * radius * Math.PI;

export const circle = {
    radius, circumference
}