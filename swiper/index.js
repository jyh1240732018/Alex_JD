/**
 * 封闭作用域 使用立即执行函数
 */

(function ($) {
  function Swiper(options, wrap) {
    this.list = options.list || [];
    this.width = options.width || $(wrap).width();
    this.height = options.height || $(wrap).height();
    this.type = options.type || 'fade';
    this.autoChange =typeof options.autoChange === "undefined" ? true : options.autoChange;
    this.autoTime = options.autoTime || 5000;
    this.showSpotBtn =typeof options.showSpotBtn === "undefined" ? true : options.showSpotBtn;
    this.showChangeBtn = options.showChangeBtn || "always";
    this.spotPosition = options.spotPosition || "left";
    this.num = this.list.length;
    this.spotColor = options.spotColor || "red";
    this.wrap = wrap;
    this.nowIndex = 0;
    this.timer = null;

    //判断当前是否有动画执行
    this.flag= true;  // 加一个锁调节定时器的问题


  }

  /**
   *
   *
   * 写在原型链上  ，内存中只需要一个空间去存储init这个方法，省空间
   *
   */

  //初始化结构和行为
  Swiper.prototype.init = function () {
    this.creatDom();
    this.initStyle();
    this.bindEvent();
    if(this.autoChange){
      this.autoChangeFn();
    }
  };

  //创建html结构
  Swiper.prototype.creatDom = function () {
    var swiperWrapper = $('<div class = "my-swiper"></div>');
    var domList = $('<ul class="my-swiper-list"></ul>');
    var spotsBtn = $('<div class="my-swiper-spots"></div>');
    var len = this.list.length;
    for (var i = 0; i < len; i++) {
      var oLi = $('<li class="my-swiper-item"></li>');
      oLi.append(this.list[i]).appendTo(domList);
      spotsBtn.append($("<span></span>"));
    }
    if(this.type === "animation"){
        domList.append(
          $('<li class="my-swiper-item"></li>').append(
            $(this.list[0]).clone(true)
          )
        );
    }

    var leftBtn = $('<div class="my-swiper-btn my-swiper-lbtn">&lt</div>');
    var rightBtn = $('<div class="my-swiper-btn my-swiper-rbtn">&gt</div>');
    swiperWrapper.append(domList)
                 .append(leftBtn)
                 .append(rightBtn)
                 .append(spotsBtn)
                 .appendTo(this.wrap)
      .addClass("my-swiper-" + this.type);
  };
  //动态设置样式
  Swiper.prototype.initStyle = function () {
    $('.my-swiper', this.wrap).css({
      width: this.width,
      height: this.height
    }).find('.my-swiper-list').css({
            width: this.type === 'animation' ? this.width * (this.num + 1) : this.width,
    }).find('.my-swiper-item').css({
        width : this.width,
    }).end().end().find('.my-swiper-spots').css({
        textAlign:this.spotPosition,
        display:this.showSpotBtn ? 'block' : 'none'
    }).find('span').eq(this.nowIndex).css({
          backgroundColor:this.spotColor
    });
      if(this.type === 'fade'){
        $('.my-swiper > .my-swiper-list > .my-swiper-item',this.wrap).css({
              display:'none'
        }).eq(this.nowIndex).css({
          display:'block'
        })
      }


    if(this.showChangeBtn === 'always'){
      $('.my-swiper > .my-swiper-btn',this.wrap).css({
        display : 'block'
      })
    }else if(this.showChangeBtn === 'hidden'){
      $('.my-swiper > .my-swiper-btn',this.wrap).css({
        display:'none'
      })
    }else if (this.showChangeBtn === 'hover'){
      $(".my-swiper > .my-swiper-btn",this.wrap).css({
        display:'none'
      })
        var self = this;
      $('.my-swiper',this.wrap).hover(function(){
        console.log(self);


        $('.my-swiper > .my-swiper-btn',self.wrap).css({
          display:'block'
        })
      },function(){
        $('.my-swiper > .my-swiper-btn',self.wrap).css({
          display:'none'
        })
      })
    }
  };

  //实现动效行为
  Swiper.prototype.bindEvent = function () {
    //左侧按钮 
        var self = this;
      $('.my-swiper > .my-swiper-lbtn',this.wrap).click(function(){
              if(self.flag){
                self.flag = false;
              }
            if(self.nowIndex === 0){
              if(self.type === 'animation'){
                $('.my-swiper-list',self.wrap).css({
                    left: -self.num * self.width  //当前图片的数量 * 当前图片的宽度 
                });
              }
              self.nowIndex = self.num - 1;
            }else{
              self.nowIndex--;
            }
            self.changePage();
      })


      $(".my-swiper > .my-swiper-rbtn",this.wrap).click(function(){
        //右侧按钮
        if(self.flag){
          self.flag = false;
        }
        if(self.type === "animation"){
          if(self.nowIndex === self.num){
            $(".my-swiper-list",self.wrap).css({
                left:0,
            });
            self.nowIndex = 1
          }else{
            self.nowIndex ++ ;
          }
        }else{
          if(self.flag){
            self.flag = false;
          }
          if(self.nowIndex === self.num - 1){
            self.nowIndex = 0
          }else{
            self.nowIndex ++;
          }
          
        }

        self.changePage();
      })


      $(".my-swiper-spots > span", this.wrap).mouseenter(function () {
        //  判断的当前是否有动画正在执行如果有动画在执行那么不进行下面的动画如果没有则继续执行动画
       
      //   当前小圆点对应的索引值

        if(self.flag){
                self.flag = false;
              }
        var index = $(this).index();
        self.nowIndex = index;
        self.changePage();
      });
       //当鼠标移入到当前轮播区域的时候，我们需要把自动轮播的行为停止
       $('.my-swiper',this.wrap).mouseenter(function(){
        clearInterval(self.timer);
        }).mouseleave(function(){
          if(self.autoChange){ // 如果允许自动轮播的话，就让他自动轮播
              self.autoChangeFn();
          }
        })
  }
     

     
  //自动轮播 
  Swiper.prototype.autoChangeFn = function(){
      var self = this;
      clearInterval(this.timer);  // 浏览器每16秒左右会重新渲染瞎页面，使用setinterval看可能会导致定时器叠加，出现失帧，我们在这清除一下，或者使用settimeout都可以
    this.timer = setInterval(function(){
      clearInterval(this.timer);
      $(".my-swiper > .my-swiper-rbtn",self.wrap).trigger('click'); // 就是触发一个从左到右的运动  就是触发右测按钮的点击事件 
      
    },this.autoTime);
  };




  //实现轮播的效果 
  Swiper.prototype.changePage = function(){
            var self = this;
            if(this.type === 'animation'){
              $('.my-swiper-list',this.wrap).animate({
                left: -this.nowIndex * this.width
              },function(){
                  self.flag = true;
              })
            }else{
              $('.my-swiper-list > .my-swiper-item',this.wrap).fadeOut().eq(this.nowIndex).fadeIn(function(){
                self.flag = true;
              });
                
            }
            $('.my-swiper-spots > span',this.wrap).css(
              {backgroundColor:'#fff'}).eq(this.nowIndex % this.num).css({
                backgroundColor:this.spotColor
            })
  }


  $.fn.extend({
    swiper: function (options) {
      var obj = new Swiper(options, this);
      obj.init();
    },
  });

  
})($ || jQuery);
