// Objet contenant toutes les questions ainsi que leur réponses
// Il sera ensuite dynamiquement ajouté a la page lors du chargement
var questions = [
   {
      question: "Ma premiere question est ?",
      answers: [
         {text: "Reponse 1", answer: false},
         {text: "Reponse 2", answer: true},
         {text: "Reponse 3", answer: false}
      ]
   },{
      question: "Ma deuxiéme question est ?",
      answers: [
         {text: "Reponse 1", answer: false},
         {text: "HReponse 2", answer: false},
         {text: "HHReponse 3", answer: true}
      ]
   },
];

var studentResult = [];

$(function() {
   for (let i = 0; i < questions.length; i++) {
      var path = "#questionnaire-questions-row", q = questions[i], a = q.answers;
      studentResult.push("unanswered"); // On initie les résultats de l'éléve a false
      
      jQuery('<div/>', { // On crée le div de la question
         id: 'question-n-' + i,
         class: 'question col-xs-12 col-md-6'
      }).appendTo(path);
      path = "#question-n-" + i;
      
      jQuery('<div/>', { // Le div du texte de la question
         class: 'question-text'
      }).appendTo(path);
      $(".question-text", path).append("<p>" + q.question + "</p>");

      jQuery('<div/>', { // Le div qui va contenir les réponses
         class: 'question-answers row'
      }).appendTo(path);

      // On parcours le tableau des réponses et on les ajoute (data-answer est utilisé pour retrouver la bonne réponse)
      for (let iA = 0; iA < a.length; iA++) {
         $(".question-answers", path).append("<div id='q" + i + "a" + iA + "' data-question-id='" + i + "' data-answer='" + a[iA].answer +
                                             "' class='question-answer question-answer-alive animated col-xs-4'>" + a[iA].text + "</div>");
      }
   }

   $(".question-answer").click(function(origin) {
      if (! (typeof origin.target.dataset.answer === "string" && typeof origin.target.dataset.questionId === "string")) {
         return null; // Protection
      }

      var isGoodAnswer = (origin.target.dataset.answer == 'true'); // On utilise le dataset pour retrouver l'id et si c une bonne réponse
      var id = parseInt(origin.target.dataset.questionId);

      if (! (typeof isGoodAnswer === "boolean" && typeof id === "number")) {
         return null; // Protection
      } else if (studentResult[id] != "unanswered") { // else if plutot que ou par lisibilité
         return null; // Si la question a déja été répondue alors on ne fait rien
      }

      // On peut débuter le traitement
      studentResult[id] = isGoodAnswer ? "right" : "wrong"; // On ajoute sa réponse a ses résultats
      console.log(studentResult);
      
      var answer = $("#" + origin.target.id);
      answer.addClass("flipOutX"); // On lance l'anim
      answer.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', // On lui ajoute un callback de fin d'anim
         function(e) {
            if (answer.hasClass("flipOutX")) {
               answer.removeClass("flipOutX");
               answer.addClass("flipInX");
            } else {
               answer.removeClass("flipInX");
               isGoodAnswer ? answer.addClass("tada") : answer.addClass("jello");
            }
         }
      );

      // On enléve la classe 'alive' pour désactiver le hover
      var qAnswers = origin.target.offsetParent.childNodes[1].childNodes; // Wtf?
      for (let i = 0; i < qAnswers.length; i++) { // On parcours le tableau des réponses de la question
         var node = $("#" + qAnswers[i].id);
         node.removeClass("question-answer-alive");
         setTimeout(() => $("#" + qAnswers[i].id).addClass("question-disabled"), 500);
      }

      if (isGoodAnswer) {
         setTimeout(() => answer.addClass("question-right"), 500);
      } else {
         setTimeout(() => answer.addClass("question-wrong"), 500);
      }
   })
})