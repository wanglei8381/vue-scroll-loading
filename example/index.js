var Vue = require('vue');

Vue.use(require('../'), {
    threshold: 10
});

new Vue({
    el: 'body',
    data: {
        size: 10,
        pauseScrollTrigger: false
    },
    methods: {
        request: function () {
            console.log('---->', this.size);
            var self = this;
            this.pauseScrollTrigger = true;
            this.$scroll.innerHTML = '加载中..';
            setTimeout(function () {
                self.pauseScrollTrigger = false;
                self.$scroll.innerHTML = '';
                self.size += 10;
                if (self.size >= 50) {
                    self.pauseScrollTrigger = true;
                    self.$scroll.innerHTML = '没有数据了';
                }
            }, 3000);
        }
    },
    ready: function () {
        var self = this;
        this.$scroll = this.$el.querySelector('.scroll-loading-wrapper');
        this.request();
    }
});
