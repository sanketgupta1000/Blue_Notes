//will contain utility functions, such as displaying error/success messages

//error/success messages:
const badResponse = "Bad response from server. Please try again later";
const badRequest = "Bad request to server. Please try again later";
const badDatabaseConn = "Bad database connection. Please try again later";
const mailServiceDown = "Mail service is down. Please try again later";
const emailTaken = "Email is already registered. Try logging in";
const accountCreated = "Your account has been created. You can now log in";

let accountTabs = document.getElementById("accountTabs");

//function to remove any error/success message already present
function removeMessages()
{
    if((accountTabs.nextElementSibling.id=="success")||(accountTabs.nextElementSibling.id=="error"))
    {
        accountTabs.nextElementSibling.remove();
    }

    //also removing any feedback on inputs
    signupEmail.classList.remove("is-valid", "is-invalid");
    signupPass.classList.remove("is-valid", "is-invalid");
    signupConfirmPass.classList.remove("is-valid", "is-invalid");
    loginEmail.classList.remove("is-valid", "is-invalid");
    loginPass.classList.remove("is-valid", "is-invalid");
}

//function to show error
function displayError(errstr)
{
    //will remove any error/success message already present
    removeMessages();

    let error = document.createElement("div");
    error.id="error";
    error.classList = "alert alert-danger alert-dismissible text-center fade show";
    error.textContent = errstr;

    let closebtn = document.createElement("button");
    closebtn.classList.add("btn-close");
    closebtn.setAttribute("data-mdb-dismiss", "alert");
    closebtn.setAttribute("aria-label", "Close");
    error.appendChild(closebtn);

    //showing
    accountTabs.insertAdjacentElement("afterend", error);
}

//function to show success
function displaySuccess(successstr)
{
    removeMessages();

    let success = document.createElement("div");
    success.id = "success";
    success.classList = "alert alert-success alert-dismissible fade show text-center";
    success.textContent = successstr;

    let closebtn = document.createElement("button");
    closebtn.classList.add("btn-close");
    closebtn.setAttribute("data-mdb-dismiss", "alert");
    closebtn.setAttribute("aria-label", "Close");
    success.appendChild(closebtn);

    accountTabs.insertAdjacentElement("afterend", success);
}

//function to hash the password on client side
async function hashPassword(password)
{
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
    return hashHex;
}

//function to check and show server errors found in any response
//returns true if any server errors
function checkServerErrors(respObj)
{
    let areErrors = false;

    if(respObj.badRequest===true)
    {
        displayError(badRequest);
        areErrors = true;
    }
    else if(respObj.badDatabaseConn===true)
    {
        displayError(badDatabaseConn);
        areErrors = true;
    }
    else if(respObj.mailServiceDown===true)
    {
        displayError(mailServiceDown);
        areErrors = true;
    }

    return areErrors;
}