//Global Variables
var timer = null;
var userId = "tesst";
var isReserved = false;

function checkInLogic(){
	console.log("Check in Page Logic");
	
	//Determine if they have made a reservation or not
	//Determine if they have arrived at the location
	//Approximate wait times
	//Push notification to notify when table is ready

	
}

function checkInBTN(){
	console.log("BTN Pressed");
	// Checked In 
	// start the timmer and append it to the html
	
	// replace text with check icon
	var BTN = document.getElementById("checkInBTN");
	BTN.innerHTML = "<span class='icon icon-check'></span>";
	BTN.onclick = "";
	
	
	// Determine if the user has made a reservation
	// Get all necessary information to display
	// Then set the aproximate wait time to time of resurvation
	
	for(var y=0;y<reservationData.PartySizes.length;y++){
		
		console.log("Party Sizes: "+reservationData.PartySizes[y]["PartySize"]);
		
		for(var i=0;i<reservationData.PartySizes[y]["Tables"].length; i++){
		
			console.log("Table Number: "+reservationData.PartySizes[y]["Tables"][i]["TableNumber"]);
			
			
			//console.log("reservation: "+ reservationData.PartySizes[y]["Tables"][i]["ReservationTimes"][0]["Time"]);
			for(var x=0; x< reservationData.PartySizes[y]["Tables"][i]["ReservationTimes"].length; x++){
				
				console.log("reservation: "+ reservationData.PartySizes[y]["Tables"][i]["ReservationTimes"][x]["Reserved"]);
				
				// match the userId with the one reserved
				if(userId == reservationData.PartySizes[y]["Tables"][i]["ReservationTimes"][x]["User"]){
					
					isReserved = true;
					
					console.log("Reservation Found: "+reservationData.PartySizes[y]["Tables"][i]["ReservationTimes"][x]["User"])
					
					// collect and set data
					
					var partySize = reservationData.PartySizes[y]["PartySize"];
					var reservationTime = reservationData.PartySizes[y]["Tables"][i]["ReservationTimes"][x]["Time"]
					
					document.getElementById("reservationInfo").innerHTML = ""+partySize+" Seats, "+reservationTime+"00";
					
				}
				
				
			}
		
		}
		
		
	}
	
	if(isReserved == false){
		console.log('No Reservation Found');
		document.getElementById("reservationInfo").innerHTML = "No Current Reservations";
		
		// set up timer
		setTimer();
		
	}
	
	console.log("PartySize: "+partySize + '\n' + "Time: "+reservationTime);
	
}

function setTimer(){
	
	var waitTime = 1; // wait times in minutes
	
	
	if(timer != null){
		// dont make another timer
		console.log('Timer already exists');
	}else{
	
		timer = document.getElementById("timer")
    	, now = new Date()
    	, deadline = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + waitTime);
 
		timer.innerHTML = countdown(deadline).toString();
	    var countdownTimer = setInterval(function(){
	    	timer.innerHTML = countdown(deadline ).toString();
			if( countdown(deadline ).toString() == 0){
				timer.innerHTML = "Table Is Ready";
				clearInterval(countdownTimer);
				console.log('Timer Has Ended');
				// send push notification
				
				window.plugin.notification.local.add({ message: 'Table is Ready' });
			}
			
		}, 1000);
		
	}
	
	
}
