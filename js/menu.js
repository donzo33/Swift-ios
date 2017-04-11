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
         } else {
            $("#menu-content").removeClass(this.cssStates.closed);
            $("#menu-content").addClass(this.cssStates.opened);

            $("#menu-button-top").removeClass("openButton");
            $("#menu-button-top").addClass("closeButton");

            $("#menu-button-bottom").removeClass("openButton");
            $("#menu-button-bottom").addClass("closeButton");

            $("#menu-button-middle").removeClass("openButton");
            $("#menu-button-middle").addClass("closeButton");
         }
         this.isMenuOpen = !this.isMenuOpen; // On inverse le boolean
      }
   };

   $("#menu").click(function() {
      menu.toggleState();
   });
})