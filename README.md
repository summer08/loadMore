# loadMore(wap加载更多插件)

标签（空格分隔）： loadmore


---

1、插件依赖zepto，插件的调用在index.html中可以看到
2、插件中有多个默认的配置参数，如下：

    var defaults = {
        $doc: $(document),
        $win: $(window),
        $btn: $('[data-loadmore-type="bookshlef"]'), //加载更多的按钮元素
        $tpl: $("#listTpl"), //加载更多的模板
        method: 'get', //请求的方式
        url: './data/get_bookshelf.php', //请求的url
        page: 1, //请求的page页数
        pageSize: 10,//请求的条数
        loadingMore: '点击加载更多', //请求时的文字展示
        loadingText: '加载中，请稍后……',
        noDataText: '暂无数据',
        noMoreText: '没有更多了！',
        limitHeight: 10, //滚动到底部的距离
        eventScroll: 'scroll' //事件：scroll或者click，默认scroll
    };



3、模板是依赖于underscore.js
4、根据需求传不同的参数会有不同的展示效果
5、如果实现类似效果只需要改下就OK了