#  CrDom.js
## 这是一个类似于jquery的js库，操作dom用来元素构造动画和一些其他的js方法

1. $()方法如同jquery的选择器样，传入参数经过处理后获得dom元素，作为属性放在构造函数身上，之后所有的dom操作都是操作这个属性
```
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
```
//TODO 选择 CrDom 中的dom 元素
    CrDom.prototype.eq = function (value) {
        this.dom = this.dom.filter((item, index, self) => {
            return typeof value === 'number' ? index == value : self;
        })
        return this;
    }
```
3. 修改样式 使用 css() 来更改通过传入对象或具体的值来修改
```
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
```
1. $(this).css('fontSize', '30px');
2. $(this).css({
       fontSize: '30px'
    });
```
4. 绑定事件 通过 on() 来绑定事件
```
    //TODO 绑定事件
    CrDom.prototype.on = function (event, Callback) {
        for (let i of this.dom) {
            i.addEventListener(event, Callback);
        }
        return this;
    }
```
```
 $('span').on('click', function () {
        $(this).css('fontSize', '30px')
    }).setText('hello')
```
5. 添加文本 添加类名 修改类名
```
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
```
//直接使用 display() 会隐藏显示交替，传入 true 隐藏 传入 false 显示 
    let node = $('.tu')
    $('span').eq(0).on('click', function () {
        node.display()
    }).setText('hello')
```
