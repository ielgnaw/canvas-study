/**
 * @file Description
 * @author ielgnaw(wuji0223@gmail.com)
 */

define(function (require) {

    var util = require('common/util');

    var booms = [];

    function Boom(x, y) {
        this.x = x;
        this.y = y;
        this.coordinates = [];
        this.coordinateCount = 5;
        for (var i = 0; i < this.coordinateCount; i++) {
            this.coordinates.push([this.x, this.y]);
        }

        // 随机角度
        this.angle = util.randomFloat(0, Math.PI * 2);

        // 随机速度
        this.speed = util.randomFloat(1, 10);

        // 摩擦力
        this.friction = 0.95;

        // 重力
        this.gravity = 1;

        var hue = util.randomFloat(0, 360);

        // 色相设为整体色调变量的随机数+ -50
        this.hue = util.randomFloat(hue - 50, hue + 50);
        this.brightness = util.randomFloat(50, 80);
        this.alpha = 1;

        // 消失时间
        this.decay = util.randomFloat(0.015, 0.03);
    }

    Boom.prototype.update = function (index) {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);
        this.speed *= this.friction;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.alpha -= this.decay;
        if(this.alpha <= this.decay) {
            booms.splice(index, 1);
        }
        if (booms.length === 0) {
            exports.fire('explodeEnd');
        }
    };

    Boom.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
        // ctx.strokeStyle = '#000';
        ctx.stroke();
    };


    var exports = {
        createBooms: function (x, y) {
            var boomCount = 30;
            while (boomCount--) {
                booms.push(new Boom(x, y));
            }
        },

        getBooms: function () {
            return booms;
        }
    };

    require('common/observer').enable(exports);

    return exports;

});
