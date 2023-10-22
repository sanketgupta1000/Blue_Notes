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
    signupReq.open("POST", "signup.php");

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
    
                        otpModal.show();
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
    signupOTPReq.open("POST", "signup_otp.php");

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
            console.log(signupOTPReq.status);
            if(signupOTPReq.status===200)
            {
                //good response

                //getting response as object
                console.log(signupOTPReq.responseText);
                let signupOTPResp = JSON.parse(signupOTPReq.responseText);

                //checking server errors
                if(!checkServerErrors(signupOTPResp))
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