#  CrDom.js
## 这是一个类似于jquery的js库，操作dom用来元素构造动画和一些其他的js方法

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
    CrDom.prototype.setText = function (txt) {
        for (let i of this.dom) {
            i.innerText = txt;
        }
        return this
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
```
6. 元素的隐藏与显示    在点击事件中 请使用 `let node = $('.tu')` 使用变量来接收到实例,不要直接使用 `$('.tu').display()`因为这样每次调用都会生成一个新对象 
```js
//直接使用 display() 会隐藏显示交替，传入 true 隐藏 传入 false 显示 
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
```
+ 7.2 淡出 使用 `slowon()` 传入一个时间参数 单位 S 
```js
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
```
+ 7.3 淡入淡出交替 它是通过分别调用对象内的 淡入淡出 方法实现的 <br>
   使用 `change()` 传入两个参数 第一个是变化时间 单位 S ，第二个是改变第一次调用时是淡入还是淡出 默认参数是 `true` 淡入 
```js
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
```
8. 暂停动画 防止动画快速切换时剧烈变化 使用 `stop()`
```js
  //停止动画
    CrDom.prototype.stop = function () {
        clearInterval(time);
        clearInterval(times);
        return this;
    }
```