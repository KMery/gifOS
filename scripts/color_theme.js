//Cambio de tema
function changeTheme(cssFile, cssLinkIndex) {
    try {
      var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);
      oldlink.setAttribute('href', cssFile);
      localStorage.setItem('theme'+String(cssLinkIndex), cssFile);
    } catch (e) {  
      console.log(e instanceof TypeError)  // true
      console.log(e.message)               // "null has no properties"
      console.log(e.name)                  // "TypeError"
      console.log(e.fileName)              // "Scratchpad/1"
      console.log(e.lineNumber)            // 2
      console.log(e.columnNumber)          // 2
    }    
  }

  var flag_logo = false;
  var logo = document.getElementById("logo");

  // function logo() {
  //   if (flag_logo === false) {
  //     logo.setAttribute("src", "./images/gifOF_logo_dark.png");
  //   } else {
  //     logo.setAttribute("src", "./images/gifOF_logo.png");
  //   }
  // }


  function theme(tema) {
      if (flag_logo === false && tema === 'noche') {
        logo.setAttribute("src", "./images/gifOF_logo_dark.png");
        // localStorage.setItem('logo', logo.src);
        changeTheme("./styles/cabecera_generado2.css", 0);
        changeTheme("./styles/seccion_generado2.css", 1);
        flag_logo = true; 
      } else if (flag_logo === true && tema === 'dia') {
          logo.setAttribute("src", "./images/gifOF_logo.png");
          // localStorage.setItem('logo', logo.src);
          changeTheme("./styles/cabecera_generado.css", 0);
          changeTheme("./styles/seccion_generado.css", 1);
          flag_logo = false;
    }
    return flag_logo;
  }

//   document.addEventListener("DOMContentLoaded", function(event) {
//     changeTheme(localStorage.getItem('theme0'), 0);
//     changeTheme(localStorage.getItem('theme1'), 1);
// });
// localStorage.clear();
