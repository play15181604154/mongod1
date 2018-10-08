function Zhangdan(){
	this.init();
	this.addListenler();
}
$.extend(Zhangdan.prototype,{
	init(){
		$(".menu-zhangdan").addClass("active").siblings().removeClass("active");
		this.loadByPage(1);
		this.loadPage();
	},
	loadPage(){
		const url="/api/zhangdan/findAll";
		$.post(url,(data)=>{
			console.log(data.res_body.data);
			var html="";
			var len=Math.ceil(data.res_body.data.length/5);
			for (var i = 0; i < len; i++) {
				html+=`<li><a href="javascript:;">${i+1}</a></li>`;
			}
			$(".pagination").html(html);
			// $(html).insertAfter(".prev").eq(0).addClass("active")
		})
	},
	loadByPage(page){
		page=page || 1;
		const url="/api/zhangdan/find";
		var data={page,pageCount:5};
		// $.post(url,data,(data)=>{
		// 	console.log(data);
		// 	var html="";
		// 	data.res_body.data.forEach((curr,index)=>{
		// 		 html+=`<tr>
		// 			<td>${curr.no}</td>
		// 			<td>${curr.name}</td>
		// 			<td>${curr.danwei}</td>
		// 			<td>${curr.gongyingshang}</td>
		// 			<td>${curr.count}</td>
		// 			<td>${curr.salary}</td>
		// 			<td>${curr.fukuan}</td>
		// 			<td>${curr.create_time}</td>
		// 			<td><a href="#" data-toggle="modal" data-target="#updateDindanModal" class="btn-update">修改</a> <a href="#" id="btn-deletee">删除</a></td>
		// 		</tr>`
		// 	})
		// 	$(".tbody-zhangdan").html(html);
		// })
		$.ajax({
			"method":"post",
			"url":url,
			"data":data,
			"asyn":false,
			success:function(data){
				console.log(data);
				var html="";
				data.res_body.data.forEach((curr,index)=>{
					 html+=`<tr>
						<td>${curr.no}</td>
						<td>${curr.name}</td>
						<td>${curr.danwei}</td>
						<td>${curr.gongyingshang}</td>
						<td>${curr.count}</td>
						<td>${curr.salary}</td>
						<td>${curr.fukuan}</td>
						<td>${curr.create_time}</td>
						<td class="oparate"><a href="javascript:;" data-toggle="modal" data-target="#updateDindanModal" class="btn-update">修改</a> <a href="javascript:;" id="btn-deletee">删除</a></td>
					</tr>`;
				});
				$(".tbody-zhangdan").html(html);
				
			}
		})
	},

	addListenler(){
		$(".btn-add-zhangdan").on("click",this.addZhangdan);
		$(".pagination").on("click","a",this.loadByPageHandler.bind(this));
		$(".btn-query").on("click",this.query);
		$(".tbody-zhangdan").on("click",".btn-update",this.updateInit);
		$(".btn-update-zhangdan").on("click",this.update);
		$(".tbody-zhangdan").on("click","#btn-deletee",this.delete);
	},
	loadByPageHandler(e){
		var src=e.target;
		// console.log($(src).html());
		var page=$(src).html();
		// console.log(this);
		this.loadByPage(page);
	},
	addZhangdan(){
		var data=$(".add-zhangdan-form").serialize();
		data=decodeURIComponent(data,true);
		// console.log(data);
		const url="/api/zhangdan/add";
		// console.log($("#addShangpingGongyingshang").val());
		// console.log($("input[type='radio']:checked").val());
		$.post(url,data,(data)=>{
			// console.log(111);
			console.log(data);
			if (data.res_code) {
				alert("添加成功");
				window.location.reload();
			}else{
				alert("添加失败");
			}


		})
	},
	query(){
		var data=$(".query-form").serialize();
		data=decodeURIComponent(data,true);
		// console.log(data);
		// console.log(111);
		
		const url="/api/zhangdan/query";
		$.post(url,data,(data)=>{
			console.log(data);
			// console.log(data);
			var html="";
			data.res_body.data.forEach((curr,index)=>{
				 html+=`<tr>
					<td>${curr.no}</td>
					<td>${curr.name}</td>
					<td>${curr.danwei}</td>
					<td>${curr.gongyingshang}</td>
					<td>${curr.count}</td>
					<td>${curr.salary}</td>
					<td>${curr.fukuan}</td>
					<td>${curr.create_time}</td>
					<td><a href="javascript:;" data-toggle="modal" data-target="#updateDindanModal" class="btn-update">修改</a> <a href="javascript:;" id="btn-deletee">删除</a></td>
				</tr>`
			})
			$(".tbody-zhangdan").html(html);
			var str="";
			var len=Math.ceil(data.res_body.data.length/5);
			for (var i = 0; i < len; i++) {
				str+=`<li><a href="javascript:;">${i+1}</a></li>`;
			}
			$(".pagination").html(str);
			
		})
		return false;
	},
	updateInit(event){
		console.log(1);
		var src=event.target;
		var dom=$(src).parent().parent().children();
		// console.log(dom);
		$("#updateShangpingNo").val(dom.eq(0).html());
		$("#updateShangpingName").val(dom.eq(1).html());
		$("#updateShangpingDanwei").val(dom.eq(2).html());
		$("#updateShangpingCount").val(dom.eq(3).html());
		$("#updateShangpingSalary").val(dom.eq(4).html());
		$("#updateShangpingGongyingshang").val(dom.eq(5).html());
		$("#updateShangpingFukuan").val(dom.eq(6).html());
		
	},
	update(){
		var data=$(".update-zhangdan-form").serialize();
		data=decodeURIComponent(data,true);
		console.log(data);
		// var aaa=8;
		// data=data+"&price="+aaa;
		// console.log(data);
		const url="/api/zhangdan/update";
		$.post(url,data,(data)=>{
			console.log(data);
			if (data.res_code) {
				alert("修改成功");
				window.location.reload();
			}else{
				alert("修改失败");
			}
			
		})
	},
	delete(event){
		var src=event.target;
		// console.log(1111);
		var data=$(src).parent().parent().children().eq(0).html();
		// console.log(data);
		const url="/api/zhangdan/delete";
		$.post(url,{no:data},(data)=>{
			console.log(data);
			if (data.res_code) {
				alert("删除成功");
				window.location.reload();
			}else{
				alert("删除失败");
			}
		})
	}
})
new Zhangdan();