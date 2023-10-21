//will contain utility functions, such as displaying error/success messages

let accountTabs = document.getElementById("accountTabs");

//function to remove any error/success message already present
function removeMessage()
{
    if((accountTabs.nextElementSibling.id=="success")||(accountTabs.nextElementSibling.id=="error"))
    {
        accountTabs.nextElementSibling.remove();
    }
}

//function to show error
function displayError(errstr)
{
    //will remove any error/success message already present
    removeMessage();

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
    removeMessage();

    let success = document.createElement("div");
    success.id = "success";
    success.classList = "alert alert-success p-3 text-center";
    success.textContent = successstr;

    accountTabs.insertAdjacentElement("afterend", success);
}