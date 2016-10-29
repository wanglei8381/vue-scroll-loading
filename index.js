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

        inserted: function (el, binding) {
            console.log(el.vm);
            if (el.nodeType !== 1) return;

            var _threshold = el.getAttribute('threshold') || threshold;
            var handler = function () {
                console.log('[vue][directive][scroll]请设置后调函数');
            };

            if (typeof binding.value === 'function') {
                handler = binding.value;
            }

            var target = getScrollEventTarget(el);
            var scrollListener = function () {
                if (target === window) {
                    var scrollTop = Math.max(window.pageYOffset || 0, document.body.scrollTop);
                    if (document.documentElement.clientHeight + scrollTop >= document.documentElement.scrollHeight - _threshold) {
                        if (!el.getAttribute('pause-scroll-trigger')) {
                            handler();
                        }
                    }
                } else {
                    if (target.clientHeight + target.scrollTop >= target.scrollHeight - _threshold) {
                        if (!el.getAttribute('pause-scroll-trigger')) {
                            handler();
                        }
                    }
                }
            };

            el.unbindEventListener = function () {
                target.removeEventListener('scroll', scrollListener);
            };

            target.addEventListener('scroll', scrollListener);
        },
        unbind: function (el) {
            el.unbindEventListener();
        }
    });
}