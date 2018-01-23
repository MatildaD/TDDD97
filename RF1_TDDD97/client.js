



var handlers = function(){

    var signup = document.getElementById("signup");

    if (signup != null) {
        var signupButton = document.getElementById("signupButton");

        signupButton.addEventListener('click', function() {
            signup.setAttribute("onsubmit", "return false");
        });
    }
}




