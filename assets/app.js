let group = $(".group");
let form = $("#command-form");
let prepend = $(".prepend");
let lastCommand = "";
let delay = 100;
let tempCount = 0;
window.randomPhaseTrue = true;
import {startEffect} from "./passScript.js";
$("#browser-info").html(navigator.userAgent);
function bottom() {
  $(".window").animate({ scrollTop: $(document).height() }, 1);
}

$("#help").click(function () {
  $(".commandline").val("help").focus();
});

$(document).keydown(function (e) {
  if (e.keyCode == 38) {
    $(".commandline").val(lastCommand);
  }
});

let search = [
  "ls",
  "about",
  "help",
  "hello",
  "hi",
  "merhaba",
  "references",
  "contact",
  "homepage",
  "open blog",
  "clear",
  "red",
  "green",
  "rainbow",
  "def",
  "delay 0",
  "delay 100",
  "delay 500",
  "delay def",
  "github",
  "exit",
  "fullscreen",
];

$(form).submit(function () {
  let input = $(".commandline").val().toLowerCase();
  lastCommand = input;
  if (input == "") {
    return;
  }

let notfound =
  "<p>>> The command you entered is not recognized. To see all available commands you can type 'ls'.";
let help =
  "<p>>> On this page, you can use the following commands <br>-about  -> Information About Me<br>-contact  -> contact me<br>-homepage  -> Other cool Page<br>-clear  -> Clears the Page<br>-secret -> a secret ☻<br>-guestbook -> simple guestbook<br>-Up Arrow Key   -> Retrieves the Previous Command You Entered<br>-exit   -> Closes the Tab</p>"
let about = 
  "<p>>> Hi, I'm fin, 16 years old with a passion for c# and learning. I have my own server room where this website is hosted—pretty cool, right? I love tinkering with computers; the first one I got my hands on was when I was 11.\nEver since then i have been exploring and learning as much as possible :) Thanks for visiting!</p>";
let contact =
  "<br>>> My Email Address: <a href='mailto:admin@fishstix.uk'>admin@fishstix.uk</a> <br>please do msg me in discord if you have any suggestions or questions:<a href='https://discord.gg/BgCp6FMxTN'>fish_stix</a>";
 prepend.append("<br>-" + input + "..");
  form.trigger("reset");
  setTimeout(function () {
    const element = document.getElementById("true");
    switch (input.toLowerCase()) {
      case "ls":
        prepend.append(help);
        break;
      case "help":
        prepend.append(help);
        break;
      case "references":
        prepend.append(references);
        break;
      case "clear":
        prepend.html("");
        break;
      case "about":
        prepend.append(about);
        break;
      case "guestbook":
        prepend.append('<br>>> <a href="https://guestbook.fishstix.uk/" targe=t"_blank">Click here to see the guestbook</a>');
        break;
      case "homepage":
        prepend.append('<br>>> <a>This is my only homepage for the time being.</a>');
        break;
      case "contact":
        prepend.append(contact);
        break;
      case "secret password":
        $(".window-inside").css("color", "transparent");
        $(".commandline").css("color", "transparent");
        $(".window-inside").addClass("rainbow");
        $(".commandline").addClass("rainbow");
        if (element){element.id = " ";};
        console.log("Secret Password was selected");
        startEffect(false);
        break;
      case "i dislike rainbows":
        $(".window-inside").css("color", "");
        $(".commandline").css("color", "");
        $(".window-inside").removeClass("rainbow");
        $(".commandline").removeClass("rainbow");
        if (element){element.id = "true";}
        console.log("password foundw as selected");
        startEffect(true);
        break;
      case "very secret password":  
        $(".window-inside").css("color", "transparent");
        $(".commandline").css("color", "transparent");
        $(".window-inside").addClass("rainbow");
        $(".commandline").addClass("rainbow");
        console.log("very secret password selected");
        if (element){element.id = " ";}
        startEffect(false);
        break;
          
      case "delay 0":
        delay = 0;
        prepend.append("<br>>> Delay set to 100ms");
        break;
      case "exit":
        prepend.append("<br>>> Konsol kapatılıyor..");
        window.top.close();
        break;
      case "fullscreen":
        toggleFullScreen()
        break;
	  case "secret":
        prepend.append("<br>>> to find the secret, just look around, i am sure you can find it :)");
        break;
      default:
        prepend.append(notfound);
        break;
    }
    bottom();
  }, delay);
});

$(function () {
  $("#draggable").draggable();
});

function toggleFullScreen() {
    if (!document.fullscreenElement &&    
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
}

function createKewlScreen() {
  console.log("ya here innit brev");
  if(document.body.querySelector(".cursor-pointer")){

    /* this is the structure

    -stylesheet
    -#window
    -#tab-area
      -#title
        -#divv
          -#icon
      -#title-2
  
    -#window-inside
      -.browser-info
      -#credit
      -<br>
      -<c:/users...>#pass inline...
      -<br>
      -#last-login
      -#prepend
      -#form
        -#command-area
          -#fix-span
            -#username
            -#guest@blahblahblah
  
          -<input> #commandline
          -#placeholder
  
    -various scripts
    */

    //tags the stylesheet along
    /*
    //////////////////////////////////// - commented temporarely
    document.body.outerHTML = "";
    let linkToStyle = document.createElement("link");
    linkToStyle.setAttribute("src", "./assets/basec.css"); 
    linkToStyle.setAttribute("rel", "stylesheet");
    document.body.appendChild(linkToStyle);

    function largestWindow() {
      function tabArea() {
        function title() {
          //all the following block is for div #title
          let img4 = document.createElement("img");
          img4.setAttribute("src", "./assets/4.png");
          img4.setAttribute("class", "icon");
          let smallTitle = document.createElement("div");
          smallTitle.setAttribute("class", "divv");
          smallTitle.appendChild(img4);
          let pTitle2 = document.createElement("p");
          pTitle2.setAttribute("class", "title-2");
          pTitle2.innerText = "Console";
          let titleDiv = document.createElement("div");
          titleDiv.setAttribute("class", "title");
          titleDiv.appendChild(smallTitle);
          titleDiv.appendChild(pTitle2);
          return titleDiv;
        }
        function cursorPointer() {
          //all the following block is for div #cursor-pointer
          let imgmax = document.createElement("img");
          imgmax.setAttribute("src", "./assets/maximize.png");
          imgmax.setAttribute("class", "maxi");
          let imgclose = document.createElement("img");
          imgclose.setAttribute("src", "./assets/close-button.png");
          imgclose.setAttribute("class", "closeb");
          let rightImgOuterDiv = document.createElement("div");
          rightImgOuterDiv.setAttribute("class", "cursor-pointer");
          rightImgOuterDiv.appendChild(imgmax);
          rightImgOuterDiv.appendChild(imgclose);
          return rightImgOuterDiv;
        }
  
        //all the following block is for div #tab-area
        let tabAreaDiv = document.createElement("div");
        tabAreaDiv.setAttribute("class", "tab-area");
        tabAreaDiv.appendChild(title());
        tabAreaDiv.appendChild(cursorPointer());
        return tabAreaDiv;
      }
      
      //console area connected
      function windowArea(){
        // browser info paragraph
        let browserInfo = document.createElement("p");
        browserInfo.setAttribute("id", "browser-info");
  
        // got to give credit to the mandem
        let credit = document.createElement("p");
        credit.innnerText = "full credit goes to";
        //the link without a new line
        let creditLink = document.createElement("a");
        creditLink.setAttribute("href", "https://projects.bugra.work/console/");
        creditLink.innnerText = "bugra.work";
        
        const lineBreak = document.createElement("br");
  
        let ssh = document.createElement("p");
        ssh.innnerText = String.raw`C:\Users\fin>ssh guest@fishstix.uk`;
  
        function passwordLine() {
          let passwordP = document.createElement("p");
          passwordP.setAttribute("class", "inline");
          passwordP.innnerText = "guest@fishstix.uk's password:";
          let passInline = document.createElement("p");
          passwordP.setAttribute("class", "inline");
          passwordP.setAttribute("class", "pass");
          let pasaswordLine = document.createElement("div");
          pasaswordLine.appendChild(passwordP);
          pasaswordLine.appendChild(passInline);
  
          return pasaswordLine
        }
        let lastLogin = document.createElement("p");
        lastLogin.setAttribute("id", "last-login");
        lastLogin.innnerText = "Last login:";
  
        let prependDiv = document.createElement("div");
        prependDiv.setAttribute("class", "prepend");
  
        function formWSubmit(){
          //all of the following code block is for the span #fix-span 
          let spanWithinCommand1 = document.createElement("span");
          spanWithinCommand1.setAttribute("class", "fix-span");
          let spanWithinSpanWithinCommand1 = document.createElement("span");
          spanWithinSpanWithinCommand1.setAttribute("class", "username");
          spanWithinSpanWithinCommand1.textContent = "guest@fishstix.uk";
          spanWithinCommand1.appendChild(spanWithinSpanWithinCommand1);
          spanWithinCommand1.innnerText += ":";
          let spanWithinSpanWithinCommand2 = document.createElement("span");
          spanWithinSpanWithinCommand2.setAttribute("class", "tilde");
          spanWithinSpanWithinCommand2.textContent = "~";
          spanWithinCommand1.appendChild(spanWithinSpanWithinCommand2);
          spanWithinCommand1.innnerText += "$";
          
          // input element
          let singleInput = document.createElement("input");
          singleInput.setAttribute("type", "text");
          singleInput.setAttribute("name", "command");
          singleInput.setAttribute("tabindex", "1");
          singleInput.setAttribute("autocomplete", "off");
          singleInput.setAttribute("autofocus", true);
          singleInput.setAttribute("class", "commandline");
  
          //last span
          let lastSpan = document.createElement("span");
          lastSpan.setAttribute("id", "placeholder");
  
          //placing it all together within the #command-area div
          let final = document.createElement("div");
          final.setAttribute("class", "command-area");
          final.appendChild(spanWithinCommand1);
          final.appendChild(singleInput);
          final.appendChild(lastSpan);

          let form = document.createElement("form");
          form.setAttribute("onsubmit", "return false;");
          form.setAttribute("id", "command-form");
          form.setAttribute("class", "group");
          form.appendChild(final);
          return form;
          
        }
  
        let largeWindowDiv = document.createElement("div");
        largeWindowDiv.setAttribute("class", "window-inside");
        largeWindowDiv.appendChild(browserInfo);
        largeWindowDiv.appendChild(credit);
        largeWindowDiv.appendChild(creditLink);
        largeWindowDiv.appendChild(lineBreak);
        largeWindowDiv.appendChild(ssh);
        largeWindowDiv.appendChild(passwordLine());
        largeWindowDiv.appendChild(lineBreak);
        largeWindowDiv.appendChild(lastLogin);
        largeWindowDiv.appendChild(prependDiv);
        largeWindowDiv.appendChild(formWSubmit());
  
        return largeWindowDiv;
      }
      let mainBody = document.createElement("div");
      mainBody.setAttribute("class", "window");
      mainBody.setAttribute("id", "draggable");
      mainBody.appendChild(tabArea());
      mainBody.appendChild(windowArea());

    }
    document.body.appendChild(largestWindow());
    
    //scripts
    let script1 = document.createElement("script");
    script1.setAttribute("src", "./assets/date.js")
    let script2 = document.createElement("script");
    script2.setAttribute("src", "./assets/base.js")
    let script3 = document.createElement("script");
    script3.setAttribute("type", "module");
    script3.setAttribute("src", "./assets/app.js")
    let script4 = document.createElement("script");
    script4.setAttribute("src", "./assets/drag.js")
    let script5 = document.createElement("script");
    script5.setAttribute("type", "module");
    script5.setAttribute("src", "./assets/passScript.js")
    document.body.appendChild(script1);
    document.body.appendChild(script2);
    document.body.appendChild(script3);
    document.body.appendChild(script4);
    document.body.appendChild(script5);

    */
    
    function createAndAppendBodyContent() {

    
      // Create main window div
      var windowDiv = document.createElement("div");
      windowDiv.setAttribute("class", "ui-draggable ui-dragable-handle window");
      windowDiv.setAttribute("style", "position: relative;");
    
      // Create tab area div
      var tabAreaDiv = document.createElement("div");
      tabAreaDiv.setAttribute("class", "tab-area");
    
      // Create title div
      var titleDiv = document.createElement("div");
      titleDiv.setAttribute("class", "title");
    
      // Create inner div for image in title
      var divv = document.createElement("div");
      divv.setAttribute("class", "divv");
    
      var imgIcon = document.createElement("img");
      imgIcon.setAttribute("src", "./assets/4.png");
      imgIcon.setAttribute("class", "icon");
      divv.appendChild(imgIcon);
    
      // Create title text
      var titleText = document.createElement("p");
      titleText.setAttribute("class", "title-2");
      titleText.textContent = "Console";
    
      // Append divv and title text to title div
      titleDiv.appendChild(divv);
      titleDiv.appendChild(titleText);
    
      // Create cursor pointer div for maximize and close icons
      var cursorPointerDiv = document.createElement("div");
      cursorPointerDiv.setAttribute("class", "cursor-pointer");
    
      var imgMaximize = document.createElement("img");
      imgMaximize.setAttribute("src", "./assets/maximize.png");
      imgMaximize.setAttribute("class", "maxi");
    
      var imgClose = document.createElement("img");
      imgClose.setAttribute("src", "./assets/close-button.png");
      imgClose.setAttribute("class", "closeb");
    
      cursorPointerDiv.appendChild(imgMaximize);
      cursorPointerDiv.appendChild(imgClose);
    
      // Append title and cursor pointer divs to tab area div
      tabAreaDiv.appendChild(titleDiv);
      tabAreaDiv.appendChild(cursorPointerDiv);
    
      // Create window-inside div
      var windowInsideDiv = document.createElement("div");
      windowInsideDiv.setAttribute("class", "window-inside");
    
      // Add text elements inside windowInsideDiv
      var pBrowserInfo = document.createElement("p");
      pBrowserInfo.setAttribute("id", "browser-info");
      windowInsideDiv.appendChild(pBrowserInfo);
    
      var pCredit = document.createElement("p");
      pCredit.innerHTML =
        'full credit goes to <a href="https://projects.bugra.work/console/">bugra.work</a>';
      windowInsideDiv.appendChild(pCredit);
    
      var pEmpty = document.createElement("p");
      pEmpty.innerHTML = "<br>";
      windowInsideDiv.appendChild(pEmpty);
    
      var pCommand = document.createElement("p");
      pCommand.textContent = "C:\\Users\\fin>ssh guest@fishstix.uk";
      windowInsideDiv.appendChild(pCommand);
    
      var pPassword = document.createElement("p");
      pPassword.setAttribute("class", "inline");
      pPassword.textContent = "guest@fishstix.uk's password:";
      windowInsideDiv.appendChild(pPassword);
    
      var pPass = document.createElement("p");
      pPass.setAttribute("class", "pass inline");
      windowInsideDiv.appendChild(pPass);
    
      var pLastLogin = document.createElement("p");
      pLastLogin.setAttribute("id", "last-login");
      pLastLogin.textContent = "Last login:";
      windowInsideDiv.appendChild(pLastLogin);
    
      var divPrepend = document.createElement("div");
      divPrepend.setAttribute("class", "prepend");
      windowInsideDiv.appendChild(divPrepend);
    
      // Create form element
      var formElement = document.createElement("form");
      formElement.setAttribute("onsubmit", "return false;");
      formElement.setAttribute("id", "command-form");
      formElement.setAttribute("class", "group");
    
      var commandAreaDiv = document.createElement("div");
      commandAreaDiv.setAttribute("class", "command-area");
    
      var spanPrefix = document.createElement("span");
      spanPrefix.setAttribute("class", "fix-span");
      spanPrefix.innerHTML =
        '<span class="username">guest@fishstix.uk</span>:<span class="tilde">~</span>$';
      commandAreaDiv.appendChild(spanPrefix);
    
      var inputCommand = document.createElement("input");
      inputCommand.setAttribute("type", "text");
      inputCommand.setAttribute("name", "command");
      inputCommand.setAttribute("class", "commandline");
      inputCommand.setAttribute("tabindex", "1");
      inputCommand.setAttribute("autocomplete", "off");
      inputCommand.setAttribute("autofocus", "true");
    
      commandAreaDiv.appendChild(inputCommand);
    
      var spanPlaceholder = document.createElement("span");
      spanPlaceholder.setAttribute("id", "placeholder");
      commandAreaDiv.appendChild(spanPlaceholder);
    
      formElement.appendChild(commandAreaDiv);
      windowInsideDiv.appendChild(formElement);
    
      // Append all child elements to the main window div
      windowDiv.appendChild(tabAreaDiv);
      windowDiv.appendChild(windowInsideDiv);
    
      // Append the main window div to the body
      document.body.appendChild(windowDiv);
    
      // Append script files at the end of body
      var scripts = [
        "./assets/date.js",
        "./assets/base.js",
        "./assets/app.js",
        "./assets/drag.js",
        "./assets/passScript.js",
      ];
      scripts.forEach(function (src) {
        var script = document.createElement("script");
        script.setAttribute("src", src);
        if (src.includes("app.js") || src.includes("passScript.js")) {
          script.setAttribute("type", "module");
        }
        document.body.appendChild(script);
      });
    }
    document.body.innerHTML = "";
    createAndAppendBodyContent();
    console.log("transitioned");

  




  }else{
    // put what ever special thing you want in here
  }
}//
//windowDiv = document.createElement("div");
  //windowDiv.setAttribute("class", "window");
  //windowDiv.setAttribute("id", "draggable");

  //windowDivChild1.document.createElement("div");

  //document.body.outerHTML = "";

  $(".close").click(function () {
    close()
  });

  $(".maxi").click(function () {
    toggleFullScreen()
  });

  $(".icon").click(function () {

    tempCount++;
    console.log(tempCount);
    if (!(tempCount % 5)) {
      createKewlScreen();




    }
  });
