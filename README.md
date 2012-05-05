## jQuery.decimalMask plugin

# Changelog

- version 2.1:
  * now supported in early Ie versions: 8, 7, 6 and 5.5.
  * the mask can be binded to an element the isn't on the DOM tree yet.

- version 2.0.1:(I didn't documented)

- version 2:
  * Total rewrote, now based on regex replace.
  
# Description

This plugin just provides a decimal mask to a html input.
It treats only a decimal separator, it can't handle thousand separators.
It can apply the separator in the value given by the backend on web apps.
The separator supported are the "," and ".". (I don't believe there is another types);

# Compatible browsers:
  * Opera 10+ (Old versions not tested)
  * Chrome 4+
  * Firefox 2+
  * IE 5.5+
  * Safari 4+ (Old versions not tested)
  
# Usage

The usage is simple:

      $('your selector').decimalMask('your mask');
 
Valid masks are:

  * 999.99
  * .999
  * 999
  * 999,99
  * ,999
  * You got it...