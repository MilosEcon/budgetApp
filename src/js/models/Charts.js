import Chart from 'chart.js';

const colors = {
    income: '#48A9A6',
    expense: '#C1666B'
}

let ctx = document.getElementById('chartIncome').getContext('2d');
const chartIncome = new Chart(ctx, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
        labels: [],
        datasets: [{
            label: 'Incomes',
            backgroundColor: '',
            borderColor: '',
            data: []
        }]
    },

    // Configuration options go here
    options: {
        title: {
            display: true,
            text: 'Income',
            fontSize: 20,
            fontColor: colors.income,
            padding: 30
        },
        legend: {
            display: true,
            position: 'right',
            align: 'start',
            labels: {
                padding: 20,
                fontSize: 16,
                fontColor: colors.income
            }
        }
    }
});

ctx = document.getElementById('chartExpense').getContext('2d');

const chartExpense = new Chart(ctx, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
        labels: [],
        datasets: [{
            label: 'Expenses',
            backgroundColor: '',
            borderColor: '',
            data: []
        }]
    },

    // Configuration options go here
    options: {
        title: {
            display: true,
            text: 'Expense',
            fontSize: 20,
            fontColor: colors.expense,
            padding: 30
        },
        legend: {
            display: true,
            position: 'right',
            align: 'start',
            labels: {
                padding: 20,
                fontSize: 16,
                fontColor: colors.expense
            }

        }
    }
});

const rgbToRgba = function(rgb, alpha=1) {
    return `rgba(${rgb.substring(rgb.indexOf('(')+1, rgb.length-1).split(',').join()}, ${alpha})`;
  }

export const updateCharts = function (type, obj) {

    if (type === 'income') {
        chartIncome.data.labels = obj.items.income.map(element => element.desc);
        chartIncome.data.datasets[0].data = obj.items.income.map(element => element.value);
        chartIncome.data.datasets[0].backgroundColor = obj.items.income.map(element => rgbToRgba(element.color, 0.8));
        chartIncome.data.datasets[0].hoverBackgroundColor = obj.items.income.map(element => element.color);
        chartIncome.update();
    } else {
        chartExpense.data.labels = obj.items.expense.map(element => element.desc);
        chartExpense.data.datasets[0].data = obj.items.expense.map(element => element.value);
        chartExpense.data.datasets[0].backgroundColor = obj.items.expense.map(element => rgbToRgba(element.color, 0.8));
        chartExpense.data.datasets[0].hoverBackgroundColor = obj.items.expense.map(element => element.color);
        chartExpense.update();
    }

}