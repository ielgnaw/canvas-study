/**
 * @file game1 入口
 * @author ielgnaw(wuji0223@gmail.com)
 */

define(function (require) {

    var util = require('common/util');
    var Frame = require('common/Frame');
    var Circle = require('common/shape/Circle');
    var Ship = require('common/shape/Ship');

    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var cWidth = canvas.width;
    var cHeight = canvas.height;

    var frame = new Frame(canvas);

    function init() {

        var endPoint = {
            x: cWidth / 2,
            y: cHeight / 2
        };

        var enemys = require('./enemy').create(canvas, 1, 1, 1)

        for (var i = 0, len = enemys.length; i < len; i++) {
            var enemy = enemys[i];

            var circle = new Circle({
                ctx: ctx,
                x: enemy.x,
                y: enemy.y,
                radius: 10,
                frame: frame,
                endPoint: endPoint
            });

            var distance = util.getDistance(
                enemy.x,
                enemy.y,
                endPoint.x,
                endPoint.y
            );

            circle.sx = (endPoint.x - enemy.x) / distance * 2;
            circle.sy = (endPoint.y - enemy.y) / distance * 2;

            frame.addSprite('circle' + i, circle);
        }

        var arrow = new Ship({
            ctx: ctx,
            frame: frame,
            x: cWidth / 2,
            y: cHeight / 2,
            angle: 270
        });

        frame.addSprite('arrow', arrow);

        // arrow.draw(ctx);

        frame.start();
        setTimeout(function () {
            frame.stop();
        }, 5000)
        console.warn(frame);
        console.log(util);
    }

    return {
        init: init
    }

});
