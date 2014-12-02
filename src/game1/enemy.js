/**
 * @file 敌机的起点坐标
 * @author ielgnaw(wuji0223@gmail.com)
 */

define(function (require) {

    var util = require('common/util');

    var MAX_COUNT = 100;

    // 从顶部出现的敌机，纵坐标是 0
    var topPointsControl = (function () {
        var tp = {};
        tp.create = function (canvas) {
            var cWidth = canvas.width;

            var xArr = [];
            var ret = [];

            for (var i = 0; i < MAX_COUNT; i++) {
                var coordinateX = util.random(0, cWidth);
                if (xArr.indexOf(coordinateX) < 0) {
                    ret.push({
                        x: coordinateX,
                        y: 0
                    });
                }
            }
            return ret;
        };
        return tp;
    })();

    // 从底部出现的敌机，纵坐标是 canvas.height
    var bottomPointsControl = (function () {
        var bp = {};
        bp.create = function (canvas) {
            var cWidth = canvas.width;
            var cHeight = canvas.height;

            var xArr = [];
            var ret = [];

            for (var i = 0; i < MAX_COUNT; i++) {
                var coordinateX = util.random(0, cWidth);
                if (xArr.indexOf(coordinateX) < 0) {
                    ret.push({
                        x: coordinateX,
                        y: cHeight
                    });
                }
            }
            return ret;
        };
        return bp;
    })();

    // 从左边出现的敌机，横坐标是 0
    var leftPointsControl = (function () {
        var lp = {};
        lp.create = function (canvas) {
            var cHeight = canvas.height;

            var yArr = [];
            var ret = [];

            for (var i = 0; i < MAX_COUNT; i++) {
                var coordinateY = util.random(0, cHeight);
                if (yArr.indexOf(coordinateY) < 0) {
                    ret.push({
                        x: 0,
                        y: coordinateY
                    });
                }
            }
            return ret;
        };
        return lp;
    })();

    // 从右边出现的敌机，横坐标是 canvas.width
    var rightPointsControl = (function () {
        var rp = {};
        rp.create = function (canvas) {
            var cWidth = canvas.width;
            var cHeight = canvas.height;

            var yArr = [];
            var ret = [];

            for (var i = 0; i < MAX_COUNT; i++) {
                var coordinateY = util.random(0, cHeight);
                if (yArr.indexOf(coordinateY) < 0) {
                    ret.push({
                        x: cWidth,
                        y: coordinateY
                    });
                }
            }
            return ret;
        };
        return rp;
    })();

    return {
        /**
         * 创建敌机
         *
         * @param {HTML Element} canvas canvas 元素
         * @param {number} topCount 顶部出现敌机的数量
         * @param {number} bottomCount 底部出现敌机的数量
         * @param {number} leftCount 左侧出现敌机的数量
         * @param {number} rightCount 右侧出现敌机的数量
         *
         * @return {Array} 所有敌机
         */
        create: function (canvas, topCount, bottomCount, leftCount, rightCount) {
            topCount = topCount || 0;
            bottomCount = bottomCount || 0;
            leftCount = leftCount || 0;
            rightCount = rightCount || 0;

            var topPoints = topPointsControl.create(canvas);
            var bottomPoints = bottomPointsControl.create(canvas);
            var leftPoints = leftPointsControl.create(canvas);
            var rightPoints = rightPointsControl.create(canvas);

            var ret = [];

            // topPoints 是随机的，所以每次按 topCount 取就是随机的
            for (var i = 0; i < topCount; i++) {
                ret.push(topPoints[i]);
            }

            for (var i = 0; i < bottomCount; i++) {
                ret.push(bottomPoints[i]);
            }

            for (var i = 0; i < leftCount; i++) {
                ret.push(leftPoints[i]);
            }

            for (var i = 0; i < rightCount; i++) {
                ret.push(rightPoints[i]);
            }

            return ret;
        }
    };

});
