
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
	if(loginform != null){
		var loginButton = document.getElementById("loginButton");
		loginButton.addEventListener('click', function(){
			loginform.setAttribute("onsubmit", "test2(this);return false;");
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

};

var profilehandler = function() {

    var homebutton = document.getElementById("homebutton");
    homebutton.addEventListener('click', function(){
        var hometab=document.getElementById("hometab");
        var accounttab=document.getElementById("accounttab");
        var browsetab=document.getElementById("browsetab");
        hometab.style.cssText="display:block";
        accounttab.style.cssText="display:none";
        browsetab.style.cssText="display:none";
        showUserInfo();
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

    var passwordform = document.getElementById("passwordform");
    var passwordButton = document.getElementById("passwordButton");
    passwordButton.addEventListener('click', function(){
        passwordform.setAttribute("onsubmit", "changePassword(this);return false;");
    });

    var signout = document.getElementById("signout");
    signout.addEventListener('click', function() {
        signOut();
    });

    var postmessagebutton = document.getElementById("postmessagebutton");
    postmessagebutton.addEventListener('click', function(){
        postMessage();
    });

    var refreshmessages = document.getElementById("refreshmessages");
    refreshmessages.addEventListener('click', function(){
        refreshMessages();
    });


    var searchform = document.getElementById("searchform");
    if (searchform != null) {
        var searchButton = document.getElementById("searchButton");
		searchButton.addEventListener('click', function(){
			searchform.setAttribute("onsubmit", "searchUser(this);return false;");
		});
    }

    var postmessagebutton2 = document.getElementById("postmessagebutton2");
    postmessagebutton2.addEventListener('click', function(){
        postMessage2();
    });

    var refreshmessages2 = document.getElementById("refreshmessages2");
    refreshmessages2.addEventListener('click', function(){
        refreshMessages2();
    });



};

displayView = function(){
// the code required to display a view
    if (localStorage.getItem("token") != "") {
        var element = document.getElementById("profileview");
        document.body.innerHTML = element.innerHTML;
        profilehandler();
        showUserInfo();
    } else {
        var element = document.getElementById("welcomeview");
        document.body.innerHTML = element.innerHTML;
        handlers();
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
};

var searchUser = function(formData) {
    var ret = serverstub.getUserDataByEmail(localStorage.getItem("token"), formData.searchemail.value);
    document.getElementById("loggedinfeedback").innerText = ret.message;
    if (ret.success) {
        document.getElementById("postonsearch").style.cssText="display:block";
        document.getElementById("personalinfo2").style.cssText="display:block";
        document.getElementById("showfirstname2").innerText = "First name: " + ret.data.firstname;
        document.getElementById("showfamilyname2").innerText = "Family name: " + ret.data.familyname;
        document.getElementById("showemail2").innerText = "Email: " + ret.data.email;
        document.getElementById("showgender2").innerText = "Gender: " + ret.data.gender;
        document.getElementById("showcity2").innerText = "City: " + ret.data.city;
        document.getElementById("showcountry2").innerText = "Country: " + ret.data.country;

    } else {
        document.getElementById("postonsearch").style.cssText="display:none";
        document.getElementById("personalinfo2").style.cssText="display:none";
    }

}

var signOut = function() {
    var ret = serverstub.signOut(localStorage.getItem("token"));

    if (ret.success) {
        localStorage.setItem("token", "");
        displayView();
        document.getElementById("feedback").innerText = ret.message;
    } else {
        document.getElementById("loggedinfeedback").innerText = ret.message;
    }
}

var refreshMessages = function(){
    var ret = serverstub.getUserMessagesByToken(localStorage.getItem("token"));
    document.getElementById("loggedinfeedback").innerText = ret.message;
    if (ret.success && ret.data.length > 0) {
        var msgcode = "";
        for (i = 0; i < ret.data.length; i++) {
            msgcode += "<div> From " + ret.data[i].writer + ": " + ret.data[i].content + "</div>";

        }
        document.getElementById("showmessages").innerHTML = msgcode;
    }
}

var refreshMessages2 = function(){
    var ret = serverstub.getUserMessagesByEmail(localStorage.getItem("token"), document.getElementById("searchemail").value);
    document.getElementById("loggedinfeedback").innerText = ret.message;
    if (ret.success && ret.data.length > 0) {
        var msgcode = "";
        for (i = 0; i < ret.data.length; i++) {
            msgcode += "<div> From " + ret.data[i].writer + ": " + ret.data[i].content + "</div>";

        }
        document.getElementById("showmessages2").innerHTML = msgcode;
    }
}


var postMessage = function(){
    var ret = serverstub.postMessage(localStorage.getItem("token"), document.getElementById("inputmessage").value, null);
    document.getElementById("loggedinfeedback").innerText = ret.message;

}

var postMessage2 = function(){
    var ret = serverstub.postMessage(localStorage.getItem("token"), document.getElementById("inputmessage2").value, document.getElementById("searchemail").value);
    document.getElementById("loggedinfeedback").innerText = ret.message;

}

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


var test = function(formData){
		document.getElementById("feedback").innerText = "123";
};

var logIn = function(formData) {

    var ret=serverstub.signIn(formData.loginemail.value, formData.loginpassword.value);
    if (ret.success) {
        localStorage.setItem("token", ret.data);
        displayView();
        document.getElementById("loggedinfeedback").innerText = ret.success+ret.message+ret.data;
    } else {
        document.getElementById("feedback").innerText = ret.success+ret.message+ret.data;
    }

};

var changePassword = function(formData) {
    if (formData.changepassword.value==formData.changepasswordrpt.value){

        if (formData.oldpassword.value != formData.changepassword.value) {
            var ret = serverstub.changePassword(localStorage.getItem("token"), formData.oldpassword.value, formData.changepassword.value);
            document.getElementById("loggedinfeedback").innerText = ret.message;
        } else {
            document.getElementById("loggedinfeedback").innerText = "You cannot reuse your old password";
        }


    } else {
        document.getElementById("loggedinfeedback").innerText = "Passwords don't match";
    }

}

var showUserInfo = function(){
    var match = serverstub.getUserDataByToken(localStorage.getItem("token"));
    document.getElementById("loggedinfeedback").innerText = match.message;
    if (match.success) {
        document.getElementById("showfirstname").innerText = "First name: " +  match.data.firstname;
        document.getElementById("showfamilyname").innerText = "Family name: " +  match.data.familyname;
        document.getElementById("showemail").innerText = "Email: " +  match.data.email;
        document.getElementById("showgender").innerText = "Gender: " +  match.data.gender;
        document.getElementById("showcity").innerText = "City: " +  match.data.city;
        document.getElementById("showcountry").innerText = "Country: " +  match.data.country;
    }



}