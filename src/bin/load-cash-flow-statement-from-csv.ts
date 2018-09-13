const moment = require("moment");

var test1 = moment("20180630", "YYYYMM");
console.log(test1.year());
console.log(test1.month() + 1)