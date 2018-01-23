


var handlers = function(){

    var signup = document.getElementById("signupform");

    if (signup != null) {
        var signupButton = document.getElementById("signupButton");

        signupButton.addEventListener('click', function() {
            signup.setAttribute("onsubmit", "signupForm.save(this);return false;");
        });
    }
}



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


var initStorage = function(){
	if (localStorage.getItem("accounts") == null){
		localStorage.setItem("accounts", "[]");
	}	
}



var signupForm = {
    
    save: function(formData) {

        var pw1 = formData.signuppassword1.value();
        var pw2 = formData.signuppassword1.value();

        if (pw1 != pw2) {
            document.getElementById("feedback").innerText = "Passwords do not match";
        }
        else{
             document.getElementById("feedback").innerText = "Passwords do match";
        }


        
        initStorage();

		var accounts = JSON.parse(localStorage.getItem("accounts"));		
		var exists = false;

		for (index in accounts){
			
			if(accounts[index].email == formData.email.value){
				exists = true;

				break;
			}
		}
		if ( !exists ){
			var newAccount = {
				"firstname": formData.firstname.value.trim(),
				"familyname": formData.familyname.value.trim()
			};
			accounts.push(newAccount);
			localStorage.setItem("accounts", JSON.stringify(accounts));
			document.getElementById("feedback").innerText = "Contact added!";

		}else{
			document.getElementById("feedback").innerText = "The contact already exists!";
		}

		
        
        
    }
}