/**
 * @license This file is part of anycook. The new internet cookbook
 * Copyright (C) 2013 Jan Graßegger
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see [http://www.gnu.org/licenses/].
 *
 * @author Jan Graßegger <jan@anycook.de>
 * requires anycookapi.js
 */

(function($){
'use strict';
    //ingredient([ingredientName or parent] [callback])
    AnycookAPI.ingredient = function(){
        var ingredientName;
        var parent;
        var callback;
        switch(arguments.length){

        case 2:
            var type2 = typeof arguments[1];
            if(type2 === 'function'){
                callback = arguments[1];
            }
            /* falls through */
        case 1:
            var type1 = typeof arguments[0];
            if(type1 === 'string'){
                ingredientName = arguments[0];
            }
            else if(type1 === 'function'){
                callback = arguments[0];
            }
            else if(type1 === 'boolean'){
                parent = arguments[0];
            }
        }

        var path = '/ingredient';
        if(ingredientName){
            path += '/'+encodeURIComponent(ingredientName);
        }

        var data = {};

        if(parent){ $.extend(data, {parent : parent}); }

        return AnycookAPI._get(path, {}, callback);
    };

    $.extend(AnycookAPI.ingredient, {
        //number(callback)
        number : function(callback){
            var path = '/ingredient/number';
            return AnycookAPI._get(path, {}, callback);
        },
        //extract(query, callback)
        extract : function(query, callback){
            var path = '/ingredient/extract';
            return AnycookAPI._get(path,{q:query}, callback);
        }
    });
})(jQuery);
