var image = document.getElementById("rtc");
var preview = document.getElementById("gifFinal");
var recorder; 
let form;
let newIdArr;
var array_gif;

image.src = '';
preview.src = '';
if (localStorage.getItem('idGif') !== null) {
  window.array_gif = JSON.parse(localStorage.getItem('idGif'))
console.log(array_gif);
}


if (array_gif === undefined || array_gif.length === 0) {
  // console.log('Setando');
  window.array_gif = []; 
  console.log(array_gif.length);
}



function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(camera) {
        callback(camera);
    }).catch(function(error) {
        alert('Unable to capture your camera. Please check console logs.');
        console.error(error);
    });

    // var titulo = document.getElementsByClassName('title').item(1).childNodes[0].nextSibling;
    // titulo.innerHTML = 'Capturando tu guifo'
}

// var url_gif;
function stopRecordingCallback() {
    image.src = URL.createObjectURL(recorder.getBlob());
    // console.log(image.src);

    form = new FormData(); 
    form.append('file', recorder.getBlob(), 'myGif.gif'); 
    // console.log(form.get('file'));
    // console.log(form);
    localStorage.setItem("coolGif", image.src);
    // console.log(localStorage.getItem('coolGif'));
    // localStorage.clear();    
    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
}

document.getElementById('btn-start-recording').onclick = function() {
    captureCamera(function(camera) {
        // document.querySelector('h1').innerHTML = 'Waiting for Gif Recorder to start...';
        recorder = RecordRTC(camera, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function() {
                // document.querySelector('h1').innerHTML = 'Gif recording started.';
                var titulo = document.getElementsByClassName('title').item(1).childNodes[0].nextSibling;
                titulo.innerHTML = 'Capturando tu guifo'
            },
            onGifPreview: function(gifURL) {
                image.src = gifURL;
                // console.log(image.src);
            }
        });

        recorder.startRecording();

        // release camera on stopRecording
        recorder.camera = camera;
        
        // document.getElementsById("player").style.display = 'none';
        // document.getElementsById("rtc").style.display = 'flex';
        var start = document.getElementById("btn-start-recording");
        var stop = document.getElementById("btn-stop-recording")
        stop.parentNode.removeChild(stop); 
        var nuevo_boton = document.createElement("button");
        nuevo_boton.style.display = 'block';
        nuevo_boton.setAttribute("id", "btn-stop-recording");
        nuevo_boton.innerHTML = "Listo";
        // console.log(nuevo_boton);

        var cambio_color = document.getElementById("capturar")
        cambio_color.getElementsByTagName("button").item(0).style.backgroundColor = '#FF6161';
        cambio_color.getElementsByTagName("button").item(0).style.backgroundImage = "url('../images/recording.svg')";
        // cambio_color.getElementsByTagName("button").item(1).style.backgroundColor = '#FF6161';
        nuevo_boton.style.backgroundColor = '#FF6161';
        
        // console.log(cambio_color.getElementsByTagName("button").item(0).style.backgroundImage);
        
        // nuevo_boton.style.backgroundColor = '#FF6161';
        
        start.parentNode.replaceChild(nuevo_boton, start); 
        
        // changeBtnColor();   
        

        stop = document.getElementById("btn-stop-recording");
        stop.onclick = function() {
            // this.disabled = true;
            recorder.stopRecording(stopRecordingCallback);
            
            stop.parentNode.removeChild(stop);
            var cambiar_clase = document.getElementById("capturar");
            // console.log(cambiar_clase.parentNode);
            nuevo_boton = document.createElement("button");
            nuevo_boton.setAttribute('onclick', 'myPost()');
            nuevo_boton.innerHTML = 'Subir Guifo';
            cambiar_clase.appendChild(nuevo_boton);
            var primer_boton = cambiar_clase.firstChild.nextElementSibling;
            primer_boton.style.width = '127px';
            primer_boton.style.marginRight = '10px';
            primer_boton.style.backgroundColor = '#FFF4FD';
            primer_boton.innerHTML = 'Repetir Captura';
            primer_boton.style.backgroundImage = 'none';
            primer_boton.setAttribute("id", "btn-start-recording")
            cambiar_clase.parentNode.classList.toggle('grabar_instrucciones')
            cambiar_clase.classList.toggle('grabar_boton');

            document.getElementById("btn-start-recording").addEventListener('click', function(e) {
                window.location.href = "crearGifOS.html";
            })
        }; 

        // document.getElementById('btn-stop-recording').disabled = false;
        
    });
};


function myPost() {
    var captura = document.getElementById('captura')
    var subiendo = document.getElementById('subiendoGif');
    captura.style.display = 'none';
    subiendo.style.display = 'block';
    // var boton = subiendo.childNodes[5].lastElementChild.childNodes[1].childNodes[1].firstChild;
    var boton = subiendo.childNodes[5].lastElementChild.childNodes[1].childNodes[3];
    // console.log(boton);
    
    boton.style.backgroundColor = '#FFF4FD';

    var api_key = "jFwjAFUF5eJFFxcjseB0aYefxJ3VHCI6";
    var url = 'http://upload.giphy.com/v1/gifs' + '?api_key=' + api_key;

    // console.log(form);

    const options = {
        method: 'POST',
        body: form
      };

    fetch(url, options).then(res => {
      // console.log('status: ' + res.status);
      if (res.status != 200) {
        // Mostrar que hubo un error subiendo tu Guifo
        console.log('No se pudo subir Guifo');
        // console.log(res.meta.msg);
      }

      // localStorage.setItem("coolGif", image.src);
      myPopupFunction();
      return res.json();

    }).then(data => {
        
        var dataId = data.data.id;
        form.append('id', dataId);

        // console.log(window.array_gif);
        window.array_gif.push(form.get('id'));  
        localStorage.setItem('idGif', JSON.stringify(window.array_gif))
        // console.log(localStorage.getItem('idGif'));
        
        window.newIdArr = JSON.parse(localStorage.getItem("idGif"));
        
                
        // console.log(window.newIdArr);
        // newIdArr.setItem(JSON.stringify(window.array_gif));
        // console.log(JSON.parse(window.localStorage.getItem("idGif")));
        

        // localStorage.setItem("names", JSON.stringify(names));
        // var storedNames = JSON.parse(localStorage.getItem("names"));

        fetch('http://api.giphy.com/v1/gifs/' + dataId + '?api_key=' + api_key)
        .then(res => {
          // console.log(res.status)
          if (res.status != 200) {
            // Mostrar que hubo un error subiendo tu Guifo
            console.log('No se pudo subir obtener Guifo');
          }
          return res.json();
        })
          .catch(error => {
            // Mostrar que hubo un error subiendo tu Guifo
            console.error('Error:', error);
            console.log(error.lineNumber);            
            console.log(error.columnNumber);
          })
        // console.log(form.get('file'));
        // myPopupFunction();
    })
}

function myPopupFunction() {
    preview.src = localStorage.getItem("coolGif");
    // preview = localStorage.getItem("coolGif");
    // console.log(preview.src);

    var subiendo = document.getElementById("subiendoGif");
    subiendo.style.display = "none";

    var gifUp = document.getElementById("gifUp");
    gifUp.style.display = "block";
  }
  

var captura = document.getElementById('captura');
// console.log(captura);
captura.style.display = 'none'

function comenzarCaptura() {
  var crear = document.getElementById('crearGif');
  crear.style.display = 'none'
  captura.style.display = 'flex'
}
