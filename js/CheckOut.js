function displayCheckout(){
    var runningCost = 0;
    var checkoutDiv = document.getElementById("checkoutDiv");
    
    
    if(localStorage.getItem("orderQueue")){
        var p = document.createElement("p");
        p.setAttribute("class", "reserveTitle");
        p.innerHTML = "Finished your meal? Check out";
        checkoutDiv.appendChild(p);
        var orderQueue = localStorage.getItem("orderQueue");
        orderQueue = orderQueue.split(",");
        var div = document.createElement("div");
        div.setAttribute("class", "checkoutListDiv");
        
        for(var i=0; i<orderQueue.length; i++){
            
            var titleP = document.createElement("p");
            titleP.innerHTML = orderQueue[i];
            var costP = document.createElement("p");
            costP.innerHTML = getFoodCost(orderQueue[i]);
            costP.setAttribute("class", "checkoutListItemsP");
            runningCost = parseFloat(runningCost) + parseFloat(getFoodCost(orderQueue[i]));
            titleP.setAttribute("class", "checkoutListItems");
            div.appendChild(titleP);
            div.appendChild(costP);
        }
        var brTag = document.createElement("br");
        var totalP = document.createElement("p");
        totalP.innerHTML = "TOTAL:";
        totalP.setAttribute("class", "checkoutListItems");
        var totalCost = document.createElement("p");
        totalCost.innerHTML = runningCost;
        div.appendChild(brTag);
        div.appendChild(totalP);
        div.appendChild(totalCost);
        
        checkoutDiv.appendChild(div);
        
        var placeOrderBtn = document.createElement("div");
        placeOrderBtn.setAttribute("class", "checkoutQR");
        placeOrderBtn.innerHTML = ("<p>Check Out With QR</p>");
        checkoutDiv.appendChild(placeOrderBtn);
        placeOrderBtn.addEventListener('click', checkoutFinal);
    }
    
    else{
        var p = document.createElement("p");
        p.setAttribute("class", "reserveTitle");
        p.innerHTML = "Go to menu to place order";
        checkoutDiv.appendChild(p);
    }
    

}

function getFoodCost(food){
    
    var cost;
    for(var i=0; i<menuData.Appetizers.length; i++){
        if(menuData.Appetizers[i].Foodname == food){
            cost = menuData.Appetizers[i].Cost;
        }
    }
    
    for(var i=0; i<menuData.Dishes.length; i++){
        if(menuData.Dishes[i].Foodname == food){
            cost = menuData.Dishes[i].Cost;
        }
    }
    
    for(var i=0; i<menuData.Desserts.length; i++){
        if(menuData.Desserts[i].Foodname == food){
            cost = menuData.Desserts[i].Cost;
        }
    }
    return cost;
}

function checkoutFinal(){
    emptyDiv("checkoutDiv");
    var orderQueue = localStorage.getItem("orderQueue");
    var p = document.createElement("p");
    p.setAttribute("class", "reserveTitle");
    p.innerHTML = "Present code to check-out desk";
    document.getElementById("checkoutDiv").appendChild(p);
    var canvas = document.createElement("div");
    canvas.setAttribute("id","QR");
    //canvas.setAttribute("style", "height:300px;width:auto");
    $(canvas).qrcode({
        "render": "div",
        "width": 300,
        "height": 300,
        "color": "#3a3",
        "text": orderQueue
    });
    
    var p2 = document.createElement("p");
    p2.setAttribute("class", "reserveTitle");
    p2.innerHTML = "Press 'DONE' when your bill has been paid";
    
    document.getElementById("checkoutDiv").appendChild(canvas);
    document.getElementById("checkoutDiv").appendChild(p2);
    
    var doneBtn = document.createElement('div');
    doneBtn.setAttribute("class", "checkoutQR");
    doneBtn.innerHTML = ("<p>DONE</p>");
    document.getElementById("checkoutDiv").appendChild(doneBtn);
    doneBtn.addEventListener('click', function(){
        localStorage.removeItem("orderQueue");
        backToMainFromCheckout();
    });  
    
}

function backToMainFromCheckout(){
    header = document.querySelector("#appHeader");
    home = document.querySelector("#home");
    checkout = document.querySelector("#checkOutPage");
    backButton = document.getElementsByClassName('backBtn');
    backButton[0].parentNode.removeChild(backButton[0]);
    home.style.display = "block";
    checkout.style.display = "none";
    emptyDiv("checkoutDiv");
}