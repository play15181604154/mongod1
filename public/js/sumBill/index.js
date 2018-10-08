function Position() {
	this.init();
	this.addListener();
}

$.extend(Position.prototype, {
	// 初始化
	init() {
		// 加载时，"职位管理" 导航激活
		$(".sum").addClass("ac").siblings().removeClass("ac");
		// 加载第1页数据
		this.loadByPage(1);
	},
	// 按页加载职位信息
	loadByPage(page) {
		// page 是待加载的页面，默认加载第1页
		page = page || 1;
		// ajax 访问查询接口
		$.get("/api/position/find", {page}, (data)=>{
			let html = "";
			data.res_body.data.forEach((curr, index)=>{
				html += `<tr>
					<td>${index+1}</td>
					
					<td>${curr.name}</td>
					<td>${curr.salary}</td>
					<td>${curr.address}</td>
					<td><a href="javascript:void(0);">修改</a> <a href="javascript:void(0);">删除</a></td>
				</tr>`;
			});
			// 显示
			$(".position-table tbody").html(html);
			$(".place").html("账单管理页面");
		});
	},
	// 注册事件监听
	addListener() {
		// 点击页面翻页
		// $(".pagination").on("click", "a", this.loadByPageHandler.bind(this));
		$(".pagination").on("click", "a", $.proxy(this.loadByPageHandler, this));
		// 添加职位
		$(".btn-add-pos").on("click", this.addPosHandler);
	},
	// 点击翻页处理
	loadByPageHandler(event) {
		const src = event.target;
		// 页面
		const page = Number($(src).text()) || 1;
		// 加载
		this.loadByPage(page);
		// 激活
		$(src).parent().addClass("active").siblings().removeClass("active");

		return false;
	},
	// 添加职位处理
	addPosHandler() {
		/*const url = "/api/position/publish",
			data = $(".add-pos-form").serialize();
		$.getJSON(url, data, (data)=>{
			// 将添加成功的数据追加到页面表格最后
			const curr = data.res_body.data
			const html = `<tr>
					<td></td>
					<td><img src="${curr.logo}"></td>
					<td>${curr.name}</td>
					<td>${curr.salary}</td>
					<td>${curr.address}</td>
					<td><a href="javascript:void(0);">修改</a> <a href="javascript:void(0);">删除</a></td>
				</tr>`;
			$(".position-table tbody").append(html);
			// 关闭模态框
			$("#addPosModal").modal("hide");
		});*/

		// 涉及到上传文件，使用 FormData
		let formData = new FormData($(".add-pos-form")[0]);
		let url = "/api/position/publish";
		// ajax上传
		$.ajax({
			type : "post",
			url,
			data : formData,
			dataType : "json",
			processData: false, // 不转换 data 向服务器提交的数据（默认是将对象转换为查询字符串）
			contentType: false, // 默认是application/x-www-form-urlencoded，修改为 "multipart/form-data"
			success(data) {
				// 将添加成功的数据追加到页面表格最后
				const curr = data.res_body.data
				const html = `<tr>
						<td></td>
						<td><img src="${curr.logo}"></td>
						<td>${curr.name}</td>
						<td>${curr.salary}</td>
						<td>${curr.address}</td>
						<td><a href="javascript:void(0);">修改</a> <a href="javascript:void(0);">删除</a></td>
					</tr>`;
				$(".position-table tbody").append(html);
				// 关闭模态框
				$("#addPosModal").modal("hide");
			}
		});
	}
});

new Position();