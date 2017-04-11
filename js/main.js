var menu = {
   isMenuOpen: false,
   cssStates: {
      closed: "menu-closed",
      open: "menu-open"
   },
   toggleState: function() { // Fonction qui est appelée pour ouvrir ou fermer le menu
      if (this.isMenuOpen) { // On utilise this pour accéder aux propriétés de lui meme (objet menu)
         $("#menu").removeClass(this.cssStates.open);
         $("#menu").addClass(this.cssStates.closed); // On change la classe du menu
      } else {
         $("#menu").removeClass(this.cssStates.closed);
         $("#menu").addClass(this.cssStates.open);
      }
   }
}

$(function() {
	$("#menu").click(function () {
      menu.toggleState();
   });
})