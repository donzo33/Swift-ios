

/*//Changement du fond avec mouse hover

var originalBG = '',
    lightColor = 'fff',
    gradientSize = 5;

$('#accueil')
.mousemove(function(e) {
    originalBG = $("#accueil").css("background");
    x  = e.pageX - this.offsetLeft;
    y  = e.pageY - this.offsetTop;
    xy = x + " " + y;

    bgWebKit = "-webkit-gradient(radial, " + xy + ", 0, " + xy + ", 100, from(rgba(244,154,43,0.8)), to(rgba(255,255,255,0.0))), " + originalBG;
    bgMoz    = "-moz-radial-gradient(" + x + "px " + y + "px 45deg, circle, " + lightColor + " 0%, " + originalBG + " " + gradientSize + "px)";

    $(this)
      .css({ background: bgWebKit })
      .css({ background: bgMoz });

}).mouseleave(function() {
        $(this).css({ background: originalBG });
});
*/

// Window scroll pour tous les liens <a>
$(function() {
    $('a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});
