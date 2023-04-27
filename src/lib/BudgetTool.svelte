<script>
import NumberInput from "./NumberInput.svelte";
import TextInput from "./TextInput.svelte";

let model = load()

function newModel(){
    let newModel =  {
        form: {
            income: 0
        },
        income: 0,
        expenses: [],
    }

    const MIN_ROWS = 10

   if (newModel.expenses.length < MIN_ROWS) {
       const numRows = MIN_ROWS - newModel.expenses.length;
       for (let i = 0; i < numRows; i++){
           newModel.expenses.push({
               for: '',
               amount: '0',
               amountValue: 0,
               spent: '0',
               spentValue: 0,
               refs: [null, null, null]
           })
       }
   }
   return newModel
}

$: {
    save(model)
}

$: remaining = model.income - model.expenses.reduce((total, {amountValue}) => total + amountValue, 0)
$: spent = model.expenses.reduce((total, {spentValue}) => total + spentValue, 0)

function displayMoney(amount)
{
  const dollars = Math.floor(amount / 100)
  const cents = `${amount % 100}`.padStart(2, '0')
  return `${dollars}.${cents}`
}

function handleMove(e) {
    const { row, col} = e.detail.value
    if (row >= 0 && row < model.expenses.length &&
        col >= 0 && col < 3) {
        const expenseRow = model.expenses[row]
        expenseRow.refs[col].focus()
    }
}

function updateIncome(e)
{
    model.income = e.detail.value
}

function updateExpense(e, i)
{
    model.expenses[i].amountValue = e.detail.value
}

function updateSpent(e, i)
{
    model.expenses[i].spentValue = e.detail.value
}

function load(){
    const savedModel = localStorage.getItem('model')
    if (savedModel) {
        return JSON.parse(savedModel)
    } else {
        return newModel()
    }
}

function save(model){
    const savedModel = {}
    savedModel.form = Object.assign({}, model.form)
    savedModel.income = model.income
    savedModel.expenses = []
    model.expenses.forEach(expense => {
        savedModel.expenses.push({
            for: expense.for,
            amount: expense.amount,
            amountValue: expense.amountValue,
            spent: expense.spent,
            spentValue: expense.spentValue,
            refs: [null, null, null]
        })
    })
    localStorage.setItem('model', JSON.stringify(savedModel))
}
</script>

<main class="container sm px-4 mx-auto"> 
    <h1 class="font-bold text-2xl mt-5"> Make a Budget </h1>
    <h2 class="font-bold text-xl mt-10 mb-2"> Enter Income </h2>
    <div> 
        <label class="text-lg" for="income"> 
        Income: 
        <NumberInput 
            bind:value={model.form.income}
            on:input={updateIncome} 
        />
        </label>
        <p class="text-lg"> Remaining: { displayMoney(remaining) } </p>
        <p class="text-lg"> Spent: { displayMoney(spent) } </p>
    </div>
    <h2 class="font-bold text-xl mt-10 mb-2"> Expenses </h2>
    <table class="table-auto border-collapse border">
        <thead class="text-left">
            <tr>
                <th class="border"> For </th>
                <th class="border"> Amount </th>
                <th class="border"> Spent </th>
            </tr>
        </thead>
        <tbody>
            {#each model.expenses as expense, i}
            <tr>
                <td class="border">
                  <TextInput 
                    row={i}
                    col={0}
                    bind:ref={expense.refs[0]}
                    bind:value={expense.for}
                    on:move={handleMove}
                  />
                </td>
                <td class="border">
                  <NumberInput 
                    row={i}
                    col={1}
                    bind:ref={expense.refs[1]}
                    bind:value={expense.amount}
                    on:input={(e) => updateExpense(e, i)} 
                    on:move={handleMove}
                  />
                </td>
                <td class="border">
                  <NumberInput
                    row={i}
                    col={2}
                    bind:ref={expense.refs[2]}
                    bind:value={expense.spent}
                    on:input={(e) => updateSpent(e, i)}
                    on:move={handleMove}
                  />
                </td>
            </tr>
            {/each}
        </tbody>
    </table>
</main>
