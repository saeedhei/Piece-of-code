<script setup>
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/stores/counter'
import { useStringStore } from '@/stores/string'
const store = useCounterStore()
const {increment, decrement } = store
const stringStore = useStringStore()
const {updateString} = stringStore
const {string} = storeToRefs(stringStore) // to keep reactivity
</script>

<template>
  <div>
    <button @click="increment">+</button> 
    Count Value: {{store.count}} 
    <button @click="decrement">-</button>
  </div>

  <br><br>

  <div> 
    <div>{{ string }}</div>
    <button @click="updateString('Hey')">Update</button>
  </div>
</template>
