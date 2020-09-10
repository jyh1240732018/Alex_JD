var menuList = [
  {
    titles: ["家用电器"],
    content: {
      tabs: ["家电馆", "镇乡专卖店", "家电服务"],
      subs: [
        {
          title: "电视",
          items: [
            "曲面电视",
            "超薄电视",
            "OLED电视",
            "4K超清电视",
            "55英寸",
            "65英寸",
            "电视配件",
            "曲面电视",
            "超薄电视",
            "OLED电视",
            "4K超清电视",
            "55英寸",
            "65英寸",
            "电视配件",
            "曲面电视",
            "超薄电视",
            "OLED电视",
            "4K超清电视",
            "55英寸",
            "65英寸",
            "电视配件",
          ],
        },
        {
          title: "空调",
          items: [
            "壁挂式空调",
            "柜式空调",
            "中央空调",
            "一级能效空调",
            "变频空调",
            "1.5匹空调",
            "以旧换新",
          ],
        },
      ],
    },
  },
  {
    titles: ["手机", "运营商", "数码"],
    content: {
      tabs: ["手机"],
      subs: [
        {
          title: "手机",
          items: [
            "曲面电视",
            "超薄电视",
            "OLED电视",
            "4K超清电视",
            "55英寸",
            "65英寸",
            "电视配件",
          ],
        },
        {
          title: "手表",
          items: [
            "壁挂式空调",
            "柜式空调",
            "中央空调",
            "一级能效空调",
            "变频空调",
            "1.5匹空调",
            "以旧换新",
          ],
        },
      ],
    },
  },
  {
    titles: ["电脑", "办公"],
    content: {
      tabs: ["家电馆", "镇乡专卖店", "家电服务"],
      subs: [
        {
          title: "电视",
          items: [
            "曲面电视",
            "超薄电视",
            "OLED电视",
            "4K超清电视",
            "55英寸",
            "65英寸",
            "电视配件",
          ],
        },
        {
          title: "空调",
          items: [
            "壁挂式空调",
            "柜式空调",
            "中央空调",
            "一级能效空调",
            "变频空调",
            "1.5匹空调",
            "以旧换新",
            "壁挂式空调",
            "柜式空调",
            "中央空调",
            "一级能效空调",
            "变频空调",
            "1.5匹空调",
            "以旧换新",
            "壁挂式空调",
            "柜式空调",
            "中央空调",
            "一级能效空调",
            "变频空调",
            "1.5匹空调",
            "以旧换新",
          ],
        },
      ],
    },
  },
  {
    titles: ["家居", "家具", "家装", "厨具"],
    content: {
      tabs: ["家居", "镇乡专卖店", "家电服务"],
      subs: [
        {
          title: "电视",
          items: [
            "曲面电视",
            "超薄电视",
            "OLED电视",
            "4K超清电视",
            "55英寸",
            "65英寸",
            "电视配件",
          ],
        },
        {
          title: "空调",
          items: [
            "壁挂式空调",
            "柜式空调",
            "中央空调",
            "一级能效空调",
            "变频空调",
            "1.5匹空调",
            "以旧换新",
            "壁挂式空调",
            "柜式空调",
            "中央空调",
            "一级能效空调",
            "变频空调",
            "1.5匹空调",
            "以旧换新",
            "壁挂式空调",
            "柜式空调",
            "中央空调",
            "一级能效空调",
            "变频空调",
            "1.5匹空调",
            "以旧换新",
          ],
        },
      ],
    },
  },
];

//左侧 .fs-menu
function renderMenu(data) {
  //创建菜单栏选项区结构
  var menuList = data.reduce(function (prev, item) {
    return (
      prev +
      ` <li class="">
        ${item.titles
          .map(function (title) {
            return `<a href="#"> ${title} </a>`;
          })
          .join("<span>/</span>")}
    </li>`
    );
  }, "");

  $(".fs-menu").html(menuList);
}

renderMenu(menuList);
var timer = null;
$(".fs-menu")
  .on("mouseenter", "li", function () {
    $(this).addClass("active").siblings().removeClass('active');
    //点击时对应的当前的数据索引值
    var index = $(this).index();
    //传递数据进行渲染
    renderMenuContent(menuList[index].content);
    //显示出内容
    $(".menu-content").fadeIn();
  })
  //鼠标移出时移除active样式
  .on("mouseleave", "li", function () {
        var self = this;
        timer = setTimeout(function(){
            $(self).removeClass("active");
        },500)
  });
  $('.menu-content').mouseenter(function(){
        clearTimeout(timer);
  })
  $('.fs-w').mouseleave(function(){
      $('.menu-content').fadeOut();
      clearTimeout(timer);
      timer = setTimeout(function(){
        $('.fs-menu li').removeClass('active')
    },500)
     
      })
//右侧 menu-content

function renderMenuContent(data) {
  //标签区域
  var tabsNav = $('<div class="tabs-nav"></div>');
  //内容区域
  var cateDeatil = $(' <div class="cate-detail"></div>');

  var tabsStr = data.tabs.reduce(function (prev, item) {
    return (
      prev +
      `  <a href="#">
                    ${item}<i class="iconfont">&#xe625;</i>
                    </a>`
    );
  }, "");
  tabsNav.html(tabsStr);
  var cateDetail = "";
  for (var i = 0; i < data.subs.length; i++) {
    var sub = data.subs[i];
    var oDl = $(' <dl class="cate-item"></dl>');
    var oDt = $(` <dt>
            <a href="#">${sub.title}<i class="iconfont">&#xe625;</i>
            </a>
        </dt>`);
    oDl.append(oDt);
    var oDd = $("<dd></dd>");
    var oddStr = sub.items.reduce(function (prev, item) {
      return prev + ` <a href="">${item}</a>`;
    }, "");
    oDd.html(oddStr).appendTo(oDl);
    oDl.appendTo(cateDeatil);
  }
  $(".menu-content").empty().append(tabsNav).append(cateDeatil);
}
