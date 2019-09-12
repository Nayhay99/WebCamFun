


(function() {     
    var width = 640;    
    var height = 480;  
    var streaming = false;    
    var video = null;
    var canvas = null;
    //var photo = null;
    var startbutton = null;
  
    function startup() {
      video = document.getElementById('video');
      canvas = document.getElementById('canvas');
      photo = document.getElementById('photo');
      startbutton = document.getElementById('startbutton');
      retake = document.getElementById('retake')
      wa = document.getElementById("whatsapp")
      fb = document.getElementById("facebook")

      if(navigator.getUserMedia){
        navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(function(stream) {
          video.srcObject = stream;
          video.play();
        })
        .catch(function(err) {
          console.log("An error occurred: " + err);
        });
      }
      else{
        alert('Native device media streaming (getUserMedia) not supported in this browser.')
      }
  
     
  
      video.addEventListener('canplay', function(ev){
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth/width);
        
          // Firefox currently has a bug where the height can't be read from
          // the video, so we will make assumptions if this happens.
        
          if (isNaN(height)) {
            height = width / (4/3);
          }
        
          video.setAttribute('width', width);
          video.setAttribute('height', height);
          canvas.setAttribute('width', width);
          canvas.setAttribute('height', height);
          streaming = true;
        }
      }, false);
  
      startbutton.addEventListener('click', function(ev){
        takepicture();
        ev.preventDefault();
      }, false);
      
      retake.addEventListener('click', afterpicture)

      wa.addEventListener("click",whatsapp)

      fb.addEventListener("click",fbshare)

      clearphoto();
    }
  
   
  
    function clearphoto() {
      var context = canvas.getContext('2d');
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas.width, canvas.height);
  
      var data = canvas.toDataURL('image/png');
      video.setAttribute('src', data);
    }
    
    
  
    function takepicture() {
      var elem = document.createElement("img")
        
      var x = ["retake","whatsapp","facebook","dl-btn"]  
      //x.forEach((id) => document.getElementById(id).style.display = "none")
      var context = canvas.getContext('2d');
      if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
      
        var data = canvas.toDataURL('image/png'); 
        document.querySelector('#dl-btn').href = data
        document.getElementById('startbutton').style.display="none"
        document.getElementById("camera").append(elem)
        document.getElementById("video").style.display = "none"
        elem.src = data
      
        x.forEach((id) => document.getElementById(id).style.display = "inline-block")        
        } else {
        clearphoto();
      }
    }
    
    function afterpicture(){
       location.reload()
    }

    function whatsapp(){
        document.querySelector("#whatsapp").href="https://wa.me/918280228106?text=I%20just%20clicked%20my%20pic"        
    }

    //work on sharing the picture captured
    function fbshare(){      
      
      window.fbAsyncInit = function() {
        window.FB.init({
        appId      : '527334464705113',
        xfbml      : true,
        version    : 'v4.0'
        });
       FB.AppEvents.logPageView();
      };
      
      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

      document.getElementById("facebook").addEventListener("click", function(){
        FB.ui({
         method: 'share',
         href : 'www.google.com',        
      },
      function(response) {
         if (response && !response.error_message) {
        alert('Posting completed.');
         } else {
        alert('Error while posting.');
       }
      })
      })       
    }
   
    window.addEventListener('load', startup, false);
})();