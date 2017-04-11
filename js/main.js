$(function() {
   var menu = {
      isMenuOpen: false,
      cssStates: {
         opened: "menu-opened",
         closed: "menu-closed"
      },
      toggleState: function() { // Fonction pour afficher/cacher le menu hamburger
         if (this.isMenuOpen) { // On utilise this pour accéder aux propriétés de menu lui meme
            $("#menu").removeClass(this.cssStates.opened);
            $("#menu").addClass(this.cssStates.closed); // On enléve l'ancienne classe et ajoute la nouvelle
         } else {
            $("#menu").removeClass(this.cssStates.closed);
            $("#menu").addClass(this.cssStates.opened);
         }
         this.isMenuOpen = !this.isMenuOpen; // On inverse le boolean
      }
   };

   $("#menu").click(function() {
      menu.toggleState();
   });
})