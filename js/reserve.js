var party1or2;
var party3or4;
var party5or6;
var userId = "test1";

function initReservations(){
    var choosePartyTable = document.createElement("div");
    choosePartyTable.innerHTML=("<p>How many people in your party?</p>");
    choosePartyTable.setAttribute("class", "reserveTitle");
    document.getElementById("reservationDiv").appendChild(choosePartyTable);
    
    
    party1or2 = document.createElement("div");
    party1or2.innerHTML=("<p>1 or 2</p>")
    party1or2.setAttribute("id","1or2");
    party1or2.setAttribute("class","partySelectBtn");
    document.getElementById("reservationDiv").appendChild(party1or2);
 
    party3or4 = document.createElement("div");
    party3or4.innerHTML=("<p>3 or 4</p>")
    party3or4.setAttribute("id","3or4");
    party3or4.setAttribute("class","partySelectBtn");
    document.getElementById("reservationDiv").appendChild(party3or4);
    
    party5or6 = document.createElement("div");
    party5or6.innerHTML=("<p>5 or 6</p>")
    party5or6.setAttribute("id","5or6");
    party5or6.setAttribute("class","partySelectBtn");
    document.getElementById("reservationDiv").appendChild(party5or6);
    
    
    //party sizes are hard coded to index value of JSON so 0 is 1/2, 1 is 3/4 etc
    party1or2.addEventListener("click", function(){
        buildReserveTablePage(0);
    })
    
    party3or4.addEventListener("click", function(){
        buildReserveTablePage(1);
    })
    
    party5or6.addEventListener("click", function(){
        buildReserveTablePage(2);
    })
}

function buildReserveTablePage(partySize){
    
    //initialize all tables to booked
    var freeTimes = [true,true,true,true,true];
    
    //Removing event listeners
    party1or2.removeEventListener("click", function(){
        buildReserveTablePage(0);
    })
    party3or4.removeEventListener("click", function(){
        buildReserveTablePage(1);
    })
    party5or6.removeEventListener("click", function(){
        buildReserveTablePage(2);
    })
    
    emptyDiv("reservationDiv");
    
    var chooseResTime = document.createElement("div");
    //alert("starting reservations");
    chooseResTime.innerHTML=("<p>Select a reservation time</p>");
    chooseResTime.setAttribute("class", "reserveTitle");
    document.getElementById("reservationDiv").appendChild(chooseResTime);
    
    console.log(reservationData.PartySizes[0].Tables[0].ReservationTimes[0].Reserved);

    //iterate through all tables of selected partysize and figure out whether there are tables free at each time
    for(var i=0; i<reservationData.PartySizes[0].Tables.length; i++){
        for(var j=0; j<reservationData.PartySizes[0].Tables[i].ReservationTimes.length; j++){
            if(!reservationData.PartySizes[0].Tables[i].ReservationTimes[j].Reserved){
                freeTimes[j]=false;
            }
            else{
                console.log("table reserved");
            }
        }
    }
    
    for(var i=0; i<freeTimes.length; i++){
        var timeSlot = document.createElement("div");
        //i+4 corrects index to the proper time range
        if(!freeTimes[i]){
            timeSlot.innerHTML=("<p>"+(i+4)+":00 - FREE</p>");
            timeSlot.setAttribute("data-res","false");
            timeSlot.setAttribute("data-time", i);
            timeSlot.setAttribute("class", "chooseTimeBtn");
            timeSlot.addEventListener("click", function(ev){
                buildReservationConfPage(ev,partySize);
            })
        }
        else{
            timeSlot.innerHTML=("<p>"+(i+4)+":00 - NO FREE TABLES</p>");
            timeSlot.setAttribute("data-res","true");
            timeSlot.backgroundColor = ("#ff0000");
            timeSlot.setAttribute("class", "chooseTimeBtnNo");
            timeSlot.addEventListener("click", function(){

                alert("No free tables at this time");
            });
        }
        
        document.getElementById("reservationDiv").appendChild(timeSlot);
    }
    
    console.log(freeTimes);
}

function buildReservationConfPage(ev,partySize){
    emptyDiv("reservationDiv");
    var time = parseInt(ev.currentTarget.getAttribute("data-time"));
    var actualTime = (time + 4);
    var actualPartySize;
    
    switch(partySize){
        case 0:
            actualPartySize = 2;
            break;
        case 1:
            actualPartySize = 4;
            break;
        case 2:
            actualPartySize = 6;
            break;
        default:
            actualPartySize = 2;
    }
    
    var tableNumber;
    
    console.log(ev.currentTarget.getAttribute("data-res"));
    console.log("partySize: "+partySize+", time: "+time+"");
    
    for(var i=0; i<reservationData.PartySizes[partySize].Tables.length; i++){
        console.log("2: partySize: "+partySize+", time: "+time+", table:"+i);
        if(!reservationData.PartySizes[partySize].Tables[i].ReservationTimes[time].Reserved){
            var reserveConfDiv = document.createElement("div");
            tableNumber = reservationData.PartySizes[partySize].Tables[i].TableNumber;
            reserveConfDiv.innerHTML = ("<p class='reserveTitle'>Confirm Reservation</p><p class='reserveTitle'>Party of "+actualPartySize+" for table "+tableNumber+" at "+actualTime+":00</p><div id='resConfirmBtn' class='resConfirmBtn'>CONFIRM</div><div id='resCancelBtn' class='resCancelBtn'>CANCEL</div>");
            document.getElementById("reservationDiv").appendChild(reserveConfDiv);
            
            
            document.getElementById('resConfirmBtn').addEventListener("click", function(){
                makeReservation(partySize, time, tableNumber);
                backToMain();
            });
            
            document.getElementById('resCancelBtn').addEventListener('click', function(){
                backToMain();
            });
            
            i=999;
        }
    }
    console.log("Exit Loop");
}

function backToMain(){
    header = document.querySelector("#appHeader");
    home = document.querySelector("#home");
    reserve = document.querySelector("#reservePage");
    backButton = document.getElementsByClassName('backBtn');
    console.log(backButton);
   backButton[0].parentNode.removeChild(backButton[0]);
    home.style.display = "block";
    reserve.style.display = "none";
    emptyDiv("reservationDiv");
}

function makeReservation(partySize, time, tableNumber){
    //partySize 0 for 2, 1 for 4, 2 for 6
    //time is index so 0 is based on start time
    //table number is actual number
    var existingReservation = false;
    for (var i = 0; i < reservationData.PartySizes.length; i++) {
        for (var j = 0; j < reservationData.PartySizes[i].Tables.length; j++) {
            for (var k = 0; k < reservationData.PartySizes[i].Tables[j].ReservationTimes.length; k++) {
                if (reservationData.PartySizes[i].Tables[j].ReservationTimes[k].User == userId) {
                     existingReservation = true;
                     alert("YOU ALREADY HAVE A RESERVATION");
                }
            }

        }
    }
    
   if(!existingReservation){
       for(var i=0; i<reservationData.PartySizes[partySize].Tables.length; i++){
            if(reservationData.PartySizes[partySize].Tables[i].TableNumber == tableNumber){
               
                reservationData.PartySizes[partySize].Tables[i].ReservationTimes[time].Reserved = true;
                reservationData.PartySizes[partySize].Tables[i].ReservationTimes[time].User = userId;
                console.log(reservationData);
                console.log(reservationData.PartySizes[partySize].Tables[i].ReservationTimes[time].User);
            }
        }
    
    alert("reservation created ");
    
    //var reservationData now contains up-to-date data;
   }
    

}

function emptyDiv(divId){
    var myNode = document.getElementById(divId);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    console.log("div "+divId+" emptied");
}