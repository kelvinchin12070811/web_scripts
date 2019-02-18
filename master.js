function onMenuClicked()
{
    var navList = document.getElementById("navList");
    var crDisplay = navList.style.display;
    if (crDisplay == "none" || crDisplay == "")
        navList.style.display = "block";
    else
        navList.style.display = "";
}

var navBar = document.getElementById('mainNav');
var sticky = navBar.offsetTop;

function onWindowScrolled()
{
    if (window.pageYOffset >= sticky)
    {
        navBar.classList.add('Sticky');
    }
    else
    {
        navBar.classList.remove('Sticky');
    }
}

window.onscroll = function() { onWindowScrolled() };