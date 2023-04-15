<script>
import NumberInput from "./NumberInput.svelte";
import TextInput from "./TextInput.svelte";

let form = {
    income: 0,
}

let errors = {
    income: ''
}

let income = 0

const minRows = 10

let expenses = [{
    for: '',
    amount: '0',
    amountValue: 0,
    spent: '0',
    spentValue: 0,
}]

// Initialize Rows
if (expenses.length < minRows) {
    for (let i = 0; i < minRows - expenses.length; i++){
        expenses.push({
            for: '',
            amount: '0',
            amountValue: 0,
            spent: '0',
            spentValue: 0,
        })
    }
}


$: remaining = income - expenses.reduce((total, {amountValue}) => total + amountValue, 0)
$: spent = expenses.reduce((total, {spentValue}) => total + spentValue, 0)

function displayMoney(amount)
{
  const dollars = Math.floor(amount / 100)
  const cents = `${amount % 100}`.padStart(2, '0')
  return `${dollars}.${cents}`
}

function updateIncome(e)
{
    income = e.detail.value
    errors.income = e.detail.error
}

function updateExpense(e, i)
{
    expenses[i].amountValue = e.detail.value
}

function updateSpent(e, i)
{
    expenses[i].spentValue = e.detail.value
}

</script>

<main class="container sm px-4 mx-auto"> 
    <h1 class="font-bold text-2xl mt-5"> Make a Budget </h1>
    <h2 class="font-bold text-xl mt-10 mb-2"> Enter Income </h2>
    <div> 
        <label class="text-lg" for="income"> 
        Income: 
        <NumberInput 
            bind:value={form.income}
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
            {#each expenses as expense, i}
            <tr>
                <td class="border">
                  <TextInput 
                    bind:value={expense.for}
                  />
                </td>
                <td class="border">
                  <NumberInput 
                    bind:value={expense.amount}
                    on:input={(e) => updateExpense(e, i)} 
                  />
                </td>
                <td class="border">
                  <NumberInput
                    bind:value={expense.spent}
                    on:input={(e) => updateSpent(e, i)}
                  />
                </td>
            </tr>
            {/each}
        </tbody>
    </table>
</main>

<style>

</style>
