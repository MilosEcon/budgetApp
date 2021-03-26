import { elements, circleExpTrack, circle } from './views/base';
import { getItems, addList, clearInput, displayBudget, deleteItemUI, displayPercentage, displayDate } from './views/searchView';
import { data, generateItem, calculateBudget, getBudget, dataDeleteItems, calcPercentage, getPercentage } from './models/Search';
import {updateCharts} from './models/Charts'

const exchangeRate = 10.5;

const updateBudget = type => {
    // 1. calculate budget
    calculateBudget(type);

    // 2. return the budget
    const budgetData = getBudget();

    // 3. display budget
    displayBudget(budgetData.budget, budgetData.totalInc, budgetData.totalExp);
}

const updatePercentage = () => {
    // 1. calculete percentage
    calcPercentage();

    // 2. return percentage
    const percentage = getPercentage();

    // 3. display percentage on UI
    displayPercentage(percentage);
}

const addItem = () => {
    // 1. get input field values 
    const input = getItems();

    if (input.desc !== '' && !isNaN(input.val) && input.val > 0 && input.val < 1000000) {
        // 2. Add data to search module
        let newItem;
        if (input.curr === 'nok') {
            newItem = generateItem(input.type, input.desc, input.val);
        } else {
            newItem = generateItem(input.type, input.desc, (input.val * exchangeRate));
        }
        
        // 3. Add data to UI
        addList(newItem, input.type);

        // 4. Clear input fields and set focus on description
        clearInput();

        // 5. calculate and update budget
        updateBudget(input.type);

        // 6. calculate and update percentages
        updatePercentage();

        // 7. update charts
        updateCharts(input.type, data);
    }
}

const deleteItem = e => {
    // get id of the list
    let type, id;
    let listID = e.target.parentNode.parentNode.id;
    console.log(listID);
    if (listID) {
        const listIDArr = listID.split('-');
        [type, id] = listIDArr;
        
        // 1. delete element from data base
        dataDeleteItems(type, id);
        
        // 2. delete element from UI
        deleteItemUI(listID);
        
        // 3. update budget
        updateBudget(type);
        
        // 4. calculate and update percentages
        updatePercentage();
        
        // 5. update charts
        updateCharts(type, data);
    }

}

const removeActivClassForSign = () => {
    const sign = document.querySelectorAll(`${elements.signPlus}, ${elements.signMinus}`)
    const signArr = Array.from(sign);
    signArr.forEach(el => {
        el.classList.remove('active--press', 'active--expense');
    })
}

const removeExpenseClass = arr => {
    arr.forEach(el => {
        el.classList.remove('active--expense');
    })
}

const addExpenseClass = arr => {
    arr.forEach(el => {
        el.classList.add('active--expense');
    })
}

const selectType = e => {
    const all = document.querySelectorAll(`${elements.signPlus}, ${elements.desc}, ${elements.numPlus}, #${elements.num}, ${elements.numMinus}, ${elements.currNok}, ${elements.currEu}, #${elements.addBtn}`);
    const allArr = Array.from(all);
    const plus = document.querySelector(elements.signPlus);
    const minus = document.querySelector(elements.signMinus);

    removeActivClassForSign();
    removeExpenseClass(allArr);
    
    if (e.target === plus) {
        plus.classList.add('active--press');
        document.querySelector(elements.addType).dataset.type = 'income';

    } else if (e.target === minus) {
        minus.classList.add('active--press', 'active--expense');
        addExpenseClass(allArr);
        document.querySelector(elements.addType).dataset.type = 'expense';
    }
}

const changeNum = e => {
    const num = document.getElementById(elements.num);
    num.value = e.target.classList.value.includes('add__num--plus') ? (parseFloat(num.value) + 1) : (parseFloat(num.value) - 1);
}

const selectCurr = e => {
    const nok = document.querySelector(elements.currNok);
    const eu = document.querySelector(elements.currEu);
    nok.classList.remove('active--press');
    eu.classList.remove('active--press');
    if (e.target === nok) {
        nok.classList.add('active--press');
        document.querySelector(elements.currWraper).dataset.curr = 'nok';
    } else if (e.target === eu) {
        eu.classList.add('active--press');
        document.querySelector(elements.currWraper).dataset.curr = 'eu'
    }
}

// event listeners
const setEventListeners = () => {
    document.getElementById(elements.addBtn).addEventListener('click', addItem);
    document.addEventListener('keypress', (e) => {
        if (e.keyCode === 13) {
            addItem();
        }
    })
    document.querySelector(elements.signPlus).addEventListener('click', selectType);
    document.querySelector(elements.signMinus).addEventListener('click', selectType);
    document.querySelector(elements.numPlus).addEventListener('click', changeNum);
    document.querySelector(elements.numMinus).addEventListener('click', changeNum);
    document.querySelector(elements.currNok).addEventListener('click', selectCurr);
    document.querySelector(elements.currEu).addEventListener('click', selectCurr);
    document.querySelector(elements.category).addEventListener('click', deleteItem)
}

const init = () => {
    setEventListeners();
    document.querySelector(elements.date).innerText = displayDate();
    displayBudget(0, 0, 0);   
    circleExpTrack.style.strokeDasharray = circle.circumference;
    circleExpTrack.style.strokeDashoffset = circle.circumference;
}

init();