function showAlert(type) {
    if(type === "success"){
        
      var alertBox = document.getElementById("alert-box-success");
        if (alertBox.classList.contains("hidden")) {
          alertBox.classList.remove("hidden");
          setTimeout(() => {
            alertBox.classList.add("hidden");
          }, 4000);
        } else {
          alertBox.classList.add("hidden");
        }

    } else if(type === "error"){
        var alertBox = document.getElementById("alert-box-error");
        if (alertBox.classList.contains("hidden")) {
          alertBox.classList.remove("hidden");
          setTimeout(() => {
            alertBox.classList.add("hidden");
          }, 4000);
        } else {
          alertBox.classList.add("hidden");
        }
    }
}
