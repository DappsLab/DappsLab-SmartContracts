const fs = require('fs');
const DVC = fs.readFileSync("./build/DVC.json").toString().trim();
console.log(DVC);