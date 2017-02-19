//2016.08.29
//1.解决通过类名获取元素的兼容问题 
function getClass(classname,father){
	father=father||document;
	//判断浏览器
	if (father.getElementsByClassName) {//现代浏览器
		return father.getElementsByClassName(classname);
	}else{//IE
		var all=father.getElementsByTagName("*");
		//所有的标签
		// ["<div class='inner'></div>","<div class='box'></div>",
		// "<div class='inner'></div>","<div class='inner'></div>",
		// "<div class='inner'></div>","<div class='inner'></div>"]
		var newarr=[];
		for (var i = 0; i < all.length; i++) {
			//遍历所有标签
			if (checkRep(classname,all[i].className)) {
				//判断是否有这个名字
				newarr.push(all[i]);//有的话放入新数组里
			};
			
		};
	}
	return newarr;
}
function checkRep(val,str){
	//把字符串转换为数组
	var arr=str.split(" ");
	//遍历
	for(var i in arr){
		if (val==arr[i]) {
			return true;
		};
	}
	return false;
}


/********************************************/
//2016.8.30
//2、获取样式的值的兼容函数
function getStyle(obj,attr){//对象、属性名
	if (obj.currentStyle) {
        return parseInt(obj.currentStyle[attr]);
	}else{
		return parseInt(getComputedStyle(obj,null)[attr]);
	}
} 




/********************************************/
//2016.8.31
//3、获取元素的兼容函数（可以支持标签、id、class）
function $(selector,father){
    father=father||document;
    if (typeof selector=="string") {
    	selector=selector.replace(/^\s*|\s*$/g,"");//去除字符串前后的空格
    	if (selector.charAt(0)==".") {
    		return getClass(selector.substring(1),father);
    	}else if(selector.charAt(0)=="#"){
            return document.getElementById(selector.substring(1))
    	    }else if(/^[a-z][1-6a-z]*/g.test(selector)){
                return father.getElementsByTagName(selector);
    	    }
    }else if (typeof selector=="function") {
    	// window.onload=function(){
    	// 	selector();
    	// }
    	addEvent(window,"load",function(){
    		selector();
    	})
    };
}



/********************************************/
//2016.9.2
//获取所有的子节点兼容函数
//fether:指定父节点
//type："a"  只有元素节点
 //     "b"  元素节点加文本节点
function getChlid(father,type){
	type=type||"a";
	var all=father.childNodes;//子节点集合
	var newarr=[];
	for (var i = 0; i < all.length; i++){ 
		if (type=="a") {
			if(all[i].nodeType==1){
			newarr.push(all[i]);
			}
		}else if (type=="b") {
			if (all[i].nodeType==1||(all[i].nodeType==3 && all[i].nodeValue.replace(/^\s*|\s*$/g,""))) {
                 newarr.push(all[i]);
			};
		};
		
	};
	return newarr;
}




//5、获取第一个子节点
function getFirst(father){
	return getChlid(father)[0];
}



//6、获取最后一个子节点
function getLast(father){
	return getChlid(father)[getChlid(father).length-1];
}


//7、获取第n个子节点
function getNum(father,xiabiao){
	return getChlid(father)[xiabiao];
}


//8、获取下一个兄弟节点
function getNext(obj){
	var next=obj.nextSibling;
	if(!next){
		return false;
	    }
	while(next.nodeType==3 || next.nodeType==8){
        next=next.nextSibling;
        if(!next){
		return false;
	    }
	}
	return next;
}


//9、获取上一个兄弟节点
function getPre(obj){
	var pre=obj.previousSibling;
	if(!pre){
		return false;
	    }
	while(pre.nodeType==3 || pre.nodeType==8){
        pre=pre.previousSibling;
        if(!pre){
		return false;
	    }
	}
	return pre;
}


//********************************************/
//10、事件的绑定的兼容函数
function addEvent(obj,event,fun){
	obj[fun]=function(){
		fun.call(obj);
	}
	if (obj.attachEvent) {
		obj.attachEvent("on"+event,obj[fun]);
	}else{
		obj.addEventListener(event,obj[fun],false);
	}
}

//********************************************/
//11、移除事件的兼容函数
function removeEvent(obj,event,fun){
	if (obj.detachEvent) {
		obj.detachEvent("on"+event,obj[fun]);
	}else{
		obj.removeEventListener(event,obj[fun],false);
	}
}



//********************************************/
//12、鼠标的滚轮事件
function mouseWheel(obj,up,down){
	if (obj.attachEvent) {
		obj.attachEvent("onmousewheel",scrollFn);
		//IE opera
	}else if(obj.addEventListener){
		obj.addEventListener("mousewheel",scrollFn,false);
		//chrome,safari -webkit-
		obj.addEventListener("DOMMouseScroll",scrollFn,false);
		//firefox -moz-
	}

	function scrollFn(e){
	e=e||window.event;
	if (e.preventDefault) {
		e.preventDefault();
	}else{
		e.returnValue=false;
	}
	var f=e.wheelDelta || e.detail;
	if (f==-3 || f==120) {
        if (up) {
        	up();
        };
	}else if (f==3 || f==-120) {
		if (down) {
			down();
		};
	};
}
}



//********************************************/
//hover
//13、判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/
