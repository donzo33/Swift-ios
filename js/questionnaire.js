// Objet contenant toutes les questions ainsi que leur réponses
// Il sera ensuite dynamiquement ajouté a la page lors du chargement
var questions = [{
   question: "Si une valeur est amenée à être modifiée plusieurs fois,il préférable d’utiliser?",
   answers: [
      { text: "Une constante (let)", answer: false },
      { text: "Une variable (var)", answer: false },
      { text: "Une condition (if)", answer: false },
      { text: "La Réponse D", answer: true }
   ]
}, {
   question: "Quel valeur est ici un booléen ?",
   answers: [
      { text: "Hello World !", answer: false },
      { text: "42", answer: false },
      { text: "false", answer: true },
      { text: "La Réponse D", answer: false }
   ]
}, {
   question: "Quelle sera la valeur de la variable resultat après le code [var resultat = 10/3] ?",
   answers: [
      { text: "3", answer: true },
      { text: "3,33", answer: false },
      { text: "Undefined", answer: false }
   ]
}, {
   question: "je dispose d’une variable age qui a pour valeur 18, cette condition est-elle vérifiée ? [if age >= 18]",
   answers: [
      { text: "oui", answer: false },
      { text: "non", answer: true },
      { text: "La réponse D", answer: false }
   ]
}, {
   question: "Quelle est la particularité d’une boucle repeat … while ?",
   answers: [
      { text: "Elle a pour particularité de toujours s’exécuter au minimum une fois", answer: true },
      { text: "Elle ne s’exécutera pas si la condition n’est pas vérifiée dès le départ", answer: false },
      { text: "Cette boucle n’existe pas dans le langage Swift", answer: false }
   ]
}, {
   question: "Laquelle de ces boucles pourrait afficher les multiples de deux de 0 compris à 10 compris (0, 2, 4, 6, 8, 10) ?",
   answers: [
      { text: "for i = 1; i < 10; i = i+2", answer: false },
      { text: "for i = 0; i <= 10; i = i+2", answer: true },
      { text: "for i = 0; i <= 10; i++", answer: false }
   ]
}, ];

var studentResult = [],
   actualQuestion = 0;


$(function() {
   createQuestion(0);

   $("#questionnaire-next-container").click(function(e) {
      newQuestion(actualQuestion);
   });
})

function newQuestion(i) {
   // On lance l'animation et on améne la nouvelle question lorsque l'animation se termine
   $("#question").css("transform", "translateX(-1500px)");
   $("#question").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
      createQuestion(i);
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
      $(".question-answers", path).append("<div id='q" + i + "a" + iA + "' data-question-id='" + i + "' data-answer='" + a[iA].answer +
         "' class='question-answer question-answer-alive animated col-xs-6'>" +
         "<span class='question-answer-text unselectable'>" + a[iA].text + "</span></div>");
   }

   $(".question-answer").click(onAnswerClick);
   setTimeout(() => $("#question").css("transform", "translateX(0px)"), 50);
}

function onAnswerClick(origin) {
   if (!(typeof origin.target.dataset.answer === "string" && typeof origin.target.dataset.questionId === "string")) {
      return null; // Protection
   }

   // ---- Déclaration
   var isGoodAnswer = (origin.target.dataset.answer == 'true'); // On utilise le dataset pour retrouver l'id et si c une bonne réponse
   var id = parseInt(origin.target.dataset.questionId);
   // ---------------

   if (!(typeof isGoodAnswer === "boolean" && typeof id === "number")) {
      return null; // Protection
   } else if (studentResult[id] != "unanswered") { // else if plutot que ou par lisibilité
      return null; // Si la question a déja été répondue alors on ne fait rien
   }

   //----- On peut débuter le traitement------

   studentResult[id] = isGoodAnswer ? "right" : "wrong"; // On ajoute sa réponse a ses résultats

   var answer = $("#" + origin.target.id);
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
            var qAnswers = origin.target.offsetParent.firstChild.childNodes[1].childNodes; // Wtf?
            for (let i = 0; i < qAnswers.length; i++) { // On parcours le tableau des réponses de la question
               var node = $("#" + qAnswers[i].id);
               if (node[0].dataset.answer == "true" && node[0].id != origin.target.id) {
                  // Si on tombe sur une bonne réponse qui n'a pas été choisie par l'utilisateur
                  setTimeout(() => $("#" + qAnswers[i].id).addClass("question-right-fail"), 100);
               } else if (node[0].dataset.answer == "false" && node[0].id != origin.target.id) {
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
   actualQuestion++;
   var percentage = actualQuestion / questions.length * 100;
   var progressBar = $("#questionnaire-progress", "#questionnaire-progress-container").css("width", percentage + '%');
}

function showSolution(i) {
   $("#questionnaire-solution").css('visibility', 'visible');
   $("#questionnaire-solution").addClass('animated fadeIn');
}