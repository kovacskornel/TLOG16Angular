"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var WeekService = (function () {
    function WeekService() {
        this.weeks = [];
    }
    WeekService.prototype.update = function () {
        this.reqWorkMinutes = 0;
        this.minutes = 0;
        this.extraMinutes = 0;
        this.workdays = 0;
        for (var _i = 0, _a = this.weeks; _i < _a.length; _i++) {
            var w = _a[_i];
            for (var _b = 0, _c = w.days; _b < _c.length; _b++) {
                var d = _c[_b];
                this.reqWorkMinutes += d.requiredWorkMinutes;
                this.minutes += d.minutes;
                this.extraMinutes += d.extraMinutes;
                if (d.type == 'work')
                    this.workdays++;
            }
        }
    };
    WeekService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], WeekService);
    return WeekService;
}());
exports.WeekService = WeekService;
//# sourceMappingURL=week.service.js.map