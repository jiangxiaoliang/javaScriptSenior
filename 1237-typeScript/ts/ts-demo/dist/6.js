"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
        // this.name = name
        this.age = 1;
    }
    Person.prototype.getName = function () {
        return this.name;
    };
    Person.prototype.a = function () {
        return 1;
    };
    Person.prototype.b = function () {
        return 'b';
    };
    return Person;
}());
var p1 = new Person('name');
p1.name;
// p1.age
p1.getName();
p1.a();
p1.b();
exports.default = {};
