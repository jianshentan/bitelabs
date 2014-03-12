$(document).ready(function() {

    var s = document.URL.split("/");
    var url = s[s.length-1];
    switch (url) {
        case "what":
            scrollToElement($(".section-B"));
            break;
        case "get_involved":
            scrollToElement($(".section-C0"));
            break;
        case "process":
            scrollToElement($(".section-D"));
            break;
        case "vision":
            scrollToElement($(".section-E"));
            break;
        case "contact":
            scrollToElement($(".section-F"));
            break;
        case "legal":
            break;
        default:
            $("html, body").animate({scrollTop: "0"});
            break;
    }

    // nav bar
    $(".nav img").click(function() { $("html, body").animate({scrollTop: "0"}); });
    $(".nav-list > .a").click(function() {scrollToElement($(".section-B"));});
    $(".nav-list > .b").click(function() {scrollToElement($(".section-C0"));});
    $(".nav-list > .c").click(function() {scrollToElement($(".section-D"));});
    $(".nav-list > .d").click(function() {scrollToElement($(".section-E"));});
    $(".nav-list > .e").click(function() {scrollToElement($(".section-F"));});

    // meat selector
    $(".meat-option").each(function() {
        $(this).click(function() {

            // update selector
            $(".meat-option").each(function() {
                $(this).removeClass("active");
            });
            $(this).addClass("active");

            // update content
            $(".meat").each(function() {
                $(this).removeClass("active");
            });
            $(".meat" + $(this).attr("meat-number")).addClass("active");
        });
    });

    // connect buttons
    $(".text-box .glyphicon").each(function(i) {
        $(this).click(function() {
            var entry = $(this).prev("input").val();

            /* ===== HI SORRY WE DIED ===== */
            console.log(entry);
            if (entry.toLowerCase() === "hi sorry we died") {
                window.location.replace("http://www.hisorrywedied.com");
                return false;
            }

            /* ============================ */

            var celeb = ($(this).attr("person-type") == "celeb");
            var func = celeb ? isValidCelebEntry : isValidNormalEntry;
            if (!func(entry)) { 
                if (celeb)
                    alert("Invalid Entry. Use the following format: " +
                        "\n <Firstname Lastname>,  <Email>" +
                        "\n example: 'john doe,  johndoe@email.com'");
                else
                    alert("Invalid Entry. Please enter a valid email address");
            } else {

                if (celeb) {
                    var words = entry.split(',');
                    var name = words[0];
                    var email = words[1];
                    $.post("/celeb-contact", {"name": name, "email": email}, function() {});
                } else {
                    var email = entry;
                    $.post("/normal-contact", {"email": email}, function() {});
                }

                $(this).css({"background-color": "#888", "cursor": "auto"});
                $(this).prev("input").attr("readonly", "readonly");
                $(this).prev("input").css({"color": "#888", "border": "4px solid #888"});
                $(this).parent().next(".submit-result").slideDown();
            }
        });
    });
});

function isValidCelebEntry(string) {
    var words = string.split(',');
    if (words.length != 2 ||
        isValidNormalEntry(words[1])) 
        return false;
    else 
        return true;
};

function isValidNormalEntry(string) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(string);
};

function scrollToElement(e) {
   $('html, body').animate({'scrollTop': e.offset().top - 70}, 'slow', 'swing');
};

// scroll top
setInterval(function() {
    if ($(window).scrollTop() > 300) {
        $(".top").show();
    } else {
        $(".top").hide();
    }
}, 100);

// buttons that scroll the user on the page
$(".top").click(function() { $("html, body").animate({scrollTop: "0"}); });
$(".call-to-action").click(function() { scrollToElement($(".section-B")); });

$(window).scroll(function(){
  $('.nav').css('left',-$(window).scrollLeft());
});

// Thunderclap
$(".splash-thunderclap-help").click(function() {
    $(".thunderclap-dropdown").slideDown();
});

$(".thunderclap-close").click(function() {
    $(".thunderclap-dropdown").slideUp();
});

// Tweet to celeb buttons
function createTweetPopup(name, twitterHandle) {
    var width  = 575,
        height = 400,
        left   = ($(window).width()  - width)  / 2,
        top    = ($(window).height() - height) / 2,
        url    = this.href,
        opts   = 'status=1' +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left;
    
    if (name && twitterHandle)
        window.open("http://twitter.com/share?text="+name+",%20will%20you%20be%20salami?%20"+twitterHandle+"%20@bitelabsco%20%23EatCelebrityMeat", 'twitter', opts);
    else
        window.open("http://twitter.com/share?text=________%20will%20you%20be%20salami?%20%20@bitelabsco%20%23EatCelebrityMeat", 'twitter', opts);
    return false;
};

$(".splash-twitter, .link-to-twitter").click(function() {
    createTweetPopup(null, null); });

$(".celeb-A .twitter-link, .celeb-A .tweet-at").click(function() {
    createTweetPopup("James%20Franco", "@JamesFrancoTV");});

$(".celeb-B .twitter-link, .celeb-B .tweet-at").click(function() {
    createTweetPopup("Jennifer%20Lawrence", "@TheHungerGames");});

$(".celeb-C .twitter-link, .celeb-C .tweet-at").click(function() {
    createTweetPopup("Kanye%20West", "@kanyewest");});

$(".celeb-D .twitter-link, .celeb-D .tweet-at").click(function() {
    createTweetPopup("Ellen%20Degeneres", "@TheEllenShow");});

// thunderclap
$(".thunderclap-link, .splash-thunderclap").click(function() {
    window.open('http://thndr.it/1o2dG6S', '_blank');
});
