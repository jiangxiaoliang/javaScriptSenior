
/*
- t 当前时间
- b 初始值
- c 变化量
- d 持续时间
 */
let Tween = {
    linear: function (t, b, c, d){  //匀速
        return c*t/d + b;
    },
    easeIn: function(t, b, c, d){  //加速曲线
        return c*(t/=d)*t + b;
    },
    easeOut: function(t, b, c, d){  //减速曲线
        return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(t, b, c, d){  //加速减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d){  //加加速曲线
        return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(t, b, c, d){  //减减速曲线
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p/4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(t, b, c, d, a, p){    //*正弦增强曲线（弹动渐出）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d/2) == 2 ) {
            return b+c;
        }
        if (!p) {
            p = d*(0.3*1.5);
        }
        if ( !a || a < Math.abs(c) ) {
            a = c;
            var s = p/4;
        }
        else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        if (t < 1) {
            return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) *
            Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;  //回缩的距离
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
        return c - Tween['bounceOut'](d-t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d){//*
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d){
        if (t < d/2) {
            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
}
let transformArr = [
    'rotate', 'rotateX', 'rotateY', 'rotateZ', 'translateX', 'translateY', 'translateZ',
    'scaleX', 'scaleY', 'skewX', 'skewY'
];
let normalAttrs = [
    'width', 'height', 'marginTop', 'marginLeft', 'marginRight', 'marginBottom', 'top', 'left',
    'paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom', 'bottom', 'right'
];
//attr批量设置
function css(el, attr, val) {
    // 如果attr是字符串且val不存在的时候，判断是否是css3的属性，如果是让其执行css3的动画
    if (typeof attr === 'object') {
        for (let keys in attr) {
            css(el, keys, attr[keys]);
        }
        return;
    }
    if (transformArr.indexOf(attr) >= 0) {
        return setTransform(el, attr, val);
    }
    if (val !== undefined) {
        if (attr === 'opacity') {
            el.style[attr] = val / 100;
            el.style.filter = 'alpha(opacity=' + val + ')';
        } else if (normalAttrs.indexOf(attr) >= 0){
            el.style[attr] = val + 'px';
        } else if (attr === 'zIndex') {
            el.style[attr] =Math.round(val);
        } else {
            el.style[attr] = val;
        }
    } else {
        let val = getComputedStyle(el)[attr];
        if (attr === 'opacity') {
            val *= 100;
        }
        val =(normalAttrs.indexOf(attr) > -1 || !isNaN(parseFloat(val))) ? parseFloat(val) : val;
        return val;
    }
}

function setTransform(el, attr, val) {
    el.transform = el.transform || {};
    if (typeof val === 'undefined') {
        if (el.transform[attr]) {
            return el.transform[attr]
        } else {
            if (attr === 'scaleX' || attr === 'scaleY') {
                return 1;
            } else {
                return 0;
            }
        }
    }
    el.transform[attr] = val;
    let str = '';
    for (let keys in el.transform) {
        switch (keys) {
            case 'translateX':
            case 'translateY':
            case 'translateZ':
                str += `${keys}(${el.transform[keys]}px) `;
                break;
            case 'rotate':
            case 'rotateX':
            case 'rotateY':
            case 'rotateZ':
            case 'skewX':
            case 'skewY':
                str += `${keys}(${el.transform[keys]}deg) `;
                break;
            case 'scaleX':
            case 'scaleY':
                str += `${keys}(${el.transform[keys]}) `;
                break;
        }
    }
    el.style.transform = el.style.WebkitTransform = str.trim();
}

/**
 *
 * @param op.el   元素
 * @param op.attr ： {} 属性
 * @param op.duration 毫秒
 * @param op.easingFuc 动画方式
 * @param op.cb 回调方法
 */
function mTween (op) {
    let el = op.el;
    if (el.animationTimer) return;
    let {attr = {}, duration= 400, easingFun='easeOut', cb, s} = op;
    let t = 0,
        b = {},
        c = {},
        maxC = 0;
    Object.entries(attr).forEach(item => {
        b[item[0]] = css(el, item[0]);
        c[item[0]] = item[1] - b[item[0]];
        maxC = Math.max(maxC, Math.abs(c[item[0]]));
    });
    if (typeof duration === 'object') {
        let tempOption = duration;
        // tempOption.multiple = tempOption.multiple || 2;
        duration = tempOption.multiple !== undefined ? tempOption.multiple * maxC : maxC * 1.2;
        if (tempOption.min !== undefined) {
            duration = Math.max(tempOption.min, duration);
        }
        if (tempOption.max !== undefined) {
            duration = Math.min(tempOption.max, duration);
        }
    }
    let d = Math.ceil(duration / (1000 / 60));
    let startTime = Date.now();
    // move();
    (function move() {
        // el.animationTimer = requestAnimationFrame(function () {
            // t++;
            // if (t > d) {
            //     el.animationTimer = null;
            //     op.cb && op.cb.call(el);
            // } else {
            //     Object.keys(attr).forEach(item => {
            //         let val = Tween[easingFun](t, b[item], c[item], d);
            //         css(el, item, val);
            //     });
            //     move();
            // }
        // })
        el.animationTimer = requestAnimationFrame(move);
        let time = Date.now() - startTime;
        if (time > duration) {
            time = duration;
            window.cancelAnimationFrame(el.animationTimer);
            el.animationTimer = null;
        }
        Object.keys(attr).forEach(item => {
            let val = Tween[easingFun](time, b[item], c[item], duration,s);
            css(el, item, val);
        });
        if (time === duration && typeof cb === 'function') {
            //console.log(1);
            cb.call(el);
        }
    })()
}
mTween.stop = function (el) {
    cancelAnimationFrame(el.animationTimer);
    el.animationTimer = null;
};
