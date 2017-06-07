/**
 * Created by user on 2017/5/31.
 */
(function ($) {
    $.loadMore = function (options) {
        var defaults = {
            $doc: $(document),
            $win: $(window),
            $btn: $('[data-loadmore-type="bookshlef"]'),
            $tpl: $("#listTpl"),
            method: 'get',
            url: './data/get_bookshelf.php',
            page: 1,
            pageSize: 10,
            loadingMore: '点击加载更多',
            loadingText: '加载中，请稍后……',
            noDataText: '暂无数据',
            noMoreText: '没有更多了！',
            limitHeight: 10,
            eventScroll: 'click' //scroll或者click
        };
        var opts = $.extend(defaults || {}, options);
        //定义方法
        var methods = {
            //ajax
            fetch: function () {
                var that = this;
                this.state = 'fetching';
                opts.param = $.extend(opts.param || {"page" : opts.page}, {"page" : opts.page});
                $.ajax({
                    type: opts.method,
                    url: opts.url,
                    data: opts.param,
                    dataType: 'json',
                    success: function (data) {
                        that.render(data.data);
                        that.state = 'end';
                    },
                    error: function () {
                        console.log("请求失败")
                    }
                })
            },
            //下拉数据
            htmlTpl: function () {
                var that = this;
                if(that.state == 'fetching'){
                    return;
                }
                if(opts.$doc.height() - opts.$win.height()-opts.$win.scrollTop() < opts.limitHeight){
                    that.fetch();
                }
            },
            bindScrollEvent: function () {
                var that = this;
                opts.$win.on(opts.eventScroll, function () {
                    that.htmlTpl();
                })
            },
            noMore: function () {
                //没有更多时
                opts.$win.off(opts.eventScroll);
                opts.$btn.text(opts.noMoreText);
            },
            noData: function () {
                //没有数据时
                opts.$win.off(opts.eventScroll);
                opts.$btn.text(opts.noDataText);
            },
            render: function (data) {
                var that = this;
                var _data = data.books;
                if(_data && _data.length > 0 ){
                    var html = _.template(opts.$tpl.html())({'_data': _data});
                    opts.$btn.before(html);
                    if(parseInt(data.page.totalPage) > parseInt(opts.page) ){
                        //总页数大于当前页数时
                        opts.page += 1
                    }else{
                        that.noMore();
                    }
                }else if(opts.page == 1){
                    that.noData();
                }else{
                    that.noMore();
                }
            },
            init: function () {
                this.bindScrollEvent();
                //如果第一页的数据不满一页时（即第一页的数据是后台输出的），首先去请求一次接口
                this.htmlTpl();

            }
        };
        methods.init();
    }

})(Zepto);