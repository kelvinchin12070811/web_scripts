const ContentType = {
    blog: "blog",
    lab: "lab"
};

const RequestUrl = 'https://script.google.com/macros/s/AKfycbxMzBeGwL6aAFR3lXp8pzsn0M8Up-7jInvWIN72nsYAJ2VnG_M/exec';
var curActiveTag = "ProjectCard";

function tagClicked(tag)
{
    var prevs = document.getElementsByClassName('TagActive');
    for (itr of prevs)
    {
        itr.classList.remove('TagActive');
    }

    var cur = document.getElementsByClassName('Tag' + tag);
    for (itr of cur)
    {
        itr.classList.add('TagActive');
    }

    var cards = document.getElementsByClassName(curActiveTag);
    for (itr of cards)
    {
        itr.classList.remove('Show');
    }

    if (tag.match(/^all$/))
    {
        curActiveTag = 'ProjectCard';
    }
    else
    {
        curActiveTag = 'Prj' + tag;
    }
    cards = document.getElementsByClassName(curActiveTag);
    for (itr of cards)
    {
        itr.classList.add('Show');
    }
}

function ProjectLister(panel)
{
    this.destUrl = '';
    this.contentPanel = panel;

    if (this.contentPanel == null)
        throw "Content panel can't be null";
}

ProjectLister.prototype.genContent = function(response, parent)
{
    var data = JSON.parse(response);
    if (!data.status.match(/^success$/))
        throw data.message;

    var panel = document.getElementById(parent.contentPanel);

    if (data.data.length == 0)
    {
        var nullprjMess = null;
        if (parent.contentType.match(/^blog$/))
            nullprjMess = '暂时没有项目';
        else
            nullprjMess = 'No projects is listed.';
        panel.innerHTML += `<div id='nullprj'>${ nullprjMess }</div>`
        return;
    }

    if (parent.contentType.match(/^blog$/))
        panel.innerHTML += `<div id='tagList'>分类:</div>`;
    else
        panel.innerHTML += `<div id='tagList'>Category:</div>`;

    var getTags = new XMLHttpRequest();
    getTags.userData = parent.contentType;
    getTags.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
        {
            var tagList = document.getElementById('tagList');
            var data = JSON.parse(this.responseText);
            if (!data.status.match(/^success$/))
                throw data.message;
            
            var index = 1;
            if (this.userData.match(/^blog$/))
                index = 2;

            for (var itr = 0; itr < data.data.length; itr++)
            {
                tagList.innerHTML += `
<a class='Tags Tag${data.data[itr][0]}' onclick='tagClicked("${data.data[itr][0]}")' href='#'>${data.data[itr][index]}</a>
`;
                if (itr == 0)
                {
                    tagList.getElementsByClassName('Tagall')[0].classList.add("TagActive");
                }
            }
        }
    }
    getTags.open('GET', RequestUrl + '?content=tags');
    getTags.send();

    var cardHtml = "";
    for (var itr = 0; itr < data.data.length; itr++)
    {
        if (data.data[itr][0].match(/^null$/))
        {
            cardHtml += `
<a href='${data.data[itr][3]}' target='_blank'>
    <div class='ProjectCard Prj${data.data[itr][4]} Show'>
        <h2>${data.data[itr][1]}</h2>
        <p>${data.data[itr][2]}</p>
    </div>
</a>
`;
            continue;
        }

        cardHtml += `
<a href='${data.data[itr][3]}' target='_blank'>
    <div class='ProjectCard Prj${data.data[itr][4]} Show'>
        <img src='${data.data[itr][0]}' alt='${data.data[itr][1]}' class='ProjectAvatar'/>
        <h2>${data.data[itr][1]}</h2>
        <p>${data.data[itr][2]}</p>
    </div>
</a>
`;
    }
    panel.innerHTML += `<div class='ProjectList'>${ cardHtml }</div>`;
}

ProjectLister.prototype.configure = function(type)
{
    if (!type.match(/^(blog|lab)$/))
        throw "Content type must be blog or lab";
    this.contentType = type;

    if (this.contentType.match(/^blog$/))
    {
        this.destUrl = `${RequestUrl}?content=${ContentType.blog}`;
    }
    else
    {
        this.destUrl = `${RequestUrl}?content=${ContentType.lab}`;
    }

    var requester = new XMLHttpRequest();
    requester.userData = this;
    requester.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
            this.userData.genContent(this.responseText, this.userData);
    }
    requester.open('GET', this.destUrl);
    requester.send();
}