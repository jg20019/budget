<script>
import NumberInput from "./NumberInput.svelte"
import TextInput from "./TextInput.svelte"
import { createEventDispatcher } from "svelte"
import { calcSpent } from "./budget.js"

export let budget
export let index

const dispatch = createEventDispatcher()

$: remaining = budget.income - budget.expenses.reduce((total, {amountValue}) => total + amountValue, 0)
$: spent = calcSpent(budget)

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

function updateDate(e) 
{
    budget.form.date = e.detail.value
    dispatch('update-budget', {budget, index})
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

<main> 
    <h2 class="font-bold text-xl mt-10 mb-2"> Income </h2>
    <div> 
        <label class="block text-lg" for="date">
        Date: 
        <TextInput 
          bind:value={budget.form.date}
          on:input={updateDate}
        />
        </label>
        <label class="block text-lg mt-2" for="income"> 
        Income: 
        <NumberInput 
            bind:value={budget.form.income}
            on:input={updateIncome} 
        />
        </label>
        <p class="text-lg mt-2"> Remaining: { displayMoney(remaining) } </p>
        <p class="text-lg mt-2"> Spent: { displayMoney(spent) } </p>
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
