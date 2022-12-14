/* 
CrDom.js JavaScript Library V1.1.6
作者: 灿烈
根据MIT许可证发布
时间：2022/10/21
URL:https://github.com/debfig/CrDom
 */
(function (window, undefined) {
  //定义$方法,返回一个对象
  function $(dom) {
    // 调用 $ 函数会返回一个 CrDom 实例
    return new CrDom(dom);
  };

  //* CrDom 构造函数
  function CrDom(doms = '') {
    this.CrDom = "1.1.6";
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
    this.txt = [];
    //属性
    this.nature = [];
  };

  //====================================================================

  //! 判断 $() 传入的是不是 this 
  CrDom.prototype.ifthis = function (dom) {
    if (typeof dom === 'object') {
      return [dom];
    } else if (typeof dom === 'string') {
      return [...document.querySelectorAll(dom)];
    } else {
      console.error('"$()" 传入参数错误！！！');
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
    } else {
      console.error('"css()" 传入参数错误！！！');
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
    } else if (typeof txt == 'string' || typeof txt === 'number') {
      ergodic(this.dom, function (i) {
        temp.push(i.innerText = txt);
      });
      this.txt = copyArr(temp);
    } else {
      console.error('"addText()" 传入数据类型错误！！！');
    };

    return this;
  };

  //TODO 修改类名
  CrDom.prototype.setClass = function (clas) {
    if (typeof clas === 'string') {
      ergodic(this.dom, function (i) {
        i.className = clas
      })
    } else {
      console.error('"setClass()" 传入参数错误！！！');
    };
    return this
  };

  //TODO 添加类名
  CrDom.prototype.addClass = function (clas) {
    if (typeof clas === 'string') {
      ergodic(this.dom, function (i) {
        i.classList.add(clas)
      })
    } else {
      console.error('"addClass()" 传入参数错误！！！');
    };
    return this
  };

  //TODO 删除类名
  CrDom.prototype.clearClass = function (clas) {
    if (typeof clas === 'string') {
      ergodic(this.dom, function (i) {
        i.classList.remove(clas)
      })
    } else {
      console.error('"clearClass()" 传入参数错误！！！');
    };
    return this;
  };

  //TODO  DOM 节点中添加 html 元素
  CrDom.prototype.addHTML = function (domtxt, txt) {
    var reg = /^<.*>$/, res = /script|SCRIPT/;
    if (typeof domtxt != 'string') {
      console.error('需要字符类型参数！！！');
    } else if (reg.test(domtxt)) {
      res.test(domtxt) ? console.error('不能添加script标签！！！')
        : ergodic(this.dom, function (i) {
          i.innerHTML = domtxt;
        });
    } else {
      res.test(domtxt) ? console.error('不能添加script标签！！！')
        : ergodic(this.dom, function (i) {
          let dom = document.createElement(domtxt);
          dom.innerText = txt;
          i.appendChild(dom);
        });
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

  //TODO 获取属性和修改属性
  CrDom.prototype.Attr = function (attr, value) {
    let temp = [];
    if (typeof attr != 'string') { console.error('"Attr()" 传入参数一错误,应该是 string 类型 ！！！'); return this };
    if (value == undefined) {
      ergodic(this.dom, function (i) {
        temp.push(i.attr ? i.attr : i.getAttribute(attr));
      });
    } else if (typeof value == 'string') {
      ergodic(this.dom, function (i) {
        i.setAttribute(attr, value);
        temp.push(i.getAttribute(attr));
      })
    } else if (value instanceof Array) {
      for (let i = 0; i < this.dom.length; i++) {
        this.dom[i].setAttribute(attr, value[i]);
        temp.push(this.dom[i].getAttribute(attr));
      }
    } else {
      console.error('"Attr()" 传入参数二错误,应该是 string 类型 ！！！');
    };

    this.nature = copyArr(temp);
    return this;
  };


  //====================================================================
  //=========                  添加函数方法                  ============
  //====================================================================
  $.edition = '1.1.6';

  //TODO 数据监听
  $.DataBroker = function (object, value, fun, state = true) {
    let _this = object
    //内部函数方便自调用
    let DataMonitor = function (d_object, d_value, d_fun) {
      //设置get和set 函数
      function monitor(object, i, addobject) {
        Object.defineProperty(object, i, {
          enumerable: true,
          get() {
            return addobject;
          },
          set(val) {
            addobject = val;
            d_fun(i);
          }
        });
        //改变方法的 this 指向
        if (typeof addobject == 'function') {
          object[i].call(object);
        }
      };
      //数组API劫持 函数
      function ArrayBroker(arr, funs) {
        let newPrototype = Object.create(Array.prototype);
        let methods = ["push", "pop", "shift", "unshift", "reverse", "sort", "splice"];
        methods.forEach(method => {
          newPrototype[method] = function (...args) {
            //! 关键部分 我们使用延时定时器将函数调用由同步变为异步操作
            //! 这步是为了让对数组的的操作先执行，在执行函数的调用
            setTimeout(function () {
              funs(method);
            }, 0);

            let tempdata = args;
            let tempObj = new Object();
            //! 判断push操作
            if (method == 'push' || method == 'unshift') {
              DataMonitor(tempObj, ...tempdata, funs(method));
            }

            tempdata = [tempObj];
            return Array.prototype[method].call(this, ...tempdata);
          };
        });
        arr.__proto__ = newPrototype;
        //判断数组中是否有对象和数组如果有进行get set和数组监听
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] instanceof Array) {
            ArrayBroker(arr[i], funs);
          } else if (arr[i] instanceof HTMLElement ? false : (arr[i] instanceof Object) && (typeof arr[i] == 'object')) {
            let temp = arr[i];
            arr[i] = new Object();
            arr[i].__proto__ = temp.__proto__;
            DataMonitor(arr[i], temp, funs);
          }
        }
      };

      //判断数据类型并做对应操作 分为 数组 Dom对象 对象 其他
      for (let i in d_value) {
        //for in 会遍历对象原型上自定义的方法
        //使用 hasOwnProperty 来判断是否是对象上自生的
        if (d_value.hasOwnProperty(i)) {
          if (d_value[i] instanceof Array) {
            //!数组解构赋值防止对原数组的更改
            monitor(d_object, i, [...d_value[i]]);
            ArrayBroker(d_object[i], d_fun);
          } else if (d_value[i] instanceof HTMLElement) {
            monitor(d_object, i, d_value[i]);
          } else if ((d_value[i] instanceof Object) && (typeof d_value[i] == 'object')) {
            monitor(d_object, i, new Object());
            d_object[i].__proto__ = d_value[i].__proto__;
            DataMonitor(d_object[i], d_value[i], d_fun);
          } else {
            monitor(d_object, i, d_value[i]);
          }
        }
      }
    };
    //调用一次
    DataMonitor(object, value, fun);
    if (state) { fun.call(_this) };
  };

  //数据渲染视图
  $.DataView = function (dataname, data, container, state = false, date = 500) {
    let time = null;
    let containers = document.querySelector(container);
    let dom = [...containers.querySelectorAll(`[${dataname}]`)];
    if (!containers.getAttribute('state')) {
      for (let k in data) {
        let son = [...containers.querySelectorAll(`[${k}]`)];
        for (let i of son) {
          if (i.localName == 'input' || i.localName == 'textarea') {
            i.addEventListener('input', function () {
              if (state) {
                //防抖语句
                if (time !== null) {
                  clearTimeout(time);
                };
                time = setTimeout(() => {
                  data[k] = i.value;
                }, date);
              } else {
                data[k] = i.value;
              };
            });
            i.value = typeof data[k] == 'number' || typeof data[k] == 'string' ? data[k] : '';
          } else {
            i.innerText = typeof data[k] == 'number' || typeof data[k] == 'string' ? data[k] : '';
          };
        };
      };
      containers.setAttribute('state', true);
    } else {
      for (let i of dom) {
        if (i.localName == 'input' || i.localName == 'textarea') {
          i.value = typeof data[dataname] == 'number' || typeof data[dataname] == 'string' ? data[dataname] : '';
        } else {
          i.innerText = typeof data[dataname] == 'number' || typeof data[dataname] == 'string' ? data[dataname] : '';
        };
      };
    };
  };

  //TODO 渲染表格
  $.CreateTable = function (dom, data, sort) {
    for (let d of dom.dom) { d.innerHTML = ""; };
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
  console.log('查看更多信息到:https://github.com/debfig/CrDom');
  console.log(`%c CrDom.js %c v${this.$.edition} `,
    'background: #35495e; padding: 2px; border-radius: 3px 0 0 3px; color: #fff;',
    'background: #41b883; padding: 2px; border-radius: 0 3px 3px 0; color: #fff',);
})(window, undefined)