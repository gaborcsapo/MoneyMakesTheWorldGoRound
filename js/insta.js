//pics that are not new
var picList = [];
//pics that are on display
var displayPics = [];
//whether the globe has to be spinned or not
var PicAlert;
//needed for gradual slow down of spin
var rotationspeed = 0;
//whether to rotate the globe or not
var rotate = 1;
//the newest image
var img;

//requests the latest pictures with #cash
function getInstaData(){
  var InstaURL = "https://api.instagram.com/v1/tags/cash/media/recent?client_id=5aa1fcff30e54345a8847d1a1babd02c";
  
  $.ajax({
    url: InstaURL,
    type: 'GET',
    dataType: 'jsonp',
    
    error: function(err){
      console.log('got error' + err);
    },
    
    success: function(err){
      pics = err.data;
      console.log('pics');
      for (var i = pics.length - 1; i >= 0; i--) {
        //checking if there is a new picture coming in
        if (picList.indexOf(pics[i].images.low_resolution.url) > -1) {
          console.log("nothing new");
        }
        //if there is, we save that picture, load it and once loaded we make it go across the screen
        else {
          picList.push(pics[i].images.low_resolution.url);
            if (picList.length>=20) {var img = $("<img />").attr('src', pics[i].images.low_resolution.url)
              .on('load', function() {
                      $("#instaMove").html(img);
                      console.log('image loaded');
                      movePic();
                }
              );
          }
        }
      }
    }
  }
  );
}

function movePic(){
  //animating the image going across the screen using Jquery
  $("#instaMove").animate({right: "+=4000"}, 6000, "linear");
  
  setTimeout(function(){ console.log('23456');
       $("#instaMove").stop();
       $("#instaMove").css('right', -350); }, 4000);
  
  setTimeout(function(){
       rotate=0; }, 1000);

  
  //the sign that tells you there is a new #money picture
  $('#display').html('New #money.');
  
  setTimeout(function(){
       $('#display').html('New #money..'); }, 750);
  
  setTimeout(function(){
       $('#display').html('New #money...'); }, 1500);
  
  setTimeout(function(){
       $('#display').html(''); }, 3000);
  }


$('document').ready(function() {
  getInstaData();
  
  setInterval(function(){
    getInstaData();
    console.log("request sent");
  }, 6100);
});