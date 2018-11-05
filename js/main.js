 /* Change Navbar color while scrolling
--------------------------------------------------------------------- */

$(window).scroll(function() {
  handleTopNavAnimation();
});

$(window).load(function() {
  handleTopNavAnimation();
});

function handleTopNavAnimation() {
  var top = $(window).scrollTop();

  if (top > 10) {
    $('#site-nav').addClass('navbar-solid');
    //$('#btn-cta a').addClass('squareBtn');
    $('.btn_final_list').addClass('small');
    $('.logo').show(500);
  } else {
    $('#site-nav').removeClass('navbar-solid');
    //$('#btn-cta a').removeClass('squareBtn');
    $('.btn_final_list').removeClass('small');
    $('.logo').hide(300);
  }
}

/*
 * SmoothScroll
 */

smoothScroll.init();

/* Mobile Side Menu Accordion
--------------------------------------------------------------------- */
$(function() {
  'use strict';

  $('.navbar-toggle').click(function(){
    $('.rwd-menu').addClass('show');
  });
  $('.smenu-close').click(function(e){
    e.preventDefault();
    $('.rwd-menu').removeClass('show');
  });
  $('.rwd-menu-list li a').click(function(){
    $('.rwd-menu').removeClass('show');
  })
});

/* Scroll Up
--------------------------------------------------------------------- */
$(function() {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 600) {
      $('.scrollup').fadeIn('slow');
    } else {
      $('.scrollup').fadeOut('slow');
    }
  });
  $('.scrollup').click(function () {
    $("html, body").animate({scrollTop: 0}, 1000);
    return false;
  });
});

/* 評分準則 Chart
--------------------------------------------------------------------- */
var chart = new Chartist.Pie('.ct-chart', {
  series: [50,30,10,10],
  // labels: ["創新與創意 50%","技術或商業應用可行性 30%","簡報內容與表達 10%","概念與構想完整性 10%"]
  labels: ["50%","30%","10%","10%"]
}, {
  donut: true,
  showLabel: true
});

chart.on('draw', function(data) {
  if(data.type === 'slice') {
    // Get the total path length in order to use for dash array animation
    var pathLength = data.element._node.getTotalLength();

    // Set a dasharray that matches the path length as prerequisite to animate dashoffset
    data.element.attr({
      'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
    });

    // Create animation definition while also assigning an ID to the animation for later sync usage
    var animationDefinition = {
      'stroke-dashoffset': {
        id: 'anim' + data.index,
        dur: 1000,
        from: -pathLength + 'px',
        to:  '0px',
        easing: Chartist.Svg.Easing.easeOutQuint,
        // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
        fill: 'freeze'
      }
    };

    // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
    if(data.index !== 0) {
      animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
    }

    // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
    data.element.attr({
      'stroke-dashoffset': -pathLength + 'px'
    });

    // We can't use guided mode as the animations need to rely on setting begin manually
    // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
    data.element.animate(animationDefinition, false);
  }
});

// For the sake of the example we update the chart every time it's created with a delay of 8 seconds
chart.on('created', function() {
  if(window.__anim21278907124) {
    clearTimeout(window.__anim21278907124);
    window.__anim21278907124 = null;
  }
  window.__anim21278907124 = setTimeout(chart.update.bind(chart), 10000);
});
