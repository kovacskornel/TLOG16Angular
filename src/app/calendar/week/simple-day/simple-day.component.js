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
var day_1 = require(".././day");
var week_service_1 = require(".././week.service");
var SimpleDayComponent = (function () {
    function SimpleDayComponent(weekService) {
        this.weekService = weekService;
    }
    SimpleDayComponent.prototype.makeWorkday = function () {
        this.day.type = "work";
        this.day.requiredWorkMinutes = 400;
        this.day.minutes = Math.floor(Math.random() * 600);
        this.day.extraMinutes = this.day.minutes - this.day.requiredWorkMinutes;
        this.weekService.update();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', day_1.Day)
    ], SimpleDayComponent.prototype, "day", void 0);
    SimpleDayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'simple-day',
            templateUrl: 'simple-day.component.html',
            styleUrls: ['../../../styles.css']
        }), 
        __metadata('design:paramtypes', [week_service_1.WeekService])
    ], SimpleDayComponent);
    return SimpleDayComponent;
}());
exports.SimpleDayComponent = SimpleDayComponent;
//# sourceMappingURL=simple-day.component.js.map