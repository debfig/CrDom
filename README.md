#  CrDom.js
## 这是一个类似于jquery的js库，操作dom,用来构造动画和一些其他的js方法库,也采用了链式调用

| 方法与属性   | 作用 |  
| :-------------: | :---------- | 
| `$()` | 获取dom元素，并返回CrDOM对象，后面所有的操作都要基于这个方法实现    | 
| `WinDom` |  这个属性上是整个`document`对象   |
|  `dom`| 这个属性上存放了 `$()`方法获得的dom节点使用数组存放 |
|`eq()` | 该方法用来选择通过`$()`获取的dom节点的具体值| 
| `css()` | 用来修改元素样式| 
| `on()`| 用来绑定事件|
| `setText()`| 用来在dom中添加文本|
|`setClass()` | 重新设置元素类名|
|`addClass()` |向类名中添加新类名 |
|`clearClass()`| 删除指定类名|
|`display()` | 元素的显示与隐藏|
| `slowin()`|元素淡入 |
| `slowou()`| 元素淡出|   
| `change()`|淡入淡出交替 |    
| `stop()`| 暂停变换(淡入淡出) |  
|`father()`|会获取所有元素的父节点|
|`brother()`|获取所有兄弟节点|
|`son()`|获取所有元素的子节点|
|`progeny()`|获取后代节点|
|`insert()`|修改`dom`属性中的值|

1. $()方法如同jquery的选择器样，传入参数经过处理后获得dom元素，作为属性放在构造函数身上，之后所有的dom操作都是操作这个属性
```js
   //定义$方法,返回一个对象
    function $(dom) {

        // 调用 $ 函数会返回一个 CrDom 实例
        return new CrDom(dom);
    }

    //* CrDom 构造函数
    function CrDom(doms = '') {
        this.dom = this.ifthis(doms);
        this.ObjectMethodStatus = {
            //显示隐藏状态
            states: false,
            //淡入淡出状态
            time: null,
            times: null,
            amount: 1,
            Astate: null
        }
    }

    //========================================================================================

    //! 判断 $() 传入的是不是 this 
    CrDom.prototype.ifthis = function (dom) {
        if (typeof dom === 'object') {
            return [dom];
        } else if (typeof dom === 'string') {
            return [...document.querySelectorAll(dom)];
        }
    }
```
2. 在CrDom.js中可以同时获得多个dom元素，形成数组放在构造函数上，可用通过 eq()方法来选择要操作的dom
```js
//TODO 选择 CrDom 中的dom 元素
    CrDom.prototype.eq = function (value) {
        this.dom = this.dom.filter((item, index, self) => {
            return typeof value === 'number' ? index == value : self;
        })
        return this;
    }
```
3. 修改样式 使用 css() 来更改通过传入对象或具体的值来修改
```js
 //TODO 修改样式
    CrDom.prototype.css = function (style, value) {
        if (typeof style === "object") {
            for (let i in style) {
                for (let k of this.dom) {
                    k.style[i] = style[i];
                }
            }
        } else if (typeof style === "string" && typeof value === "string") {
            for (let k of this.dom) {
                k.style[style] = value;
            }
        }
        return this;
    }
```
```js
1. $(this).css('fontSize', '30px');
2. $(this).css({
       fontSize: '30px'
    });
```
4. 绑定事件 通过 on() 来绑定事件
```js
    //TODO 绑定事件
    CrDom.prototype.on = function (event, Callback) {
        for (let i of this.dom) {
            i.addEventListener(event, Callback);
        }
        return this;
    }
```
```js
 $('span').on('click', function () {
        $(this).css('fontSize', '30px')
    }).setText('hello')
```
5. 添加文本 添加类名 修改类名
```js
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
        }

        return this;
    }

    //TODO 修改类名
    CrDom.prototype.setClass = function (clas) {
        if (typeof clas === 'string') {
            for (let i of this.dom) {
                i.className = clas
            }
        }
        return this
    }

    //TODO 添加类名
    CrDom.prototype.addClass = function (clas) {
        if (typeof clas === 'string') {
            for (let i of this.dom) {
                i.classList.add(clas)
            }
        }
        return this
    }

    //TODO 删除类名
    CrDom.prototype.clearClass = function (clas) {
        if (typeof clas === 'string') {
            ergodic(this.dom, function (i) {
                i.classList.remove(clas)
            })
        }
        return this;
    }
```
6. 元素的隐藏与显示    在点击事件中 请使用 `let node = $('.tu')` 使用变量来接收到实例,不要直接使用 `$('.tu').display()`因为这样每次调用都会生成一个新对象 
```js
//TODO 隐藏与显示
    CrDom.prototype.display = function (state) {
        if (state == undefined) {
            if (this.ObjectMethodStatus.states) {
                ergodic(this.dom, function (i) {
                    i.style.display = 'block';
                })
                this.ObjectMethodStatus.states = false;
            } else {
                ergodic(this.dom, function (i) {
                    i.style.display = 'none';
                })
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
        }
        return this;
    }
```
```js
//直接使用 display() 会隐藏显示交替，传入 false 隐藏 传入 true 显示 
    let node = $('.tu')
    $('span').eq(0).on('click', function () {
        node.display()
    }).setText('hello')
```
7. 淡入淡出
+ 7.1  淡入 使用 `slowin()` 传入一个时间参数 单位 S 
```js
    //* 淡入
    CrDom.prototype.slowin = function (tim) {
        let _this = this;
        let temp = 100 - (this.ObjectMethodStatus.amount * 100);
        this.ObjectMethodStatus.amount = this.ObjectMethodStatus.amount != 1 ? this.ObjectMethodStatus.amount : 1;
        ergodic(this.dom, function (value) {
            value.style.opacity = _this.ObjectMethodStatus.amount;
        })
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
    }
```
+ 7.2 淡出 使用 `slowou()` 传入一个时间参数 单位 S 
```js
    //* 淡出
    CrDom.prototype.slowou = function (tim) {
        let _this = this;
        let temp = this.ObjectMethodStatus.amount * 100;
        this.ObjectMethodStatus.amount = this.ObjectMethodStatus.amount != 0 ? this.ObjectMethodStatus.amount : 0;
        ergodic(_this.dom, function (value) {
            value.style.display = 'block';
            value.style.opacity = _this.ObjectMethodStatus.amount;
        })
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
    }
```
+ 7.3 淡入淡出交替 它是通过分别调用对象内的 淡入淡出 方法实现的 <br>
   使用 `change()` 传入两个参数 第一个是变化时间 单位 S ，第二个是改变第一次调用时是淡入还是淡出 默认参数是 `true` 淡入 
```js
    //* 交替变化
    CrDom.prototype.change = function (time, state = true) {
        this.ObjectMethodStatus.Astate = this.ObjectMethodStatus.Astate == null ? state : this.ObjectMethodStatus.Astate;
        if (this.ObjectMethodStatus.Astate) {
            this.slowin(time)
            this.ObjectMethodStatus.Astate = false;
        } else {
            this.slowou(time)
            this.ObjectMethodStatus.Astate = true;
        }
        return this;
    }
```
8. 暂停动画 防止动画快速切换时剧烈变化 使用 `stop()`
```js
    //停止动画
    CrDom.prototype.stop = function () {
        clearInterval(this.ObjectMethodStatus.time);
        clearInterval(this.ObjectMethodStatus.times);
        return this;
    }
```
9. 获取父节点 `father()`会获取所有元素的父节点
```js 
    //TODO 获取父亲节点
    CrDom.prototype.father = function () {
        var temp = [];
        ergodic(this.dom, function (value) {
            temp.push(value.parentNode);
        })
        var num = [];
        for (let i = 0; i < temp.length; i++) {
            if (num.indexOf(temp[i]) == -1) {
                num.push(temp[i]);
            }
        }
        this.dom = copyArr(num);
        return this;
    }
```
10. 获取兄弟节点 `brother()` 获取所有兄弟节点
```js
 //TODO 获取兄弟节点
    CrDom.prototype.brother = function () {
        let sonnode = [];
        ergodic(this.dom, function (value) {
            ergodic(value.parentNode.children, function (val) {
                sonnode.push(val)
            })
        })
        let temp = [];
        for (let k = 0; k < sonnode.length; k++) {
            if (this.dom.indexOf(sonnode[k]) == -1) {
                temp.push(sonnode[k])
            }
        }
        this.dom = copyArr(temp);
        return this;
    }
```
11. 获取子节点 `son()` 获取所有元素的子节点
```js
    //TODO 获取子节点
    CrDom.prototype.son = function () {
        let temp = [];
        ergodic(this.dom, function (value) {
            for (let k of value.children) {
                temp.push(k)
            }
        })

        this.dom = copyArr(temp);
        return this;
    }
```
12. 获取后代节点 `progeny()` 必须传参数 可以传 标签名 类名 css选择器
```js
    //TODO 获取后代节点
    CrDom.prototype.progeny = function (node) {
        let temp = [];
        ergodic(this.dom, function (value) {
            ergodic(value.querySelectorAll(node), function (val) {
                temp.push(val);
            })
        })
        this.dom = copyArr(temp);
        return this;
    }
```
13. `insert()` 方法可以通过传参 修改 `$()` 方法获取的dom节点 `dom` 属性会发生改变，可以传入单个dom节点,有多个dom节点可以通过数组方式传入
```js
    //TODO 修改dom属性
    CrDom.prototype.insert = function (value) {
        //! 判断不要交换位置
        if (value instanceof Array) {
            this.dom = copyArr(value);
        } else if (value instanceof Object) {
            this.dom = [value];
        }
        return this;
    }
```
