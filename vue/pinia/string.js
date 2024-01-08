import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStringStore = defineStore('string', () => {
  // Define the string state
  const string = ref('Hi');

  // Define an update function to modify the string
  function updateString(newString) {
    string.value = newString;
  }

  // Return the state and update function
  return {
    string,
    updateString,
  };
});
