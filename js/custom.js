/*------------------------------------------------------------------------------------*/
/* Type Writing script
 * Source: https://codepen.io/hi-im-si/pen/DHoup */
/*-----------------------------------------------------------------------------------*/

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.01em solid #fff}";
    document.body.appendChild(css);
};


var swiper = new Swiper('.product-slider', {
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
    effect: 'fade',
    // initialSlide: 2,
    loop: true,
    navigation: {
        nextEl: '.next',
        prevEl: '.prev'
    },
    // mousewheel: {
    //     // invert: false
    // },
    on: {
        init: function(){
            var index = this.activeIndex;

            var target = $('.product-slider__item').eq(index).data('target');


            $('.product-img__item').removeClass('active');
            $('.product-img__item#'+ target).addClass('active');
        }
    }

});

swiper.on('slideChange', function () {
    var index = this.activeIndex;

    var target = $('.product-slider__item').eq(index).data('target');


    $('.product-img__item').removeClass('active');
    $('.product-img__item#'+ target).addClass('active');

    if(swiper.isEnd) {
        $('.prev').removeClass('disabled');
        $('.next').addClass('disabled');
    } else {
        $('.next').removeClass('disabled');
    }

    if(swiper.isBeginning) {
        $('.prev').addClass('disabled');
    } else {
        $('.prev').removeClass('disabled');
    }
});


var swiper = new Swiper('.blog-slider', {
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination-2',
        type: 'bullets',
        clickable: true,
    },
    effect: 'fade',
    // initialSlide: 2,
    loop: true,
    navigation: {
        nextEl: '.next',
        prevEl: '.prev',
    },
    // mousewheel: {
    //     // invert: false
    // },
    on: {
        init: function(){
            var index = this.activeIndex;

            var target = $('.blog-slider__item').eq(index).data('target');

            $('.blog-img__item').removeClass('active');
            $('.blog-img__item#'+ target).addClass('active');
        }
    }

});

swiper.on('slideChange', function () {
    var index = this.activeIndex;

    var target = $('.blog-slider__item').eq(index).data('target');

    $('.blog-img__item').removeClass('active');
    $('.blog-img__item#'+ target).addClass('active');

    if(swiper.isEnd) {
        $('.prev').removeClass('disabled');
        $('.next').addClass('disabled');
    } else {
        $('.next').removeClass('disabled');
    }

    if(swiper.isBeginning) {
        $('.prev').addClass('disabled');
    } else {
        $('.prev').removeClass('disabled');
    }
});

/* ----------------------------------------------------------------------------------*/
/* Parallax smooth scrolling
 * Source: http://mmkjony.github.io/enllax.js/ */
/*---------------------------------------------------------------------------------- */
(function($) {
    //Plugin activation
    $(window).enllax();
})(jQuery);


$('.scroll').on('click',function(e) {
	e.preventDefault();
	var offset = -50;
	var target = this.hash;
	if ($(this).data('offset') != undefined) offset = $(this).data('offset');
	$('html, body').stop().animate({
		'scrollTop': $(target).offset().top - offset
	}, 500, 'swing', function() {
		// window.location.hash = target;
	});
})

// a key map of allowed keys
var allowedKeys = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  65: 'a',
  66: 'b'
};

// the 'official' Konami Code sequence
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];

// a variable to remember the 'position' the user has reached so far.
var konamiCodePosition = 0;

// add keydown event listener
document.addEventListener('keydown', function(e) {
  // get the value of the key code from the key map
  var key = allowedKeys[e.keyCode];
  // get the value of the required key from the konami code
  var requiredKey = konamiCode[konamiCodePosition];

  // compare the key with the required key
  if (key == requiredKey) {

    // move to the next key in the konami code sequence
    konamiCodePosition++;

    // if the last key is reached, activate cheats
    if (konamiCodePosition == konamiCode.length) {
      activateCheats();
      konamiCodePosition = 0;
    }
  } else {
    konamiCodePosition = 0;
  }
});

function activateCheats() {
  console.log('Konami!')
}

$(document).mousemove(function(e) {
  var x = e.pageX;
  var y = e.pageY;
  
  $('.cursor').css('left', x - 5)
  $('.cursor').css('top', y - 5)
})

$(document).mousemove(function(e) {
  var x = e.pageX;
  var y = e.pageY;
  
  $('.cursor__two').css('left', x )
  $('.cursor__two').css('top', y + 30)
})

$('.grow').hover(
       function(){ $('.cursor').addClass('cursor--hover') },
       function(){ $('.cursor').removeClass('cursor--hover') },
       function(){ $('.cursor__two').addClass('cursor__two--hover') },
       function(){ $('.cursor__two').removeClass('cursor__two--hover') },
);

$('.expand').hover(
       function(){ $('.cursor').addClass('cursor--expand') },
       function(){ $('.cursor').removeClass('cursor--expand') },
);

$('.crazy').hover(
       function(){ $('.cursor').addClass('cursor--crazy') },
       function(){ $('.cursor').removeClass('cursor--crazy') },
);

$('.highlight').hover(
       function(){ $('.cursor').addClass('cursor--highlight') },
       function(){ $('.cursor').removeClass('cursor--highlight') },
);
