/**
 * Decimal Mask Plugin
 * 
 * @version 2.1
 * 
 * @licensed MIT <see below>
 * @licensed GPL <see below>
 * 
 * @requires jQuery 1.4.x
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
  
  $.fn.decimalMask = function (mask){
    
    if (!mask || !mask.match){
      throw 'Provide some mask to decimalMask plugin please.';
    }

    var
      v,
      is = (function(){v = mask.match(/[0-9]{1,}/); return v!== null ? v[0].length : 0})(),
      ds = (function(){v = mask.match(/[0-9]{1,}$/); return v !== null ? v[0].length : 0})(),
      sep = (function(){v = mask.match(/,|\./); return v !== null ? v[0] : null})(),
      matcher = null,
      tester = null,
      events = /.*MSIE 8.*|.*MSIE 7.*|.*MSIE 6.*|.*MSIE 5.*/.test(navigator.userAgent) ? 'keyup propertychange paste' : 'input paste';
    
    if (sep === null){
      tester = new RegExp('^[0-9]{0,'+is+'}$');
      matcher = new RegExp('[0-9]{0,'+is+'}','g');
    }else{
      tester = new RegExp('^[0-9]{0,'+is+'}'+(sep === '.' ? '\\.' : ',')+'[0-9]{0,'+ds+'}$|^[0-9]{0,'+is+'}'+(sep === '.' ? '\\.' : ',')+'$|^[0-9]{0,'+is+'}$');
      matcher = new RegExp('[0-9]{0,'+is+'}'+(sep === '.' ? '\\.' : ',')+'[0-9]{0,'+ds+'}|[0-9]{0,'+is+'}'+(sep === '.' ? '\\.' : ',')+'|[0-9]{0,'+is+'}','g');
    }
        
    function handler(e){
      var self = $(e.currentTarget);
      if (self.val() !== e.data.ov){
        if (!tester.test(self.val())){
          var r = self.val().match(matcher);
          self.val(r === null ? '' : r[0]);
        }
        ov = e.data.ov = self.val();
      }
    }

    $(this)
      .attr('maxlength', (is + ds + (sep === null ? 0 : 1)))
      .val($(this).val().replace('.',sep))
      .bind(events,{ov:$(this).val()},handler);
  }
})(jQuery);