<script setup>
import { useCounterStore } from '@/stores/counter'
import { useStringStore } from '@/stores/string'
const store = useCounterStore()
const {increment, decrement } = store
const stringStore = useStringStore()
const {updateString} = stringStore
</script>

<template>
  <div>
    <button @click="increment">+</button> 
    Count Value: {{store.count}} 
    <button @click="decrement">-</button>
  </div>

  <br><br>

  <div> 
    <div>{{ stringStore.string }}</div>
    <button @click="updateString('Hey')">Update</button>
  </div>
</template>
