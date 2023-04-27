
// Creates new budget
export function createBudget() {
    let budget =  {
        form: {
            income: 0
        },
        income: 0,
        expenses: [],
    }

    const MIN_ROWS = 10

    if (budget.expenses.length < MIN_ROWS) {
        const numRows = MIN_ROWS - budget.expenses.length;
        for (let i = 0; i < numRows; i++){
            budget.expenses.push({
                for: '',
                amount: '0',
                amountValue: 0,
                spent: '0',
                spentValue: 0,
                refs: [null, null, null]
            })
        }
    }
    return budget
}

// Returns data that needs to be saved
export function saveBudget(budget) {
    const saveData = {}
    saveData.form = Object.assign({}, budget.form)
    saveData.income = budget.income
    saveData.expenses = []
    budget.expenses.forEach(expense => {
        saveData.expenses.push({
            for: expense.for,
            amount: expense.amount,
            amountValue: expense.amountValue,
            spent: expense.spent,
            spentValue: expense.spentValue,
            refs: [null, null, null]
        })
    })
    return saveData
}
