(function (window, undefined) {
    //定义$方法,返回一个对象
    function $(dom) {
        // 调用 $ 函数会返回一个 CrDom 实例
        return new CrDom(dom);
    }

    //* CrDom 构造函数
    function CrDom(doms = '') {
        this.dom = this.ifthis(doms);
        this.WinDom = window.document;
    }

    //====================================================================

    //! 判断 $() 传入的是不是 this 
    CrDom.prototype.ifthis = function (dom) {
        if (typeof dom === 'object') {
            return [dom];
        } else if (typeof dom === 'string') {
            return [...document.querySelectorAll(dom)];
        }
    }
    //====================================================================


    //自定义 遍历数组 函数
    function ergodic(value, fun) {
        for (let i of value) {
            fun(i)
        }
    }

    //====================================================================
    //=========                  添加原型函数                  ============
    //====================================================================

    //TODO 选择 CrDom 中的dom 元素
    CrDom.prototype.eq = function (value) {
        this.dom = this.dom.filter((item, index, self) => {
            return typeof value === 'number' ? index == value : self;
        })
        return this;
    }

    //TODO 修改样式
    CrDom.prototype.css = function (style, value) {
        if (typeof style === "object") {
            for (let i in style) {
                ergodic(this.dom, function (k) {
                    k.style[i] = style[i];
                })
            }
        } else if (typeof style === "string" && typeof value === "string") {
            ergodic(this.dom, function (k) {
                k.style[style] = value;
            })
        }
        return this;
    }

    //TODO 绑定事件
    CrDom.prototype.on = function (event, Callback) {
        ergodic(this.dom, function (i) {
            i.addEventListener(event, Callback);
        })
        return this;
    }

    //TODO dom中添加文本
    CrDom.prototype.addText = function (txt) {
        ergodic(this.dom, function (i) {
            i.innerText = txt;
        })
        return this
    }

    //TODO 修改类名
    CrDom.prototype.setClass = function (clas) {
        if (typeof clas === 'string') {
            ergodic(this.dom, function (i) {
                i.className = clas
            })
        }
        return this
    }

    //TODO 添加类名
    CrDom.prototype.addClass = function (clas) {
        if (typeof clas === 'string') {
            ergodic(this.dom, function (i) {
                i.classList.add(clas)
            })
        }
        return this
    }

    //显示与隐藏
    var states = true;

    //TODO 隐藏与显示
    CrDom.prototype.display = function (state) {
        if (state == undefined) {
            if (states) {
                ergodic(this.dom, function (i) {
                    i.style.display = 'none';
                })
                states = false;
            } else {
                ergodic(this.dom, function (i) {
                    i.style.display = 'block';
                })
                states = true;
            }
        } else if (state) {
            ergodic(this.dom, function (i) {
                i.style.display = 'none';
            })
        } else {
            ergodic(this.dom, function (i) {
                i.style.display = 'block';
            })
        }
        return this;
    }

    //TODO 淡入淡出

    //动画的状态管理
    //===========================================
    /* || 淡入淡出 定时器 */   var time, times;  /* 变化量 */ var amount = 1;
    //===========================================
    /* || 淡入淡出交替变化*/   var Astate = null;
    //===========================================

    //* 淡入
    CrDom.prototype.slowin = function (tim) {
        let _this = this;
        let temp = 100 - (amount * 100);
        amount = amount != 1 ? amount : 1;
        ergodic(this.dom, function (value) {
            value.style.opacity = amount;
        })
        clearInterval(time);
        time = setInterval(function () {
            if (temp <= 100) {
                ergodic(_this.dom, function (value) {
                    value.style.opacity = amount = (100 - temp) / 100;
                });
                temp++;
            } else {
                clearInterval(time);
                ergodic(_this.dom, function (value) {
                    value.style.display = 'none';
                })
            }
        }, (tim * 1000) / 100);
        return this;
    }
    //* 淡出
    CrDom.prototype.slowou = function (tim) {
        let _this = this;
        let temp = amount * 100;
        amount = amount != 0 ? amount : 0;
        ergodic(this.dom, function (value) {
            value.style.display = 'block';
            value.style.opacity = amount;
        })
        clearInterval(times);
        times = setInterval(function () {
            if (temp <= 100) {
                ergodic(_this.dom, function (value) {
                    value.style.opacity = amount = temp / 100;
                });
                temp++;
            } else {
                clearInterval(times);
            }
        }, (tim * 1000) / 100);
        return this;
    }
    //* 交替变化
    CrDom.prototype.change = function (time, state = true) {
        Astate = Astate == null ? state : Astate;
        if (Astate) {
            this.slowin(time)
            Astate = false;
        } else {
            this.slowou(time)
            Astate = true;
        }
        return this;
    }

    //停止动画
    CrDom.prototype.stop = function () {
        clearInterval(time);
        clearInterval(times);
        return this;
    }


    //* 在 window 上添加 构造函数
    window.$ = window.CrDom = $;

})(window, undefined)