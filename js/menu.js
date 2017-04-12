$(function() {
   var menu = {
      isOpen: false,
      cssStates: {
         opened: "menu-opened",
         closed: "menu-closed"
      },
      toggleState: function() { // Fonction pour afficher/cacher le menu hamburger
         if (this.isOpen) { // On utilise this pour accéder aux propriétés de menu lui meme
            $("#menu-content").removeClass(this.cssStates.opened);
            $("#menu-content").addClass(this.cssStates.closed); // On enléve l'ancienne classe et ajoute la nouvelle
         } else {
            // Si le menu est fermé (il va s'ouvrir) on lance l'anim des links
            $(".menu-links-items-left").addClass("animated bounceInLeft");
            $(".menu-links-items-right").addClass("animated bounceInRight");
            
            // Du logo
            $("#menu-logo-img").addClass("bounceInDown");

            // Et du menu en lui meme
            $("#menu-content").removeClass(this.cssStates.closed);
            $("#menu-content").addClass(this.cssStates.opened);
         }

         $("#menu-button").toggleClass("active"); // On toggle notre bouton
         this.isOpen = !this.isOpen; // On inverse le boolean
      }
   };

   $("#menu").click(function() {
      menu.toggleState(); // On ouvre/ferme le menu
   });

   $("#pages-container").click(function() {
      if(menu.isOpen) { // Si le menu est ouvert lors d'un clic en dehors il se ferme
         menu.toggleState();
      }
   });

   //  Lorsque l'animation de menu content se termine
   $("#menu-content").on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
      function(e) {
         if (!menu.isOpen) {
            $(".menu-links-items-left").removeClass("bounceInLeft");
            $(".menu-links-items-right").removeClass("bounceInRight");
         }
      }
   );

   $("#menu-logo-img").on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
      function(e) {
         $("#menu-logo-img").removeClass("bounceInDown");
         $("#menu-logo-img").addClass("tada");
      }
   );

})