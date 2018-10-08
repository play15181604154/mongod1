/* 注册-模态框 */
function LoginModal() {
	
	this.load();
	this.addListener();
}

// 模态框DOM节点模板


$.extend(LoginModal.prototype, {
	// 创建DOM节点
	
	// 页面加载
	load() {
		// 显示验证码
		$.getJSON("/api/captcha", (data)=>{
			$(".captcha-container").html(data.res_body.data);
		});
	},
	// 注册事件监听
	addListener() {
		// 登录
		$(".btn-login").on("click", this.loginHandler);
		// 刷新验证码
		$(".captcha-container").on("click", this.load);
		// 验证码文本框失去焦点，校验
		$("#loginCaptcha").on("blur", this.verify)
	},
	// 校验验证码
	verify() {
		$.getJSON("/api/verify_captcha", {captcha: $("#loginCaptcha").val()}, (data)=>{
			if (data.res_body.valid) {
				$("#captcha-info").text("正确")
			} else {
				$("#captcha-info").text("错误")
			}
		});
	},	
	// 登录处理
	loginHandler() {
		// todo：表单校验
		const url = "/api/user/login", // URL
			data = $(".login-form").serialize(); // 向服务器提交的数据
		console.log(data);
		$.post(url, data, (data)=>{
			console.log(data);
			// 处理响应数据
			if (data.res_code === 1) { // 登录成功
				// 将登录成功的用户信息保存到 sessionStorage 中
				sessionStorage.loginUser = JSON.stringify(data.res_body.data);
				// 刷新页面
				window.location.href="/index.html";
			} else { // 登录失败
				$(".login-error").removeClass("hidden");
			}
		});
	}
});
