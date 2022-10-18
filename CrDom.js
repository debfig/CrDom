(function (window, undefined) {
    //定义$方法,返回一个对象
    function $(dom) {
        // 调用 $ 函数会返回一个 CrDom 实例
        return new CrDom(dom);
    };

    //* CrDom 构造函数
    function CrDom(doms = '') {
        this.CrDom = "1.1.4";
        this.dom = this.ifthis(doms);
        this.ObjectMethodStatus = {
            //显示隐藏状态
            states: false,
            //淡入淡出状态
            time: null,
            times: null,
            amount: 1,
            Astate: null
        };
        //文本
        this.txt = [null];
    };

    //====================================================================

    //! 判断 $() 传入的是不是 this 
    CrDom.prototype.ifthis = function (dom) {
        if (typeof dom === 'object') {
            return [dom];
        } else if (typeof dom === 'string') {
            return [...document.querySelectorAll(dom)];
        }
    };
    //====================================================================


    //自定义 遍历数组 函数
    function ergodic(value, fun) {
        for (let i of value) {
            fun(i)
        }
    };

    //深拷贝数组
    function copyArr(arr) {
        let res = [];
        for (let i = 0; i < arr.length; i++) {
            res.push(arr[i])
        };
        return res
    };

    //====================================================================
    //=========                  添加原型方法                  ============
    //====================================================================

    //TODO 选择 CrDom 中的dom 元素
    CrDom.prototype.eq = function (value) {
        this.dom = this.dom.filter((item, index, self) => {
            return typeof value === 'number' ? index == value : self;
        });
        return this;
    };

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
        };
        return this;
    };

    //TODO 绑定事件
    CrDom.prototype.on = function (event, Callback) {
        ergodic(this.dom, function (i) {
            i.addEventListener(event, Callback);
        });
        return this;
    };

    //TODO dom中添加文本
    CrDom.prototype.addText = function (txt) {
        let temp = [];
        if (txt == undefined) {
            ergodic(this.dom, function (i) {
                temp.push(i.innerText);
            });
            this.txt = copyArr(temp);
        } else {
            ergodic(this.dom, function (i) {
                temp.push(i.innerText = txt);
            });
            this.txt = copyArr(temp);
        };

        return this;
    };

    //TODO 修改类名
    CrDom.prototype.setClass = function (clas) {
        if (typeof clas === 'string') {
            ergodic(this.dom, function (i) {
                i.className = clas
            })
        };
        return this
    };

    //TODO 添加类名
    CrDom.prototype.addClass = function (clas) {
        if (typeof clas === 'string') {
            ergodic(this.dom, function (i) {
                i.classList.add(clas)
            })
        };
        return this
    };

    //TODO 删除类名
    CrDom.prototype.clearClass = function (clas) {
        if (typeof clas === 'string') {
            ergodic(this.dom, function (i) {
                i.classList.remove(clas)
            })
        };
        return this;
    };


    //TODO 隐藏与显示
    CrDom.prototype.display = function (state) {
        if (state == undefined) {
            if (this.ObjectMethodStatus.states) {
                ergodic(this.dom, function (i) {
                    i.style.display = 'block';
                });
                this.ObjectMethodStatus.states = false;
            } else {
                ergodic(this.dom, function (i) {
                    i.style.display = 'none';
                });
                this.ObjectMethodStatus.states = true;
            }
        } else if (state) {
            ergodic(this.dom, function (i) {
                i.style.display = 'block';
            })
        } else {
            ergodic(this.dom, function (i) {
                i.style.display = 'none';
            })
        };
        return this;
    };

    //TODO 淡入淡出

    //* 淡入
    CrDom.prototype.slowin = function (tim) {
        let _this = this;
        let temp = 100 - (this.ObjectMethodStatus.amount * 100);
        this.ObjectMethodStatus.amount = this.ObjectMethodStatus.amount != 1 ? this.ObjectMethodStatus.amount : 1;
        ergodic(this.dom, function (value) {
            value.style.opacity = _this.ObjectMethodStatus.amount;
        });
        clearInterval(this.ObjectMethodStatus.time);
        this.ObjectMethodStatus.time = setInterval(function () {
            if (temp <= 100) {
                ergodic(_this.dom, function (value) {
                    value.style.opacity = _this.ObjectMethodStatus.amount = (100 - temp) / 100;
                });
                temp++;
            } else {
                clearInterval(_this.ObjectMethodStatus.time);
                ergodic(_this.dom, function (value) {
                    value.style.display = 'none';
                })
            }
        }, (tim * 1000) / 100);
        return this;
    };

    //* 淡出
    CrDom.prototype.slowou = function (tim, val) {
        if (val != undefined) this.ObjectMethodStatus.amount = val;
        let _this = this;
        let temp = this.ObjectMethodStatus.amount * 100;
        this.ObjectMethodStatus.amount = this.ObjectMethodStatus.amount != 0 ? this.ObjectMethodStatus.amount : 0;
        ergodic(_this.dom, function (value) {
            value.style.display = 'block';
            value.style.opacity = _this.ObjectMethodStatus.amount;
        });
        clearInterval(_this.ObjectMethodStatus.times);
        this.ObjectMethodStatus.times = setInterval(function () {
            if (temp <= 100) {
                ergodic(_this.dom, function (value) {
                    value.style.opacity = _this.ObjectMethodStatus.amount = temp / 100;
                });
                temp++;
            } else {
                clearInterval(_this.ObjectMethodStatus.times);
            }
        }, (tim * 1000) / 100);
        return this;
    };

    //* 交替变化
    CrDom.prototype.change = function (time, state = true) {
        this.ObjectMethodStatus.Astate = this.ObjectMethodStatus.Astate == null ? state : this.ObjectMethodStatus.Astate;
        if (this.ObjectMethodStatus.Astate) {
            this.slowin(time);
            this.ObjectMethodStatus.Astate = false;
        } else {
            this.slowou(time);
            this.ObjectMethodStatus.Astate = true;
        };
        return this;
    };

    //! 停止动画
    CrDom.prototype.stop = function () {
        clearInterval(this.ObjectMethodStatus.time);
        clearInterval(this.ObjectMethodStatus.times);
        return this;
    };

    //TODO 获取父亲节点
    CrDom.prototype.father = function () {
        var temp = [];
        ergodic(this.dom, function (value) {
            temp.push(value.parentNode);
        });
        var num = [];
        for (let i = 0; i < temp.length; i++) {
            if (num.indexOf(temp[i]) == -1) {
                num.push(temp[i]);
            }
        };
        this.dom = copyArr(num);
        return this;
    };

    //TODO 获取兄弟节点
    CrDom.prototype.brother = function () {
        let sonnode = [];
        ergodic(this.dom, function (value) {
            ergodic(value.parentNode.children, function (val) {
                sonnode.push(val)
            })
        });
        let temp = [];
        for (let k = 0; k < sonnode.length; k++) {
            if (this.dom.indexOf(sonnode[k]) == -1) {
                temp.push(sonnode[k])
            }
        };
        this.dom = copyArr(temp);
        return this;
    };

    //TODO 获取子节点
    CrDom.prototype.son = function () {
        let temp = [];
        ergodic(this.dom, function (value) {
            for (let k of value.children) {
                temp.push(k)
            }
        });

        this.dom = copyArr(temp);
        return this;
    };

    //TODO 获取后代节点
    CrDom.prototype.progeny = function (node) {
        let temp = [];
        ergodic(this.dom, function (value) {
            ergodic(value.querySelectorAll(node), function (val) {
                temp.push(val);
            })
        });
        this.dom = copyArr(temp);
        return this;
    };

    //TODO 修改dom属性
    CrDom.prototype.insert = function (value) {
        //! 判断不要交换位置
        if (value instanceof Array) {
            this.dom = copyArr(value);
        } else if (value instanceof Object) {
            this.dom = [value];
        };
        return this;
    };

    //====================================================================
    //=========                  添加函数方法                  ============
    //====================================================================

    //TODO 数据响应式
    $.DataBroker = function (object, value, fun) {
        function ArrayBroker(arr, fun) {
            let newPrototype = Object.create(Array.prototype);
            let methods = ["push", "pop", "shift", "unshift", "reverse", "sort", "splice"];
            methods.forEach(method => {
                newPrototype[method] = function (...args) {
                    //! 关键部分 我们使用延时定时器将函数调用由同步变为异步操作
                    //! 这步是为了让对数组的的操作先执行，在执行函数的调用
                    setTimeout(function () {
                        fun();
                    }, 0);
                    return Array.prototype[method].call(this, ...args);
                };
            });
            arr.__proto__ = newPrototype;
            //判断数组中是否有对象和数组如果有进行get set和数组监听
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] instanceof Array) {
                    ArrayBroker(arr[i], fun);
                } else if (arr[i] instanceof Object) {
                    let temp = arr[i];
                    arr[i] = new Array();
                    $.DataBroker(arr[i], temp, fun);
                }
            }
        };
        for (let i in value) {
            if (value[i] instanceof Array) {
                //!         防止对原数组的更改
                object[i] = [...value[i]];
                ArrayBroker(object[i], fun);
            } else if (value[i] instanceof Object) {
                let obj = new Object();
                object[i] = obj;
                $.DataBroker(object[i], value[i], fun);
            } else {
                Object.defineProperty(object, i, {
                    get() {
                        return value[i];
                    },
                    set(val) {
                        value[i] = val;
                        fun();
                    }
                });
            };
        };
        fun();
    };

    //TODO 渲染表格
    $.CreateTable = function (dom, data, sort) {
        for (let i = 0; i < data.length; i++) {
            let tr = document.createElement('tr');
            if (sort instanceof Array) {
                for (let t = 0; t < sort.length; t++) {
                    let td = document.createElement('td');
                    td.innerHTML = data[i][sort[t]];
                    tr.appendChild(td);
                };
            } else {
                for (let j in data[i]) {
                    let td = document.createElement('td');
                    td.innerHTML = data[i][j];
                    tr.appendChild(td);
                };
            };
            for (let k of dom.dom) {
                k.appendChild(tr);
            };
        }
    };


    //====================================================================
    //* 在 window 上添加 构造函数
    window.$ = window.CrDom = $;

})(window, undefined)