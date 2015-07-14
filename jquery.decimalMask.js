/**
 * Decimal Mask Plugin
 * 
 * @version 4
 * 
 * @licensed MIT <see below>
 * @licensed GPL <see below>
 * 
 * @requires jQuery 1.4 or up
 * 
 * @author Stéfano Stypulkowski <http://szanata.com>
 */
/**
 * MIT License
 * Copyright (c) 2010 Stéfano Stypulkowski
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy 
 * of this software and associated documentation files (the "Software"), to deal 
 * in the Software without restriction, including without limitation the rights 
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
 * copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * GPL LIcense
 * Copyright (c) 2010 Stéfano Stypulkowski
 * 
 * This program is free software: you can redistribute it and/or modify it 
 * under the terms of the GNU General Public License as published by the 
 * Free Software Foundation, either version 3 of the License, or 
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 * or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License 
 * for more details.
 * 
 * You should have received a copy of the GNU General Public License along 
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */
(function ($){
  'use strict';

  $.fn.decimalMask = function (mask){
    
    if (!mask || !mask.match) {
      throw 'decimalMask: You must provide a mask as String.';
    }

    if (!/^(-)?\d+((\.|,)\d*)?$/.test(mask)) {
      throw 'decimalMask: Invalid mask, must be like \\d+((\\.|,)\\d*)?';
    }

    var
      v, d,
      negative = /^-/.test(mask) ? '(-)?' : '',
      separator = !(v = mask.match(/,|\./)) ? null : v[0],
      integerLength = mask.split(separator)[0].replace('-','').length,
      decimalLength = !(d = mask.split(separator)[1]) ? null : d.length,
      events = /.*MSIE 8.*|.*MSIE 7.*|.*MSIE 6.*|.*MSIE 5.*/.test(navigator.userAgent) ? 'keyup propertychange paste' : 'input paste',
      testerExp = '^' + negative + '\\d{0,' + integerLength + '}' + (decimalLength ? '(\\' + separator + '\\d{0,' + decimalLength + '})?$' : '$'),
      tester = new RegExp(testerExp);
        
    function handler(e) {
      var self = $(e.currentTarget);
      if (self.val() !== e.data.oldValue){
        if (!tester.test(self.val())){
          self.val(e.data.oldValue);
        }
        e.data.oldValue = self.val();
      }
    }

    this.each(function (){
      var length = integerLength + (separator ? 1 : 0) + (decimalLength || 0) + (negative ? 1 : 0)
      $(this).attr('maxlength', length).on(events, { oldValue: $(this).val() }, handler);

      if (separator) {
        $(this).val($(this).val().replace('.', separator));
      }
    });
  }

})(jQuery);

// auto start fields with data-d-mask attr
$(function () {
  $('[data-d-mask]').each(function () {
    $(this).decimalMask($(this).attr('data-d-mask'));
  });
})