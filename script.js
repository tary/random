$(function () {
	var run = 0,
		heading = $("h1"),
		popbox = $("#popbox-wrapper"),
		timer;

	$("#start").click(function () {
		var list = $("#list").val().replace(/ +/g, " ").replace(/^ | $/g, "").split(" ");
		if (list.length == 1 && list[0] != "") return alert("→_→ 耍我是吧，一个有什么好选的！");
		if (list.length == 1) return alert("啥也没有，吃西北风去啊？");
		if (!run) {
			heading.html(heading.html().replace("！", "？"));
			$(this).val("停止");
			timer = setInterval(function () {
				var r = Math.ceil(Math.random() * list.length),
					food = list[r - 1];
				$("#what").html(food);
				var rTop = Math.ceil(Math.random() * $(document).height()),
					rLeft = Math.ceil(Math.random() * ($(document).width() - 50)),
					rSize = Math.ceil(Math.random() * (37 - 14) + 14);
				$("<span class='temp'></span>").html(food).hide().css({
					"top": rTop,
					"left": rLeft,
					"color": "rgba(0,0,0,." + Math.random() + ")",
					"fontSize": rSize + "px"
				}).appendTo("body").fadeIn("slow", function () {
					$(this).fadeOut("slow", function () {
						$(this).remove();
					});
				});
			}, 50);
			run = 1;
		} else {
			heading.html(heading.html().replace("？", "！"));
			$(this).val("不行，换一个");
			clearInterval(timer);
			run = 0;
			//alert(document.getElementById("what").innerHTML);
		};
	});

	$("#cfg").click(function () {
		run ? alert("还在选呢！") : popbox.fadeIn();
	});

	$("#ok").click(function () {
		popbox.fadeOut();
	});

	document.onkeydown = function enter(e) {
		var e = e || event;
		if (e.keyCode == 13 && !popbox.is(":visible")) $("#start").trigger("click");
	};
});