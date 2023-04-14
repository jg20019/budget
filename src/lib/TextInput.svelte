<script>
    import { createEventDispatcher } from 'svelte'

    export let value = ''
    export let ref

    const dispatch = createEventDispatcher()

    function onInput(e)
    {
        dispatch('input', { value: e.target.value})
    }
</script>

<input 
    class="bg-gray-200 pl-2 appearance-none border-2 
           border-gray-200 rounded" 
    type="text" 
    on:input={onInput} 
    bind:value="{value}" 
/>
