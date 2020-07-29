let arr = [
    { name:"string 1", value:"this", other: "that" },
    { name:"string 2", value:"this", other: "that" }
];

let obj = arr.find((o, i) => {
    if (o.name === 'string 1') {
        arr[i] = { name: 'new string', value: 'this', other: 'that' };
        return true; // stop searching
    }
});
