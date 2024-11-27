let group = $(".group");
let form = $("#command-form");
let prepend = $(".prepend");
let lastCommand = "";
let delay = 100;
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
  "<p>>> The command you entered is not recognized. To see all available commands you can type 'help'.";
let help =
  "<p>>> On this page, you can use the following commands <br>-about  -> Information About Me<br>-contact  -> contact me<br>-homepage  -> Other cool Page<br>-clear  -> Clears the Page<br>-secret -> a secret ☻<br>-guestbook -> simple guestbook<br>-Up Arrow Key   -> Retrieves the Previous Command You Entered<br>-exit   -> Closes the Tab</p>"
let about = 
  "<p>>> Hi, I'm fin, 16 years old with a passion for c# and learning. I have my own server room where this website is hosted—pretty cool, right? I love tinkering with computers; the first one I got my hands on was when I was 11.\nEver since then i have been exploring and learning as much as possible :) Thanks for visiting!</p>";
let contact =
  "<br>>> <a href='mailto:admin@fishstix.uk'>My Email Address: admin@fishstix.ul</a> <br>";
 prepend.append("<br>-" + input + "..");
  form.trigger("reset");
  setTimeout(function () {
    switch (input) {
      case "ls":
        prepend.append(help);
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
        prepend.append("<br>>> to find the secret, just write secret + a password like this: 'secret password'");
        break;
      default:
        prepend.append(notfound);
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