webpack 相关测试

npm init -y  初始化

npm install webpack --save-dev  安装webpack

npm install html-webpack-plugin --save-dev  安装自动生成html的插件

npm install webpack-merge --save-dev


npm install extract-text-webpack-plugin --save-dev

> merge = require("webpack-merge")   合并时使用
> merge(
{ a: [1], b: 5, c: 20 },
{ a: [2], b: 10, d: 421 }
)
{ a: [ 1, 2 ], b: 10, c: 20, d: 421 }



nginx 前端反向代理的一个工具


http-server -p 8881 --> 本地开发环境  数据的服务器


GraphApp
	api -->
		config.js  --> ajax请求路径
		index.js   ---> 封装ajax
	components
		必要组件与视图组件
	store
		vuex  
		HospitalStore
			action  异步操作（ajax）所需要编写代码的地方
			state  管理状态的地方
			muation  更新状态的地方
			//getters

做完之后好好测试
todolist:
   顶部路由的样式修改 y
   弹出框表单验证 y
   签约详情图片的显示 且要放大显示 y
   签约详情不成功的展示 y
   体格数据 正常、偏高、偏低的样式展示 y
   体格数据详情页的展示（涉及4个图表） ----》龚一峰
   体格数据 添加建议所涉及的逻辑（添加提示、表单验证，添加成功、添加失败展示）--》龚一峰
   文章列表删除的逻辑，及其样式，还有是否的样式
   添加文章 验证逻辑  上传图片 
   文章分类  --》龚一峰
   账号管理权限设置细节处理下 后台交互 
   反馈详情 提到顶部菜单栏（服务评价、服务详情不做）