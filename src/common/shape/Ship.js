/**
 * @file Description
 * @author ielgnaw(wuji0223@gmail.com)
 */

define(function (require) {

    function Ship(opts) {
        this.ctx = opts.ctx;
        this.frame = opts.frame;
        this.x = opts.x || 0;
        this.y = opts.y || 0;
        this.width = opts.width || 25;
        this.height = opts.height || 20;
        this.angle = opts.angle || 0;
        this.showFlame = false;
    }

    Ship.prototype.update = function () {

    };

    Ship.prototype.draw = function () {
        var me = this;
        var ctx = me.ctx;
        ctx.save();
        ctx.translate(me.x, me.y);

        // 弧度=角度*Math.PI/180
        ctx.rotate(me.angle * Math.PI / 180);

        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000";
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(-10, 10);
        ctx.lineTo(-5, 0);
        ctx.lineTo(-10, -10);
        ctx.lineTo(10, 0);
        ctx.stroke();

        if (me.showFlame) {
            ctx.beginPath();
            ctx.moveTo(-7.5, -5);
            ctx.lineTo(-15, 0);
            ctx.lineTo(-7.5, 5);
            ctx.stroke();
        }
        ctx.restore();
    };

    return Ship;

});
