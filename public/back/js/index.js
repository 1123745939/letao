$(function () {
    /**
     * echarts 的使用
     * 1 引包
     * 2 准备居高容器
     * 3 初始化实例
     */

    var echarts_1 = echarts.init(document.querySelector('.echarts-1')); 
                
    var option1 = {
        title: {
            text: "2019年注册人数"
        },
        tooltip: {
            show: true
        },
        legend: {
            data:['人数']
        },
        // x轴刻度
        xAxis : [
            {
                data : ["一月","二月","三月","四月","五月","六月"]
            }
        ],
        // x轴刻度 
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                "name":"人数",
                "type":"bar",
                "data":[5, 20, 40, 10, 10, 20]
            }
        ]
    };

    // 为echarts对象加载数据 
    echarts_1.setOption(option1); 


    var echarts_2 = echarts.init(document.querySelector('.echarts-2')); 
                
    var option2 = {
        title : {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data:['耐克','阿迪','新百伦','李宁','阿迪王']
        },
        series : [
            {
                name: '热门品牌',
                type: 'pie',
                // 直径
                radius : '55%',
                // 圆心位置
                center: ['40%', '50%'],
                data: [
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'新百伦'},
                    {value:135, name:'李宁'},
                    {value:1548, name:'阿迪王'}
                ],
                // 选中阴影
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    

    // 为echarts对象加载数据 
    echarts_2.setOption(option2); 
})