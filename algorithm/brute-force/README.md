I'll provide an example in JavaScript using a brute force approach to find a pair with a given sum in an array:

```javascript
function findPairWithSumBruteForce(arr, target) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) {
                // Found a pair
                return [arr[i], arr[j]];
            }
        }
    }

    // If no such pair is found
    return null;
}

// Example usage:
const array = [3, 7, 1, 2, 8, 4, 5];
const targetSum = 10;

// Measure time complexity
const startTime = Date.now();
const result = findPairWithSumBruteForce(array, targetSum);
const endTime = Date.now();
const executionTime = endTime - startTime;

// Measure space complexity
// The space complexity of this algorithm is O(1) since it uses a constant amount of extra space.

if (result) {
    console.log(`Pair with sum ${targetSum}: [${result.join(', ')}]`);
} else {
    console.log("No such pair found.");
}

console.log(`Time complexity: O(n^2)`);
console.log(`Space complexity: O(1)`);
console.log(`Execution time: ${executionTime} milliseconds`);
```

In this example, the `findPairWithSumBruteForce` function uses nested loops to check all possible pairs in the array. The time complexity is O(n^2) because, in the worst case, it needs to iterate through all pairs. The space complexity is O(1) because it uses a constant amount of extra space. However, this approach is less efficient than the two-pointer or hash table methods, especially for large input sizes.
