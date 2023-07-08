/** Dark mode
 * this code enables the user to toggle between dark and light themes on the webpage by clicking the buttonDm element. 
 * It stores the current theme in localStorage to maintain the selected theme across page refreshes or navigation.
 */

const buttonDm = document.querySelector(".darkMode");
const colorBlack = document.body;

buttonDm.addEventListener("click", function(){
  colorBlack.classList.toggle("dark_mode");

  let theme;
  
  if (colorBlack.classList.contains("dark_mode")){
    // If the body element has the "dark_mode" class, set the theme to "Dark" and update the button text
    theme = "Dark";
    buttonDm.textContent = "Light mode";

  } else{
    // If the body element doesn't have the "dark_mode" class, set the theme to "Light" and update the button text
    theme = "Light";
    buttonDm.textContent = "Dark mode";

  }

  // Save the current theme to localStorage with the key "PageTheme".
  localStorage.setItem("PageTheme", JSON.stringify(theme)); 

})

let getTheme = JSON.parse(localStorage.getItem("PageTheme"));

if (getTheme === "Dark") {
  // If the stored theme is "Dark", add the "dark_mode" class to the body and update the button text
  document.body.classList = "dark_mode";
  buttonDm.textContent = "Light mode";
}