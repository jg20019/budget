<script>
import TextInput from "./TextInput.svelte";
import { createEventDispatcher } from 'svelte'

const dispatch = createEventDispatcher()

export let value
export let ref = null
export let row = 0
export let col = 0

function onInput(e)
{
    let inputVal = e.detail.value.trim()
    if (/^\d+(?:\.\d{2})?$/.test(inputVal)) {
        inputVal = inputVal.replace(/[^0-9.]/g, '')
        dispatch('input', {
            value: Math.round(parseFloat(inputVal) * 100),
            error: ''
        })
    } else {
        dispatch('input', {
        value: 0,
        error: ''
        })
    }
}

</script>

<TextInput 
  row={row}
  col={col}
  bind:ref={ref}
  bind:value="{value}"
  on:input={onInput}
  on:move
/>

