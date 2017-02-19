window.onload=function(){
//banner轮播
function number1(){
	var banner=$(".banner")[0];
	var imgbox=$(".imgbox")[0];
	var imgs=$("a",imgbox);

	var zbtn=$(".zbtn")[0];
	var ybtn=$(".ybtn")[0];
	for (var i = 1; i < imgs.length; i++) {
		imgs[i].style.left="1440px";
	};
	var now=0;
	var next=0;
	function ymove(){
	    next++;
	    if (next>=imgs.length) {
	    	next=0;
	    };
	    imgs[now].style.left="0";
	    imgs[next].style.left="1440px";
	    animate(imgs[now],{left:-1440});
	    animate(imgs[next],{left:0});
	    now=next;
	}
var t=setInterval(ymove,2000);
banner.onmouseover=function(){
	clearInterval(t);
}
banner.onmouseout=function(){
	t=setInterval(ymove,2000);
}

	function zmove(){
		next--;
		if (next<=0) {
			next=4;
		};
		imgs[now].style.left="0";
		imgs[next].style.left="-1440px";
		animate(imgs[now],{left:1440});
	    animate(imgs[next],{left:0});
	    now=next;
	}
	zbtn.onclick=function(){
		zmove();
	}
	ybtn.onclick=function(){
		ymove();
	}

}
number1()	



//下拉菜单
function number2(){
	var xl=$(".xl");
	var xlcd=$(".xlcd");
	for (var i = 0; i < xl.length; i++) {
		xl[i].aa=i;
		xl[i].onmouseover=function(){
		xlcd[this.aa].style.display="block";
		}
		xl[i].onmouseout=function(){
			xlcd[this.aa].style.display="none";
		}
	};
}
number2()



//新闻页面轮播
function number3(){
	var jq=jQuery.noConflict();
	jq(".imgs>a").each(function(i,obj){
		if (i==0) {
			jq(obj).css({left:6});
		}else{
			jq(obj).css({left:198});
		}
	})
	var now2=0;
	var next2=0;
	function move(){
	    next2++;
	    if (next2>=jq(".imgs>a").length) {
	    	next2=0;
	    };
	    jq(".imgs>a").eq(now2).css({left:6});
	    jq(".imgs>a").eq(next2).css({left:198})
	    jq(".imgs>a").eq(now2).animate({left:-186});
	    jq(".imgs>a").eq(next2).animate({left:6});
	    jq(".btn>div").removeClass().eq(next2).addClass("active");
	    now2=next2;
	}
	var t3=setInterval(move,2000)
	jq(".btn>div").mouseover(function(){
		jq(".imgs>a").stop(true,true)
		var index=jq(this).index();
		next2=index;
		jq(".btn>div").removeClass().eq(next2).addClass("active");
		jq(".imgs>a").eq(now2).css({left:6});
	    jq(".imgs>a").eq(next2).css({left:198});
	    jq(".imgs>a").eq(now2).animate({left:-186});
	    jq(".imgs>a").eq(next2).animate({left:6});
	    now2=next2;
	})
}
number3()






//公司业绩移入效果
var jq=jQuery.noConflict();
jq(".caselist").each(function(i,obj){
	jq(obj).mouseover(function(){
		jq(".yinying").finish();
		jq(".yinying").eq(i).animate({height:126})
	})
	jq(obj).mouseout(function(){
		jq(".yinying").finish();
		jq(".yinying").animate({height:0})
	})
})












}
	
















