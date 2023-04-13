<script>

let form = {
    income: '',
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

$: remaining = income - expenses.reduce((total, {amount}) => total + amount, 0)
$: spent = income - expenses.reduce((total, {spent}) => total + spent, 0)

function updateIncome(e)
{
    const inputVal = e.target.value.trim()
    const amount = parseFloat(inputVal)
    if (isNaN(amount)) {
        income = 0
        errors.income = 'Please enter a number'
    } else {
        income = amount
        errors.income = ''
    }
}
</script>

<main class="container lg mx-auto"> 
    <h1 class="font-bold text-2xl mt-5"> Make a Budget </h1>
    <h2 class="font-bold text-xl mt-10 mb-2"> Enter Income </h2>
    <div> 
        <label class="text-lg" for="income"> 
        Income: 
        <input class="bg-gray-200 pl-2 appearance-none border-2 
        border-gray-200 rounded" 
        type="text" 
        on:input={updateIncome} 
        min=0 
        bind:value="{form.income}" 
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
            </tr>
        </thead>
        <tbody>
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
