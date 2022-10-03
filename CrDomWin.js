(function (win, undefined) {

    win.eq = null

    //获取DOM元素 存放在 this.eq 中
    win.__proto__._$ = function (dom) {
        this.eq = typeof dom === "string" ? document.querySelectorAll(dom) : dom;
        return this
    }

    //修改样式
    win.__proto__._$style = function (style, value) {
        if (typeof style === "object") {
            for (let i in style) {
                for (let k of this.eq) {
                    k.style[i] = style[i];
                }
            }
        } else if (typeof style === "string" && typeof value === "string") {
            for (let k of this.eq) {
                k.style[style] = value;
            }
        }
        return this
    }

    //绑定事件
    win.__proto__._$on = function (event, Callback) {
        for (let i of this.eq) {
            i.addEventListener(event, Callback);
        }
        return this
    }

    //设置 this 指向
    win.__proto__._$this = function (thiss) {
        this.eq = [thiss];
        return this
    }

    //修改元素内容
    win.__proto__._$text = function (txt) {
        for (let i of this.eq) {
            i.innerText = txt;
        }
        return this
    }

})(window, undefined)
