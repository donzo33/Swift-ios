var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("phone");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var modal2 = document.getElementById('myModal2');

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/* form validation plugin */
$.fn.goValidate = function () {
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
    var validate = function (klass, value) {
        var isValid = true,
            error = '';

        if (!value && /required/.test(klass)) {
            error = 'This field is required';
            isValid = false;
        } else {
            klass = klass.split(/\s/);
            $.each(klass, function (i, k) {
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
    var showError = function ($input) {
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

    $inputs.keyup(function () {
        showError($(this));
    });

    $inputs.on('shown.bs.popover', function () {
        $(this).data("shown", true);
    });

    $inputs.on('hidden.bs.popover', function () {
        $(this).data("shown", false);
    });

    $form.submit(function (e) {

        $inputs.each(function () { /* test each input */
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

$('#btn-envoyer').on('click', function (event) {
    debugger;
    var email = 'justine@wildcodeschool.fr';
    var subject = 'Candidature à la formation Swift/iOS Toulouse'
    var emailBody = "Nom et prénoms : " + $('#name').val() + escape("\n") + "Adresse e-mail : " + $('#mail').val() + escape("\n") + "Numéro de téléphone : " + $('#phon').val() + escape("\n") + "Message : " + $('#message').val();
    //alert("Vous allez être rédiriger vers votre application mail afin d'envoyer votre candidature.");
    window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + emailBody;
    $('#myModal2').modal('hide');
});