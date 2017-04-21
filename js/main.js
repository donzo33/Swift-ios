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

var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("phone");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
   modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
   modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
   if (event.target == modal) {
      modal.style.display = "none";
   }
}

/* form validation plugin */
$.fn.goValidate = function() {
   var $form = this,
      $inputs = $form.find('input:text');

   var validators = {
      name: {
         regex: /^[A-Za-z]{3,}$/
      },
      pass: {
         regex: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
      },
      email: {
         regex: /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/
      },
      phone: {
         regex: /^[2-9]\d{2}-\d{3}-\d{4}$/,
      }
   };
   var validate = function(klass, value) {
      var isValid = true,
         error = '';

      if (!value && /required/.test(klass)) {
         error = 'This field is required';
         isValid = false;
      } else {
         klass = klass.split(/\s/);
         $.each(klass, function(i, k) {
            if (validators[k]) {
               if (value && !validators[k].regex.test(value)) {
                  isValid = false;
                  error = validators[k].error;
               }
            }
         });
      }
      return {
         isValid: isValid,
         error: error
      }
   };
   var showError = function($input) {
      var klass = $input.attr('class'),
         value = $input.val(),
         test = validate(klass, value);

      $input.removeClass('invalid');
      $('#form-error').addClass('hide');

      if (!test.isValid) {
         $input.addClass('invalid');

         if (typeof $input.data("shown") == "undefined" || $input.data("shown") == false) {
            $input.popover('show');
         }

      } else {
         $input.popover('hide');
      }
   };

   $inputs.keyup(function() {
      showError($(this));
   });

   $inputs.on('shown.bs.popover', function() {
      $(this).data("shown", true);
   });

   $inputs.on('hidden.bs.popover', function() {
      $(this).data("shown", false);
   });

   $form.submit(function(e) {

      $inputs.each(function() { /* test each input */
         if ($(this).is('.required') || $(this).hasClass('invalid')) {
            showError($(this));
         }
      });
      if ($form.find('input.invalid').length) { /* form is not valid */
         e.preventDefault();
         $('#form-error').toggleClass('hide');
      }
   });
   return this;
};
$('form').goValidate();