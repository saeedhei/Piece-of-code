I'll provide an example in JavaScript using a hash table for finding a pair with a given sum. This approach is useful when the array is not sorted, and you want to find a pair with a specific sum.

```javascript
function findPairWithSumUsingHashTable(arr, target) {
    const numToIndexMap = {}; // Hash table to store numbers and their indices

    for (let i = 0; i < arr.length; i++) {
        const complement = target - arr[i];

        if (numToIndexMap.hasOwnProperty(complement)) {
            // Found a pair
            return [complement, arr[i]];
        }

        // Store the current number and its index in the hash table
        numToIndexMap[arr[i]] = i;
    }

    // If no such pair is found
    return null;
}

// Example usage:
const unsortedArray = [4, 2, 8, 3, 6, 1, 7];
const targetSum = 10;

// Measure time complexity
const startTime = Date.now();
const result = findPairWithSumUsingHashTable(unsortedArray, targetSum);
const endTime = Date.now();
const executionTime = endTime - startTime;

// Measure space complexity
// The space complexity of this algorithm is O(n) since, in the worst case, all elements may need to be stored in the hash table.

if (result) {
    console.log(`Pair with sum ${targetSum}: [${result.join(', ')}]`);
} else {
    console.log("No such pair found.");
}

console.log(`Time complexity: O(n)`);
console.log(`Space complexity: O(n)`);
console.log(`Execution time: ${executionTime} milliseconds`);
```

In this example, the `findPairWithSumUsingHashTable` function uses a hash table (`numToIndexMap`) to store the numbers and their indices as it iterates through the array. It calculates the complement needed to achieve the target sum and checks if that complement is already in the hash table. If found, it returns the pair. The time complexity is O(n) since, in the worst case, it iterates through the array once, and the space complexity is O(n) because all elements may need to be stored in the hash table.
