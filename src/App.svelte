<script>
import BudgetTool from "./lib/BudgetTool.svelte";
import { createBudget, saveBudget } from "./lib/budget";

let [budgets, index] = load()

$: selectedBudget = (budgets.length > 0 && index > -1) ? budgets[index] : null

function addBudget() {
    let budget = createBudget()
    budgets.push(budget)
    budgets = budgets
    index++
}

function updateBudget(event) {
    const index = event.detail.index
    const budget = event.detail.budget
    budgets[index] = budget
    budgets = budgets
}

function load(){
    const model = localStorage.getItem('model')
    if (model) {
        const parsedModel = JSON.parse(model)
        return [parsedModel.budgets, parsedModel.index]
    } else {
        return [[], -1]
    }
}

function save(budgets){
    localStorage.setItem('model', JSON.stringify({
        budgets: budgets.map(saveBudget),
        index
    }))
}

$: {
    save(budgets)
}
</script>

<main class="container mx-auto w-9/12 flex flex-col h-screen">
    <header class="mt-2 mb-4">
        <h1 class="font-bold text-3xl"> Budget </h1>
    </header>
    {#if selectedBudget}
        <BudgetTool 
            budget={selectedBudget} 
            index={index} 
            on:update-budget={updateBudget}/>
    {:else}
        <div class="flex flex-col place-content-center h-full">
            <p class="text-lg text-center"> You haven't created any budgets </p>
            <button 
                on:click={addBudget}
                class="mt-2 mx-auto p-2 w-48 rounded inline-block 
                       text-lg 
                       bg-green-500 hover:text-white hover:bg-green-800"
            > 
                Create Budget
            </button>
        </div>
    {/if}
</main>

<style>
</style>
