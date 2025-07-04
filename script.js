//Toggle password visibility 
function togglePassword(){
    const passwordInput =document.getElementById("password");
    const toggleIcon=document.querySelector(".toggle-password");
    if(passwordInput.type==="password"){
        passwordInput.type="text";
        toggleIcon.classList.remove("bi-eye-fill");
        toggleIcon.classList.add("bi-eye-slash-fill");
    } else{
        passwordInput.type = "password";
        toggleIcon.classList.remove("bi-eye-slash-fill");
        toggleIcon.classList.add("bi-eye-fill");
    }

}

document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const usernameError=document.getElementById("usernameError");
    const passwordError=document.getElementById("passwordError");
    const loginError= document.getElementById("loginError");

    usernameError.textContent="";
    passwordError.textContent="";
    loginError.textContent="";

    let isValid=true;
     if(username===""){
        usernameError.textContent="Username is required";
        isValid=false;
     }
     if(password===""){
        passwordError.textContent="Password is required";
        isValid=false;
     }
     if(isValid){
     if(username==="admin" && password==="123456"){
        window.location.href="admin.html";
 } else{
    loginError.textContent="Invalid username or password";
 }
 }
});