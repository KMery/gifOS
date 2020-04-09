var filter;
var tendencias = document.getElementById("Tendencias");
var hoy = document.getElementById("Hoy");
var mis_gif = document.getElementById("misGif");
var my_ul = document.getElementById("myUL");
var url1 = 'http://api.giphy.com/v1/gifs/';
var search = "";
var rating = "rating?q=g&";
var api_key = "jFwjAFUF5eJFFxcjseB0aYefxJ3VHCI6";
var limit = 8;
var input_search;
var img_src

function mySearch() {
  var input, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  window.filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  if (window.filter !== '') {
    ul.style.display = 'block';
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } else {
          li[i].style.display = "none";
      }
    }  
  } else {
    ul.style.display = 'none';
  }
  return window.filter;
}

function limpiarPantalla() {
  hoy.parentNode.childNodes[3].style.display = "none";
  hoy.style.display = "none";
  parentSec = tendencias.parentNode;
  tendencias.previousSibling.previousElementSibling.innerHTML = 'Resultados para ' + window.filter;
  parentSec = tendencias.getElementsByClassName("element");
  while (parentSec.length > 0) {
    parentSec[0].remove();
  } 
}


function selectedSearch() {
  var vacio = false;
  input_search = window.filter;
  if (input_search === (" ".repeat(input_search.length))) {
    vacio = true;
    document.getElementById('myInput').value = '';
  }
  if ( input_search.length !== 0 && vacio === false) {
    input_search = input_search.replace(/[^a-zA-Z0-9 ]/g, "");
    // console.log(input_search.length);
    input_search = input_search.replace(/ /g, "+");
    limpiarPantalla()
    var new_search = 'http://api.giphy.com/v1/gifs/';
    new_search = new_search + 'search?q=' + input_search + '&';
    limit = 20;
    obtenerGif(new_search, api_key, limit, tendencias, false);
    document.getElementById('myInput').value = '';  
  }
}


function crearElemento(tag, titulo, source) {
    var seccion = document.createElement("div");
    seccion.setAttribute("class", "element");

    if (titulo !== '') {
      var para = document.createElement("p");
      var tnode1 = document.createTextNode(titulo);
      para.appendChild(tnode1)
      var imagenp = document.createElement("img");
      imagenp.setAttribute("src", "./images/close.svg");
      imagenp.setAttribute("alt", "No hay gif :C");
      para.appendChild(imagenp)
      seccion.appendChild(para);  
    }         

    var imagen = document.createElement("img");
    imagen.setAttribute("src", source);
    imagen.setAttribute("alt", "No hay gif :C");
    seccion.appendChild(imagen);
    tag.appendChild(seccion);
}

function obtenerGif(url, api_key, limit, tag, valor) {
  url = url + rating +'api_key=' + api_key + "&limit=" + limit;
  // console.log(url)
  // if (mis_gif !== null) {
  //   url = url1 + localStorage.getItem('idGif') + '?api_key=' + api_key
  //   console.log(url)
  //   return url 
  // }

  
  fetch(url).then(res => res.json())
  .then(data => {
    var gifOS = data.data
    // console.log(gifOS);
    
    for (i = 0; i <= (gifOS.length - 1); i++) {
      if (valor === true) {
        var clase = hoy.getElementsByClassName("element");
        crearElemento(tag, gifOS[i].title.slice(0,30), gifOS[i].images.original.url);
        var boton = document.createElement("button");
        boton.setAttribute("id", gifOS[i].title.slice(0,30));
        boton.innerHTML = "Ver mas...";
        
        // clase.item(0).childNodes[0].style.display = 'block';
        // console.log(clase.item(i).childNodes[i]);
        // console.log(document.querySelectorAll("p"));

        clase[i].appendChild(boton);
        tag.appendChild(clase[i]);
      } else {
        crearElemento(tag, gifOS[i].title.slice(0,30), gifOS[i].images.original.url) 
      }
    }
  })
  .catch(e => console.error(e))  
}

function obtenerMisGif(url, tag, valor) {
  fetch(url).then(res => res.json())
  .then(data => {
    var gifOS = data
    // console.log(gifOS.data.images.downsized_large.url);
    img_src = gifOS.data.images.downsized_large.url;
    if (valor === true) {
      crearElemento(tag, '', img_src); 
    }
  })
  .catch(e => console.error(e))
  return img_src  
}


if (my_ul !== null && hoy !== null && tendencias !== null) {
  my_ul.addEventListener('click', function (e) {
    window.filter = e.target.firstChild.textContent;
    // console.log(window.filter);
    document.getElementById("myUL").style.display = 'none';
    selectedSearch();
  });  

  hoy.addEventListener('click', function (e) {
    // console.log(e.target.id);
    window.filter = e.target.id;
    // console.log(e.target.previousSibling.previousSibling.textContent);
    selectedSearch();
  });

  // function myPost() {
  //   var subiendo = document.getElementById('subiendoGif');
  //   subiendo.style.display = 'block';
  // }

  // url = 'api.giphy.com/v1/gifs/trending?';
  url1 = url1 + 'search?q=' + "silly&" + rating;
  // url1 = url1 + 'random?' 
  obtenerGif(url1, api_key, 4, hoy, true);

  // var url2 = 'http://api.giphy.com/v1/gifs/random?';
  var url2 = 'http://api.giphy.com/v1/gifs/'; 
  url2 = url2 + 'search?q=' + "trend&" + rating;  
  obtenerGif(url2, api_key, limit, tendencias, false);  
} else if (localStorage.getItem('idGif') !== null) {

  var len_array = JSON.parse(localStorage.getItem('idGif'))
  // console.log(len_array.length);

  len_array.forEach(gif => {
    url = url1 + gif + '?api_key=' + api_key
    // console.log(url)  
    obtenerMisGif(url, mis_gif, true); 
  });
}

function copyToClipboard() {
  /* Get the text field */
  var inputValor = document.getElementById('clipboard');
  console.log(inputValor.value);
  var lastGif = JSON.parse(localStorage.getItem('idGif'))
  // lastGif = lastGif[lastGif.length]
  // console.log(lastGif);
  console.log(lastGif[(lastGif.length)]);
  url1 =  url1 + lastGif[lastGif.length - 1] + '?api_key=' + api_key;
  
  inputValor.value = obtenerMisGif(url1, mis_gif, false); 
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Se ha copiado el link a tu Gif");
} 










 