// will do client side validation here of signup and login form

//client side validation of signup form. If it succeeds, will do an ajax request to backend (signup.php)

// getting access of elements related to sign up
let signupForm = document.getElementById("signupPane");
let signupEmail = document.getElementById("signupEmail");
let signupPass = document.getElementById("signupPass");
let signupConfirmPass = document.getElementById("signupConfirmPass");
let signupBtn = document.getElementById("signupBtn");

//function to validate signup form upon click on sign up button
function validateSignup(click)
{
    //preventing submit, as will do dynamic form submission using ajax
    click.preventDefault();
    click.stopPropagation();

    //removing messages if any
    removeMessages();

    //flag for client side validation
    let isValid = true;

    //validating email
    if(!signupEmail.checkValidity())
    {   
        isValid = false;

        //applying mdb class to trigger the feedback
        signupEmail.classList.add("is-invalid");
    }
    else
    {
        signupEmail.classList.add("is-valid");
    }

    //validating password and confirm password
    if(signupPass.value=="")
    {
        isValid = false;

        signupPass.classList.add("is-invalid");
    }
    else
    {
        signupPass.classList.add("is-valid");
    }

    if((signupConfirmPass.value=="")||((signupPass.value!="")&&(signupPass.value!=signupConfirmPass.value)))
    {
        isValid = false;

        signupConfirmPass.classList.add("is-invalid");
    }
    else
    {
        signupConfirmPass.classList.add("is-valid");
    }

    //checking if valid or not
    if(isValid)
    {
        //showing loading spinner
        loadingSpinner.classList.remove("d-none");
        loadingSpinner.classList.add("d-block");
        //sending ajax request to signup.php
        signupAjaxSend();
        //adding event listener to modal btn for signup otp verification
        otpBtn.addEventListener("click", validateSignupOTP);
        //removing event listener for forgot password otp verification (if any)
        otpBtn.removeEventListener("click", validateForgotPassOTP);
    }
}

//adding event listener to signupbtn
signupBtn.addEventListener("click", validateSignup);

//client side validation of signup form done

//client side validation of otp modal

//getting access of elements related to otp validation
let otpModal = new mdb.Modal(document.getElementById("verifyEmailModal"));
let otpField = document.getElementById("otp");
let otpBtn = document.getElementById("verifyBtn");

//function to validate otp (check if non-empty) for signup and send ajax request if valid
function validateSignupOTP(click)
{
    //stop submission, since it is dynamic using ajax
    click.preventDefault();
    click.stopPropagation();

    if(otpField.value=="")
    {
        otpField.classList.remove("is-valid");
        otpField.classList.add("is-invalid");
    }
    else
    {
        //showing loading spinner
        loadingSpinner.classList.remove("d-none");
        loadingSpinner.classList.add("d-block");
        //now sending ajax request
        signupOTPAjaxSend();
    }
}

//client side validation of otp modal done

//client side validation of login form

// getting access of elements related to login
let loginForm = document.getElementById("loginPane");
let loginEmail = document.getElementById("loginEmail");
let loginPass = document.getElementById("loginPass");
let loginBtn = document.getElementById("loginBtn");

//function to validate login form upon click on login button
function validateLogin(click)
{
    //prevent submit, since dynamic form submission using ajax
    click.preventDefault();
    click.stopPropagation();

    //remove earlier messages
    removeMessages();

    let isValid = true;

    if(!loginEmail.checkValidity())
    {
        //invalid email
        isValid = false;

        //display message
        loginEmail.classList.add("is-invalid");
    }
    else
    {
        //valid email
        loginEmail.classList.add("is-valid");
    }

    if(loginPass.value=="")
    {
        //empty password
        isValid = false;

        //message
        loginPass.classList.add("is-invalid");
    }
    else
    {
        //non-empty password
        loginPass.classList.add("is-valid");
    }

    if(isValid)
    {
        //valid as per frontend
        //showing loading spinner
        loadingSpinner.classList.remove("d-none");
        loadingSpinner.classList.add("d-block");

        //sending ajax request to backend
        loginAjaxSend();
    }
}

//add event listener
loginBtn.addEventListener("click", validateLogin);

//client side validation of login form done

//now client side validation for forgot password
let forgotPassBtn = document.getElementById("forgotPassBtn");

//function to validate email for forgot password
function validateForgotPass(click)
{
    //prevent default, as using ajax
    click.preventDefault();
    click.stopPropagation();

    //remove messages
    removeMessages();

    if(loginEmail.checkValidity())
    {
        //valid email as per frontend
        loginEmail.classList.add("is-valid");
        //showing loading spinner
        loadingSpinner.classList.remove("d-none");
        loadingSpinner.classList.add("d-block");
        //adding event listener to modal submit button
        otpBtn.addEventListener("click", validateForgotPassOTP);
        //removing event listener for validate signup otp (if any)
        otpBtn.removeEventListener("click", validateSignupOTP);
        //sending request
        forgotPassAjaxSend();
    }
    else
    {
        //invalid email
        loginEmail.classList.add("is-invalid");
    }
}

//adding event listener
forgotPassBtn.addEventListener("click", validateForgotPass);

//validation of forgot pass done

//client side validation of modal for forgot pass otp
function validateForgotPassOTP(click)
{
    //prevent default, since using ajax
    click.preventDefault();
    click.stopPropagation();

    if(otpField.value=="")
    {
        //empty otp field
        otpField.classList.remove("is-valid");
        otpField.classList.add("is-invalid");
    }
    else
    {
        //showing loading spinner
        loadingSpinner.classList.remove("d-none");
        loadingSpinner.classList.add("d-block");

        //sending ajax
        forgotPassOTPAjaxSend();
    }
}

//client side validation of modal for forgot password otp done

//now will do validation of reset password modal

//getting necessary elements

//button to toggle between modals
let modalToggleBtn = document.getElementById("modalToggleBtn");
//reset password modal
let resetPassModal = new mdb.Modal(document.getElementById("resetPassModal"));
//reset password fields
let newPass = document.getElementById("newPass");
let newPassConfirm = document.getElementById("newPassConfirm");
let resetPassBtn = document.getElementById("resetPassBtn");

//function to validate reset password form, and send ajax request if valid
function validateResetPass(click)
{
    click.preventDefault();
    click.stopPropagation();

    removeMessages();

    let isValid = true;

    if(newPass.value=="")
    {
        //empty new password
        isValid = false;
        newPass.classList.add("is-invalid");
    }
    else
    {
        newPass.classList.remove("is-invalid");
    }

    if((newPassConfirm.value=="")||((newPass.value!="")&&(newPass.value!=newPassConfirm.value)))
    {
        //invalid new password confirm
        isValid = false;
        newPassConfirm.classList.add("is-invalid");
    }
    else
    {
        newPassConfirm.classList.add("is-valid");
    }

    if(isValid)
    {
        //show the loading spinner
        loadingSpinner.classList.remove("d-none");
        loadingSpinner.classList.add("d-block");

        //sending ajax request
        resetPassAjaxSend();
    }
    
}

//adding event listener
resetPassBtn.addEventListener("click", validateResetPass);