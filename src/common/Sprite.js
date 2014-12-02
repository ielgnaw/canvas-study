/**
 * @file 动画精灵对象
 * @author ielgnaw(wuji0223@gmail.com)
 */

define(function (require) {

    /**
     * 精灵对象
     *
     * @constructor
     */
    function Sprite() {
    }

    /**
     * 由子类自定义实现，用来渲染每一帧的更新
     *
     * @override
     */
    Sprite.prototype.update = function () {
        this.x += this.sx;
        this.y += this.sy;
    }

    /**
     * 由子类自定义实现，用来渲染每一帧如何画在画布上
     *
     * @override
     */
    Sprite.prototype.draw = function () {}

    return Sprite;

});
