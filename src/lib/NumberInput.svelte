<script>
import TextInput from "./TextInput.svelte";
import { createEventDispatcher } from 'svelte'

const dispatch = createEventDispatcher()

let input

function onInput(e)
{
    const inputVal = e.detail.value.trim()
    const amount = parseFloat(inputVal)
    if (isNaN(amount)) {
        dispatch('input', {
            value: 0,
            error: 'Please enter a number'
        })
    } else {
        dispatch('input', {
            value: amount,
            error: ''
        })
    }
}
</script>

<TextInput 
  bind:value="{input}"
  on:input={onInput}
/>

