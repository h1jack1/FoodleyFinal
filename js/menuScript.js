var menuDiv = document.querySelector("#menuDiv");
var menuPage = document.querySelector("#menuDiv1");
var cartListMax;
var orderQueue = [];

function initMenu() {
	
    orderQueue = [];
    console.log("Queue emptied");
	cartListMax = false;
	console.log("Success!");
	var menuDiv1 = document.createElement("div");
	menuDiv1.setAttribute('id', 'menuDiv1');
	var menuPage = document.querySelector("#menuDiv");
	menuPage.appendChild(menuDiv1);
	
	var menuDiv2 = document.createElement("div");
	menuDiv2.setAttribute('id', 'menuDiv2');
	menuPage.appendChild(menuDiv2);
	
	var menuDiv3 = document.createElement("div");
	menuDiv3.setAttribute('id', 'menuDiv3');
	menuPage.appendChild(menuDiv3);
	
	var cartList = document.createElement("div");
	cartList.setAttribute('id', 'cartList');
	cartList.innerHTML = ("<p id='cartName'>Cart:</p><div id='cartListItems'></div>");
	footerCart = document.querySelector("#footerCart");
	footerCart.appendChild(cartList);
	
	
	

	//Loop JSON data, retreive appetizers and append to page
	
	for(var i = 0; i< menuData.Appetizers.length; i++) {
		
		var app = menuData.Appetizers[i].Foodname;
		var menuDiv1 = document.querySelector("#menuDiv1");
		var appDiv = document.createElement("div");
		appDiv.setAttribute('id', 'appDiv' + i);
		var appImageHolder = document.createElement("div");
		appImageHolder.setAttribute('id', 'appImageHolder' + i);
		appDiv.appendChild(appImageHolder);
		var appName = document.createElement("p")
		appName.setAttribute('id', 'appName');
		var appCost = document.createElement("p");
		appCost.setAttribute('id', 'appCost');
		appDiv.appendChild(appName);
		appDiv.appendChild(appCost);
		menuDiv1.appendChild(appDiv);
		appName.innerHTML = (app);
		var appPrice = menuData.Appetizers[i].Cost;
		appCost.innerHTML = ("$" + appPrice);
		appDiv.addEventListener('click', addToCart);
		var image = new Image();
		image.src = menuData.Appetizers[i].Image;
		appImageHolder.appendChild(image);
		}
		
		
		
	//Loop JSON data, retreive dishes and append to page
	
	for(var i = 0; i< menuData.Dishes.length; i++) {
		
		var dishes = menuData.Dishes[i].Foodname;
		var menuDiv2 = document.querySelector("#menuDiv2");
		var dishesDiv = document.createElement("div");
		dishesDiv.setAttribute('id', 'dishesDiv' + i);
		var dishesImageHolder = document.createElement("div");
		dishesImageHolder.setAttribute('id', 'dishesImageHolder' + i);
		dishesDiv.appendChild(dishesImageHolder);
		var dishesName = document.createElement("p");
		dishesName.setAttribute('id', 'dishesName');
		var dishesCost = document.createElement("p");
		dishesCost.setAttribute('id', 'dishesCost');
		dishesDiv.appendChild(dishesName);
		dishesDiv.appendChild(dishesCost);
		menuDiv2.appendChild(dishesDiv);
		dishesName.innerHTML = (dishes);
		var dishPrice = menuData.Dishes[i].Cost;
		dishesCost.innerHTML = ("$" + dishPrice);
		dishesDiv.addEventListener('click', addToCart);
		var image2 = new Image();
		image2.src = menuData.Dishes[i].Image;
		dishesImageHolder.appendChild(image2);
		}
		
	//Loop JSON data, retreive desserts and append to page
		
	for(var i = 0; i< menuData.Desserts.length; i++) {
		
		var desserts = menuData.Desserts[i].Foodname;
		var menuDiv3 = document.querySelector("#menuDiv3");
		var dessertsDiv = document.createElement("div");
		dessertsDiv.setAttribute('id', 'dessertsDiv' + i);
		var dessertsImageHolder = document.createElement("div");
		dessertsImageHolder.setAttribute('id', 'dessertsImageHolder' + i);
		dessertsDiv.appendChild(dessertsImageHolder);
		var dessertsName = document.createElement("p");
		dessertsName.setAttribute('id', 'dessertsName');
		var dessertsCost = document.createElement("p");
		dessertsCost.setAttribute('id', 'dessertsCost');
		dessertsName.innerHTML = (desserts);
		dessertsDiv.appendChild(dessertsName);
		dessertsDiv.appendChild(dessertsCost);
		menuDiv3.appendChild(dessertsDiv);
		dessertsDiv.addEventListener('click', addToCart);
		var image3 = new Image();
		image3.src = menuData.Desserts[i].Image;
		dessertsImageHolder.appendChild(image3);
		
		
		
		var dessertsPrice = menuData.Desserts[i].Cost;
		dessertsCost.innerHTML = ("$" + dessertsPrice);
		//console.log(dessertsCost);
		}
	
}


function deleteDiv(divDelete) {
	
    var myNode = document.getElementById(divDelete);
	while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
		}
		
	
	
  console.log("div "+divDelete+" emptied");

}

function addToCart(ev){
	console.log("added to cart");
	
	cartList.style.display = "block";

    orderQueue.push(ev.currentTarget.childNodes[1].innerHTML);
    
	if(document.getElementById("cartListItems").childNodes.length < 1){
	cartListItem = document.createElement("p");
	cartListItem.innerHTML = ev.currentTarget.childNodes[1].innerHTML;
	document.getElementById("cartListItems").appendChild(cartListItem);
	}
	else{
		if(!cartListMax){
			cartListMax = true;
			etc = document.createElement("p");
			etc.innerHTML = ("...");
			cartListItems.appendChild(etc);	
			}
	}
	
	//cartListItems.setAttribute('id', 'cartListItems');
	//cartList.appendChild(cartListItems);
	footerCart.appendChild(cartList);
	console.log("current Length: "+document.getElementById('cartList').childNodes.length);
	
	if(document.getElementById('cartList').childNodes.length<=2){
		var cartListCost = document.createElement("p");
		cartListCost.setAttribute('id', 'cartListCost');
		cartListCost.innerHTML = ev.currentTarget.childNodes[2].innerHTML;
		cartList.appendChild(cartListCost);
		deleteDiv("socialImage");
		var orderButton = document.createElement("div");
		orderButton.setAttribute('id', 'orderButton');
		orderButton.innerHTML = ("Place Order");
		var footer = document.querySelector("#footer");
		footer.appendChild(orderButton);
		orderButton.addEventListener('click', placeOrder);
		
		
		}
	
	else{
		
		var cost = ev.currentTarget.childNodes[2].innerHTML;
		var splitCost = cost.split('$');
		var currentTotal = document.getElementById('cartListCost').innerHTML;
		var splitTotal = currentTotal.split("$");
		currentTotal = parseFloat(splitTotal[1]) + parseFloat(splitCost[1]);
		document.getElementById('cartListCost').innerHTML = "$" + currentTotal;
		}
	
	
}
	function addBackImage(){
	var socialImage = document.createElement("img");
	socialImage.setAttribute("src", "img/social_media_icons.jpg");
	socialImage.setAttribute("style", "width: 130px;height:38px;position:absolute;left:30%;top:10%");
	var footerDiv = document.querySelector("#socialImage");
	footerDiv.appendChild(socialImage);
	
}

function placeOrder() {
	alert("Your Order has been Placed");
	backBtn = document.querySelector(".backBtn");
	
	
	function homePageDeleteBtn() {
	 header = document.querySelector("#appHeader");
	 home = document.querySelector("#home");
	 menu = document.querySelector("#menuPage");
	 header.removeChild(backBtn);
	 home.style.display = "block";
	 menu.style.display = "none";
	 deleteDiv("menuDiv");
	 deleteDiv("footerCart");
	 var orderButton = document.querySelector("#orderButton");
	 var footer = document.querySelector("#footer");
	 footer.removeChild(orderButton);
  }
	homePageDeleteBtn();
	addBackImage();
    
    if(localStorage.getItem("orderQueue")){
        var currentList = localStorage.getItem("orderQueue");
        currentList = (currentList + "," + orderQueue);
        localStorage.setItem("orderQueue", currentList);
    }
    else{
        localStorage.setItem("orderQueue", orderQueue);
    }
    
    
}