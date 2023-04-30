<script>
import { createEventDispatcher } from "svelte";

export let budgets

const dispatch = createEventDispatcher()

function selectBudget(index) {
    dispatch('select-budget', { index })
}

</script>

<div>
    <table class="table-auto border-collapse border w-9/12">
        <thead class="text-left">
            <tr>
                <th class="border p-2"> For </th>
                <th class="border p-2"> Earned </th>
                <th class="border p-2">  Spent </th>
                <th class="border p-2"> &nbsp; </th>
            </tr>
        </thead>
        <tbody>
            {#each budgets as budget, i}
            <tr>
                <td class="border p-2">
                  {budget.form.date}
                </td>
                <td class="border p-2">
                  {budget.income}
                </td>
                <td class="border p-2">
                  0.00
                </td>
                <td class="border p-2">
                  <button 
                    on:click={() => selectBudget(i)} 
                    class="mt-2 mx-auto p-2 w-48 rounded inline-block 
                           text-lg bg-green-500 hover:text-white 
                           hover:bg-green-800"
                  > 
                    Edit 
                  </button>
                </td>
            </tr>
            {/each}
        </tbody>
    </table>
</div>
