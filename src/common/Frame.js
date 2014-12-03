/**
 * @file 帧对象，将需要在这一帧上显示的图形画在 canvas 上
 * 每隔一段时间重画自己一次，每到一定时间清除 canvas ，然后调用当前帧里所有
 * 动画元素的 draw 方法
 * @author ielgnaw(wuji0223@gmail.com)
 */

define(function (require) {

    var util = require('common/util');
    var boom = require('common/shape/Boom');

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

        // me.ctx.clearRect(0, 0, me.cWidth, me.cHeight);

        // 创建追踪效果
        // 设定 globalCompositeOperation 为 destination-out 可以在特定的不透明度来清除 canvas ，而不是完全擦拭
        me.ctx.globalCompositeOperation = 'destination-out';
        // 降低 alpha 属性可以创建更好的路径效果
        me.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        me.ctx.fillRect(0, 0, me.cWidth, me.cHeight);
        me.ctx.globalCompositeOperation = 'destination-over';

        var booms = boom.getBooms();
        var i = booms.length;
        while (i--) {
            if (me.stopFlag) {
                me.removeAllSprite();
            }
            booms[i].draw(me.ctx);
            booms[i].update(i);
        }

        for (var i in me.sprites) {
            var sprite = me.sprites[i];
            if (sprite) {
                sprite.draw();
                sprite.update();

                if (sprite.x < 0 || sprite.x > me.cWidth
                    || sprite.y < 0 || sprite.y > me.cHeight
                ) {
                    me.removeSprite(i);
                }

                if (sprite.type === 'enemy') {
                    if (Math.abs(sprite.x - sprite.endPoint.x) < sprite.radius
                        && Math.abs(sprite.y - sprite.endPoint.y) < sprite.radius
                    ) {
                        me.stopFlag = true;
                        break;
                    }
                }

                if (sprite.type === 'bullet') {
                    hitEnemy(me, sprite, i);
                }
            }
        }

        if (me.stopFlag) {
            boom.on(
                'explodeEnd',
                function () {
                    me.stop();
                    me.ctx.font = '30pt Arial';
                    me.ctx.fillStyle = 'green';
                    me.ctx.strokeStyle = 'blue';
                    me.ctx.fillText('你特么挂了，这么简单都挂，搞毛啊～', me.cWidth / 2 - 330, me.cHeight / 2);
                    me.ctx.strokeText('你特么挂了，这么简单都挂，搞毛啊～', me.cWidth / 2 - 330, me.cHeight / 2);
                }
            );
        }
    }

    function hitEnemy(context, bullet, spriteName) {
        var sprites = context.sprites;
        for (var i in sprites) {
            // debugger
            if (sprites[i].type === 'enemy'
                && Math.abs(bullet.x - sprites[i].x) < sprites[i].radius
                && Math.abs(bullet.y - sprites[i].y) < sprites[i].radius
            ) {
                boom.createBooms(sprites[i].x, sprites[i].y);
                context.removeSprite(i);
                context.removeSprite(spriteName);
            }
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
