// will contain the utility functions related to notes/archive/bin page

// function to show a link of navbar as active
function showActive(linkId)
{
    let link = document.getElementById(linkId);
    link.classList.add("text-primary");
    link.setAttribute("aria-current", "page");
}