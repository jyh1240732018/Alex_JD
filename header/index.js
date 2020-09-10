/**
 * 两个问题
 * 1.如何实现鼠标移入就有动画   不管移入几次
 *      解决方案 ： 可以每次hover的时候重新加载图片
 *                  重复加载的前提条件是当前没有动图在执行
 *      方法：改变图片中路径的参数
 * 2.动画结束完成 鼠标移出这个区域 动图立即消失
 *
 * 3.动画还没有完成  鼠标就移出了  怎么让动画结束之后再让动画消失
 *
 *  解决以上3个问题的方法
 *      在动图开始的时候添加class类名
 *      在动图结束的时候移除开始的标志  添加结束的标志
 *      在鼠标移出logo区域的时候  标志移出
 */

//动画logo区域

(function(){
  $(".logo").hover(
    function () {
        $('.logo-title').removeClass('hover-out');
      if (!$(".logo-bg").hasClass("animate-start")) {
        $(".logo-title").removeClass("animate-end"); //第一次动画结束后，下一次开始的时候吧它移除掉
        $(".logo-bg")
          .css({
            backgroundImage:
              'url("http://img1.360buyimg.com/da/jfs/t1/15264/1/11653/343050/5c90a38aEdb3eb3a8/f0c3252484139946.gif?v=' +
              new Date().getTime() +
              '")',
          })
          .addClass("animate-start");
  
        // 含有这个类名证明动画还没有结束
        setTimeout(function () {
          $(".logo-bg").removeClass("animate-start"); // 动画5秒后结束了就移除掉
          $(".logo-title").addClass("animate-end"); //添加class类名标志着动画结束
        }, 5000);
      }
  
      $(".logo-title").addClass("show-bg");
    },
    function () {
      if (!$(".logo-bg").hasClass("animate-start")) {
        $(".logo-title").addClass("animate-end");
        $(".logo-title").removeClass("show-bg");
       
      }
      $('.logo-title').addClass('hover-out');
    }
  );
  
 window.dealData = function (res) {
    console.log(res);
    var data = res.result;
    var str = "";
    data.forEach(function (item) {
      str += `<li>${item[0]}</li>`;
    });
    $(".search-list").html(str).show();
  }
  
  var timer = null;
  //动态添加搜索词条
  $("#search-inp").on("input", function () {
    //JQ中没有input事件，这里我们用on + 关键字方法
    clearTimeout(timer);
    var val = $(this).val();
    timer = setTimeout(function () {
      //节流
  
      $.ajax({
        //用的taobao 的 接口
        url: "https://suggest.taobao.com/sug",
        data: {
          // code=utf-8&q=y&callback=jsonp224&k=1&area=c2c&bucketid=9
          code: "utf-8",
          q: val, //代表拿那个关键词来检索
          callback: "dealData",
        },
        dataType: "jsonp",
        type: "get",
      });
    }, 500);
  });
  
  $(".search-box").mouseleave(function () {
    $(".search-list").hide();
  });
  
  $('#search-inp').click(function(){
          $('.search-list').show()
  })
})


//防抖是   防止短时间内重复加载   也就是添加延迟加载  
//节流  是指如果当前有加载  则不进行下一次加载