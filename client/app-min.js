var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.owns=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};
$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};
$jscomp.polyfill("Object.values",function(a){return a?a:function(a){var b=[],d;for(d in a)$jscomp.owns(a,d)&&b.push(a[d]);return b}},"es8","es3");
var selectedTask,userTask=[],userNote=[],selectedView=0,gif,giphyApiKey="kSMEAA5V3mBfL5qUeC1ZleR6PdGDa1mV",unsplashApiKey="d9dbf001ba658ce6d8172a427b1a7a3e986aa970d038aade36ff7c54b05ffb0e",openWeatherMapApiKey="d4dafd356c01ea4b792bb04ead253af1",userAvatar,userID,selectedTool="task",selectedNote,user,userPocketReadingList,main=function(){$(".taskList").on("click","button",function(){selectedTask=$(this).parent().attr("id");displayComments()});$("#addGif").on("click",function(){$("#waitingGif").empty();
addComment(gif);displayTask();displayComments();$("#giphyRequest").val("")});$("#testGif").on("click",function(){$(".testGif").remove();$("#addGif").show();var a="https://api.giphy.com/v1/gifs/search?q\x3d"+$("#message-giphy").val().split(" ").join("+")+"\x26api_key\x3d"+giphyApiKey+"\x26limit\x3d1",c=$.getJSON(a,function(){gif='\x3cimg src\x3d"'+c.responseJSON.data[0].images.preview_gif.url+'" class\x3d"gif';$(".commentSection").append('\x3cdiv class\x3d"row comment testGif"\x3e \x3cdiv class\x3d"col-1"\x3e \x3cimg src\x3d'+
userAvatar+' class\x3d"avatarComment"\x3e \x3c/div\x3e \x3cdiv class\x3d"col-11"\x3e \x3cdiv class\x3d"bubble"\x3e'+gif+'" \x3e \x3c/div\x3e\x3cp class\x3d"timeStamp "\x3e6th january, 15h28\x3c/p\x3e\x3c/div\x3e\x3c/div\x3e')})});$("#textComment").on("click",function(a){handleCommentType("text")});$("#giphyComment").on("click",function(a){handleCommentType("gif")});$("#pictureComment").on("click",function(a){handleCommentType("picture")});$("#addComment").on("click",function(){var a={commentContent:$("#message-text").val(),
commentCreatedOn:new Date,commentModifiedOn:new Date};""!=a.commentContent&&null!=a.commentContent&&void 0!=a.commentContent&&($("#message-text").val(""),a=a.commentContent.replace(/\n\r?/g,"\x3cbr /\x3e"),addComment(a),displayTask(),displayComments(selectedTask))});$("#closeNewCommentModal").on("click",function(){$("#newCommentModal, #main").toggle()});$("#closeNoteModal").on("click",function(){closeNoteModal()});$("#plusButton").on("click",function(){addTask()});$("#newTask").on("keypress",function(){13===
event.keyCode&&addTask()});$("#calendarButton").on("click",function(){$(".datePicker").toggle();$("#dueDate").val((new Date).getFullYear()+"-"+(new Date).getDate()+1+"-"+(new Date).getMonth())});$("#myModal").on("shown.bs.modal",function(){$("#myInput").focus()});$(document).on("keypress",function(){10!=event.keyCode&&13!=event.keyCode||!event.ctrlKey||$(".fixedBottom").click()});$("#today").on("click",function(){selectedView=0;selectedTaskViewHandler(selectedView)});$("#upcoming").on("click",function(){selectedView=
1;selectedTaskViewHandler(selectedView)});$("#backlog").on("click",function(){selectedView=2;selectedTaskViewHandler(selectedView)});$(".detailsCheckbox").on("click",function(){$("#newCommentModal, #main").toggle();completeTask(selectedTask)});$(".taskList").on("click","input",function(){$(this).parent().fadeOut();var a=$(this).parent().attr("id");completeTask(a)});$("#backgroundTool").on("click",function(){handleTool("background")});$("#taskTool").on("click",function(){handleTool("task")});$("#noteTool").on("click",
function(){handleTool("note")});console.log("selected tool: "+Cookies.get("selectedTool"));void 0===Cookies.get("selectedTool")?handleTool("task"):handleTool(Cookies.get("selectedTool"));$(".notePreview").on("click",function(){displayNoteContent(selectedNote)});$(".noteTitleInput").val("Note title");$(".createdOn").children("p").html((new Date).toDateString());$("#saveNote").on("click",function(){saveNote(selectedNote)});$("#newNoteButton").on("click",function(){displayNoteContent(-1);$(".noteInputZone .noteTitleInput").val("")});
$("#archiveNote").on("click",function(){archiveNote(selectedNote)});$("#connectPocket").on("click",function(){connectToPocket()});if("?ref\x3dpocketOAuth"===location.search&&void 0!=Cookies.get("pocketRequestCode")){var a=Cookies.get("pocketRequestCode");Cookies.remove("pocketRequestCode");$.ajax({url:"pocketKeyConfirm",type:"GET",data:{pocketRequestCode:a,userID:userID},success:function(){getUser()}})}$("#pocketTool").on("click",function(){void 0!=user.integrations.pocket.token&&($("#pocketLogin").empty(),
$("#pocketTool").children("svg").removeAttr("data-toggle"),getPocketUnreadElements(),handleTool("pocket"))});$(".markRead").on("click",function(){var a=$(this).attr("id");markArticleRead(a)});$("#addNewPocketLink").on("click",function(){$.ajax({url:"addnewpocketarticle",type:"POST",data:{url:$("#newPocketArticleLink").val(),pocketToken:user.integrations.pocket.token},success:function(a){console.log(a);"not a link"!=a||"400 Bad Request"!=a?($("#newPocketArticleLink").val(""),$("#pocketNewArticle").modal("hide"),
getPocketUnreadElements(),displayPocketUnreadElements()):iziToast.error({title:"Error",message:"Please submit a valid URL"})}})})};$(document).ready(main);function closeNoteModal(){$("#newNoteModal, #main").toggle();$(".noteInputZone, .noteTitleInput").val("");displayNoteList()}
function handleTool(a){$(".accessTools").children().children().children().removeClass("active");Cookies.set("selectedTool",a);"background"===a?($(".fa-camera-retro").addClass("active"),$(".tool").hide("slow")):"task"===a?($(".fa-tasks").addClass("active"),$(".tool, .taskToolView").show("slow"),$(".noteToolView, .pocketToolView").hide()):"note"===a?($(".fa-sticky-note").addClass("active"),$(".tool, .noteToolView").show("slow"),$(".taskToolView, .pocketToolView").hide()):"pocket"===a&&($(".fa-get-pocket").addClass("active"),
$(".tool, .pocketToolView").show("slow"),$(".taskToolView, .noteToolView").hide(),getPocketUnreadElements())}var dd=(new Date).getDate(),mm=(new Date).getMonth()+1,yyyy=(new Date).getFullYear(),month="Jan Feb Mar Apr May June July Aug Sept Oct Nov Dec".split(" ");10>dd&&(dd="0"+dd);10>mm&&(mm="0"+mm);var now=yyyy+"-"+mm+"-"+dd,beginingOfDay=new Date;beginingOfDay.getTime(beginingOfDay.setHours(0,0,0));beginingOfDay=beginingOfDay.getTime();var endOfDay=new Date;endOfDay.setHours(23,59,59);
endOfDay=endOfDay.getTime();void 0==Cookies.get("userid")?window.location.replace("/auth.html"):(userID=Cookies.get("userid"),$.ajax({url:"todos",type:"GET",data:{userID:userID},success:function(a){userTask=a;displayTask()}}),$.ajax({url:"notes",type:"GET",data:{userID:userID},success:function(a){userNote=a;displayNoteList()}}));
function updateClock(){now=new Date;var a=now.getHours();10>a&&(a="0"+a);var b=now.getMinutes();10>b&&(b="0"+b);$(".time").html(a+":"+b);$(".date").html(now.getDate()+" "+month[now.getMonth()]+" ");setInterval(updateClock,2E3)}updateClock();function getUser(){$.ajax({url:"/user",type:"GET",data:{userID:userID},success:function(a){userAvatar=a.avatar;user=a;$(".userPicture").attr("src",userAvatar)}})}getUser();
function selectedTaskViewHandler(a){0===a?$("#selectedTaskView").text("Today"):1===a?$("#selectedTaskView").text("Upcoming"):2===a&&$("#selectedTaskView").text("Backlog");displayTask()}function displayTask(){$(".taskList").empty();onboarding();for(var a=0;a<=userTask.length;a++){var b=new Date(userTask[a].dueDate);b=b.getTime();0==selectedView?b<endOfDay&&displayTaskDetails(a):1==selectedView?b>endOfDay&&displayTaskDetails(a):2==selectedView&&displayTaskDetails(a)}}
function displayTaskDetails(a){if(0==userTask[a].complete){var b=new Date(userTask[a].dueDate);b=b.toDateString();"Wed Dec 31 1969"==b&&(b="");var c=new Date(userTask[a].dueDate)<beginingOfDay?"task list-group-item lateTask":"task list-group-item";$(".taskList").append("\x3cli class\x3d'"+c+"' data-mongo\x3d'"+userTask[a]._id+"' id\x3d'"+a+"'\x3e\x3cinput type\x3d'checkbox' name\x3d'task-marker'\x3e"+userTask[a].title+"\x3cbr /\x3e"+b+"\x3cbutton type\x3d'button' onclick\x3d'displayComments()' class\x3d'btn btn-link showComments' id\x3d'"+
userTask[a].id+"'\x3e\x3ci class\x3d'fa fa-comment' aria-hidden\x3d'true'\x3e\x3c/i\x3e "+userTask[a].commentNb+" \x3c/button\x3e\x3c/li\x3e")}}
function displayComments(){$(".detailsCheckbox").prop("checked",!1);$(".commentSection").empty();$("#newCommentModal").show();$("#main").hide();$(".detailsCheckbox").attr("id",userTask[selectedTask]._id);$("#textComment").addClass("active");var a=(new Date(userTask[selectedTask].createdOn)).toLocaleDateString();if(userTask[selectedTask].dueDate){var b=(new Date(userTask[selectedTask].dueDate)).toLocaleDateString();$(".dueFor").children("p").empty().text(b)}$(".commentTaskTitle").text(userTask[selectedTask].title);
$(".createdOn").children("p").empty().text(a);if(0===userTask[selectedTask].commentNb)$(".commentSection").append("\x3cp class\x3d'commentColdState'\x3eYou have no comments yet\x3cp\x3e");else if(0!=userTask[selectedTask].commentNb)for(a=0;a<userTask[selectedTask].commentNb;a++)$(".commentSection").append('\x3cdiv class\x3d"row comment"\x3e \x3cdiv class\x3d"col-1"\x3e \x3cimg src\x3d'+userAvatar+' class\x3d"avatarComment"\x3e \x3c/div\x3e \x3cdiv class\x3d"col-11"\x3e \x3cdiv class\x3d"bubble"\x3e \x3cp class\x3d"commentBody"\x3e'+
userTask[selectedTask].comment[a]+'\x3c/p\x3e \x3c/div\x3e \x3cp class\x3d"timeStamp"\x3e\x3c/p\x3e \x3c/div\x3e \x3c/div\x3e');else $(".taskComments").append("\x3cp\x3eNo comment has been added to this task yet\x3c/p\x3e")}
function onboarding(){0===userTask.length&&($(".taskList").append('\x3cdiv class\x3d"onboarding"\x3e \x3cp class\x3d"text-center"\x3e Is this your first time? \x3c/p\x3e\x3cdiv class\x3d"row justify-content-center"\x3e \x3cbutton type\x3d"button" class\x3d"bttn-unite bttn-sm bttn-primary" id\x3d"onboardingBttn"\x3eShow me around\x3c/button\x3e \x3c/div\x3e \x3c/div\x3e'),$("#onboardingBttn").on("click",function(){userTask.push({title:"Start by adding a task",complete:!1,createdOn:new Date,dueDate:new Date,
commentNb:0});userTask.push({title:"Then complete a task by clicking in the checkbox",complete:!1,createdOn:new Date,dueDate:new Date,commentNb:0});userTask.push({title:"You can even add comments and Giphy gifs to your tasks",complete:!1,createdOn:new Date,dueDate:new Date,commentNb:0});displayTask();$(".onboarding").hide()}))}function completeTask(a){$.ajax({url:"todos",type:"PUT",data:{id:userTask[a]._id},success:function(a){console.log(a)}});userTask[a].complete=!0;displayTask()}
function addTask(){if(""!==$("#newTask").val()){var a=$("#newTask").val();$("#newTask").val("");var b=new Date($("#dueDate").val());b.setDate(b.getDate()+1);"Invalid Date"==b&&(b=null);a={title:a,complete:!1,createdOn:new Date,dueDate:b,commentNb:0,comment:[],userID:userID};userTask.push(a);$.post("todos",{userTasks:a},function(a){userTask.pop();userTask.push(a);iziToast.success({title:"Fantastic",message:"Your task has been saved",position:"topRight"})});$(".task-input input").val("");$(".datePicker").hide();
displayTask()}}function addComment(a){userTask[selectedTask].comment.push(a);userTask[selectedTask].commentNb++;$.ajax({url:"todos/comment",type:"PUT",data:{id:userTask[selectedTask]._id,comment:a,commentNb:userTask[selectedTask].commentNb},success:function(a){console.log(a)}});displayComments();$("#newCommentModal").show();$("#main").hide()}
function updateWallpaper(){$.ajax({url:"https://api.unsplash.com/photos/random/?client_id\x3d"+unsplashApiKey+"\x26orientation\x3dlandscape\x26query\x3dnature",type:"GET",success:function(a){var b;2E3<=window.screen.width?b='url("'+a.urls.full+'")':2E3>window.screen.width&&(b='url("'+a.urls.regular+'")');$("body").css("background-image",b);$(".thanks").html('\x3ca href\x3d"'+a.user.links.html+'?utm_source\x3dday2day\x26utm_medium\x3dreferral" target\x3d"_blank" \x3eA picture by '+a.user.name+" | Unsplash \x3c/a\x3e")}});
setInterval(updateWallpaper,18E4)}updateWallpaper();
function handleWeather(){function a(){$.getJSON("https://freegeoip.net/json/"+c,function(a){c=a;b()})}function b(){$.get("https://api.openweathermap.org/data/2.5/weather?units\x3dmetric\x26lat\x3d"+c.latitude+"\x26lon\x3d"+c.longitude+"\x26appid\x3d"+openWeatherMapApiKey,function(a){$(".temperature").text(" | "+Math.ceil(a.main.temp)+" \u00b0C")})}var c;(function(){$.getJSON("https://api.ipify.org?format\x3djsonp\x26callback\x3d?",function(b){c=b.ip;a()})})()}
function handleCommentType(a){$(".newCommentInputZone").children().hide();$(".commentButtons").children().children().removeClass("active");"text"===a?$("#message-text, #addComment").show():"gif"===a?$("#message-giphy, #testGif").show():"picture"===a&&($("#message-file, #addFile").show(),$("#selectedTask").hide().val(userTask[selectedTask]._id),$("#commentNb").hide().val(userTask[selectedTask].commentNb));$(this).children().addClass("active")}handleWeather();displayTask();displayNoteList();
function saveNote(a,b){var c=$(".noteInputZone").val(),d=$(".noteTitleInput").val(),e=c.substring(0,115)+"...",g=new Date,f=0;!0!==b&&(b=!1);console.log("this note is archived: "+b);-1!=a&&(f=userNote[a]._id);$.ajax({url:"notes",type:"PUT",data:{noteBody:c,noteTitle:d,notePreview:e,noteLastEditedOn:g,userid:userID,noteCreatedOn:new Date,noteMongoID:f,noteArchived:b},success:function(b){-1===a?(userNote.push(b),displayNoteContent(userNote.length-1)):(userNote[a].noteBody=c,userNote[a].noteTitle=d,
userNote[a].notePreview=e);iziToast.success({title:"WEEEE!",message:"Your note has been saved!",timeout:1E3})}})}function archiveNote(a){saveNote(a,!0);userNote[a].archiveNote=!0;closeNoteModal();displayNoteList();iziToast.success({title:"Archived!",message:"Your note has been archived!",timeout:1E3})}
function displayNoteList(){$(".notesList").empty();for(var a=0;a<=userNote.length;a++)1!=userNote[a].archiveNote&&$(".notesList").append("\x3ch6\x3e"+userNote[a].noteTitle+'\x3c/h6\x3e\x3ca href\x3d"javascript:void(0);" onclick\x3d"displayNoteContent(this.id);" id\x3d"'+a+'" class\x3d"notePreview"\x3e'+userNote[a].notePreview+"\x3c/a\x3e\x3chr /\x3e")}
function displayNoteContent(a){$("#main").hide();$("#newNoteModal").show();selectedNote=a;$(".noteInputZone").val(userNote[selectedNote].noteBody);$(".noteTitleInput").val(userNote[selectedNote].noteTitle);$(".createdOn").children("p").html((new Date(userNote[selectedNote].createdOn)).toDateString())}
function connectToPocket(){$.ajax({url:"pocketKey",type:"GET",data:{userID:userID},success:function(a){Cookies.set("pocketRequestCode",a);window.location.replace("https://getpocket.com/auth/authorize?request_token\x3d"+a+"\x26redirect_uri\x3dhttp://"+window.location.hostname+"?ref\x3dpocketOAuth")}})}
function getPocketUnreadElements(){$.ajax({url:"getUsersPocketReadList",type:"GET",data:{userID:userID},success:function(a){"401 Unauthorized"===a?$(".pocketToolView").html('\x3ch4 style\x3d"color:black; padding-left:10px; padding-right:10px"\x3eYour Pocket account has been deserialized\x3c/h4\x3e\x3cp style\x3d"color:black; padding-left:10px; padding-right:10px"\x3eClick here to reconnect your account\x3c/p\x3e\x3cinput class\x3d"bttn-unite bttn-sm bttn-primary" type\x3d"button" id\x3d"connectPocket" value\x3d"Connect to Pocket"style\x3d"margin-left:10px" onclick\x3d"connectToPocket()"/\x3e'):(userPocketReadingList=
JSON.parse(a).list,displayPocketUnreadElements(userPocketReadingList))}})}
function displayPocketUnreadElements(a){$(".readingList").empty();a=Object.values(a);for(var b=0;b<a.length;b++){var c=a[b].excerpt,d=a[b].resolved_title;""!=c&&(c=a[b].excerpt.substring(0,115)+"...");50<a[b].resolved_title.length&&(d=a[b].resolved_title.substring(0,75)+"...");c='\x3cdiv\x3e\x3ca href\x3d"'+a[b].resolved_url+'" target\x3d"_blank" class\x3d"list-group-item list-group-item-action flex-column align-items-start"\x3e \x3cdiv class\x3d"d-flex w-100 justify-content-between"\x3e \x3ch5 class\x3d"mb-1"\x3e'+d+
"\x3c/h5\x3e \x3csmall\x3e"+("1"===a[b].is_article?'\x3ci class\x3d"fas fa-newspaper"\x3e\x3c/i\x3e':"0"<a[b].has_video?'\x3ci class\x3d"fab fa-youtube"\x3e\x3c/i\x3e':"")+'\x3c/small\x3e\x3csmall\x3e\x3c/div\x3e\x3cp class\x3d"mb-1"\x3e'+c+'\x3c/p\x3e\x3c/a\x3e\x3cbutton class\x3d"bttn-minimal bttn-xs bttn-primary markRead" id\x3d"'+a[b].item_id+'" onclick\x3d"markArticleRead('+a[b].item_id+')"\x3e\x3ci class\x3d"fas fa-check"\x3e\x3c/i\x3e Mark as read\x3c/button\x3e\x3c/small\x3e\x3c/div\x3e';
$(".readingList").append(c)}}function markArticleRead(a){console.log(a);$.ajax({url:"markArticleRead",type:"POST",data:{pocketArticleRead:a,pocketToken:user.integrations.pocket.token},success:function(b){console.log(b);'{"action_results":[true],"status":1}'===b?(iziToast.success({title:"Duely noted",message:"This item has been archived",position:"topRight"}),a="#"+a,$(a).parent().parent().fadeOut()):iziToast.error({title:"Error",message:"Something went wrong..."})}})}
void 0!==Cookies.get("userid")&&"./auth.html"===window.location.pathname&&(window.location="index.html");