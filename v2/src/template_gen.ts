class TemplateGen
{
    constructor()
    {
        this.genNavBar();
    }

    genNavBar()
    {
        w3.displayHttp("#main-nav", "static/nav_items.json");
    }
}