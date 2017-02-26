# wangpq-gome-frontend-develop-plugin
国美前端开发UI和控件

## 介绍
目前，国美大部分项目前端开发基于GFE(GFE全名为国美在线前端开发集成解决方案，英文名Gome Front-end integrated solution，目的是为了解决前端开发中自动化工具、性能优化、模块化框架、开发规范、代码部署、开发流程等一系列问题，统一前端规范标准，提高项目开发效率)，关于GFE这里我不会介绍，我们来看看在国美详情页中我们用到的一些常用或者比较好的JS插件。我写了一些简单的示例放在了demo文件中。

## 插件列表(只包含示例中的一些插件)
- gTimer  倒计时 
- gScroll 多图滚动
- categorys 分类导航
- gPage 分页 
- gAutoNum 购买数量  
- jCarouselLite 滚动插件 
- gLoad 滚动触发加载 
- scrollspy 滚动监听
- gSlider1 焦点图(轮播图)
- lazyLoad 懒加载 
- loadsrc 替换图片SRC 
- gTab 选项卡  
- gTabs 选项卡(TAB)切换 
- floorTab 延时触发TAB 
- slimscroll 自定义滚动条 
- observer 自定义事件触发器 
- gAutoCounts 自动计数 
- 下拉加载 dropload.html
- 商品展示 jgroll.html
- 国美详情页UI组件.html

## 推荐

  gLoad、observer、floorTab
  
### gLoad  滚动(可视范围内)触发加载 
  我们知道，在一个大型的商城页面中，会有很多很多的内容，为了提升用户体验，我们会让在页面可视范围以外的内容暂停加载，这时候我们就可以使用到gLoad插件了。当我们的页面元素出现的时候，使用到gLoad的元素将会执行gLoad的事件动作一次，当再次出现的时候，不再执行gLoad触发后的动作。gLoad特别适合页面中使用异步数据来绑定的元素。

  示例： http://wangpq.github.io/wangpq-gome-frontend-develop-plugin/demo/滚动触发加载%20gload.html
  
### floorTab 延时触发TAB  
  当我们页面中的选项卡内容使用异步赋值加载，而选项卡使用的是hover的触发方式时，我们不希望鼠标不经意间从上划过，选项卡就去执行AJAX，而是希望它能有一定的延时，停留在上面的时间超过我们规定的时间，才让它触发hover的事件，floorTab给了我们这样的选择。

  示例： http://wangpq.github.io/wangpq-gome-frontend-develop-plugin/demo/延时触发TAB%20floorTab.html
  
  
### observer 自定义事件触发器
  有时候一个异步数据会返回给我们很多数据，我们会根据返回的数据执行一个或多个不同的动作，而我们又不想把所有的动作都稀里哗啦地都弄在一个函数里面进行处理，我们希望代码能够看起来清晰，一个处理一个模块，不用的时候还能够销毁。嘿嘿，observer，我们可以用到它啦！ 

  示例： http://wangpq.github.io/wangpq-gome-frontend-develop-plugin/demo/自定义事件触发器%20observer.html
  
  
### 综合示例
  将几个比较常用的插件使用到了这个示例页面中！ 

  链接： http://wangpq.github.io/wangpq-gome-frontend-develop-plugin/demo/国美详情页UI组件.html
  
  
  
  
  
 
  
  
  

  

