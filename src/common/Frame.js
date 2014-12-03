/**
 * @file 帧对象，将需要在这一帧上显示的图形画在 canvas 上
 * 每隔一段时间重画自己一次，每到一定时间清除 canvas ，然后调用当前帧里所有
 * 动画元素的 draw 方法
 * @author ielgnaw(wuji0223@gmail.com)
 */

define(function (require) {

    var util = require('common/util');

    function Frame(canvas) {
        this.sprites = {};
        this.canvas = canvas;
        this.cWidth = canvas.width;
        this.cHeight = canvas.height;
        this.ctx = canvas.getContext('2d');
    }

    Frame.prototype.start = function () {
        var me = this;
        me.render();
    };

    Frame.prototype.render = function () {
        var me = this;

        me.interval = window.requestAnimationFrame(
            (function (context) {
                return function () {
                    context.render();
                }
            })(me)
        );

        me.ctx.clearRect(0, 0, me.cWidth, me.cHeight);

        // // 创建追踪效果
        // // 设定 globalCompositeOperation 为 destination-out 可以在特定的不透明度来清除 canvas ，而不是完全擦拭
        // me.ctx.globalCompositeOperation = 'destination-out';
        // // 降低 alpha 属性可以创建更好的路径效果
        // me.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        // me.ctx.fillRect( 0, 0, me.cWidth, me.cHeight);
        // // lighter creates bright highlight points as the fireworks and particles overlap each other
        // me.ctx.globalCompositeOperation = 'lighter';

        for (var i in me.sprites) {
            var sprite = me.sprites[i];
            if (sprite) {
                sprite.draw();
                sprite.update();

                var angle = sprite.angle;
                if (angle) {
                    me.ctx.strokeStyle = '#000';
                    me.ctx.beginPath();
                    me.ctx.moveTo(sprite.x, sprite.y); // 起点

                    if (angle > 0 && angle < 90) {
                        me.ctx.lineTo(
                            sprite.x + util.getTanByAngle(90 - angle) * (me.cHeight - sprite.y),
                            me.cHeight
                        );
                    }
                    else if (angle > 90 && angle < 180) {
                        me.ctx.lineTo(
                            sprite.x - (me.cHeight - sprite.y) / util.getTanByAngle(180 - angle),
                            me.cHeight
                        );
                    }
                    else if (angle > 180 && angle < 270) {
                        me.ctx.lineTo(
                            sprite.x - (util.getTanByAngle(270 - angle) * sprite.y),
                            0
                        );
                    }
                    else if (angle > 270 && angle < 360) {
                        me.ctx.lineTo(
                            (sprite.x + (util.getTanByAngle(angle - 270) * sprite.y)),
                            0
                        );
                    }
                    else if (angle === 0 || angle === 360) {
                        me.ctx.lineTo(
                            me.cWidth,
                            sprite.y
                        );
                    }
                    else if (angle === 90) {
                        me.ctx.lineTo(
                            sprite.x,
                            me.cHeight
                        );
                    }
                    else if (angle === 180) {
                        me.ctx.lineTo(
                            0,
                            sprite.y
                        );
                    }
                    else if (angle === 270) {
                        me.ctx.lineTo(
                            sprite.x,
                            0
                        );
                    }
                    me.ctx.stroke();
                }
                // me.ctx.strokeStyle = '#000';
                // me.ctx.beginPath();
                // me.ctx.moveTo(400, 250); // 起点
                // me.ctx.lineTo(sprite.x, sprite.y); // 终点
                // me.ctx.stroke();

            }
        }

        var booms = require('common/shape/Boom').getBooms();
        var i = booms.length;
        while (i--) {
            booms[i].draw(me.ctx);
            booms[i].update(i);
        }

    }

    Frame.prototype.addSprite = function (name, sprite) {
        this.sprites[name] = sprite;
    };

    Frame.prototype.removeSprite = function (name) {
        delete this.sprites[name];
    };

    Frame.prototype.removeAllSprite = function (name) {
        this.sprites = {};
    };

    Frame.prototype.stop = function () {
        var me = this;
        window.cancelAnimationFrame(me.interval);
    };

    return Frame;

});
