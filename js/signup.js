// JavaScript Document
var SIGNUPURL = "http://m.edumedia.ca/davi0534/mad9135/final/signup.php";

function signUpInit () {
	var signUpPage = document.querySelector("#signUpPage");
	var html = '<form id="signUpForm" name="signUpForm"><fieldset><div class="signUpInput"><input type="email" id="signUpEmail" name="signUpEmail" placeholder="Email" maxlength="80" value=""><p id="signUpEmailGood" class="">You must enter a valid email<br>ex: food@foodley.com</p></div><div class="signUpInput"><input type="password" id="signUpPwd" name="signUpPwd" placeholder="Password" maxlength="30" value=""><p id="signUpPwdGood" class="">Passwords Must Be Between 6-20 Characters of Length and Contain No Spaces</p></div><div class="signUpInput"><input type="submit" id="signUpSubmit" name="signUpSubmit" value="Submit"></div></fieldset></form>';
	signUpPage.innerHTML = html;
	
	var signUpBtn = document.querySelector('#signUpSubmit');
    signUpBtn.addEventListener('click', signUpBtnClicked, false);

}

function signUpCheckEmailValid(str) {
    var regEx = /^.{1,}@.{2,}\..{2,}/;
    return str.match(regEx);
}

function signUpCheckPwdValid(str) {
    if (/\s/.test(str)) {
    	return false;
	}else {
		if (str !== '' && str.length > 5 && str.length < 21) {
			return true;
		}else {
			return false;
		}
	}
}

function signUpBtnClicked (ev) {
	ev.preventDefault();
	var isEmailValid = false;
	var isPwdValid = false;
	var signUpEmail = document.querySelector('#signUpEmail').value;
	var signUpPwd = document.querySelector('#signUpPwd').value;
	var signUpEmailGood = document.querySelector('#signUpEmailGood'); 
	var signUpPwdGood = document.querySelector('#signUpPwdGood'); 
	
	if (signUpCheckEmailValid(signUpEmail)) {
		signUpEmailGood.className = "";
		isEmailValid = true;
	}else {
		signUpEmailGood.className = "signUpBad";
	}
	
	if (signUpCheckPwdValid(signUpPwd)) {
		signUpPwdGood.className = "";
		isPwdValid = true;
	}else {
		signUpPwdGood.className = "signUpBad";
	}
	
	if (isEmailValid && isPwdValid) {
		signUpXML(signUpEmail, signUpPwd);
	}
	
}

function ajaxError(evt) {
    console.log("Error Code " + evt);
	var signUpSubmit = document.querySelector("#signUpSubmit");
	signUpSubmit.value = "Submit";
}

function signUpXML(signUpEmail, signUpPwd) {
	var signUpSubmit = document.querySelector("#signUpSubmit");
	signUpSubmit.value = "Loading...";
	//ajaxLoader.innerHTML = AJAXIMG; //Display an ajax loader

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("error", ajaxError, false);
    xhr.open("GET", SIGNUPURL + "?email=" + signUpEmail + "&pwd=" + signUpPwd, true);

    xhr.onreadystatechange = function() {

        if (xhr.readyState == 4) {
			signUpSubmit.value = "Submit";
			var jsonResponse = xhr.responseText;
			var obj = JSON.parse(jsonResponse);
			if (obj.code == 0) {
				localStorage.email = obj.email;
              	localStorage.session = obj.session;
				alert ("Sign Up Successfull");
				signUpBackHome();
			}else {
				alert (obj.message);
			}
        }
    };

    xhr.send();
}

function signUpBackHome () {
	 var header = document.querySelector("#appHeader");
	 var mainHome = document.querySelector("#home");
     var signUp = document.querySelector("#signUpPage");
	 var backBtn = document.querySelector(".backBtn");

	header.removeChild(backBtn);
	mainHome.style.display = "block";
	signUp.style.display = "none";
	deleteDiv("menuDiv");
    
}