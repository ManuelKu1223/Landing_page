jQuery(function($) {

	//Preloader
	var preloader = $('.preloader');
	$(window).load(function(){
		preloader.remove();
	});

	//#main-slider
	var cur_width = $(this).width();
	var slideHeight = $(window).height();
	$('#home-slider .item').css('height',slideHeight);

	$(window).resize(function(){
		let mapSize = $('.datamap').attr('data-width');
		$('#home-slider .item').css('height',slideHeight);
		if ($(window).width() <= mapSize) {
			let zoom = ($(window).width() -30)  / mapSize;
			console.log(zoom);
			$('.datamap').css('zoom', zoom);
		}	
	});
	
	//Scroll Menu
	$(window).on('scroll', function(){
		if( $(window).scrollTop()>100 ){
			$('.main-nav').addClass('navbar-fixed-top');
		} else {
			$('.main-nav').removeClass('navbar-fixed-top');
		}
	});
	
	// Navigation Scroll
	$(window).scroll(function(event) {
		Scroll();
	});

	$('.navbar-collapse ul li a').on('click', function() {  
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
		return false;
	});

	// User define function
	function Scroll() {
		var contentTop      =   [];
		var contentBottom   =   [];
		var winTop      =   $(window).scrollTop();
		var rangeTop    =   200;
		var rangeBottom =   500;
		$('.navbar-collapse').find('.scroll a').each(function(){
			contentTop.push( $( $(this).attr('href') ).offset().top);
			contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
		})
		$.each( contentTop, function(i){
			if ( winTop > contentTop[i] - rangeTop ){
				$('.navbar-collapse li.scroll')
				.removeClass('active')
				.eq(i).addClass('active');			
			}
		})
	};

	$('#tohash').on('click', function(){
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
		return false;
	});
	
	//Initiat WOW JS
	new WOW().init();
	//smoothScroll
	smoothScroll.init();
	
	// Progress Bar
	$('#about-us').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
		if (visible) {
			$.each($('div.progress-bar'),function(){
				$(this).css('width', $(this).attr('aria-valuetransitiongoal')+'%');
			});
			$(this).unbind('inview');
		}
	});

	//Countdown
	$('#features').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
		if (visible) {
			$(this).find('.timer').each(function () {
				var $this = $(this);
				$({ Counter: 0 }).animate({ Counter: $this.text() }, {
					duration: 2000,
					easing: 'swing',
					step: function () {
						$this.text(Math.ceil(this.Counter));
					}
				});
			});
			$(this).unbind('inview');
		}
	});

	// Page Popup
	/*$(document).on('click','.pop-read-more',function(event){
		event.preventDefault();
		var link = $(this).data('single_url');
		var full_url = '#page_pop_wrap',
		parts = full_url.split("#"),
		trgt = parts[1],
		target_top = $("#"+trgt).offset().top;

		$('html, body').animate({scrollTop:target_top}, 600);
		$('#page_pop').slideUp(500, function(){
			$(this).load(link,function(){
				$(this).slideDown(500);
			});
		});
	});

	// Close Portfolio Single View
	$('#page_pop').on('click', '.close-pop-item',function(event) {
		event.preventDefault();
		var full_url = '#page_pop_wrap',
		parts = full_url.split("#"),
		trgt = parts[1],
		target_offset = $("#"+trgt).offset(),
		target_top = target_offset.top;
		$('html, body').animate({scrollTop:target_top}, 600);
		$("#page_pop").slideUp(500);
	});*/

	// Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		var dat = $('form').serialize();
		$.ajax({
			url: $(this).attr('action'),
			type:'post',
			data:dat,
			beforeSend: function(){
				form.append( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is being sent...</p>').fadeIn() );
			}
		}).done(function(data){
			form_status.html('<p class="text-success">Thank you for contact us. As early as possible  we will contact you</p>').delay(3000).fadeOut();
		});
	});

	//Google Map
	var latitude = $('#google-map').data('latitude')
	var longitude = $('#google-map').data('longitude')
	function initialize_map() {
		var myLatlng = new google.maps.LatLng(latitude,longitude);
		var mapOptions = {
			zoom: 14,
			scrollwheel: false,
			center: myLatlng
		};
		var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
		var contentString = '';
		var infowindow = new google.maps.InfoWindow({
			content: '<div class="map-content"><ul class="address">' + $('.address').html() + '</ul></div>'
		});
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map
		});
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});
	}
	google.maps.event.addDomListener(window, 'load', initialize_map);
	
	// Typed JS
	
	$(".typed_animation span").typed({		
		stringsElement: $('.typed-strings'),
		typeSpeed: 80,
		backDelay: 800,
		loop: true,
		showCursor: true,
		contentType: 'html', // or text
		// defaults to false for infinite loop
		loopCount: false
	});
	
	// World Map
	var map_height = "";
	if(cur_width > 767){
		var map_height = 380;
	}else{
		var map_height = 350;
	}
	//basic map config with custom fills, mercator projection
      var map = new Datamap({
        scope: 'world',
        element: document.getElementById('world_map'),
        projection: 'mercator',
        height: map_height,
        fills: {
          defaultFill: '#f0af0a',
          gt50: 'red'
        },
        
        data: {
          USA: {fillKey: 'gt50' },
          CAN: {fillKey: 'gt50' },
          IND: {fillKey: 'gt50' },
          GBR: {fillKey: 'gt50' },
		  CHN: {fillKey: 'gt50' }
        }
      })
      
      
      //sample of the arc plugin
      map.arc([
       {
        origin: {
            latitude: 52.639722,
            longitude: -2.555
        },
        destination: {
            latitude: 59.618889,
            longitude: -108.375
        }
      },
      {
          origin: {
            latitude: 52.639722,
            longitude: -2.555
          },
          destination: {
              latitude: 39.793333,
              longitude: -100.375
          }
      },
      {
          origin: {
            latitude: 23.2500,
            longitude: 77.4170
          },
          destination: {
            latitude: 52.639722,
            longitude: -2.555
          }
         
      },
      {
          origin: {
            latitude: 35.0000,
            longitude: 103.0000
          },
          destination: {
            latitude: 52.639722,
            longitude: -2.555
          }
         
      }
      
      ], {strokeWidth: 2});
   window.addEventListener('resize', function() {
        map.resize();
    });
      
       //bubbles, custom popup on hover template
     /*map.bubbles([
       {name: 'Hot', latitude: 21.32, longitude: 5.32, radius: 10, fillKey: 'gt50'},
       {name: 'Chilly', latitude: -25.32, longitude: 120.32, radius: 18, fillKey: 'lt50'},
       {name: 'Hot again', latitude: 21.32, longitude: -84.32, radius: 8, fillKey: 'gt50'},

     ], {
       popupTemplate: function(geo, data) {
         return "<div class='hoverinfo'>It is " + data.name + "</div>";
       }
     });*/

	 
	// Marquee Text
	$('.marquee_text').telex({
	duration: 10000,
    messages: [
        {
            id: 'msg1',
            content: 'Interactive Technology'
        },
        {
            id: 'msg2',
            content: 'Digital Transformation'
        },
        {
            id: 'msg3',
            content: 'DevOps automation'
        },
        {
            id: 'msg4',
            content: 'Game Development'
        },
        {
            id: 'msg5',
            content: 'Geo location mobile apps'
        },
        {
            id: 'msg6',
            content: 'Technology Consultancy'
        },
        {
            id: 'msg7',
            content: 'Internet of Things (IoT)'
        }
        /* more messages... */
    ],
    delay: 0
    });
	
	// Background Ripple
	
	/*$('body').ripples({
	resolution: 512,
	dropRadius: 20,
	perturbance: 0.04,
});
	
	// Automatic drops
	setInterval(function() {
		var $el = $('#client');
		var x = Math.random() * $el.outerWidth();
		var y = Math.random() * $el.outerHeight();
		var dropRadius = 20;
		var strength = 0.04 + Math.random() * 0.04;

		$el.ripples('drop', x, y, dropRadius, strength);
	}, 400);*/
	
	
	
	// Inline popups
	$('.service-info, .service-icon').magnificPopup({
	  delegate: 'a',
	  removalDelay: 100, //delay removal by X to allow out-animation
	  callbacks: {
		beforeOpen: function() {
		   this.st.mainClass = this.st.el.attr('data-effect');
		}
	  },
	  midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});
	
	// Mobile Menu
	if(cur_width < 1281){
		$('.navbar-toggle').click(function(){
			$(".navbar-collapse").slideToggle();
			
		});
		$('.navbar-nav > li a').click(function(){
			$(".navbar-collapse:visible").slideUp();
		});
	}
	// Section Custom Scroll
	
		if(cur_width > 767){
			$('section, .careers-info').css('height',slideHeight+100);
			var cur_height = $(this).height() + 90;
			$("section").each(function(){
				if((cur_height > slideHeight)){
					$(this).mCustomScrollbar({theme:'minimal-dark',});
				}
			});
		}
	/*$(window).resize(function(){'use strict',
		$("section").each(function(){

		if(cur_width > 767){
			var cur_height = $(this).height() + 90;
			$(this).css('height',slideHeight+100);	
			if((cur_height > slideHeight)){
				$(this).mCustomScrollbar({theme:'minimal-dark',});
			}
		}
	});
	});*/
	
	
});

