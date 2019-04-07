/* //Changement du fond avec mouse hover

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

var sloganText = "Formation intensive proposée par la Wild Code School"; // Length: 52
var sloganTimers = [{ // Le total des letters doit être égal à la length ici ------->|
   letters: 4,
   delay: 90
}, {
   letters: 11,
   delay: 65
}, {
   letters: 10,
   delay: 55
}, {
   letters: 20,
   delay: 90
}, {
   letters: 7,
   delay: 50
}];

$(function() { // Document ready
   typeSlogan(); // ah oui oui

// Animation de scroll
   $('.scroll').bind('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
         scrollTop: $($anchor.attr('href')).offset().top
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
   });
});

function typeSlogan() {
   var slogan = $("#accueil-slogan");

   // On parcours le tableau et lettre par lettre on lance l'ajout
   for (let i = 0, total = 0, currentLetter = 0; i < sloganTimers.length; i++) {
      var st = sloganTimers[i];
      for (let n = 0; n < st.letters; n++) {
         total += st.delay;
         addLetter(currentLetter, total); // On appelle la fonction qui va éxécuter le timeout (afin de garder une copie des variables)
         currentLetter++;
      }
   }
}

function addLetter(cl, delay) {
   var slogan = $("#accueil-slogan");
   setTimeout(function() {
      slogan.text(slogan.text() + sloganText[cl]);
   }, delay); // On lance un timeout où on ajoute la lettre
}

