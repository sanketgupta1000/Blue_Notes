//will contain utility functions, such as displaying error/success messages

//error/success messages:
const badResponse = "Bad response from server. Please try again later";
const badRequest = "Bad request to server. Please try again later";
const badDatabaseConn = "Bad database connection. Please try again later";
const mailServiceDown = "Mail service is down. Please try again later";
const emailTaken = "Email is already registered. Try logging in";

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
    error.classList = "alert alert-danger p-3 text-center";
    error.textContent = errstr;

    //showing
    accountTabs.insertAdjacentElement("afterend", error);
}

//function to show success
function displaySuccess(successstr)
{
    removeMessages();

    let success = document.createElement("div");
    success.id = "success";
    success.classList = "alert alert-success p-3 text-center";
    success.textContent = successstr;

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