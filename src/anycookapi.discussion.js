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
    //discussion(recipeName [, callback])
    AnycookAPI.discussion = function(recipeName, lastId, callback){
        var path = '/'+recipeName+'/discussion';
        var data = { lastId: lastId };
        return AnycookAPI._get(path, data, callback);
    };

    $.extend(AnycookAPI.discussion, {
        //answer(recipeName, text [, parentid] [, callback])
        answer : function(recipeName, text){
            var path = '/'+recipeName+'/discussion';
            //var data = {comment:text};
            var callback;
            switch(arguments.length){
            case 4:
                callback = arguments[3];
                /* falls through */
            case 3:
                var type = typeof arguments[2];
                if(type === 'function'){
                    callback = arguments[2];
                }else{
                    path += '/'+Number(arguments[2]);
                }
            }

            return AnycookAPI._post(path, text, callback);
        },
        //like(recipeName, id [, callback])
        like : function(recipeName, id, callback){
            //recipeName = encodeURIComponent(recipeName);
            var path = '/'+recipeName+'/discussion/'+id+'/like';
            return AnycookAPI._put(path, {}, callback);
        },
        //unlike(recipeName, id [, callback])
        unlike : function(recipeName, id, callback){
            //recipeName = encodeURIComponent(recipeName);
            var path = '/'+recipeName+'/discussion/'+id+'/like';
            return AnycookAPI._delete(path, {}, callback);
        }
    });
})(jQuery);
