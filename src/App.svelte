<script>
import BudgetTool from "./lib/BudgetTool.svelte";
import { createBudget, saveBudget } from "./lib/budget";

let [budgets, index] = load()

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
        return [[createBudget()], 0]
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

<main>
    <BudgetTool 
        budget={budgets[index]} 
        index={index} 
        on:update-budget={updateBudget}/>
</main>

<style>
</style>
