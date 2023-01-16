var form = document.getElementById("gameForm");

form.addEventListener("submit", function(event) {
  event.preventDefault(); // empêche la soumission automatique du formulaire

  var joueur1 = document.getElementById("joueur1").value;
  var joueur2 = document.getElementById("joueur2").value;
  var temps = document.getElementById("temps").value;
  var taille = document.getElementById("taille").value;
  var debutant = document.getElementById("debutant").value;

  var partie = {
    joueur1 : joueur1,
    joueur2 : joueur2,
    temps : temps,
    taille : taille,
    debutant : debutant
  }

  console.log("Partie : " + JSON.stringify(partie));
});
