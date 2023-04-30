<script>
    import { createEventDispatcher } from 'svelte'

    export let value = ''
    export let row = 0
    export let col = 0
    export let ref = null

    const dispatch = createEventDispatcher()

    function onInput(e)
    {
        dispatch('input', { value: e.target.value})
    }

    function handleKeyDown(e)
    {
        if (e.key == "ArrowLeft") {
            dispatch('move', { value: { row: row, col: col - 1}})
        } else if (e.key == "ArrowRight") {
            dispatch('move', { value: { row: row, col: col + 1}})
        } else if (e.key == "ArrowUp") {
            dispatch('move', { value: { row: row - 1, col: col}})
        } else if (e.key == "ArrowDown") {
            dispatch('move', { value: { row: row + 1, col: col}})
        }
    }
</script>

<input 
    class="bg-gray-200 pl-2 appearance-none border-2 
           border-gray-200 rounded" 
    type="text" 
    bind:this={ref}
    on:input={onInput} 
    on:keydown={handleKeyDown}
    bind:value="{value}" 
/>
