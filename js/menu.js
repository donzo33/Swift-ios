$(function() {
   var menu = {
      isMenuOpen: false,
      cssStates: {
         opened: "menu-opened",
         closed: "menu-closed"
      },
      toggleState: function() { // Fonction pour afficher/cacher le menu hamburger
         if (this.isMenuOpen) { // On utilise this pour accéder aux propriétés de menu lui meme
            $("#menu-content").removeClass(this.cssStates.opened);
            $("#menu-content").addClass(this.cssStates.closed); // On enléve l'ancienne classe et ajoute la nouvelle

            $("#menu-button-top").removeClass("openButton");
            $("#menu-button-top").addClass("closeButton");
         } else {
            $("#menu-content").removeClass(this.cssStates.closed);
            $("#menu-content").addClass(this.cssStates.opened);
         }
         this.isMenuOpen = !this.isMenuOpen; // On inverse le boolean
      }
   };

   $("#menu").click(function() {
      menu.toggleState();
   });
})