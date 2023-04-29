<script>
import NumberInput from "./NumberInput.svelte"
import TextInput from "./TextInput.svelte"
import { createBudget } from "./budget.js"
import { createEventDispatcher } from "svelte"

export let budget
export let index

const dispatch = createEventDispatcher()

$: remaining = budget.income - budget.expenses.reduce((total, {amountValue}) => total + amountValue, 0)
$: spent = budget.expenses.reduce((total, {spentValue}) => total + spentValue, 0)

function displayMoney(amount)
{
  const dollars = Math.floor(amount / 100)
  const cents = `${amount % 100}`.padStart(2, '0')
  return `${dollars}.${cents}`
}

function handleMove(e) {
    const { row, col} = e.detail.value
    if (row >= 0 && row < budget.expenses.length &&
        col >= 0 && col < 3) {
        const expenseRow = budget.expenses[row]
        expenseRow.refs[col].focus()
    }
}

function updateIncome(e)
{
    budget.income = e.detail.value
    dispatch('update-budget', {budget: budget, index: index})
}

function updateExpense(e, i)
{
    budget.expenses[i].amountValue = e.detail.value
    dispatch('update-budget', {budget: budget, index: index})
}

function updateSpent(e, i)
{
    budget.expenses[i].spentValue = e.detail.value
    dispatch('update-budget', {budget: budget, index: index})
}
</script>

<main class="container sm px-4 mx-auto"> 
    <h1 class="font-bold text-2xl mt-5"> Make a Budget </h1>
    <h2 class="font-bold text-xl mt-10 mb-2"> Enter Income </h2>
    <div> 
        <label class="text-lg" for="income"> 
        Income: 
        <NumberInput 
            bind:value={budget.form.income}
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
            {#each budget.expenses as expense, i}
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
