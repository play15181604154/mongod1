function Position() {
	this.init();
	this.addListener();
}

$.extend(Position.prototype, {
	// 初始化
	init() {
		// 加载时，"职位管理" 导航激活
		$(".position-page").addClass("ac").siblings().removeClass("ac");
		// 加载第1页数据
		this.loadByPage(1);
		this.loadPage();
	},
	loadPage(){
		const url="/api/user/findAll";
		$.post(url,(data)=>{
			console.log(data.res_body.data);
			var html="";
			var len=Math.ceil(data.res_body.data.length/5);
			for (var i = 0; i < len; i++) {
				html+=`<li class="ll"><a href="javascript:;">${i+1}</a></li>`;
			}
			$(".pagination").html(html);
			$(".ll").eq(0).addClass("active");
			// $(html).insertAfter(".prev").eq(0).addClass("active")
		})
	},
	// 按页加载职位信息
	loadByPage(page) {
		// page 是待加载的页面，默认加载第1页
		page = page || 1;
		// ajax 访问查询接口regcode,username, password, sex,sr,phone,address
		$.get("/api/user/find", {page}, (data)=>{
			let html = "";
			data.res_body.data.forEach((curr, index)=>{
				html += `<tr>
					<td>${curr.regcode}</td>
					<td>${curr.username}</td>
					<td>${curr.sex}</td>
					<td>${curr.sr}</td>
					<td>${curr.phone}</td>
					<td>${curr.address}</td>
					<td><a href="javascript:void(0);"><img src="/imgs/xiugai.png" data-toggle="modal" data-target="#XGModal" class="xgl"/></a> <a href="javascript:void(0);" class="del"><img src="/imgs/schu.png"/></a></td>
				</tr>`;
			});
			// 显示
			$(".position-table tbody").html(html);
			$(".place").html("用户管理页面");
		});
	},
	// 注册事件监听
	addListener() {
		// 点击页面翻页
		// $(".pagination").on("click", "a", this.loadByPageHandler.bind(this));
		$(".pagination").on("click", "a", $.proxy(this.loadByPageHandler, this));
		//查找
		$("#find").on("click", this.findHandler);
		//修改
		$(".prove-tbody").on("click", ".xgl",this.XGHandler);
		//删除
		$(".prove-tbody").on("click", ".del",this.delHandler);
		
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
	//查询供应商信息处理
	findHandler(name) {
		name = $("#findName1").val();
		console.log(name);
		$.get("/api/user/findOne",{name}, (data)=>{
			console.log(data);
			let html = "";
			data.res_body.data.forEach((curr, index)=>{
				html += `<tr>
					<td class="num">${curr.regcode}</td>
					<td>${curr.username}</td>
					<td>${curr.sex}</td>
					<td>${curr.sr}</td>
					<td>${curr.phone}</td>
					<td>${curr.address}</td>
					<td><a href="javascript:void(0);"><img src="/imgs/xiugai.png" data-toggle="modal" data-target="#XGModal" class="xgl"/></a> <a href="javascript:void(0);" class="del"><img src="/imgs/schu.png"/></a></td>
				</tr>`;
			});
			// 显示
			$(".position-table tbody").html(html);
		});
	},
	// 修改处理
	XGHandler(event) {
		var src=event.target;
		var name=$(src).parent().parent().parent().children().eq(1).html();
		var role=$(src).parent().parent().parent().children().eq(2).html();
		var phone=$(src).parent().parent().parent().children().eq(3).html();
		var address=$(src).parent().parent().parent().children().eq(4).html();
		var call=$(src).parent().parent().parent().children().eq(5).html();
		
		var name1=$("#addName1").val(name);
		var role1=$("#addRole1").val(role);
		var phone1=$("#addPhone1").val(phone);
		var address1=$("#addAddress1").val(address);
		var call1=$("#addCall1").val(call);
		$(".btn-xg").on("click", function(){
			var num=$(src).parent().parent().parent().children().eq(0).html();
			console.log(num);
			const url = "/api/user/reWrite";
			var data = $(".xg-pos-form").serialize();
			var data = decodeURIComponent(data,true);
			var data = data+"&num="+num;
			console.log(data);
		$.get(url, data, (data)=>{
			// 将修改成功的数据重新刷新
			console.log(data);
			window.location.reload();
			// 关闭模态框
			$("#XGModal").modal("hide");
		});
		});
		
	},
	//删除处理
	delHandler(event) {
		if(confirm("确定删除吗")){
			var src=event.target;
			var num=$(src).parent().parent().parent().children().eq(0).html();
			console.log(num);
			$.get("/api/user/del",{num}, (data)=>{
				console.log(data);
				var num2 =$(src).parent().parent().parent().children();
				num2.remove();
			});
		}
	}
	
});

new Position();