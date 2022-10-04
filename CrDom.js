(function (window, undefined) {


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
    //========================================================================================


    //========================================================================================
    //=========                  添加原型函数                  ================================
    //========================================================================================

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

    //TODO 绑定事件
    CrDom.prototype.on = function (event, Callback) {
        for (let i of this.dom) {
            i.addEventListener(event, Callback);
        }
        return this;
    }

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





    //* 在 window 上添加 构造函数
    window.$ = window.CrDom = $;

})(window, undefined)