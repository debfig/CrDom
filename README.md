#  CrDom.js
## 这是一个类似于jquery的js库，操作dom,用来构造动画和一些其他的js方法库,也采用了链式调用

| 方法与属性   | 作用 |  
| :-------------: | :---------- | 
| `$()` | 获取dom元素，并返回CrDOM对象，后面所有的操作都要基于这个方法实现    | 
|`CrDom`|版本信息|
|  `dom`| 这个属性上存放了 `$()`方法获得的dom节点使用数组存放 |
|`ObjectMethodStatus`| 该属性上存放了淡入淡出的一些配置|
|`txt`|属性中放了`addText()`方法添加的文本|
|`eq()` | 该方法用来选择通过`$()`获取的dom节点的具体值| 
| `css()` | 用来修改元素样式| 
| `on()`| 用来绑定事件|
| `addText()`| 用来在dom中添加文本|
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

## 1. `$()` 方法如同jquery的选择器样，传入参数经过处理后获得dom元素，作为属性放在构造函数身上，之后所有的dom操作都是操作这个属性 
```html
    <div class="a">
        <span></span>
    </div>
```
```js
//使用
 console.log($('.a'));
 console.log($(this));
```
![image](https://github.com/debfig/CrDom/blob/master/img/QQ%E6%88%AA%E5%9B%BE20221012192830.png)<br>
## 2. 在CrDom.js中可以同时获得多个dom元素，形成数组放在构造函数上，可用通过 eq()方法来选择要操作的dom;
```html
    <div class="a">
        <span></span>
        <span></span>
    </div>
```
```js
 console.log($('span').eq(0));
```
![image](./img/QQ%E6%88%AA%E5%9B%BE20221012193504.png)<br>
## 3. 修改样式 使用 css() 来更改通过传入对象或具体的值来修改
```html
    <div class="a">
        <span>hello</span>
    </div>
```
```js
//使用
1. $('span').css('color', 'red');
2. $('span').css({
       fontSize: '30px'
    });
```
![image](./img/QQ%E6%88%AA%E5%9B%BE20221012194001.png)<br>
## 4. 绑定事件 通过 on() 来绑定事件
```html
    <div class="a">
        <span></span>
    </div>
```
```js
//使用
 $('span').on('click', function () {
        alert('hello word');
    })
```
## 5. 添加文本 添加类名 修改类名
```html
    <div class="a">
        <span></span>
        <span></span>
    </div>
```
```js
//添加文本  添加的文本会放在对象的 txt 属性中
$('span').eq(0).addText('hello');
//设置类名
$('span').eq(1).setClass('box');
//
```
![image](./img/QQ%E6%88%AA%E5%9B%BE20221012195634.png)<br>
```js
//添加类名
$('span').eq(1).addClass('blo');
```
![image](./img/QQ%E6%88%AA%E5%9B%BE20221012195901.png)<br>
```js
//删除指定类名
$('span').eq(1).clearClass('blo');
```
## 6. 元素的隐藏与显示    在点击事件中 请使用 `let node = $('.tu')` 使用变量来接收到实例,不要直接使用 `$('.tu').display()`因为这样每次调用都会生成一个新对象 
```html
    <div class="a">
        <span></span>
        <span></span>
    </div>
```
```js
//直接使用 display() 会隐藏显示交替，传入 false 隐藏 传入 true 显示 
    let node = $('span').eq(1);
    $('span').eq(0).on('click', function () {
        node.display()
    })
```
![image](./gif/QQ%E5%BD%95%E5%B1%8F20221012203346.gif)<br>
## 7. 淡入淡出
+ 7.1  淡入 使用 `slowin()` 传入一个时间参数 单位 S 
```html
    <div class="a">
        <span></span>
        <span></span>
    </div>
```
```js
let node = $('span').eq(1);
    $('span').eq(0).on('click', function () {
        node.slowin(1);
    })
```
![image](./gif/20221012200936.gif)<br>
+ 7.2 淡出 使用 `slowou()` 传入一个时间参数 单位 S ,单独使用还要传入一个参数 0 (就是只有淡出,没有淡入在它前面)
```html
    <div class="a">
        <span></span>
        <span></span>
    </div>
```
```js
  let node = $('span').eq(1);
    $('span').eq(0).on('click', function () {
        node.slowou(1, 0);
    })
```
![image](./gif/QQ%E5%BD%95%E5%B1%8F20221012205017_1.gif)<br>
+ 7.3 淡入淡出交替 它是通过分别调用对象内的 淡入淡出 方法实现的 <br>
   使用 `change()` 传入两个参数 第一个是变化时间 单位 S ，第二个是改变第一次调用时是淡入还是淡出 默认参数是 `true` 淡入 
```html
    <div class="a">
        <span></span>
        <span></span>
    </div>
```
```js
    let node = $('span').eq(1);
    $('span').eq(0).on('click', function () {
        node.change(1);
    })
```
![image](./gif/QQ%E5%BD%95%E5%B1%8F20221012205506.gif)<br>
## 8. 暂停动画 防止动画快速切换时剧烈变化 使用 `stop()`
```html
    <div class="a">
        <span></span>
        <span></span>
    </div>
```
```js
    let node = $('span').eq(1);
    $('span').eq(0).on('click', function () {
        node.stop().change(1);
    })
```
## 9. 获取父节点 `father()`会获取所有元素的父节点
```html
    <div class="a">
        <span></span>
        <span></span>
    </div>
```
```js 
console.log($('span').father());
```
![image](./img/QQ%E6%88%AA%E5%9B%BE20221012210226.png)<br>
## 10. 获取兄弟节点 `brother()` 获取所有兄弟节点
```html
    <div class="a">
        <span class="one"></span>
        <span class="two"></span>
    </div>
```
```js
    console.log($('span').eq(0).brother());
```
![image](./img/QQ%E6%88%AA%E5%9B%BE20221012210537.png)<br>
## 11. 获取子节点 `son()` 获取所有元素的子节点
```html
    <div class="a">
        <span class="one"></span>
        <span class="two"></span>
    </div>
```
```js
console.log($('div').son());
```
![image](./img/QQ%E6%88%AA%E5%9B%BE20221012210808.png)<br>
## 12. 获取后代节点 `progeny()` 必须传参数 可以传 标签名 类名 css选择器
```html
    <div class="a">
        <span class="one">
            <a></a>
        </span>
        <span class="two"></span>
    </div>
```
```js
    console.log($('div').progeny('a'));
```
![image](./img/QQ%E6%88%AA%E5%9B%BE20221012211426.png)<br>
## 13. `insert()` 方法可以通过传参 修改 `$()` 方法获取的dom节点 `dom` 属性会发生改变，可以传入单个dom节点,有多个dom节点可以通过数组方式传入
```html
    <div class="a">
        <span class="one"></span>
        <span class="two"></span>
    </div>
```
```js
    let node = $('span').on('click', function () {
        node.insert(this);
        console.log(node);
    })
```
![image](./img/QQ%E6%88%AA%E5%9B%BE20221012211833.png)<br>
