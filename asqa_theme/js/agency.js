/**
* @file
* A JavaScript file for the theme.
*
* In order for this JavaScript to be loaded on pages, see the instructions in
* the README.txt next to this file.
*/

function CalculateWeights(arrValues, weightsCount) {
  var arrWeights = [];
  var minValue = 999999;
  var maxValue = -1;
  for (var i = 0; i < arrValues.length; i++) {
    var curValue = arrValues[i];
    if (curValue < minValue)
      minValue = curValue;
    if (curValue > maxValue)
      maxValue = curValue;
  }

  var diff = weightsCount / (maxValue - minValue);
  for (var i = 0; i < arrValues.length; i++) {
    var curValue = arrValues[i];
    if (curValue == minValue)
      arrWeights.push(1);
    else if (curValue == maxValue)
      arrWeights.push(weightsCount);
    else
      arrWeights.push(parseInt(curValue * diff, 10) + 1);
  }

  return arrWeights;
}

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {

  // To understand behaviors, see https://drupal.org/node/756722#behaviors
  Drupal.behaviors.my_custom_behavior = {
    attach: function(context, settings) {
      if ($.ui) {
        // Add accordions to the view results.
        $('.view-accordion .view-content').accordion({
          collapsible: true,
          active: false,
          header: '.views-row > .views-field-title',
          heightStyle: 'content',
          autoHeight: false
        });
      }

      // Sticky table headers requires .on so we mimic .on with .bind.
      $.fn.on = $.fn.bind;
      $('.views--table--sticky-header').stickyTableHeaders();
    }
  };


})(jQuery, Drupal, this, this.document);


(function ($) {
  $(document).ready(function () {
    var numberArray = [];
    var count = 0;
    $('div.row-of-tags').each(function () {
      var occurance = $('span', this).attr('class');
      var number = occurance.replace('count-', '');
      numberArray.push(number);
      count++;
    });
    if(count > 0) {
      var tags = CalculateWeights(numberArray, 100);
      for(var i = 0; i < numberArray.length; i++) {
        var number = numberArray[i]
        var fontSize = tags[i];
        $('div.row-of-tags').each(function () {
          var countNumber = $('span', this).attr('class').replace('count-', '');
          if(countNumber == number) {
            $('span', this).attr('style', 'font-size:' + (fontSize+70) + '%;');
          }
        });
      }
    }
  });
})(jQuery);
