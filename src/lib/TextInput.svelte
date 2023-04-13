<script>
    import { createEventDispatcher } from 'svelte'

    export let value = ''
    const dispatch = createEventDispatcher()

    function onInput()
    {
        dispatch('input', { value })
    }
</script>

<input class="bg-gray-200 pl-2 appearance-none border-2 
    border-gray-200 rounded" 
    type="text" 
    on:input={onInput} 
    min=0 
    bind:value="{value}" 
/>
