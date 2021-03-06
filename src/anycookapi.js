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

(function( $, globals ){
    'use strict';
    var loadCredentials = function(path){
        var dfd = $.Deferred();

        if(!path) { dfd.resolve(); }
        else { $.getJSON(path).always(dfd.resolve); }

        return dfd.promise();
    };

    globals.AnycookAPI = {
        _settings : function(settings){
            if(settings){ $(document).data('AnycookAPI', settings); }
            else{ return $(document).data('AnycookAPI'); }
        },
        _get : function(api, data, callback, error){
            api = api || '';
            data = data || {};
            callback = callback || function(){};

            var settings = AnycookAPI._settings();
            error = error || settings.error;
            var sessionId = settings.sessionId;
            var url = settings.baseUrl + api + (sessionId ? ';jsessionid='+sessionId : '');

            $.extend(data, {appId : settings.appId});
            return $.ajax({
                url : url,
                type : 'GET',
                //dataType : 'json',
                data : data,
                xhrFields : {
                    withCredentials: settings.withCredentials
                },
                success : callback,
                error : error
            });
        },
        _post : function(api, data, callback, error){
            api = api || '';
            data = data || {};
            callback = callback || function(){};

            var settings = AnycookAPI._settings();
            $.extend(data, {appId : settings.appId});

            error = error || settings.error;
            var sessionId = settings.sessionId;
            var url = settings.baseUrl + api + (sessionId ? ';jsessionid='+sessionId : '');

            return $.ajax({
                url: url,
                type: 'POST',
                data:data,
                dataType:'json',
                contentType: 'application/x-www-form-urlencoded',
                xhrFields:{
                    withCredentials: settings.withCredentials
                },
                success: callback,
                error: error
            });
        },
        _postJSON : function(api, data, callback, error){
            api = api || '';
            data = data || {};
            callback = callback || function(){};

            var settings = AnycookAPI._settings();
            error = error || settings.error;

            if(typeof data !== 'string'){
                data = JSON.stringify(data);
            }

            var sessionId = settings.sessionId;
            var url = settings.baseUrl + api + (sessionId ? ';jsessionid='+sessionId : '');

            return $.ajax({
                url: url+'?appId='+settings.appId,
                type: 'POST',
                data: data,
                dataType:'json',
                contentType: 'application/json; charset=utf-8',
                xhrFields:{
                    withCredentials: settings.withCredentials
                },
                success: callback,
                error: error
            });
        },
        _postFile : function(api, data, progress, complete, uploaded){
            // Uploading - for Firefox, Google Chrome and Safari
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.onreadystatechange = function() {
                //if document has been created
                if(xhr.readyState === 4 && xhr.status === 201){
                    var location = this.getResponseHeader('Location');
                    complete(location, xhr);
                }

            };
            var settings = AnycookAPI._settings();
            var sessionId = settings.sessionId;
            var url = settings.baseUrl + api + (sessionId ? ';jsessionid='+sessionId : '');
            xhr.open("post", url, true);

            // Update progress bar
            xhr.upload.addEventListener('progress', progress, false);

            // File uploaded
            if(uploaded){
                xhr.addEventListener('load', uploaded, false);
            }


            // Set appropriate headers
            //xhr.setRequestHeader("Content-Type", "multipart/form-data");
            //xhr.setRequestHeader("X-File-Name", file.name);
            //xhr.setRequestHeader("X-File-Size", file.size);
            //xhr.setRequestHeader("X-File-Type", file.type);

            //Create FormData object
            var formData = new FormData();

            for(var key in data){
                formData.append(key, data[key]);
            }


            // Send the file (doh)
            xhr.send(formData);
        },
        _put : function(api,data, callback, error){
            api = api || '';
            data = data || {};
            callback = callback || function(){};

            var settings = AnycookAPI._settings();
            error = error || settings.error;

            var sessionId = settings.sessionId;
            var url = settings.baseUrl + api + (sessionId ? ';jsessionid='+sessionId : '');
            $.extend(data, {appId : settings.appId});

            return $.ajax({
                url: url,
                type: 'PUT',
                data:data,
                contentType: 'application/x-www-form-urlencoded',
                xhrFields:{
                    withCredentials: settings.withCredentials
                },
                success: callback,
                error: error
            });
        },
        _putJSON : function(api, data, callback, error){
            api = api || '';
            data = data || {};
            callback = callback || function(){};

            var settings = AnycookAPI._settings();
            error = error || settings.error;
            var sessionId = settings.sessionId;
            var url = settings.baseUrl + api + (sessionId ? ';jsessionid='+sessionId : '');

            if(typeof data !== 'string'){ data = JSON.stringify(data); }

            return $.ajax({
                url: url+'?appId='+settings.appId,
                type: 'PUT',
                data : data,
                dataType : 'json',
                contentType: 'application/json; charset=utf-8',
                xhrFields:{
                    withCredentials: settings.withCredentials
                },
                success: callback,
                error: error
            });
        },
        _delete : function(api,data, callback, error){
            api = api || '';
            data = data || {};
            callback = callback || function(){};

            var settings = AnycookAPI._settings();
            error = error || settings.error;
            var sessionId = settings.sessionId;
            var url = settings.baseUrl + api + (sessionId ? ';jsessionid='+sessionId : '');

            $.extend(data, {appId : settings.appId});
            return $.ajax({
                url: url,
                type: 'DELETE',
                data:data,
                xhrFields:{
                    withCredentials: settings.withCredentials
                },
                success: callback,
                error : error
            });
        },
        init : function(options){
            var settings = {
                appId: -1,
                baseUrl: 'https://api.anycook.de',
                imageBase: 'https://s3-eu-west-1.amazonaws.com/images.anycook.de',
                credentials: 'anycook-credentials.json',
                // send session id if cookies are disabled
                sendSessionId: !navigator.cookieEnabled,
                withCredentials: true,
                error : function(xhr){
                    /* globals console */
                    console.error(xhr);
                }
            };

            if(options){
                $.extend(settings, options);
            }

            var dfd = $.Deferred();

            $.when(loadCredentials(settings.credentials)).then(function(json){
                if(json){
                    $.extend(settings, json);
                }

                AnycookAPI._settings(settings);
                if(settings.sendSessionId){
                    //get session id
                    AnycookAPI.session.id(function(sessionId){
                        settings.sessionId = sessionId;
                        AnycookAPI._settings(settings);
                        dfd.resolve();
                    });
                } else {
                    dfd.resolve();
                }
            });

            return dfd.promise();
        }
    };
})( jQuery, this);
