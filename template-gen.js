function HtmlGenerator()
{
    document.head.innerHTML += `<link rel="icon" href="https://cdn.jsdelivr.net/gh/kelvinchin12070811/web_images/applab_logo.png">`;
    this.navList = [
        { display: "Home", link: "/" },
        { display: "Experiments", link: "/experiments.html" },
        { display: "Blog", link: "https://kelvinchin12070811.blogspot.com"},
        { display: "About", link: "/about.html"}
    ];
    this.scnList = [
        {
            img: "https://cdn.jsdelivr.net/gh/kelvinchin12070811/web_images/facebook.svg",
            link: "https://www.facebook.com/kelvinchin12070811",
            tooltip: "Facebook"
        },
        {
            img: "https://cdn.jsdelivr.net/gh/kelvinchin12070811/web_images/twitter.svg",
            link: "https://www.twitter.com/kelvinchin_cc",
            tooltip: "Twitter"
        },
        {
            img: "https://cdn.jsdelivr.net/gh/kelvinchin12070811/web_images/github.svg",
            link: "https://github.com/kelvinchin12070811",
            tooltip: "Github"
        },
        {
            img: "https://cdn.jsdelivr.net/gh/kelvinchin12070811/web_images/gitlab.svg",
            link: "https://www.gitlab.com/kelvinchin12070811",
            tooltip: "Gitlab"
        },
        {
            img: "https://cdn.jsdelivr.net/gh/kelvinchin12070811/web_images/bitbucket.svg",
            link: "https://bitbucket.org/kelvinchin12070811",
            tooltip: "Bitbucket"
        }
    ];
	this.baseTitle = "Kelvin's Application Laboratory";
}

HtmlGenerator.prototype.genHeader = function(headerId)
{
    var header = `
<div class="Container">
    <div id="siteLogo">
        <img src="https://cdn.jsdelivr.net/gh/kelvinchin12070811/web_images/applab_banner.svg">
    </div>
    <div id="scmLink">
        ${ this.scnList.map(itr => itr.link == null ?
            `<img src="${itr.img}">` :
            `<a href="${itr.link}" title="${itr.tooltip}"><img src="${itr.img}"></a>`
            ).join('')}
    </div>
</div>
<nav id="mainNav" class="ClearBoth">
    <div class="Container"> 
        <div id="navMenu" class="CustomBtn">
            <img onclick="onMenuClicked()" src="https://cdn.jsdelivr.net/gh/kelvinchin12070811/web_images/menu.svg" width="32" height="32">
        </div>
        <ul id="navList">
            ${ this.navList.map(itr => (itr.link == null) ?
                `<li>${itr.display}</li>` :
                `<li><a href="${itr.link}">${itr.display}</a></li>`
            ).join('')}
        </ul>
    </div>
</nav>
    `;

    document.getElementById(headerId).innerHTML = header;
}

HtmlGenerator.prototype.setTitle = function(title)
{
	if (title != null)
		document.head.innerHTML += `<title>${title} - ${this.baseTitle}</title>`;
	else
		document.head.innerHTML += `<title>${this.baseTitle}</title>`;
}

HtmlGenerator.prototype.genFooter = function(footerId)
{
    var footer = `
<div class="Container">
    &copy; Kelvin Chin ${new Date().getFullYear()}, licensed under <a href="https://creativecommons.org/licenses/by/4.0/">Creative Common CC-BY 4.0</a>.
</div>
    `;

    var footerElm = document.getElementById(footerId);
    footerElm.innerHTML = footer;
    footerElm.classList.add("ClearBoth");
}

HtmlGenerator.prototype.genAll = function(headerId, footerId)
{
    this.genHeader(headerId);
    this.genFooter(footerId);
}
