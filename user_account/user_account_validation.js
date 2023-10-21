// will do client side validation here

// getting access of elements related to sign up
let signupForm = document.getElementById("signupPane");
let signupEmail = document.getElementById("signupEmail");
let signupPass = document.getElementById("signupPass");
let signupConfirmPass = document.getElementById("signupConfirmPass");
let signupBtn = document.getElementById("signupBtn");

//adding event listener to signupbtn
signupBtn.addEventListener("click", (click)=>
{
    //validating email
    if(!signupEmail.checkValidity())
    {
        //applying mdb class to trigger the feedback
        signupEmail.classList.remove("is-valid");
        signupEmail.classList.add("is-invalid");

        //preventing submit
        click.preventDefault();
        click.stopPropagation();
    }
    else
    {
        signupEmail.classList.remove("is-invalid");
        signupEmail.classList.add("is-valid");
    }

    //validating password and confirm password
    if(signupPass.value=="")
    {
        signupPass.classList.remove("is-valid");
        signupPass.classList.add("is-invalid");

        click.preventDefault();
        click.stopPropagation();
    }
    else
    {
        signupPass.classList.add("is-valid");
        signupPass.classList.remove("is-invalid");
    }

    if((signupConfirmPass.value=="")||((signupPass.value!="")&&(signupPass.value!=signupConfirmPass.value)))
    {
        signupConfirmPass.classList.remove("is-valid");
        signupConfirmPass.classList.add("is-invalid");

        click.preventDefault();
        click.stopPropagation();
    }
    else
    {
        signupConfirmPass.classList.remove("is-invalid");
        signupConfirmPass.classList.add("is-valid");
    }

});


// getting access of elements related to login
let loginForm = document.getElementById("loginPane");
let loginEmail = document.getElementById("loginEmail");
let loginPass = document.getElementById("loginPass");
let loginBtn = document.getElementById("loginBtn");

//adding event listener to loginbtn
loginBtn.addEventListener("click", (click)=>
{
    //validating email
    if(!loginEmail.checkValidity())
    {
        //applying mdb class to trigger the feedback
        loginEmail.classList.remove("is-valid");
        loginEmail.classList.add("is-invalid");

        //preventing submit
        click.preventDefault();
        click.stopPropagation();
    }
    else
    {
        loginEmail.classList.remove("is-invalid");
        loginEmail.classList.add("is-valid");
    }

    //validating password and confirm password
    if(loginPass.value=="")
    {
        loginPass.classList.remove("is-valid");
        loginPass.classList.add("is-invalid");

        click.preventDefault();
        click.stopPropagation();
    }
    else
    {
        loginPass.classList.add("is-valid");
        loginPass.classList.remove("is-invalid");
    }
});