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

$(function() {
   for (let i = 0; i < questions.length; i++) {
      var path = "#questionnaire-questions-row", q = questions[i], a = q.answers;
      
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
         $(".question-answers", path).append("<div data-answer='" + a[iA].answer + "' class='question-answer col-xs-4'>" + a[iA].text + "</div>");
      }
   }

   $(".question-answer").click(function(origin) {
      var isGoodAnswer = origin.target.dataset.answer; // On utilise le dataset pour retrouver
   })
})