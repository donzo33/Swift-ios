// Objet contenant toutes les questions ainsi que leur réponses
// Il sera ensuite dynamiquement ajouté a la page lors du chargement
var questions = [{
    question: "1: Si une valeur est amenée à être modifiée plusieurs fois,il préférable d’utiliser?",
    answers: [
        { text: "Une constante (let)", answer: false },
        { text: "Une variable (var)", answer: true },
        { text: "Une condition (if)", answer: false },
        { text: "La Réponse D", answer: false }
    ],
    correction: "Lorsque je ne souhaite pas changer la valeur d’une variable, j’utilise une constante. Sinon j’utilise une variable. La valeur d’une constante restera toujours la même et on ne pourra jamais lui associer une nouvelle valeur."
}, {
    question: "2: Quel valeur est ici un booléen ?",
    answers: [
        { text: "Hello World !", answer: false },
        { text: "42", answer: false },
        { text: "false", answer: true },
        { text: "La Réponse D", answer: false }
    ],
    correction: "Un booléen ne retourne que deux choses possibles : soit vrai, soit faux. Ici, false signifie faux en français. Les autres réponses sont soit des chaînes de caractères, soit des nombres (entiers ou à virgule)."
}, {
    question: "3: Quelle sera la valeur de la variable resultat après le code [var resultat = 10/3] ?",
    answers: [
        { text: "3", answer: true },
        { text: "3,33", answer: false },
        { text: "Undefined", answer: false },
        {  text: "0", answer: false  }
    ],
    correction: "Souvenez-vous, le résultat d’une division n’est que son quotient. Le modulo, lui, vous permettra d’avoir le reste de la division."
}, {
    question: "4: Je dispose d’une variable age qui a pour valeur 18, cette condition est-elle vérifiée ? [if age >= 18]",
    answers: [
        { text: "oui", answer: false },
        { text: "non", answer: true },
        {  text: "Tout dépend de son utilisation",  answer:  false  },    
        {  text: "les deux",  answer:  false  }
    ],
    correction: "Age a pour valeur 18. 18 est bien supérieur ou égal à 18, donc la condition est bien vérifiée et on pourra exécuter les instruction de ce if."
}, {
    question: "5: Quelle est la particularité d’une boucle repeat … while ?",
    answers: [
        { text: "Elle a pour particularité de toujours s’exécuter au minimum une fois", answer: true },
        { text: "Elle ne s’exécutera pas si la condition n’est pas vérifiée dès le départ", answer: false },
        {  text: "Cette boucle n’existe pas dans le langage Swift", answer: false  },         {  text: "Les deux", answer: false  }
    ],
    correction: "Cette boucle va toujours s'exécuter au moins une fois. Ça veut dire que si l'on fournit une condition fausse dès le départ, on entrera tout de même dans la boucle."
}, {
    question: "6 : Laquelle de ces boucles pourrait afficher les multiples de deux de 0 compris à 10 compris (0, 2, 4, 6, 8, 10) ?",
    answers: [
        { text: "for i = 1; i < 10; i = i+2", answer: false },
        { text: "for i = 0; i <= 10; i = i+2", answer: true },
        { text: "for i = 0; i <= 10; i++", answer: false },
        { text: "for i = 0; i < 10; i++", answer: false }
    ],
    correction: "Cette boucle va toujours s'exécuter au moins une fois. Ça veut dire que si l'on fournit une condition fausse dès le départ, on entrera tout de même dans la boucle."
}, {
    question: "7: Par défaut, les tableaux numérotés commencent à la valeur…",
    answers: [
        { text: "0", answer: true },
        { text: "2", answer: false },
        { text: "-1", answer: false },
        { text: "1", answer: false }
    ],
    correction: "Tous les tableaux numérotés commencent à l’indice 0."
}, {
    question: "8: Quelle mot-clé permet de définir une fonction ?",
    answers: [
        { text: "function", answer: false },
        { text: "fonction", answer: false },
        { text: "func", answer: true },
        { text: "fonc", answer: false }
    ],
    correction: "Il s’agissait tout simplement du mot clé func. Les autres mots clé n’existent tout simplement pas en Swift."
}, {
    question: "9: Que va m'afficher le code func hello() -> String {var hello = 'Hello' return hello} helo ()",
    answers: [
        { text: "hello", answer: false },
        { text: "Hello", answer: false },
        { text: "var=Hello", answer: false },
        { text: "Rien du tout", answer: true }
    ],
    correction: "La fonction hello() ne fait que retourner un String et c’est tout. Pour que cela s’affiche dans la console, il aurait fallu écrire : print(hello())."
}, {
    question: "10: Peut-on récupérer la valeur d’une variable déclarée dans une fonction en dehors de cette fonction ?",
    answers: [
        { text: "Non", answer: true },
        { text: "Oui", answer: false },
        { text: "Tout depend de sa position", answer: false },
        { text: "Fût un temps oui", answer: false }
    ],
    correction: "Tout ce qui se passe dans une fonction, reste dans cette fonction. Ainsi, toute variable créée dans cette fonction, ne le sera que dans cette fonction et pas ailleurs. De même, toute variable déclarée en dehors d’une fonction, n’est pas accessible à l’intérieur de fonctions."
}];

var studentResult = [],
    actualQuestion = 0;


$(function() {
    createQuestion(0);

    $("#arrow").click(function(e) {
        e.preventDefault();
        newQuestion(actualQuestion);
    });

    $("#questionnaire-solution").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        if ($("#questionnaire-solution").hasClass('fadeIn')) {
            $("#questionnaire-solution").removeClass('fadeIn');
        } else {
            $("#questionnaire-solution").css('visibility', 'hidden');
            $("#questionnaire-solution").removeClass('fadeOut');
        }
    });
})

function showSolution() {
    $("#questionnaire-solution").css('visibility', 'visible');
    $("#questionnaire-solution").addClass('fadeIn');
    $("#questionnaire-correction").empty();
    $("#questionnaire-correction").append(questions[actualQuestion].correction || "Désolé nous n'avons pas d'explications pour cette réponse.");
}

function hideSolution() {
    $("#questionnaire-solution").addClass('fadeOut');
}

function newQuestion() {
    // On lance l'animation et on améne la nouvelle question lorsque l'animation se termine
    actualQuestion++;
    hideSolution();
    $("#question").css("transform", "translateX(-1500px)");
    $("#question").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
        createQuestion(actualQuestion);
    });
}

function createQuestion(i) {
    var path = "#questionnaire-questions-container",
        q = questions[i],
        a = q.answers;
    studentResult.push("unanswered"); // On initie les résultats de l'éléve a false

    $("#questionnaire-questions-container").empty();

    jQuery('<div/>', { // On crée le div de la question
        id: 'question',
        class: 'question col-xs-12'
    }).appendTo(path);
    path = "#question";

    jQuery('<div/>', { // On crée le div de la question
        id: 'question-inner',
        class: 'question-inner'
    }).appendTo(path);
    path = "#question-inner";

    jQuery('<div/>', { // Le div du texte de la question
        class: 'question-text'
    }).appendTo(path);
    $(".question-text", path).append("<span>" + q.question + "</span>");

    jQuery('<div/>', { // Le div qui va contenir les réponses
        class: 'question-answers row'
    }).appendTo(path);

    // On parcours le tableau des réponses et on les ajoute (data-answer est utilisé pour retrouver la bonne réponse)
    for (let iA = 0; iA < a.length; iA++) {
        $(".question-answers", path).append(`
         <div id='q` + i + `a` + iA + `' data-question-id='` + i + `' data-answer='` + a[iA].answer + `' class='row question-answer question-answer-alive animated col-xs-6'>` +
            `<div class='question-answer-letter unselectable col-xs-2'>` + "ABCD".charAt(iA) + `</div>` +
            `<div class='question-answer-text unselectable col-xs-10'>` + a[iA].text + `</div>` +
            `</div>`
        );
    }

    $(".question-answer-text").click(onAnswerClick);
    setTimeout(() => $("#question").css("transform", "translateX(0px)"), 50);
}

function onAnswerClick(origin) {
    let parent = origin.target.offsetParent;
    let dataset = parent.dataset;

    if (!(typeof dataset.answer === "string" && typeof dataset.questionId === "string")) {
        return null; // Protection
    }

    // ---- Déclaration
    var isGoodAnswer = (dataset.answer == 'true'); // On utilise le dataset pour retrouver l'id et si c une bonne réponse
    var id = parseInt(dataset.questionId);
    // ---------------

    if (!(typeof isGoodAnswer === "boolean" && typeof id === "number")) {
        return null; // Protection
    } else if (studentResult[id] != "unanswered") { // else if plutot que ou par lisibilité
        return null; // Si la question a déja été répondue alors on ne fait rien
    }

    //----- On peut débuter le traitement------
    studentResult[id] = isGoodAnswer ? "right" : "wrong"; // On ajoute sa réponse a ses résultats

    var answer = $("#" + parent.id);
    answer.addClass("flipOutX"); // On lance l'anim
    answer.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', // On lui ajoute un callback de fin d'anim
        function(e) {
            if (answer.hasClass("flipOutX")) {
                answer.removeClass("flipOutX");
                answer.addClass("flipInX");
            } else if (answer.hasClass("flipInX")) {
                answer.removeClass("flipInX");
                isGoodAnswer ? answer.addClass("tada") : answer.addClass("jello");
            } else if (answer.hasClass("tada") || answer.hasClass("jello")) {
                console.log(parent.offsetParent.firstChild.childNodes[1].childNodes);
                var qAnswers = parent.offsetParent.firstChild.childNodes[1].childNodes; // Wtf?
                for (let i = 0; i < qAnswers.length; i++) { // On parcours le tableau des réponses de la question
                    if (i % 2 == 0) i++;
                    var node = $("#" + qAnswers[i].id);
                    if (node[0].dataset.answer == "true" && node[0].id != parent.id) {
                        // Si on tombe sur une bonne réponse qui n'a pas été choisie par l'utilisateur
                        setTimeout(() => $("#" + qAnswers[i].id).addClass("question-right-fail"), 100);
                    } else if (node[0].dataset.answer == "false" && node[0].id != parent.id) {
                        setTimeout(() => $("#" + qAnswers[i].id).addClass("question-wrong"), 100);
                    }
                }
            }
        }
    );

    // On enléve la classe 'alive' pour désactiver le hover
    var qAnswers = $(".question-answers")[0].childNodes; // Wtf? (On récupére la liste des réponses)
    for (let i = 0; i < qAnswers.length; i++) { // On parcours le tableau des réponses de la question
        var node = $("#" + qAnswers[i].id);
        node.removeClass("question-answer-alive");
    }

    // On lance les animations de réponse
    if (isGoodAnswer) {
        setTimeout(() => answer.addClass("question-right"), 500);
    } else {
        setTimeout(() => answer.addClass("question-wrong"), 500);
    }

    setTimeout(() => showSolution(actualQuestion), 2000);

    // On fait avancer la progress bar 
    let percentage = (actualQuestion + 1) / questions.length * 100;
    $("#questionnaire-progress", "#questionnaire-progress-container").css("width", percentage + '%');
}