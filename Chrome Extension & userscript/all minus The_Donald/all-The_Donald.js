// console.log('/r/all minus /r/The_Donald');
var $The_Donald = $('div.thing.link:has(a.subreddit[href*="/r/The_Donald"])');
var $The_Donald_downvote = $The_Donald.find('div.arrow.down');
$The_Donald_downvote.click( function(){ console.log('/r/The_Donald downvoted'); });
$The_Donald_downvote.click();
$The_Donald.hide();
