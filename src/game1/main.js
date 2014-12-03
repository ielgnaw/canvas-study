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

    function shoot(curShip, frame) {
        var angle = curShip.angle;
        var bulletEnd;
        var distance;
        var bullet;
        if (angle > 0 && angle < 90) {
            bulletEnd = {
                x: curShip.x + util.getTanByAngle(90 - angle) * (frame.cHeight - curShip.y),
                // y: frame.cHeight
                y: frame.cHeight + 100
            };
        }
        else if (angle > 90 && angle < 180) {
            var x = curShip.x - (frame.cHeight - curShip.y) / util.getTanByAngle(180 - angle);
            bulletEnd = {
                x: x,
                // y: frame.cHeight
                y: frame.cHeight + 100
            };
        }
        else if (angle > 180 && angle < 270) {
            bulletEnd = {
                x: curShip.x - (util.getTanByAngle(270 - angle) * curShip.y),
                // y: 0
                y: -100
            };
        }
        else if (angle > 270 && angle < 360) {
            bulletEnd = {
                x: (curShip.x + (util.getTanByAngle(angle - 270) * curShip.y)),
                // y: 0
                y: -100
            };
        }
        else if (angle === 0 || angle === 360) {
            bulletEnd = {
                // x: frame.cWidth,
                x: frame.cWidth + 100,
                y: curShip.y
            };
        }
        else if (angle === 90) {
            bulletEnd = {
                x: curShip.x,
                // y: frame.cHeight
                y: frame.cHeight + 100
            };
        }
        else if (angle === 180) {
            bulletEnd = {
                // x: 0,
                x: -100,
                y: curShip.y
            };
        }
        else if (angle === 270) {
            bulletEnd = {
                x: curShip.x,
                // y: 0
                y: -100
            };
        }

        distance = util.getDistance(
            curShip.x,
            curShip.y,
            bulletEnd.x,
            bulletEnd.y
        );

        bullet = new Circle({
            ctx: frame.ctx,
            x: curShip.x,
            y: curShip.y,
            radius: 5,
            frame: frame,
            endPoint: bulletEnd,
            type: 'bullet'
        });

        bullet.sx = (bulletEnd.x - bullet.x) / distance * 7;
        bullet.sy = (bulletEnd.y - bullet.y) / distance * 7;
        frame.addSprite('bullet' + util.createGuid(), bullet);
    }

    var ship;
    var isLeftDown = false; // 记录左键是否按下
    var isRightDown = false; // 记录右键是否按下
    var isSpaceDown = false; // 记录空格是否按下

    function keyboardFunc(e) {
        var type = e.type;
        var keyCode = e.keyCode;
        var angle = ship.angle;
        if (type === 'keydown') {
            switch (keyCode) {
                case 37:
                    e.preventDefault();
                    isLeftDown = true;
                    if (angle === 0) {
                        angle = 360;
                    }
                    ship.angle = angle - 4;
                    if (isSpaceDown) {
                        shoot(ship, frame);
                    }
                    break;
                case 39:
                    e.preventDefault();
                    isRightDown = true;
                    if (angle === 360) {
                        angle = 0;
                    }
                    ship.angle = angle + 4;
                    if (isSpaceDown) {
                        shoot(ship, frame);
                    }
                    break;
                case 32: // 空格
                    e.preventDefault();
                    isSpaceDown = true;
                    if (isLeftDown) {
                        if (angle === 0) {
                            angle = 360;
                        }
                        ship.angle = angle - 4;
                    }
                    else if (isRightDown) {
                        if (angle === 360) {
                            angle = 0;
                        }
                        ship.angle = angle + 4;
                    }
                    shoot(ship, frame);
                case 38: // 上
                case 40: // 下
                    e.preventDefault();
                    break;
                default:
            }
        }
        else if (type === 'keyup') {
            switch (keyCode) {
                case 37:
                    isLeftDown = false;
                    break;
                case 39:
                    isRightDown = false;
                    break;
                case 32:
                    isSpaceDown = false;
                    break;
                default:
            }
        }
    }

    function init() {

        window.addEventListener('keydown', keyboardFunc, false);
        window.addEventListener('keyup', keyboardFunc, false);

        var endPoint = {
            x: cWidth / 2,
            y: cHeight / 2
        };

        var enemys = require('./enemy').create(canvas, 3, 3, 3, 3)

        for (var i = 0, len = enemys.length; i < len; i++) {
            var enemy = enemys[i];

            var circle = new Circle({
                ctx: ctx,
                x: enemy.x,
                y: enemy.y,
                radius: 10,
                frame: frame,
                endPoint: endPoint,
                type: 'enemy'
            });

            var distance = util.getDistance(
                enemy.x,
                enemy.y,
                endPoint.x,
                endPoint.y
            );

            circle.sx = (endPoint.x - enemy.x) / distance * 1;
            circle.sy = (endPoint.y - enemy.y) / distance * 1;

            frame.addSprite('circle' + i, circle);
        }

        ship = new Ship({
            ctx: ctx,
            frame: frame,
            x: cWidth / 2,
            y: cHeight / 2,
            angle: 180,
            type: 'ship'
        });

        frame.addSprite('ship', ship);

        // ship.draw(ctx);

        frame.start();

        // setTimeout(function () {
        //     frame.stop();
        // }, 9000)
    }

    return {
        init: init
    }

});
