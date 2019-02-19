function onMenuClicked()
{
    var navList = document.getElementById("navList");
    var crDisplay = navList.style.display;
    if (crDisplay == "none" || crDisplay == "")
        navList.style.display = "block";
    else
        navList.style.display = "";
}