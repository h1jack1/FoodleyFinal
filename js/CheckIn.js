//Global Variables
var timer = null;
var isReserved = false;
var reservationTime = null; 
var waitTime = 10; // wait times in minutes

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
	//BTN.onclick = "";
	
	
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
					reservationTime = reservationData.PartySizes[y]["Tables"][i]["ReservationTimes"][x]["Time"]
					
					getClockTime(partySize);
					
				}
				
				
			}
		
		}
		
		
	}
	
	
	console.log("PartySize: "+partySize + '\n' + "Time: "+reservationTime);
	
	
	setTimer();
}

function setTimer(){
	
	
	if(timer != null){
		// dont make another timer
		console.log('Timer already exists');
	}else{
		
		if(isReserved == true){
			console.log("true");
			hasReservation();
		}
		
		if(isReserved == false){
			console.log("false");
			noReservation();
		}
	}
	
}

function getClockTime(partySize){
	
   var now    = new Date();
   var hour   = reservationTime;
   var ap = "AM";
   if (hour   > 11) { ap = "PM";             }
   if (hour   > 12) { hour = hour - 12;      }
   if (hour   == 0) { hour = 12;             }
   if (hour   < 10) { hour   = "0" + hour;   }
   var timeString = hour + ':' + "00" + " " + ap;
 
	
	document.getElementById("reservationInfo").innerHTML = ""+partySize+" Seats, "+timeString;
}


function hasReservation(){
	
	today = new Date();
			var thisHour = today.getHours();
			
			
			document.getElementById("waitTime").innerHTML = "Time Until Reservation";
			
			console.log("In here");
			
			if(thisHour < reservationTime){
			
				console.log("Reservation is true and reservationTime = "+reservationTime+ "This hour is + "+thisHour);
				
				timer = document.getElementById("timer")
				, now = new Date()
				, deadline = new Date(now.getFullYear(), now.getMonth(), now.getDate(), reservationTime);

				console.log(now.getHours());

				timer.innerHTML = countdown(deadline).toString();
				var countdownTimer = setInterval(function(){
					timer.innerHTML = countdown(deadline ).toString();
					if( countdown(deadline ).toString() == 0){
						timer.innerHTML = "Table Is Ready";
						clearInterval(countdownTimer);
						console.log('Timer Has Ended');
						// send push notification
						
						window.plugin.notification.local.add({ message: 'Table is Ready' });
						
						// replace text with check icon
						// replace text with check icon
						var BTN2 = document.getElementById("checkInBTN");
						BTN2.innerHTML = "Check In";
						
						timer = null;
					}

				}, 1000);
				
				
			}
			
			if( thisHour >= reservationTime){
				// passed reservation time
				console.log("Over here" + thisHour + " reservation time = "+ reservationTime);
				
				document.getElementById("reservationInfo").innerHTML = "No Reservation Today";
				document.getElementById("waitTime").innerHTML = "Aproximate Wait Time";
				noReservation();
			}
	
	
}

function noReservation(){
	
	document.getElementById("reservationInfo").innerHTML = "No Reservation Today";
	
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
					
					// replace text with check icon
					var BTN2 = document.getElementById("checkInBTN");
					BTN2.innerHTML = "Check In";
					
					timer = null;
					console.log("Set timer back to null");
				}

			}, 1000);
	
}

function emailButton(){
	console.log("Send Email");
	
	cordova.plugins.email.open({
    to:      'RandomEmail@youremail.com',
    subject: 'Feedback',
    body:    ''
});
	
}

function callButton(){

	if(navigator.userAgent.match(/Android/i)){
		console.log('Android');
			window.plugins.webintent.startActivity({
		action: window.plugins.webintent.ACTION_CALL,
		url: 'tel:5554441111'
		},
		function(){
			
		},
		function(e){
			alert('error'+e);
		}
		);
	}
}

if(navigator.userAgent.match(/iPhone/i)){
	console.log('iPhone');
	window.open('tel:12345678', '_system');
}
