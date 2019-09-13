$(document).ready(function () {
   $('.nav-button').click(function () {
      $(".nav-button").toggleClass("change");
   });
   $(window).scroll(function () {
      let position=$(this).scrollTop();
      // console.log(position);
      if(position>=100){
         // console.log(position);
         $(".nav-menu").addClass('custome-navebar');
         $(".img-size").addClass('img-size1');
      }
      else{
         $(".nav-menu").removeClass('custome-navebar');
         $('.img-size').removeClass('img-size1');
      }
   });
    lightbox.option({
        // 'resizeDuration': 200,
        'wrapAround': true
    });
    $(window).scroll(function () {
        let possition=$(this).scrollTop();
        console.log(possition);
        if(possition>350){
            $(".gallery").addClass('change')
        }
        else{
            $(".gallery").removeClass('change')
        }
    })
});