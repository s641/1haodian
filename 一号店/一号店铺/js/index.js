/*
	top
*/
//获取送货地址,渲染地址
var hotCitys = document.querySelector('.hot_city>ul');
var hotcitys = hotdata.hotcitys;
function hotCity() {
	var str = '';
	for (var i = 0; i < hotcitys.length; i++) {
		str += '<li><a href="javascript:;">' + hotcitys[i] + '</a></li>';
	}
	hotCitys.innerHTML = str;
	var lis =getSelect('li',hotCitys);
	
	var oI =getSelect('.fl div a i')[0];
	/*布局层级导致点击不到对应元素*/
	for (var j = 0; j < lis.length; j++) {
		lis[j].onclick=function(){
			oI.innerText = this.innerText;
		}
	}
}
hotCity()
//点击显示地址
function oClick(){
	var oA=getSelect('.fl div>a')[0];
	
	var address=getSelect('.address')[0];
		bind(oA,'click',function(){
			address.style.display='block';
		})
	}
oClick()
//点击关闭
function takeOff(){
	var address=getSelect('.address')[0];
	var onOff=getSelect('.address>span')[0];
	onOff.onclick=function(){
		address.style.display='none';
	}
}
takeOff()
//定时滚动公告
function announcement(){
	var lists =getSelect('.top .fl>ul')[0];
	var str = [];
	for (var i = 0; i < mydata.length; i++) {
		str[i] = '<li><span class="glyphicon glyphicon-volume-up"></span>' +
			'<a href="' + mydata[i].link + '">' + mydata[i].title + '</a></li>';
	}
	setInterval(function() {
		str.push(str.shift());
		lists.innerHTML = str[0];
	}, 1500)
}
announcement()
//渲染全国的省市县
function allAddress(){
	var num=getSelect('.address>.words>ul')[0];
	var data=ChineseDistricts[86];
	var str='';
	for(var attr in data){
		str+='<li><a href="#'+attr+'">'+attr+'</a></li>';
	}
	num.innerHTML=str;
	//循环获取每一个序号内的地址
	var str1='';
	var all=getSelect('.address>.words>.address_info')[0];
	for(var attr in data){
		str1+='<div id="'+attr+'">'+
				'<div class="fl">'+attr+'</div>'+
				'<div class="fr">'+
					'<ul>';
					for(var k in data[attr]){
						/*不加javascript:;他会刷新页面*/
						str1+='<li><a href="javascript:;">'+data[attr][k].address+'</a></li>';
					}					
		str1+='</ul></div></div>';
	}
	all.innerHTML=str1;
	var lists =getSelect('li',all);
	var oI =getSelect('.fl div a i')[0];
	/*布局层级导致点击不到对应元素*/
	for (var j = 0; j <lists.length; j++) {
		lists[j].onclick=function(){
			oI.innerText = this.innerText;
		}
	}
	/*console.log()会执行两次*/
}
allAddress()
//城市检索
function citySearch(){
	//获取输入框
	var oInput=getSelect('.address>p input')[0];
	//获取检索到的所有城市内容(只弄了热门城市)
	var allCity=getSelect('.address .hot_city ul')[0].innerText;
	var oI =getSelect('.fl div a i')[0];
	if(oInput.value.trim()){

	}
}
/*
	h_navbar
*/