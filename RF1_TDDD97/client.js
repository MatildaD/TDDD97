
var handlers = function(){
	var signupform = document.getElementById("signupform");
	if(signupform != null){
		var signupButton = document.getElementById("signupButton");
		signupButton.addEventListener('click', function(){
			signupform.setAttribute("onsubmit", "test(this);return false;");
		});
	}

	var loginform = document.getElementById("loginform");
	if(loginform != null){
		var loginButton = document.getElementById("loginButton");
		loginButton.addEventListener('click', function(){
			loginform.setAttribute("onsubmit", "test2(this);return false;");
		});
	}
};

displayView = function(){
// the code required to display a view
};

window.onload = function(){
	//code that is executed as the page is loaded.
	//You shall put your own custom code here.
	//window.alert() is not allowed to be used in your implementation.
	var element = document.getElementById("welcomeview");
	document.body.innerHTML = element.innerHTML;
    handlers();
};

var test = function(formData){
	var pw1 = formData.password.value;
	var pw2 = formData.passwordrpt.value;
	if (pw1 != pw2)
	{
		document.getElementById("feedback").innerText = "Passwords do not match";
	}
	else
	{
		var user = {
            'email': formData.email.value,
            'password': formData.password.value,
            'firstname': formData.firstname.value,
            'familyname': formData.familyname.value,
            'gender': formData.gender.value,
            'city': formData.city.value,
            'country': formData.country.value,
          };
		var ret=serverstub.signUp(user);
		document.getElementById("feedback").innerText = ret.success+ret.message+ret.data;
	}
};

var test = function(formData){
		document.getElementById("feedback").innerText = "123";
};