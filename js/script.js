var Clothes=(function(){
	Array.prototype.unique=function(a){
	  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
	});
	var list_item="";
	var arrayAll="";
	var arrayType=[];
	function ajaxRequest(){
		var mygetrequest =new XMLHttpRequest();
		mygetrequest.onreadystatechange = function(){
		  if (mygetrequest.readyState === 4 &&  mygetrequest.status == 200){
		    var jsonObj = JSON.parse(mygetrequest.responseText);
		    arrayAll=jsonObj.Clothes;
		    for (var i = 0; i < jsonObj.Clothes.length; i++) { 
		       arrayType.push(jsonObj.Clothes[i].type);
				};
			printList(arrayAll);
		    printSelectType();
		  }
		}
		mygetrequest.open("GET", "js/clothes.json", true);
		mygetrequest.send();
	};
	function printSelectType(){
		var option_select_type='<option class="type-option" value="all">All</option>';
		for(var i=0;i<arrayType.length;i++){
			if(arrayType.unique()[i] != undefined){
				option_select_type+='<option  class="type-option" value="'+arrayType.unique()[i]+'">'+arrayType.unique()[i]+'</option>';
			}
		}
		document.getElementById("type").innerHTML=option_select_type;
	}
	ajaxRequest();
	function filtersProducts(){
		selectGender();
	}
	function selectGender(){
		var arraySelectFirst=[];
		var select_gender=document.getElementById("gender").selectedIndex;
		var gender_value = document.getElementsByClassName("gender-option")[select_gender].value;
			for(var i = 0;i<arrayAll.length;i++){
				if(gender_value != "all"){
					if(gender_value == arrayAll[i].gender){
						arraySelectFirst.push(arrayAll[i]);
					}
				}else{
					arraySelectFirst.push(arrayAll[i]);
				}
			}
		selectType(arraySelectFirst);
	}
	function selectType(arraySelectFirst){
		var arraySelectFinal=[];
		var select_type=document.getElementById("type").selectedIndex;
		var type_value = document.getElementsByClassName("type-option")[select_type].value;
			for(var i = 0;i<arraySelectFirst.length;i++){
				if(type_value != "all"){
					if(type_value == arraySelectFirst[i].type){
						arraySelectFinal.push(arraySelectFirst[i]);
					}
				}else{
					arraySelectFinal.push(arraySelectFirst[i]);
				}
			}
		printList(arraySelectFinal);
	}
	function printList(arraySelectFinal){
		var listDisplay="";
		for(var i=0;i<arraySelectFinal.length;i++){
			listDisplay+='<li class="content-list-item" onclick="Clothes.showInfoProduct('+arraySelectFinal[i].code+')"><div class="content-item-image"><h3 class="title-item title-type">'+arraySelectFinal[i].type+'</h3><img class="image-item" src="'+arraySelectFinal[i].img+'"></div><div class="content-item-info"><p class="title-item title-price"> '+arraySelectFinal[i].price+'</p><p class="subtitle-item subtitle-brand">Brand: '+arraySelectFinal[i].brand+'</p><p class="subtitle-item subtitle-size"> Size: '+arraySelectFinal[i].size+'</p><p class="subtitle-item subtitle-gender">Gender: '+arraySelectFinal[i].gender+'</p></div></li>';
		}
		 document.getElementById("content-products").innerHTML = '<ul class="content-list">'+listDisplay+'</ul>';
	}
	function showInfoProduct(code){
		var info_product="";
		document.getElementsByClassName("opacity-content")[0].style.opacity="0.20";
		document.getElementsByClassName("section-popup")[0].className='section-popup animated zoomIn';


		for(var i=0; i < arrayAll.length;i++){
			if(code == arrayAll[i].code){
				info_product='<div class="content-product-image"><h3 class="title-item title-product">'+arrayAll[i].type+'</h3><img class="image-product" src="'+arrayAll[i].img+'"><h3 class="title-item title-product">'+arrayAll[i].price+'</h3></div><div class="content-product-info"><p class="subtitle-item feature-product"> Brand: '+arrayAll[i].brand+'</p><p class="subtitle-item feature-product">Size: '+arrayAll[i].size+'</p><p class="subtitle-item feature-product">Gender: '+arrayAll[i].gender+'</p><p class="subtitle-item feature-product">Description: </br>'+arrayAll[i].description+'</p><img class="product-logo" src="img/logo.png"></div><div class="product-close-popup" onclick="Clothes.closePopUp()"></div>';
			}
		}
		document.getElementById("show-product").innerHTML=info_product;
	}
	function closePopUp(){
		document.getElementsByClassName("section-popup")[0].className='section-popup';
		document.getElementsByClassName("opacity-content")[0].style.opacity="1";

	}
	return{
		filtersProducts:filtersProducts,
		showInfoProduct:showInfoProduct,
		closePopUp:closePopUp
	}
})();