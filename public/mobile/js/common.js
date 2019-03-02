// 初始化mui scroll控件
options = {
  scrollY: true, //是否竖向滚动
  scrollX: false, //是否横向滚动
  startX: 0, //初始化时滚动至x
  startY: 0, //初始化时滚动至y
  indicators: true, //是否显示滚动条
  deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
  bounce: true //是否启用回弹
}
mui('.mui-scroll-wrapper').scroll(options);

//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
});

// 封装解析地址栏参数方法
function getSearch(key) {
  // 获得传参
  var search = location.search  // "?key=%E5%93%88%E5%93%88"
  // 解码中文
  search = decodeURI(search)  // "?key=哈哈" 
  // 去掉问号
  search = search.slice(1)    // "key=哈哈" 
  // 通过 & 分隔数组
  var arr = search.split("&")   // ["key=哈哈"]

  var obj = {}
  arr.forEach(function (v, i) {
    var key = v.split("=")[0]
    var value = v.split("=")[1]
    obj[key] = value
  })
  return obj[key]
}

// 封装读取History方法
function getHistory() {
  var history = localStorage.getItem("search_list") || "[]"
  var arr = JSON.parse(history)
  return arr
}
// 封装添加History方法
function setHistory(val) {
  var history = localStorage.getItem("search_list") || "[]"
  var arr = JSON.parse(history)
  // 删除重复记录
  if (arr.indexOf(val) > -1) {
    arr.splice(arr.indexOf(val), 1)
  }
  // 头部插入
  arr.unshift(val)

  // 多余十条删除最后一个
  if (arr.length > 10) arr.pop()
  history = JSON.stringify(arr)
  localStorage.setItem("search_list", history)
}