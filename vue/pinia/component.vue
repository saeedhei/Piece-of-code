<script setup>
import { useCounterStore } from '@/stores/counter'
import { useStringStore } from '@/stores/string'
const store = useCounterStore()
const {increment, decrement } = store
const stringStore = useStringStore()

function updateString(){
  stringStore.string = 'Updated string'; // Update the string value
  stringStore.updateString(stringStore.string); // Update the store value
  stringStore.updateString("Cool");
}
</script>

<template>
  <div>
    <button @click="increment">+</button> 
    Count Value: {{store.count}} 
    <button @click="decrement">-</button>
  </div>

  <br><br>
  <div>{{ stringStore.string }}</div>
  <button @click="updateString">Update</button>

</template>
