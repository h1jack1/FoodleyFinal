//document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("DOMContentLoaded", onDeviceReady, false);

var btnReserve, btnCheckIn, btnMenu, btnSignUp, btnCheckOut, btnPhotos, home, reserve, checkIn, menu, signUp, checkOut, photos;

function onDeviceReady() {


btnReserve = document.querySelector("#buttonReserve");
btnCheckIn = document.querySelector("#buttonCheckIn");
btnMenu = document.querySelector("#buttonMenu");
btnSignUp = document.querySelector("#buttonSignUp");
btnCheckOut = document.querySelector("#buttonCheckOut");
btnPhotos = document.querySelector("#buttonPhoto");

home = document.querySelector("#home");
reserve = document.querySelector("#reservePage");
checkIn = document.querySelector("#checkInPage");
menu = document.querySelector("#menuPage");
signUp = document.querySelector("#signUpPage");
checkOut = document.querySelector("#checkOutPage");
photos = document.querySelector("#photoPage");

btnReserve.addEventListener("click", pageReserve);
btnCheckIn.addEventListener("click", pageCheckIn);
btnMenu.addEventListener("click", pageMenu);
btnSignUp.addEventListener("click", pageSignUp);
btnCheckOut.addEventListener("click", pageCheckOut);
btnPhotos.addEventListener("click", pagePhotos);



}




function pageReserve(){
	 
	 reserve.style.display = "block";
	 home.style.display = "none";
	 
	 var backButton = document.createElement("div");
	 backButton.innerHTML = "<p>Back</p>";
	 backButton.setAttribute('class', 'backBtn');
	 header = document.querySelector("#appHeader");
	 header.appendChild(backButton);
	 
	 backBtn = document.querySelector(".backBtn");
	 backBtn.addEventListener("click", homePageDeleteBtn);
	 
	 function homePageDeleteBtn() {
		 header.removeChild(backButton);
		 home.style.display = "block";
		 reserve.style.display = "none";
		 emptyDiv("reservationDiv");
	 }
	 initReservations();

	
}

function pageCheckIn() {
	
	 checkIn.style.display = "block";
	 home.style.display = "none";
	 
	 var backButton = document.createElement("div");
	 backButton.innerHTML = "<p>Back</p>";
	 backButton.setAttribute('class', 'backBtn');
	 header = document.querySelector("#appHeader");
	 header.appendChild(backButton);
	 
	 backBtn = document.querySelector(".backBtn");
	 backBtn.addEventListener("click", homePageDeleteBtn);
	
	function homePageDeleteBtn() {
	 header.removeChild(backButton);
	 home.style.display = "block";
	 checkIn.style.display = "none";
	 
  }
}

function pageMenu() {
	
	 initMenu();
	 menu.style.display = "block";
	 home.style.display = "none";
	 
	 var backButton = document.createElement("div");
	 backButton.innerHTML = "<p>Back</p>";
	 backButton.setAttribute('class', 'backBtn');
	 header = document.querySelector("#appHeader");
	 header.appendChild(backButton);
	 
	 backBtn = document.querySelector(".backBtn");
	 backBtn.addEventListener("click", homePageDeleteBtn);
	 
	 function homePageDeleteBtn() {
	 header.removeChild(backButton);
	 home.style.display = "block";
	 menu.style.display = "none";
	 deleteDiv("menuDiv");
	 deleteDiv("footerCart");
	 addBackImage();
	 var orderButton = document.querySelector("#orderButton");
	 var footer = document.querySelector("#footer");
	 footer.removeChild(orderButton);
  }
	
}

function pageSignUp() {
	
	 signUp.style.display = "block";
	 home.style.display = "none";
	 
	 var backButton = document.createElement("div");
	 backButton.innerHTML = "<p>Back</p>";
	 backButton.setAttribute('class', 'backBtn');
	 header = document.querySelector("#appHeader");
	 header.appendChild(backButton);
	 
	 backBtn = document.querySelector(".backBtn");
	 backBtn.addEventListener("click", homePageDeleteBtn);

	function homePageDeleteBtn() {
	 header.removeChild(backButton);
	 home.style.display = "block";
	 signUp.style.display = "none";
	 deleteDiv("menuDiv");
	 
  }
}


function pageCheckOut() {
	
	 checkOut.style.display = "block";
	 home.style.display = "none";
	 
	 var backButton = document.createElement("div");
	 backButton.innerHTML = "<p>Back</p>";
	 backButton.setAttribute('class', 'backBtn');
	 header = document.querySelector("#appHeader");
	 header.appendChild(backButton);
	 
	 backBtn = document.querySelector(".backBtn");
	 backBtn.addEventListener("click", homePageDeleteBtn);
	 displayCheckout();
    
	 function homePageDeleteBtn() {
	 header.removeChild(backButton);
	 home.style.display = "block";
	 checkOut.style.display = "none";
    emptyDiv("checkoutDiv");
	 
  }
}

function pagePhotos() {
	
	 photos.style.display = "block";
	 home.style.display = "none";
	 
	 var backButton = document.createElement("div");
	 backButton.innerHTML = "<p>Back</p>";
	 backButton.setAttribute('class', 'backBtn');
	 header = document.querySelector("#appHeader");
	 header.appendChild(backButton);
	 
	 backBtn = document.querySelector(".backBtn");
	 backBtn.addEventListener("click", homePageDeleteBtn);
	 contactFunc();
	 
	 function homePageDeleteBtn() {
	 header.removeChild(backButton);
	 home.style.display = "block";
	 photos.style.display = "none";
	 
  }
}