/*
	作用：数组求和，
	参数 ：数组
	返回值 ： 求和的数字
*/
function sum(obj) {
	var num = 0;
	for (var i = 0; i < obj.length; i++) {
		num += obj[i];
	}
	return num;
}

/*
	作用 ： 获取元素
	参数 ：
		参数一： 字符串，是一个css选择器
		参数二：可选，是一个确定的元素
	
	返回值 ： 获取的元素
*/
function getSelect(name, parent) {
	parent = parent || document;
	//querySelectorAll里面可以标签，id,class名等，ie不支持
	var obj = parent.querySelectorAll(name);

	return obj;
}
/*
	IE兼容性
	获取元素
	$('.box/li/#box')
	
	name : 是一个字符串，选择器的字符串
			
	obj : 是一个元素，父级元素
*/
function $(name, obj) {

	// 首位字符
	var first = name.charAt(0);
	obj = obj || document;
	if (first == '#') {
		var id = name.split('#')[1];
		return obj.getElementById(id);

	} else if (first == '.') {

		// 找到所有的元素
		var all = obj.getElementsByTagName('*');
		var str = name.split('.')[1];
		var num = [];

		for (var i = 0; i < all.length; i++) {
			if (all[i].className) { // 排除没有class的元素
				// 说明有class
				// 确定元素是否要找的	
				var arr = all[i].className.split(' ');
				for (var k = 0; k < arr.length; k++) {
					if (arr[k] == str) {
						num.push(all[i]);
					}
				}
			}
		}
		return num;

	} else {

		// 通过标签名找元素					
		return obj.getElementsByTagName(name);
	}

}
/*
    封装一个写事件的函数 
	作用 ：给元素添加事件
	参数 ：
		参数一 ：添加事件的元素，元素
		参数二 ：不带on的事件 ， 字符串
		参数三 ：触发事件时，执行的代码，函数
	
 */
function bind(obj, event, fn) {
	obj['on' + event] = fn;
}


/*
 
    封装一个for循环,循环数组
	作用：通过for循环操作数组里面的每一个数据
	参数 ：
		参数一 ： 数组
		参数二 ： 函数，操作代码的函数function(el,i){}
 
		
 */
function forEach(obj, fn) {
	for (var i = 0; i < obj.length; i++) {
		fn(obj[i], i);
	}
}

/*
	封装一个兼容获取样式的函数
	作用 ： 获取元素的样式
	参数 ：
		参数一 ：元素
		参数二 ：元素的样式
	返回结果 ： 样式的值
	
 */
function getCSS(obj, attr) {

	if (obj.currentStyle) {
		// ie
		return obj.currentStyle[attr]
	} else {
		// 谷歌
		return getComputedStyle(obj)[attr];
	}
}
/*
	作用 ： 	封装一个添加class样式的函数
	参数 ：
		参数一 obj：元素
		参数二 className：添加class的样式
	返回结果 ： 样式的值
 */
function addClassName(obj, className) {
	var str = obj.className;
	if (str) {
		//如果str存在，则在添加的时候不覆盖；同时判断现在添加的class是否存在，不存在才执行
		// if(str.indexOf(className)==-1){
		// 	obj.className=obj.className+' '+className;
		// }
		//Ie不支持indexOf,所以改为下列代码
		var arr = str.split(' ');
		var onoff = false;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == className) {
				onoff = true;
			}
		}
		if (!onoff) {
			obj.className = obj.className + ' ' + className;
		}
	} else {
		obj.className = className;
	}
}
/*
	作用 ： 	封装一个删除class样式的函数
	参数 ：
		参数一 obj：元素
		参数二 className：删除class的样式
	返回结果 ： 样式的值
 */
function removeClass(obj, className) {
	//判断元素是否存在class样式
	if (obj.className) {
		//存在执行，将元素样式拆分成数组
		var arr = obj.className.split(' ');
		//判断插入的class样式是否存在
		// if(arr.indexOf(className) != -1){
		// 	//存在，执行删除
		// 	arr.splice(arr.indexOf(className),1);
		// 	//重新组合,给元素赋值
		// 	obj.className=arr.join(' ');
		// }
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == className) {
				arr.splice(i, 1);
			}
		}
		obj.className = arr.join(' ');
	}
}
/*
	书写一个运动的函数
	作用 ：元素移动起来有动画效果
	参数 ：
		el : 运动的元素
		attr : 哪一个样式有动画效果
		target : 目标位置
		time : 运动时间
		type : 运动的方式
		fn   : 是一个函数，在定时器里面，调用
		callback   : 是一个函数，在关闭定时器时，调用函数,回调函数
		
*/
var Tween = {
	linear: function(t, b, c, d) {
		return c * t / d + b;
	},
	easeIn: function(t, b, c, d) {
		return c * (t /= d) * t + b;
	},
	easeOut: function(t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	},
	easeBoth: function(t, b, c, d) {
		if ((t /= d / 2) < 1) {
			return c / 2 * t * t + b;
		}
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d) {
		return c * (t /= d) * t * t * t + b;
	},
	easeOutStrong: function(t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d) {
		if ((t /= d / 2) < 1) {
			return c / 2 * t * t * t * t + b;
		}
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p) {
		if (t === 0) {
			return b;
		}
		if ((t /= d) == 1) {
			return b + c;
		}
		if (!p) {
			p = d * 0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	},
	elasticOut: function(t, b, c, d, a, p) {
		if (t === 0) {
			return b;
		}
		if ((t /= d) == 1) {
			return b + c;
		}
		if (!p) {
			p = d * 0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	},
	elasticBoth: function(t, b, c, d, a, p) {
		if (t === 0) {
			return b;
		}
		if ((t /= d / 2) == 2) {
			return b + c;
		}
		if (!p) {
			p = d * (0.3 * 1.5);
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		if (t < 1) {
			return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
				Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		}
		return a * Math.pow(2, -10 * (t -= 1)) *
			Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
	},
	backIn: function(t, b, c, d, s) {
		if (typeof s == 'undefined') {
			s = 1.70158;
		}
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	},
	backOut: function(t, b, c, d, s) {
		if (typeof s == 'undefined') {
			s = 3.70158; //回缩的距离
		}
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	backBoth: function(t, b, c, d, s) {
		if (typeof s == 'undefined') {
			s = 1.70158;
		}
		if ((t /= d / 2) < 1) {
			return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		}
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d) {
		return c - Tween['bounceOut'](d - t, 0, c, d) + b;
	},
	bounceOut: function(t, b, c, d) {
		if ((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b;
		} else if (t < (2 / 2.75)) {
			return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
		} else if (t < (2.5 / 2.75)) {
			return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
		}
		return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
	},
	bounceBoth: function(t, b, c, d) {
		if (t < d / 2) {
			return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
	}
};

function move(el, attr, target, time, type, fn, callback) {
	var t = 0;
	var b = parseFloat(getCSS(el, attr)); // 初始值
	var c = target - parseFloat(getCSS(el, attr)); // 当前值与目标值之间的插值
	var d = time / 20; // 定时器的次数
	var timer = null;

	timer = setInterval(function() {
		t++;
		var reslut = Tween[type](t, b, c, d);

		if (attr == 'opacity') {

			el.style[attr] = reslut;
		} else {
			el.style[attr] = reslut + 'px';
		}

		if (typeof fn == 'function') {
			fn()
		}

		if (t >= d) {
			// 关闭定时器
			clearInterval(timer);

			if (typeof callback == 'function') {
				callback()
			}

		}
	}, 20);
}


/*
	作用 ： 让元素的多个样式同时变化
	
	参数 ：
		对象：
			el : 元素
			


*/

function moreAttr(obj) {

	//obj.el
	var t = 0; //定时器加加的变量
	var b = {}; // 元素多个样式的初始值
	var c = {}; // 元素多个样式的差值
	var d = obj.time / 20;
	var timer = null;

	for (var attr in obj.attrs) {
		//console.log(attr,getCSS(obj.el,attr))
		b[attr] = parseFloat(getCSS(obj.el, attr));
		c[attr] = obj.attrs[attr] - parseFloat(getCSS(obj.el, attr));
	}
	// console.log(obj.attrs,b,c)
	timer = setInterval(function() {
		t++;
		for (var k in b) {
			var reslut = Tween[obj.type](t, b[k], c[k], d);
			if (k == 'opacity') {
				obj.el.style[k] = reslut;
			} else {
				obj.el.style[k] = reslut + 'px';
			}
		}

		if (t >= d) {
			clearInterval(timer);
		}
	}, 20)


}
