const buttonDm = document.querySelector(".darkMode");
const colorBlack = document.body;

buttonDm.addEventListener("click", function(){
  colorBlack.classList.toggle("dark_mode");

  if (colorBlack.classList.contains("dark_mode")){

    buttonDm.textContent = "Light mode";

  } else{

    buttonDm.textContent = "Dark mode";

  }
}

)