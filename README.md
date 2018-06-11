# 微信小程序

> 上次用原生的wxml、wxss写了一个小程序,写完之后的感觉就是体验特别不好,特别是写wxss很烦人,上次还是借助webstrom的一个功能写的less自动转的wxss,最后还是艰难的写完了。今年年初,美团点评开源了[mpvue](http://mpvue.com),用[vue](https://cn.vuejs.org/)的语法写小程序,真的是福音,所以就上手试了一下。

### 本项目分为前后端

#### 前端以vue为主,参考mpvue、vue、小程序API等实现。

#### 后端以[koa2](https://koa.bootcss.com/)为server, 数据库用的mongodb,作为数据的存储和数据的输入、输出。

#### 线上使用centos7.x 服务器,搭配pm2 管理线上的node进程,使用nginx服务器的反向代理和域名配置。


上线后的小程序小程序码欢迎体验:
> 时间太久可能会被关闭



![](./server/public/xiaochengxu.jpg)
