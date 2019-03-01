$(function () {
    // 获取搜索关键字
    var key = getSearch("key")
    // 设置 input 值
    $("#searchInput").val(key)
    var currentPage = 1;
    var pageSize = 2;
    // 1 一进入界面 渲染界面
    //render()
    function render(callback) {
        //$(".lt-product").html('<div class="loading"></div>')

        var params = {}
        // 3个必填参数
        params.proName = $("#searchInput").val();
        params.page = currentPage;
        params.pageSize = pageSize;
        // 2个可选参数
        var $current = $(".lt-sort a.current")
        if ($current.length > 0) {
            var sortName = $current.data("type")
            var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;
            params[sortName] = sortValue
        }
        setTimeout(function () {
            $.ajax({
                type: "get",
                url: "/product/queryProduct",
                data: params,
                dataType: "json",
                success: function (info) {
                    console.log(info);
                    
                    callback && callback(info);
                }
            })
        }, 500)
    }

    // 2 点击按钮查询
    $("#searchBtn").click(function () {
        

        var historyVal = $("#searchInput").val().trim()
        if (historyVal !== "") {
            setHistory(historyVal)
        }
        // 执行下拉刷新 
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading()
    })

    // 3 分类排序
    $(".lt-sort a[data-type]").on("tap",function () {
        if ($(this).hasClass("current")) {
            $(this).find("i").toggleClass("fa fa-angle-down").toggleClass("fa fa-angle-up")

        } else {
            $(this).addClass("current").siblings().removeClass("current")
        }
        // 执行下拉刷新
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading()
    })

    // 4 下拉刷新
    mui.init({
        pullRefresh: {
            container: ".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                auto: true,
                callback: function () {
                    currentPage = 1;
                    render(function (info) {
                        var htmlStr = template("productTpl", info)
                        $(".lt-product").html(htmlStr)
                        // 结束下拉刷新
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh()

                        mui('.mui-scroll-wrapper').pullRefresh().disablePullupToRefresh();
                        setTimeout(function () {//启用上拉加载					 
                            mui('.mui-scroll-wrapper').pullRefresh().enablePullupToRefresh();
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                        }, 1000);	//设置1s后执行(需要大于1s)不然就会自动执行一次加载.
                    })
                }
            },
            up: {
                auto: false,
                callback: function () {
                    currentPage++;
                    render(function (info) {
                        var htmlStr = template("productTpl", info)
                        $(".lt-product").append(htmlStr)
                        // 结束上拉加载
                        if (info.data.length === 0) {
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                        } else {
                            setTimeout(() => {
                                mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                            }, 1000);//设置1s后执行(需要大于1s)不然就会自动执行一次加载.
                        }
                    })
                }
            }
        }
    });

    // 5 点击立即购买  跳转商品详情页
    $(".lt-product").on("click", "button", function () {
        location.href = "product.html?productId=" + $(this).data("index")
    })
})