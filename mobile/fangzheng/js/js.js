// JavaScript Document
window.onload =function(){
	$(".loadding").hide();
	$(".wrap").show();
	
	var o_width = $(window).width();
	var o_height = $(window).height();
	function init(){
		$(".cover").css({"width":o_width, "height":o_height});
		$(".loadding").css({"width":o_width, "height":o_height});
		$(".wrap .page").css({"width":o_width, "height":o_height});		
	}
	init();
	$(document).resize(function(e) {
        init();
    });
	var page = $(".wrap .page");
	var size = $(".wrap .page").size();
	
	var time = [0,2500,6500,9500,13000,17000,19500,22500,28000,33500,40500,45500,51000];
	var index = [0,1,2,3,4,5,6,7,8,9,10,11,12]
	for(var i = 0; i < time.length; i++){
		setInterval(function(){
			var curr = index[i];
			return function() {
				if(curr>0 && curr <13){
					$(".wrap .page").eq(curr-1).addClass("moveOut");	
					$(".wrap .page").eq(curr).addClass("moveIn");
				}	
			}
		}(),time[i])
	}	
}
document.addEventListener('touchmove', function (e) { 
    e.preventDefault(); 
}, false);