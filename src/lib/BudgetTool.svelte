<script>

let form = {
    income: '',
}

let errors = {
    income: ''
}

let income = 0
let expenses = []

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

<main>
    <div class="flex items-center"> 
        <label for="income"> 
            Income: <input on:input={updateIncome} min=0 bind:value="{form.income}" />
        </label>
        <p> Remaining: { remaining } </p>
        <p> Spent: { remaining } </p>
    </div>
</main>

<style>

</style>
