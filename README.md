## jQuery.decimalMask plugin

# Changelog

- **version 3**
  - Added: supporting for negative numbers using '-' prefix on the mask (issue #5);
  - Fixed: inputting some invalid char in the middle of input content was causing the loss of all content on the right of the cursor (issue #3);
  - Added: strict mode;
  - Fixed: the first character inputed to field was throwing an error.
- **version 2.2.1:**
  - Now using '.on' instead of deprecated '.live'.
- **version 2.2:**
  - Fixed: An empty selector doesn't throw an JS error anymore. Issue #4.
- **version 2.1:**
  - Now supported in early IE versions: 8, 7, 6 and 5.5.
- **version 2.0.1:**
  - Small bug resolved (I didn't documented very well).
- **version 2:**
  - Total rewritten, now based on regex replace.
# Description

This plugin just provides a decimal mask to an HTML input.
It treats only the decimal separator, it can't handle thousand separators.
It can apply the separator in the value given by the backend on web apps.
The separator supported are the "," or ".". (I don't believe there is another types);

# Compatible browsers:
  * Opera 10+ (Old versions not tested)
  * Chrome 4+
  * Firefox 2+
  * IE 5.5+
  * Safari 4+ (Old versions not tested)
  
# Usage

The usage is simple:

      $('your selector').decimalMask('your mask');
 
Some valid masks are:

  * 999.99
  * .999
  * 999
  * 999,99
  * ,999
  * -999
  * -99,99
  * You got it...