"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _4_1 = require("./4");
var input = document.querySelector('input');
// m4.add('2', 4)
// m4.add(2, 4)
if (input) {
    _4_1.default.add(Number(input.value), 4);
}
