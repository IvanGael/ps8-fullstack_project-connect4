

var form = document.getElementById("gameForm");

form.addEventListener("submit", function(event) {
  event.preventDefault(); // empêche la soumission automatique du formulaire

  var joueur1 = document.getElementById("joueur1").value;
  var joueur2 = document.getElementById("joueur2").value;
  var temps = document.getElementById("temps").value;
  var taille = document.getElementById("taille").value;
  var debutant = document.getElementById("debutant").value;

  if(joueur1!=="" && joueur2!=="" && temps!=="" && taille!=="" && debutant!==""){
    
    var data = {
      joueur1 : joueur1,
      joueur2 : joueur2,
      temps : temps,
      taille : taille,
      debutant : debutant
    };

    

    //const fs = require('fs');

    //const jsonString = JSON.stringify(data);

    //fs.writeFileSync('./example.js', jsonString);

    //* messages
    //var msg = "Les données saisies : " + JSON.stringify(data);
    //document.getElementById("alert-box-success-msg").innerHTML = msg
    //alert(JSON.stringify(data));
    //showAlert("success");

    // * Write the data into a file to be used in another page , JSON
    //var fs = require('fs');
    //fs.writeFileSync('../data/example.json', data);
    document.location.href = "game.html?" +
        "joueur1=" + encodeURI(joueur1) + "&" +
        "joueur2=" + encodeURI(joueur2) + "&" +
        "temps=" + encodeURI(temps) + "&" +
        "taille=" + encodeURI(taille) + "&" +
        "debutant=" + encodeURI(debutant);

  } else{
    document.getElementById("alert-box-error-msg").innerHTML = "Veuillez renseigner les informations demandées!"
    var audio = new Audio("./assets/mp3/alert-error-sound-1.mp3");
    audio.play().then(()=>{
      console.log("Audio is successfully loaded.")
    }).catch((e)=>{
      console.log(e)
    });
    showAlert("error")
  }



});



