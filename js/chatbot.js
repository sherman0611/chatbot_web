const customElement = document.querySelector('#WebChatContainer');

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.watsonAssistantChatOptions = {
        integrationID: "473efd6a-70b1-4558-9a0f-0982d54dfff3", //draft
        //integrationID: "ed1751e8-4043-46a9-ab3c-3b14be51cb43", //live
        region: "eu-gb",
        serviceInstanceID: "0647b866-508c-487b-b576-f45abd434252",
    
        //listeners
        onLoad: function(instance) {
            //reset chat
            resetMenu.addEventListener('click', function() {
                instance.restartConversation();
                changeAnimation(video2);
                navMenu.classList.toggle("active");
                menuOpened = false;
            });
    
            //scroll to most recent message
            recentMenu.addEventListener('click', function() {
                instance.doAutoScroll();
                navMenu.classList.toggle("active");
                menuOpened = false;
            });
    
            //detect chatbot response
            function handler(event) {
                if (menuOpened) {
                    //close mobile menu if opened
                    navMenu.classList.toggle("active");
                    menuOpened = false;
                }
                try {
                    var intent = event.data.output.intents[0].intent;
                    var confidence = event.data.output.intents[0].confidence;
                    console.log("intent detected:", intent, ", confidence:", confidence);
                    //return new avatar expression
                    if (confidence < 1) {
                        changeAnimation(video6);
                    } else {
                        switch(intent) {
                            case "greetings":
                                changeAnimation(video2);
                                break;
                            default:
                                //return random response animation
                                var rand = resvids[Math.floor(Math.random()*resvids.length)];
                                changeAnimation(rand);
                        }
                    }
                } catch (error) {
                    console.log("No intent detected");
                    changeAnimation(video6);
                }
            }
            instance.on({ type: "receive", handler: handler });
      
            instance.render();
        },
    };
} else {
    window.watsonAssistantChatOptions = {
        integrationID: "473efd6a-70b1-4558-9a0f-0982d54dfff3", //draft
        //integrationID: "ed1751e8-4043-46a9-ab3c-3b14be51cb43", //live
        region: "eu-gb",
        serviceInstanceID: "0647b866-508c-487b-b576-f45abd434252",
    
        //listeners
        onLoad: function(instance) {
            //reset chat
            reset.addEventListener('click', function() {
                instance.restartConversation();
                changeAnimation(video2);
            });
            resetMenu.addEventListener('click', function() {
                instance.restartConversation();
                changeAnimation(video2);
                navMenu.classList.toggle("active");
                menuOpened = false;
            });
    
            //scroll to most recent message
            recent.addEventListener('click', function() {
                instance.doAutoScroll();
            });
            recentMenu.addEventListener('click', function() {
                instance.doAutoScroll();
                navMenu.classList.toggle("active");
                menuOpened = false;
            });
    
            //detect chatbot response
            function handler(event) {
                if (menuOpened) {
                    //close mobile menu if opened
                    navMenu.classList.toggle("active");
                    menuOpened = false;
                }
                try {
                    var intent = event.data.output.intents[0].intent;
                    var confidence = event.data.output.intents[0].confidence;
                    console.log("intent detected:", intent, ", confidence:", confidence);
                    //return new avatar expression
                    if (confidence < 1) {
                        changeAnimation(video6);
                    } else {
                        switch(intent) {
                            case "greetings":
                                changeAnimation(video2);
                                break;
                            default:
                                //return random response animation
                                var rand = resvids[Math.floor(Math.random()*resvids.length)];
                                changeAnimation(rand);
                        }
                    }
                } catch (error) {
                    if (login) {
                        console.log("No intent detected");
                        changeAnimation(video6);
                    } else {
                        login = true;
                    }
                }
            }
            instance.on({ type: "receive", handler: handler });
      
            instance.render();
        }, 
    
        element: customElement,
    
        //chatbot settings
        showLauncher: false,
        hideCloseButton: true,
        openChatByDefault: true,
    };
}

/*
window.watsonAssistantChatOptions = {
    integrationID: "473efd6a-70b1-4558-9a0f-0982d54dfff3", //draft
    //integrationID: "ed1751e8-4043-46a9-ab3c-3b14be51cb43", //live
    region: "eu-gb",
    serviceInstanceID: "0647b866-508c-487b-b576-f45abd434252",

    //listeners
    onLoad: function(instance) {
        //reset chat
        reset.addEventListener('click', function() {
            instance.restartConversation();
            changeAnimation(video2);
        });
        resetMenu.addEventListener('click', function() {
            instance.restartConversation();
            changeAnimation(video2);
            navMenu.classList.toggle("active");
            menuOpened = false;
        });

        //scroll to most recent message
        recent.addEventListener('click', function() {
            instance.doAutoScroll();
        });
        recentMenu.addEventListener('click', function() {
            instance.doAutoScroll();
            navMenu.classList.toggle("active");
            menuOpened = false;
        });

        //detect chatbot response
        function handler(event) {
            if (menuOpened) {
                //close mobile menu if opened
                navMenu.classList.toggle("active");
                menuOpened = false;
            }
            try {
                var intent = event.data.output.intents[0].intent;
                var confidence = event.data.output.intents[0].confidence;
                console.log("intent detected:", intent, ", confidence:", confidence);
                //return new avatar expression
                if (confidence < 1) {
                    changeAnimation(video6);
                } else {
                    switch(intent) {
                        case "greetings":
                            changeAnimation(video2);
                            break;
                        default:
                            //return random response animation
                            var rand = resvids[Math.floor(Math.random()*resvids.length)];
                            changeAnimation(rand);
                    }
                }
            } catch (error) {
                console.log("No intent detected");
                changeAnimation(video6);
            }
        }
        instance.on({ type: "receive", handler: handler });

        instance.updateCSSVariables({
            'BASE-height': '50%'
        });
  
        instance.render();
    }, 

    element: customElement,

    //chatbot settings
    showLauncher: false,
    hideCloseButton: true,
    openChatByDefault: true,
};
*/

setTimeout(function(){
    const t = document.createElement('script');
    t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
});

//change avatar animation
function changeAnimation(vid) {
    if (!vidPlaying) {
        vidPlaying = true;
        video.classList.toggle("hidden");
        vid.classList.toggle("hidden");
        vid.play();
        vid.onended = function(e) {
            video.classList.toggle("hidden");
            vid.classList.toggle("hidden");
            vidPlaying = false;
        };
    }
    
}

//variables
var navIcon = document.getElementById('nav_icon');
var navMenu = document.getElementById('nav_menu');
var menuOpened = false;
var desc = document.getElementById('desc');
var contentHolder = document.getElementById('content_holder');

var reset = document.getElementById('reset');
var recent = document.getElementById('recent');
var resetMenu = document.getElementById('reset_menu');
var recentMenu = document.getElementById('recent_menu');

var video = document.getElementById('video');
var video2 = document.getElementById('video2');
var video3 = document.getElementById('video3');
var video4 = document.getElementById('video4');
var video5 = document.getElementById('video5');
var video6 = document.getElementById('video6');
var vidPlaying = false;
var resvids = [video3, video4, video5];

var login = false;

//Greeting animation upon entering page
video.classList.toggle("hidden");
video2.classList.toggle("hidden");
video2.play();
video2.onended = function(e) {
    video.classList.toggle("hidden");
    video2.classList.toggle("hidden");
};

//open menu in mobile view
navIcon.addEventListener('click', function() {
    navMenu.classList.toggle("active");
    if (menuOpened) {
        menuOpened = false;
    } else {
        menuOpened = true;
    }
});

//open drop down text in menu in mobile view
desc.addEventListener('click', function() {
    contentHolder.classList.toggle("open");
});
