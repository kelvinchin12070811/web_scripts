function templateGenAll(): void
{
    w3.includeHTML(() => {
        templateGenPlaceHolders();
    });
}

function templateGenPlaceHolders(): void
{
    w3.displayHttp("sns", "static/data/sns_list.json");
    w3.displayHttp("main-nav", "static/data/nav_items.json");
}