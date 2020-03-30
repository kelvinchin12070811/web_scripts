function templateGenAll(): void
{
    templateApplyBluePrint();
    w3.includeHTML(() => {
        templateGenPlaceHolders();
        templateGenFooterYear();
    });
}

function templateApplyBluePrint(): void
{
    let body = document.body;
    body.innerHTML = `<header w3-include-html="static/template/header.html"></header>
<div class="w3-bar w3-black" id="main-nav-placeholder">
    <nav class="content-limiter" id="main-nav">
        <a class="w3-button w3-black w3-hover-white main-nav-btn" w3-repeat="nav" href="{{link}}">
            {{name}}
        </a>
    </nav>
</div>
<div class="content-limiter">
    ${body.innerHTML}
</div>
<footer w3-include-html="static/template/footer.html"></footer>`;
}

function templateGenPlaceHolders(): void
{
    w3.displayHttp("sns", "static/data/sns_list.json");
    w3.displayHttp("main-nav", "static/data/nav_items.json");
}

function templateGenFooterYear(): void
{
    let year = document.getElementById("year");
    if (year == null) return;
    year.innerHTML = (new Date()).getFullYear().toString();
}