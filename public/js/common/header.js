function Header() {
	this.createDom();
	this.loadModal();
	this.loadUser();
	this.addListener();
}

// 头部导航的布局DOM节点
Header.navTemplate = `<nav class="navbar navbar-default navbar-inverse" id="backage">
	  <div class="container-fluid"">
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
	    </div>
		<a class="navbar-brand" href="#"><img src="../../imgs/buy.png"/></a>
	    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	      <ul class="nav navbar-nav">
	        <li class="index-page">
	        	<a class="navbar-brand" href="#">超市账单管理系统</a>
	        </li>
	      </ul>
	      <ul class="nav navbar-nav navbar-right reg-login-link">
	        <li data-toggle="modal1" data-target="#loginModal1"><a href="../../html/login.html" id="reg">登录</a></li>
	        <li data-toggle="modal" data-target="#regModal"><a href="#" id="reg">注册</a></li>
	      </ul>
	      <ul class="nav navbar-nav navbar-right hidden welcome-logout-link">
	        <li><a href="#" id="reg">欢迎：</a></li>
	        <li><a href="javascript:void(0)" class="logout-link" id="reg">注销</a></li>
	      </ul>
	    </div><!-- /.navbar-collapse -->
	  </div><!-- /.container-fluid -->
	</nav>`; 
Header.navBody =`<li class="l1"><a href="">功能列表</a></li>
			<li class="l2 sum"><a href="/html/sumBill.html"><img src="/imgs/zd.png"/>账单管理</a></li>
			<li class="pro"><a href="/html/prover.html"><img src="/imgs/gys.png"/>供应商管理</a></li>
			<li class="position-page"><a href="/html/position.html"><img src="/imgs/yh.png"/>用户管理</a></li>
			<li class="pass"><a href="/html/password.html"><img src="/imgs/mm.png"/>密码修改</a></li>
			<li class="exit"><a href=""><img src="/imgs/tc.png"/>退出系统</a></li>`;
$.extend(Header.prototype, {
	// 创建导航DOM节点
	createDom() {
		// 将导航追加到 <header> 元素内部
		$(Header.navTemplate).appendTo("header");
		$(Header.navBody).appendTo("#ul1");
	},
	// 生成使用的模态框
	loadModal() {
		// 注册
		new RegisterModal();
		// 登录
		new LoginModal();
	},
	// 加载用户登录信息
	loadUser() {
		// 从 sessionStorage 中获取登录成功的用户信息
		let user = sessionStorage.loginUser;
		if (!user) // 没有登录成功的用户，结束函数调用
			return;

		// 还原解析为JS中的对象
		user = JSON.parse(user);
		$(".reg-login-link").hide()
									  .next(".welcome-logout-link")
									  .removeClass("hidden")
									  .find("a:first").text("欢迎：" + user.username);
	},
	// 注册事件监听
	addListener() {
		// 点击“注销”链接，退出登录
		$(".logout-link").on("click", this.logoutHandler);
	},
	// 注销处理
	logoutHandler() {
		// 访问后端注销的接口
		$.get("/api/user/logout", ()=>{				
			// 清除 sessionStorage 中保存的数据
			sessionStorage.removeItem("loginUser");
			// 刷新
			location.reload();
		});
	}
});

// 创建头部Header对象
new Header();