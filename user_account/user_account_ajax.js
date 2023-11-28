//will keep ajax functions for sending requests, handling response here only
//will include requests and response handling mechanism for signup, otp verification, and login

//ajax request sender for signup
async function signupAjaxSend()
{

    //first of all, will hash passwords before sending
    let hashpass = await hashPassword(signupPass.value);
    let hashconfirmpass = await hashPassword(signupConfirmPass.value);

    //request object
    let signupReq = new XMLHttpRequest();

    //setting response handler
    signupReq.onreadystatechange = signupAjaxHandle;

    //opening the request
    signupReq.open("POST", "signup/signup.php");

    //setting the header
    signupReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    //sending the request
    signupReq.send("email="+signupEmail.value+"&password="+hashpass+"&confirmpassword="+hashconfirmpass);

    //ajax response handler for signup
    function signupAjaxHandle()
    {
        console.log(signupReq.readyState);
        if(signupReq.readyState===XMLHttpRequest.DONE)
        {
            //response is ready
            //hide the loadin spinner
            loadingSpinner.classList.remove("d-block");
            loadingSpinner.classList.add("d-none");
    
            if(signupReq.status===200)
            {
                //good response
    
                //getting response object from response json string
                console.log(signupReq.responseText);
                let signupResponse = JSON.parse(signupReq.responseText);
    
                //now will check for errors on server
                if(!checkServerErrors(signupResponse))
                {
                    //now logical errors
                    if(signupResponse.validity===true)
                    {
                        //everything is good, backend was able to validate email and password and generate otp and send it to email
                        //will show a modal here for otp verification
                        // displaySuccess("Check your mail!");
                        otpField.value = "";
                        otpField.classList.remove("is-invalid");
                        otpModal.show();

                        //setting the toggle (NO) button of confirm modal to this modal
                        modalToggleBtn.setAttribute("data-mdb-toggle", "modal");
                        modalToggleBtn.setAttribute("data-mdb-target", "#verifyEmailModal");
                    }
                    else
                    {
                        //backend said that inputs are invalid
                        if(signupResponse.emailTaken===true)
                        {
                            //email is already taken, will show an error message
                            displayError(emailTaken);
                        }
                        else
                        {
                            //now showing error on proper fields
        
                            if(signupResponse.invalidSignupEmail===true)
                            {
                                signupEmail.classList.remove("is-valid");
                                signupEmail.classList.add("is-invalid");
                            }
                            else
                            {
                                signupEmail.classList.remove("is-invalid");
                                signupEmail.classList.add("is-valid");
                            }
        
                            if(signupResponse.invalidSignupConfirmPass===true)
                            {
                                signupConfirmPass.classList.remove("is-valid");
                                signupConfirmPass.classList.add("is-invalid");
                            }
                            else
                            {
                                signupConfirmPass.classList.remove("is-invalid");
                                signupConfirmPass.classList.add("is-valid");
                            }
                        }
                    }
                }
            }
            else
            {
                displayError(badResponse);
            }
        }
    }
}

//ajax sequest sender for signup otp verification
function signupOTPAjaxSend()
{
    //request object
    let signupOTPReq = new XMLHttpRequest();

    //setting response handler
    signupOTPReq.onreadystatechange = signupOTPAjaxHandle;

    //opening request
    signupOTPReq.open("POST", "signup/signup_otp.php");

    //setting header
    signupOTPReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    //sending request
    signupOTPReq.send("otp="+otpField.value);

    //ajax response handler
    function signupOTPAjaxHandle()
    {
        if(signupOTPReq.readyState===XMLHttpRequest.DONE)
        {
            //response ready
            //hiding spinner
            loadingSpinner.classList.remove("d-block");
            loadingSpinner.classList.add("d-none");

            console.log(signupOTPReq.status);
            if(signupOTPReq.status===200)
            {
                //good response

                //getting response as object
                console.log(signupOTPReq.responseText);
                let signupOTPResp = JSON.parse(signupOTPReq.responseText);

                //checking server errors
                if(checkServerErrors(signupOTPResp))
                {
                    otpModal.hide();
                }
                else
                {
                    //logical errors
                    if(signupOTPResp.validity===true)
                    {
                        //all good. account created
                        //hiding modal and showing success message
                        otpModal.hide();
                        displaySuccess(accountCreated);
                    }
                    else
                    {
                        //otp verification failed
                        //showing feedback
                        otpModal.show(); //if not already showing
                        otpField.classList.add("is-invalid");
                    }
                }
            }
            else
            {
                //bad response
                displayError(badResponse);
            }
        }
    }
}

//ajax request sender for login
async function loginAjaxSend()
{
    let email = loginEmail.value;
    //hashing password
    let hashpass = await hashPassword(loginPass.value);

    //request object
    let loginReq = new XMLHttpRequest();

    //setting response handler
    loginReq.onreadystatechange = loginAjaxHandle;

    //opening the request
    loginReq.open("POST", "login/login.php");

    //set header
    loginReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    //sending request
    loginReq.send("email="+email+"&password="+hashpass);

    //response handler for login
    function loginAjaxHandle()
    {
        //for debugging purpose
        console.log(loginReq.readyState);
        if(loginReq.readyState===XMLHttpRequest.DONE)
        {
            //response is ready
            //hide the loading spinner
            loadingSpinner.classList.remove("d-block");
            loadingSpinner.classList.add("d-none");
    
            if(loginReq.status===200)
            {
                //good response
    
                //getting response object from response json string
                console.log(loginReq.responseText);                //for debugging purpose
                let loginResponse = JSON.parse(loginReq.responseText);
    
                //now will check for errors on server
                if(!checkServerErrors(loginResponse))
                {
                    //now logical errors
                    if(loginResponse.validity===true)
                    {
                        //everything is good, backend was able to validate email and password, and start the session with appropriate variables
                        //will redirect to notes home from here
                        window.location.href = "/blue_notes/user_notes/primary/primary.php";
                    }
                    else
                    {
                        //invalid login credentials
                        displayError("Invalid login credentials, please try again");
                    }
                }
            }
            else
            {
                displayError(badResponse);
            }
        }
    }
}

//ajax request sender for forgot password
function forgotPassAjaxSend()
{
    let email = loginEmail.value;

    //request object
    let forgotReq = new XMLHttpRequest();

    //setting response handler
    forgotReq.onreadystatechange = forgotPassAjaxHandle;

    //open the request
    forgotReq.open("POST", "forgot_password/forgot_password.php");

    //setting header
    forgotReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    //sending request
    forgotReq.send("email="+email);

    //response handler for forgot password
    function forgotPassAjaxHandle()
    {
        //for debugging
        console.log(forgotReq.readyState);

        if(forgotReq.readyState===XMLHttpRequest.DONE)
        {
            //response received
            //hiding loading spinner
            loadingSpinner.classList.remove("d-block");
            loadingSpinner.classList.add("d-none");

            if(forgotReq.status===200)
            {
                //good response
                console.log(forgotReq.responseText);    //for debugging pusposse

                //getting response object
                let forgotResponse = JSON.parse(forgotReq.responseText);

                //checking and displaying server errors
                if(!checkServerErrors(forgotResponse))
                {
                    if(forgotResponse.validity===true)
                    {
                        //backend was able to validate email from database, and send otp on it
                        //showing modal for verification
                        otpField.value="";
                        otpField.classList.remove("is-invalid");
                        otpModal.show();

                        //setting the toggle (NO) button of confirm modal to this modal
                        modalToggleBtn.setAttribute("data-mdb-toggle", "modal");
                        modalToggleBtn.setAttribute("data-mdb-target", "#verifyEmailModal");
                    }
                    else
                    {
                        //invalid email or email not registered
                        loginEmail.classList.remove("is-valid");
                        loginEmail.classList.add("is-invalid");
                    }
                }
            }
            else
            {
                displayError(badResponse);
            }
        }
    }

}

//ajax request sender for forgot password otp verification
function forgotPassOTPAjaxSend()
{
    let otp = otpField.value;

    //request object
    let forgotPassOTPReq = new XMLHttpRequest();
    
    //setting response handler
    forgotPassOTPReq.onreadystatechange = forgotPassOTPAjaxHandle;

    //open request
    forgotPassOTPReq.open("POST", "forgot_password/forgot_password_otp.php");

    //setting header
    forgotPassOTPReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    //sending
    forgotPassOTPReq.send("otp="+otp);

    //response handler
    function forgotPassOTPAjaxHandle()
    {
        console.log(forgotPassOTPReq.readyState);   //for debugging

        if(forgotPassOTPReq.readyState===XMLHttpRequest.DONE)
        {
            //response received
            //hiding loading spinner
            loadingSpinner.classList.remove("d-block");
            loadingSpinner.classList.add("d-none");

            console.log(forgotPassOTPReq.responseText);     //for debugging

            //getting response object
            let forgotPassOTPResp = JSON.parse(forgotPassOTPReq.responseText);

            //checking server errors
            if(checkServerErrors(forgotPassOTPResp))
            {
                otpModal.hide();
            }
            else
            {
                if(forgotPassOTPResp.validity===true)
                {
                    //otp verified
                    //will do something here to let the user reset password
                    //for now, just a message
                    // displaySuccess("OTP Verified!");
                    otpModal.hide();
                    newPass.value="";
                    newPassConfirm.value="";
                    newPass.classList.remove("is-valid", "is-invalid");
                    newPassConfirm.classList.remove("is-valid", "is-invalid");
                    resetPassModal.show();

                    //setting the toggle (NO) button of confirm modal to this modal
                    modalToggleBtn.setAttribute("data-mdb-toggle", "modal");
                    modalToggleBtn.setAttribute("data-mdb-target", "#resetPassModal");
                }
                else
                {
                    otpModal.show();    //if not already showing
                    otpField.classList.add("is-invalid");
                }
            }
        }
    }

}

//ajax request sender for reset password
async function resetPassAjaxSend()
{
    //hashing passwords
    let newpassword = await hashPassword(newPass.value);
    let confirmpassword = await hashPassword(newPassConfirm.value);

    //request object
    let resetPassReq = new XMLHttpRequest();

    //set response handler
    resetPassReq.onreadystatechange = resetPassAjaxHandle;

    //open the request
    resetPassReq.open("POST", "forgot_password/reset_password.php");

    //set the header
    resetPassReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    //sending request
    resetPassReq.send("newpassword="+newpassword+"&confirmpassword="+confirmpassword);

    //response handler
    function resetPassAjaxHandle()
    {
        console.log(resetPassReq.readyState);   //for debugging

        if(resetPassReq.readyState===XMLHttpRequest.DONE)
        {
            //response received
            //hiding the loading spinner
            loadingSpinner.classList.remove("d-block");
            loadingSpinner.classList.add("d-none");

            console.log(resetPassReq.responseText);     //for debugging

            //getting response object
            let resetPassResp = JSON.parse(resetPassReq.responseText);

            //checking server errors
            if(checkServerErrors(resetPassResp))
            {
                //if any server errors displayed, hide modal
                resetPassModal.hide();
            }
            else
            {
                if(resetPassResp.validity===true)
                {
                    //backend was able to reset password
                    //hide modal and show success
                    resetPassModal.hide();
                    displaySuccess(resetPassDone);
                }
                else
                {
                    //reset password confirm does not match as per backend
                    newPassConfirm.classList.remove("is-valid");
                    newPassConfirm.classList.add("is-invalid");
                }
            }
        }
    }
}