"use strict";
var Day = (function () {
    function Day() {
        this.requiredWorkMinutes = 0;
        this.minutes = 0;
        this.extraMinutes = 0;
        this.tasks = [];
    }
    Day.prototype.getDate = function () { return this.year + '-' + this.month + '-' + this.day; };
    return Day;
}());
exports.Day = Day;
//# sourceMappingURL=day.js.map