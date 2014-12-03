/**
 * @file Description
 * @author ielgnaw(wuji0223@gmail.com)
 */

define(function (require) {

    var boom = require('common/shape/Boom');

    function Circle(opts) {
        this.ctx = opts.ctx;
        this.frame = opts.frame;
        this.x = opts.x;
        this.y = opts.y;
        this.radius = opts.radius;
        this.endPoint = opts.endPoint || {};
        this.config = {
            fillStyle: opts.fillStyle || '#666',
            lineWidth: opts.lineWidth || 1
        };
        this.type = opts.type || '';
    }

    Circle.prototype.update = function () {
        var me = this;
        me.x += me.sx;
        me.y += me.sy;

        if (Math.abs((Math.round(me.x) - me.endPoint.x)) <= 1
            && Math.abs((Math.round(me.y) - me.endPoint.y)) <= 1
        ) {
            boom.createBooms(me.endPoint.x, me.endPoint.y);
        }
    }

    Circle.prototype.draw = function () {
        var me = this;
        me.ctx.beginPath();
        me.ctx.lineWidth = me.config.lineWidth;
        me.ctx.fillStyle = me.config.fillStyle;
        me.ctx.arc(me.x, me.y, me.radius, 0, Math.PI * 2, true);
        me.ctx.fill();
    };

    return Circle;

});
