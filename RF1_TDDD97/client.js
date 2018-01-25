
var handlers = function(){
	var signupform = document.getElementById("signupform");
    console.log(signupform);
	if(signupform != null){
		var signupButton = document.getElementById("signupButton");
		signupButton.addEventListener('click', function(){
			signupform.setAttribute("onsubmit", "signUp(this);return false;");
		});

	}

    var loginform = document.getElementById("loginform");
    console.log(loginform);
    if (loginform != null) {
        var loginButton = document.getElementById("loginButton");
		loginButton.addEventListener('click', function(){
			loginform.setAttribute("onsubmit", "logIn(this);return false;");
		});
    }


    var homebutton = document.getElementById("homebutton");
    homebutton.addEventListener('click', function(){
        var hometab=document.getElementById("hometab");
        var accounttab=document.getElementById("accounttab");
        var browsetab=document.getElementById("browsetab");
        hometab.style.cssText="display:block";
        accounttab.style.cssText="display:none";
        browsetab.style.cssText="display:none";
    });

    var accountbutton = document.getElementById("accountbutton");
    accountbutton.addEventListener('click', function(){
        var hometab=document.getElementById("hometab");
        var accounttab=document.getElementById("accounttab");
        var browsetab=document.getElementById("browsetab");
        hometab.style.cssText="display:none";
        accounttab.style.cssText="display:block";
        browsetab.style.cssText="display:none";
    });

    var browsebutton = document.getElementById("browsebutton");
    browsebutton.addEventListener('click', function(){
        var hometab=document.getElementById("hometab");
        var accounttab=document.getElementById("accounttab");
        var browsetab=document.getElementById("browsetab");
        hometab.style.cssText="display:none";
        accounttab.style.cssText="display:none";
        browsetab.style.cssText="display:block";
    });



};

displayView = function(){
// the code required to display a view
    if (localStorage.getItem("token") != "") {
        var element = document.getElementById("profileview");
        document.body.innerHTML = element.innerHTML;
    } else {
        var element = document.getElementById("welcomeview");
        document.body.innerHTML = element.innerHTML;
    }





};

var initStorage = function() {
	if (localStorage.getItem("token") == null) {
        localStorage.setItem("token", "");
    }

};

window.onload = function(){
	//code that is executed as the page is loaded.
	//You shall put your own custom code here.
	//window.alert() is not allowed to be used in your implementation.
    initStorage();
    displayView();
    handlers();
};

var signUp = function(formData){
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
            'country': formData.country.value
        };
		var ret=serverstub.signUp(user);
		document.getElementById("feedback").innerText = ret.success+ret.message+ret.data;
	}
};

var logIn = function(formData) {

    var ret=serverstub.signIn(formData.loginemail.value, formData.loginpassword.value);
    if (ret.success) {
        localStorage.setItem("token", ret.data);
        displayView();
    }

    document.getElementById("feedback").innerText = ret.success+ret.message+ret.data;


};