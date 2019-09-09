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

   
document.getElementById("share").addEventListener("click", function(){
   FB.ui({
   method: 'share',
   href: 'https://developers.facebook.com/docs/',
},
// callback
function(response) {
   if (response && !response.error_message) {
   alert('Posting completed.');
   } else {
   alert('Error while posting.');
   }
})
})
