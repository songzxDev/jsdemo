$(document).ready(function() {
    $("[data-target='#pagination']").on('select.uk.pagination', function(event, pageIndex, pagination) {
        event.stopPropagation();
        console.log(pageIndex + 1);
    });


    var pagination2 = UIkit.pagination($("[data-target='#pagination2']"), {
        items: 111, // 条目的总数，用于计算页面
        itemsOnPage: 20, // 每个页面上显示的条目数
        pages: 0, // 如果被指定了值, items and itemsOnPage 将不会用于计算页面数目
        displayedPages: 3, // 导航时有多少页码是可见的
        edges: 3, // 在分页的首页或末页有多少页面是可见的
        currentPage: 0 // 初始化后，哪一页应该被立即选中
    });
    pagination2.on('select.uk.pagination', function(event, pageIndex, pagination) {
        event.stopPropagation();
        var pageNum = pageIndex + 1;
        var pageSize = pagination.options.itemsOnPage;
        /*
         * LIMIT 接受一个或两个数字参数。参数必须是一个整数常量。
         * 如果给定两个参数，第一个参数指定第一个返回记录行的偏移量，
         * 第二个参数指定返回记录行的最大数目。初始记录行的偏移量是 0(而不是 1)
         * SELECT * FROM table LIMIT 5,10; // 检索记录行 6-15
         */
        console.log('取后台数据下标：', (pageNum - 1) * pageSize, pageSize);
    });
    $('select#itemsOnPage').on('change', function(event) {
        event.stopPropagation();
        pagination2.options.itemsOnPage = $(this).val();
        pagination2.init();
    });
});