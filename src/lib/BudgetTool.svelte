<script>
import NumberInput from "./NumberInput.svelte";
import TextInput from "./TextInput.svelte";

let form = {
    income: 0,
    expense: {
        for: '',
        amount: 0,
        spent: 0
    }
}

let errors = {
    income: ''
}

let income = 0

let expenses = [
    {
     for: "Car note",
     amount: 300.0,
     spent: 150.0
    },
    {
     for: "Gas money",
     amount: 50.0,
     spent: 0,
    }
]

let expenseForRef

$: remaining = income - expenses.reduce((total, {amount}) => total + amount, 0)
$: spent = expenses.reduce((total, {spent}) => total + spent, 0)

function updateIncome(e)
{
    income = e.detail.value
    errors.income = e.detail.error
}

function addExpense()
{
    let expense = { 
        for: form.expense.for,
        amount: form.expense.amount,
        spent: form.expense.spent
    }

    form.expense.for = ''
    form.expense.amount = 0
    form.expense.spent = 0

    expenses.push(expense)
    expenses = expenses

    expenseForRef.focus()
}

</script>

<main class="container sm mx-auto"> 
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
        <p class="text-lg"> Remaining: { remaining } </p>
        <p class="text-lg"> Spent: { spent } </p>
    </div>
    <h2 class="font-bold text-xl mt-10 mb-2"> Expenses </h2>
    <table class="table-auto w-screen">
        <thead class="text-left">
            <tr>
                <th> For </th>
                <th> Amount </th>
                <th> Spent </th>
                <th> &nbsp; </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                  <TextInput 
                    bind:ref={expenseForRef}
                    bind:value={form.expense.for}
                  />
                </td>
                <td>
                  <NumberInput 
                    bind:value={form.expense.amount}
                  />
                </td>
                <td>
                  <NumberInput
                    bind:value={form.expense.spent}
                  />
                </td>
                <td>
                  <button 
                    class="font-bold py-2 px-4 rounded 
                     bg-blue-500 text-white"

                    on:click={addExpense}
                    > 
                    Add 
                  </button>
                </td>
            </tr>
            {#each expenses as expense}
            <tr>
                <td> {expense.for} </td>
                <td> {expense.amount} </td>
                <td> {expense.spent} </td>
            <tr>
            {/each}
        </tbody>
    </table>
</main>

<style>

</style>
