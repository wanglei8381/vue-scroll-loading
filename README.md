#vue-scroll-loading
 <h5>基于vue的滚动加载插件</h5>
 <h6>以v-scroll="request"指令的方式存在</h6>
##Install
npm install vue-scroll-loading
##Use
<pre>
var Vue = require('vue');
Vue.use(require('vue-scroll-loading'), {
    threshold: 10
});
//在页面元素引入v-scroll="request"指令,request是滚动到底部执行的方法
//最好是在滚动的元素引入该指令,该指令会查找该节点以及父节点,找到第一个滚动的元素
//在指令的vm中通过pauseScrollTrigger属性来判断是否触发request回调函数
//true:永不触发回调函数
//false:滚动到底部时触发回调函数

<br><br>
//threshold:距离底部的距离,满足该条件就开发触发回调函数
//默认0,可以在options中统一设置,也可以在指令绑定的节点中当初属性来设置
</pre>