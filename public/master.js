function onMenuClicked()
{
    var navList = document.getElementById("navList");
    var crDisplay = navList.style.display;
    if (crDisplay == "none" || crDisplay == "")
        navList.style.display = "block";
    else
        navList.style.display = "";
}

var navBar = null;
var sticky = null;
var siteHeader = null;
var siteNav = null;

function windowScrolled()
{
    if (navBar == null) navBar = document.getElementById('mainNav');
    if (sticky == null) sticky = navBar.offsetTop;
    if (siteHeader == null) siteHeader = document.getElementById('siteHeader');
    if (siteNav == null) siteNav = document.getElementById('mainNav');

    if (window.pageYOffset >= sticky)
    {
        siteHeader.style.paddingBottom = siteNav.offsetBottom + 'px';
        navBar.classList.add('Sticky');
    }
    else
    {
        siteHeader.style.paddingBottom = '';
        navBar.classList.remove('Sticky');
    }
}

window.onscroll = function() { windowScrolled(); }