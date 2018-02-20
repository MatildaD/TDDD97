
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
		//loginform.addEventListener("submit", logIn);
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
        homebutton.style.cssText="background-color:cornflowerblue";
        document.getElementById("accountbutton").style.cssText="background-color:transparent";
        document.getElementById("browsebutton").style.cssText="background-color:transparent";


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
        document.getElementById("homebutton").style.cssText="background-color:transparent";
        document.getElementById("accountbutton").style.cssText="background-color:cornflowerblue";
        document.getElementById("browsebutton").style.cssText="background-color:transparent";
        document.getElementById("loggedinfeedback").innerText = "";


    });

    var browsebutton = document.getElementById("browsebutton");
    browsebutton.addEventListener('click', function(){
        var hometab=document.getElementById("hometab");
        var accounttab=document.getElementById("accounttab");
        var browsetab=document.getElementById("browsetab");
        hometab.style.cssText="display:none";
        accounttab.style.cssText="display:none";
        browsetab.style.cssText="display:block";
        document.getElementById("homebutton").style.cssText="background-color:transparent";
        document.getElementById("accountbutton").style.cssText="background-color:transparent";
        document.getElementById("browsebutton").style.cssText="background-color:cornflowerblue";
        document.getElementById("loggedinfeedback").innerText = "";


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
        refreshMessages();
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
    console.log("Running dispay view next");
    displayView();

};

var searchUser = function(formData) {
    var user = {
        'token' : localStorage.getItem("token"),
        'email' : document.getElementById('searchemail').value
    };

    var con = new XMLHttpRequest();
    con.open("POST", "/getuserdatabyemail", true);
    con.setRequestHeader("Content-Type", "application/json");
    con.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var ret = JSON.parse(con.responseText);
            if (ret.success) {
                document.getElementById("postonsearch").style.cssText="display:block";
                document.getElementById("personalinfo2").style.cssText="display:block";
                document.getElementById("showfirstname2").innerText = "First name: " + ret.data.firstname;
                document.getElementById("showfamilyname2").innerText = "Family name: " + ret.data.familyname;
                document.getElementById("showemail2").innerText = "Email: " + ret.data.email;
                document.getElementById("showgender2").innerText = "Gender: " + ret.data.gender;
                document.getElementById("showcity2").innerText = "City: " + ret.data.city;
                document.getElementById("showcountry2").innerText = "Country: " + ret.data.country;
                refreshMessages2();

            } else {
                document.getElementById("postonsearch").style.cssText="display:none";
                document.getElementById("personalinfo2").style.cssText="display:none";
                document.getElementById("loggedinfeedback").innerText = ret.message;
            }

            console.log(ret.message);
        }
    };
    con.send(JSON.stringify(user));

}

var signOut = function() {
    var user = {
        'token' : localStorage.getItem("token")
    };

    var con = new XMLHttpRequest();
    con.open("POST", "/signout", true);
    con.setRequestHeader("Content-Type", "application/json");
    con.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var ret = JSON.parse(con.responseText);
            if (ret.success) {
                localStorage.setItem("token", "");
                displayView();
                document.getElementById("feedback").innerText = ret.message;
            } else {
                document.getElementById("loggedinfeedback").innerText = ret.message;
            }

            document.getElementById("loggedinfeedback").innerText = "Server error1";
        }
    };
    con.send(JSON.stringify(user));

}

var refreshMessages = function(){
    var user = {
        'token' : localStorage.getItem("token")
    };

    var con = new XMLHttpRequest();
    con.open("POST", "/getusermessagesbytoken", true);
    con.setRequestHeader("Content-Type", "application/json");
    con.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var ret = JSON.parse(con.responseText);
            if (ret.success && ret.data.length > 0) {
                var msgcode = "";
                for (i = 0; i < ret.data.length; i++) {
                    msgcode += "<div> From " + ret.data[i].writer + ": " + ret.data[i].content + "</div>";

                }
                document.getElementById("showmessages").innerHTML = msgcode;
            } else {
                document.getElementById("loggedinfeedback").innerText = ret.message;
            }

            document.getElementById("loggedinfeedback").innerText = ret.message;
        }
    };
    con.send(JSON.stringify(user));

}

var refreshMessages2 = function(){
    var user = {
        'token' : localStorage.getItem("token"),
        'email' : document.getElementById('searchemail').value
    };

    var con = new XMLHttpRequest();
    con.open("POST", "/getusermessagesbyemail", true);
    con.setRequestHeader("Content-Type", "application/json");
    con.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var ret = JSON.parse(con.responseText);
            if (ret.success && ret.data.length > 0) {
                var msgcode = "";
                for (i = 0; i < ret.data.length; i++) {
                    msgcode += "<div> From " + ret.data[i].writer + ": " + ret.data[i].content + "</div>";

                }
                document.getElementById("showmessages2").innerHTML = msgcode;
            } else {
                document.getElementById("loggedinfeedback").innerText = ret.message;
            }

            document.getElementById("loggedinfeedback").innerText = ret.message;
        }
    };
    con.send(JSON.stringify(user));

}


var postMessage = function(){
    var user = {
        'token' : localStorage.getItem("token"),
        'email' : "",
        'message' : document.getElementById("inputmessage").value
    };

    var con = new XMLHttpRequest();
    con.open("POST", "/postmessage", true);
    con.setRequestHeader("Content-Type", "application/json");
    con.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var ret = JSON.parse(con.responseText);
            if (ret.success) {
                document.getElementById("inputmessage").value = "";
                refreshMessages();
                console.log( ret.message);
            } else {
                document.getElementById("loggedinfeedback").innerText = ret.message;
            }


        }
    };
    con.send(JSON.stringify(user));

}

var postMessage2 = function(){
    var user = {
        'token' : localStorage.getItem("token"),
        'email' : document.getElementById('searchemail').value,
        'message' : document.getElementById("inputmessage2").value
    };

    var con = new XMLHttpRequest();
    con.open("POST", "/postmessage", true);
    con.setRequestHeader("Content-Type", "application/json");
    con.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var ret = JSON.parse(con.responseText);
            if (ret.success) {
                document.getElementById("inputmessage2").value = "";
                refreshMessages2();
                console.log( ret.message);
            } else {
                document.getElementById("loggedinfeedback").innerText = ret.message;
            }

        }
    };
    con.send(JSON.stringify(user));

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
            'email': formData.email.value.trim(),
            'password': formData.password.value.trim(),
            'firstname': formData.firstname.value.trim(),
            'familyname': formData.familyname.value.trim(),
            'gender': formData.gender.value.trim(),
            'city': formData.city.value.trim(),
            'country': formData.country.value.trim()
        };
        console.log(user);
        var con = new XMLHttpRequest();
        con.open("POST", "/signup", true);
        con.setRequestHeader("Content-Type", "application/json");
        con.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                var ret = JSON.parse(con.responseText);
                document.getElementById("feedback").innerText = ret.message;
            }
        };
        con.send(JSON.stringify(user));



	}
};

var logIn = function(formData) {


    var user = {
    'email': formData.loginemail.value.trim(),
    'password': formData.loginpassword.value.trim()
    };

    var con = new XMLHttpRequest();
    con.open("POST", "/signin", true);
    con.setRequestHeader("Content-Type", "application/json");

    con.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var ret = JSON.parse(con.responseText);
            if (ret.success) {
                var connection = new WebSocket('ws://localhost:5000/echo');

                connection.onopen = function () {
                connection.send(formData.loginemail.value.trim());
                };

                connection.onerror = function (error) {
                    console.log("Websocket error" + error);
                };

                connection.onmessage = function (e) {
                    console.log("Server: " + e.data);
                    if (e.data == "Log out command!") {
                        localStorage.setItem("token", "");
                        displayView();
                    }
                };
                localStorage.setItem("token", ret.data);
                displayView();
                document.getElementById("loggedinfeedback").innerText = ret.message;

            } else {
                document.getElementById("feedback").innerText = ret.message;
            }

        } else {
            document.getElementById("feedback").innerText = "Something went wrong";
        }

    };
    console.log(user);
    con.send(JSON.stringify(user));


};

var changePassword = function(formData) {
    var user = {
        'token' : localStorage.getItem("token"),
        'oldpassword' : formData.oldpassword.value,
        'newpassword' :formData.changepassword.value
    };

    if (formData.changepassword.value==formData.changepasswordrpt.value){
        if (formData.oldpassword.value != formData.changepassword.value) {

            var con = new XMLHttpRequest();
            con.open("POST", "/changepassword", true);
            con.setRequestHeader("Content-Type", "application/json");
            con.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    // Typical action to be performed when the document is ready:
                    var ret = JSON.parse(con.responseText);
                    if (ret.success) {
                        document.getElementById("oldpassword").value = "";
                        document.getElementById("changepassword").value = "";
                        document.getElementById("changepasswordrpt").value = "";
                    }

                    document.getElementById("loggedinfeedback").innerText = ret.message;
                } else {

                    document.getElementById("loggedinfeedback").innerText = "Server error4";
                }
            };
            con.send(JSON.stringify(user));
        } else {
            document.getElementById("loggedinfeedback").innerText = "You cannot reuse your old password";
        }

    } else {
        document.getElementById("loggedinfeedback").innerText = "Passwords don't match";
    }

}

var showUserInfo = function(){

    var user = {
        'token' : localStorage.getItem("token")
    };

    var con = new XMLHttpRequest();
    con.open("POST", "/getuserdatabytoken", true);
    con.setRequestHeader("Content-Type", "application/json");
    con.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var ret = JSON.parse(con.responseText);
            if (ret.success) {
                document.getElementById("showfirstname").innerText = "First name: " +  ret.data.firstname;
                document.getElementById("showfamilyname").innerText = "Family name: " +  ret.data.familyname;
                document.getElementById("showemail").innerText = "Email: " +  ret.data.email;
                document.getElementById("showgender").innerText = "Gender: " +  ret.data.gender;
                document.getElementById("showcity").innerText = "City: " +  ret.data.city;
                document.getElementById("showcountry").innerText = "Country: " +  ret.data.country;
            } else {
                document.getElementById("loggedinfeedback").innerText = ret.message;
            }

            document.getElementById("loggedinfeedback").innerText = ret.message;
        }
    };
    con.send(JSON.stringify(user));



}