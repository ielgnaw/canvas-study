/**
 * @file lesson1 入口
 * @author ielgnaw(wuji0223@gmail.com)
 */

define(function (require) {

    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    function render() {
        ctx.font = '40pt Arial';
        ctx.fillStyle = 'green';
        ctx.strokeStyle = 'blue';
        ctx.fillText('Hello Canvas', canvasWidth / 2 - 150, canvasHeight / 2);
        ctx.strokeText('Hello Canvas', canvasWidth / 2 - 150, canvasHeight / 2);
    }

    function init() {
        render();
    }

    return {
        init: init
    };

});
