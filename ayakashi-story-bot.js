var current = 0;
var max = 30;
var continueClick = true;
function click() {
    var delay = 1000;
    console.log(current + "/" + max);
        if ($("#card-acquisition-page").hasClass("ui-page-active")) {
            window.history.back();
        } else if ($("#level-up-page").hasClass("ui-page-active")) {
            $(".button")[2].id = "continue";
            $("#continue").trigger("click");
        } else if ($("#encounter-other-player-page").hasClass("ui-page-active")) {
            window.history.back();
        } else if ($("#parts-pvp-acquisition-page").hasClass("ui-page-active")) {
            window.history.back();
        } else {
            if (!($("#do-adventure").hasClass("loading"))) {
                if (current < max) {
                    $("#do-adventure").trigger("click");
                } else {
                    continueClick = false;
                }
            } else {
            }
        }
    if (continueClick)
        window.setTimeout(click, delay);
}
click();