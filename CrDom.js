(function (window, undefined) {

    class CrDom {
        constructor() {
            this.eq = null;
        }

        //获取DOM元素 存放在 this.eq 中
        _$(dom) {
            this.eq = typeof dom === "string" ? document.querySelectorAll(dom) : dom;
            return this
        }

        //修改样式
        _$style(style, value) {
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
        _$on(event, Callback) {
            for (let i of this.eq) {
                i.addEventListener(event, Callback);
            }
            return this
        }

        //设置 this 指向
        _$this(thiss) {
            this.eq = [thiss];
            return this
        }
    }

    window.$ = new CrDom();
})(window, undefined)
