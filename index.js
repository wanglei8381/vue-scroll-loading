exports.install = function (Vue, options) {

    var threshold = options.threshold || 0;
    //获取滚动的元素
    var getScrollEventTarget = function (el) {
        while (el.nodeType === 1 && el.tagName !== 'BODY' && el.tagName !== 'HTML') {
            var overflowY = getComputedStyle(el).overflowY;
            if (overflowY === 'scroll' || overflowY === 'auto') {
                return el;
            }
            el = el.parentNode;
        }
        return window;
    };

    Vue.directive('scroll', {
        bind: function () {
            if (this.el.nodeType !== 1) return;

            var self = this;
            var vm = this.vm;
            var _threshold = this.el.getAttribute('threshold') || threshold;
            var handler = function () {
                console.log('[vue][directive][scroll]请设置后调函数');
            };

            if (self.expression && typeof vm.$get(self.expression) === 'function') {
                handler = vm.$get(self.expression);
            }

            var target = this.target = getScrollEventTarget(this.el);
            this.scrollListener = function () {
                if (target === window) {
                    if (document.documentElement.clientHeight + document.body.scrollTop >= document.documentElement.scrollHeight - _threshold) {
                        if (!vm.pauseScrollTrigger) {
                            handler();
                        }
                    }
                } else {
                    if (target.clientHeight + target.scrollTop >= target.scrollHeight - _threshold) {
                        if (!vm.pauseScrollTrigger) {
                            handler();
                        }
                    }
                }
            }
            target.addEventListener('scroll', this.scrollListener);
        },
        unbind: function () {
            target.removeEventListener('scroll', this.scrollListener);
        }
    });
}