///////////////////////////////////////////
var utilityjs = function(){


      return{


                parseForTag:function(str, checkFor, wrapStart, wrapClose){

                  var res = str.indexOf(checkFor)
                    if (res > -1){
                      var stringArray = str.split(" ");

                          var combine = ""
                          for (var i = 0; i < stringArray.length; i++){
                            word = stringArray[i]
                            if (word == checkFor){
                              combine += wrapStart
                              combine += word
                              combine += wrapClose
                              combine += " "
                            }
                            else{
                              combine += word + " "
                            }
                          }

                          return combine

                    }else{
                       return str;
                    }


                },

                addLinksToString:function(str, checkFor, wrapStart, wrapClose){

                  var res = str.indexOf(checkFor)
                    if (res > -1){
                      var stringArray = str.split(" ");

                          var combine = ""
                          for (var i = 0; i < stringArray.length; i++){
                            word = stringArray[i]
                            if (word == checkFor){
                              combine += wrapStart
                              combine += word
                              combine += wrapClose
                              combine += " "
                            }
                            else{
                              combine += word + " "
                            }
                          }

                          return combine

                    }else{
                       return str;
                    }


                },

                //////////////////////////////////
                //  combines sort and page into one function
                //  utilityjs.sortAndPage($scope.tableData, 'name', true, 100)
                sortAndPage:function(theArray, field, reverse, size){

                    // sort array with objects
                    sorted = utilityjs.sortArrayWithObjects(theArray, field, reverse)

                    // sort into pagination
                    var pager = utilityjs.newPagination(sorted, size);

                    return pager;

                },
                //
                //////////////////////////////////


                //////////////////////////////////
                /*  HOW TO USE
                //  creates a pagination system for ANY array
                //
                    var pager = utilityjs.newPagination(arrayData);
                  console.log(pager.page(x) )
                  console.log(pager.next() )
                  console.log(pager.prev() )
                  console.log(pager.hasNext() )
                  console.log(pager.hasPrev() )
                  console.log(pager.perPage, pager.totalPages, pager.currentPage)
                */
                //////////////////////////////////


                //////////////////////////////////
                //
                newPagination:function(theArray, pPage){

                    function Paginate (data, perPage) {
                      if (!data) throw new Error('Required Argument Missing')
                      if (!(data instanceof Array)) throw new Error('Invalid Argument Type')

                      this.data = data
                      this.perPage = perPage || 10
                      this.currentPage = 0
                      this.totalPages = Math.ceil(this.data.length / this.perPage)
                    }

                    Paginate.prototype.offset = function () {

                      return ((this.currentPage - 1) * this.perPage);
                    }
                    Paginate.prototype.page = function (pageNum) {

                      if (pageNum < 1) pageNum = 1
                      if (pageNum > this.totalPages) pageNum = this.totalPages

                      this.currentPage = pageNum

                      var start = this.offset()
                        , end = start + this.perPage

                      return this.data.slice(start, end);
                    }
                    Paginate.prototype.next = function () {

                      return this.page(this.currentPage + 1);
                    }
                    Paginate.prototype.prev = function () {

                      return this.page(this.currentPage - 1);
                    }
                    Paginate.prototype.hasNext = function () {

                      return (this.currentPage < this.totalPages)
                    }
                    Paginate.prototype.hasPrev = function () {

                      return (this.currentPage > 1 )
                    }
                    if (typeof module !== 'undefined') module.exports = Paginate;


                    var pager = new Paginate(theArray, pPage)
                    return pager;
              },
              //
              //////////////////////////////////



              //////////////////////////////////
              //  SORT ARRAY BY FIELD
              //  sort array with objects
              //  testData = [{name: "Bee"}, {name: "Allen"}, {name: "Cow"}]
              //  sorted = utilityjs.sortArrayWithObjects($scope.tableData, 'name', true)
              //  sort into pagination
              //  var pager = utilityjs.newPagination(sorted);
              //  console.log(pager)
              sortArrayWithObjects:function(theArray, field, reverse){
                theArray.sort(utilityjs.sort_by(field, reverse, function(a){return a.toUpperCase()}));
                return theArray;
              },


              sort_by:function(field, reverse, primer){
                 var key = primer ?
                     function(x) {return primer(x[field])} :
                     function(x) {return x[field]};

                 reverse = [1, -1][+!!reverse];

                 return function (a, b) {
                     return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
                   }
              },



              sortArray:function(theArray, reverse){
                  var a = theArray.sort();
                  if (reverse){
                    a = theArray.reverse();
                  }

                  return a
              },
              //////////////////////////////////

              //////////////////////////////////
              // GET FROM ROLLBASE
              /*

                    HOW TO USE #1:
                    If you need to grab information that is relational to the object, use the integrated field.
                    In the integratedFields json, grabField is the field you want returned; name is what's returned in the json.

                    CODE:
                    var integratedFields = [
                          {field: "R9784013", grabField: "name", name: "tagName" }
                    ]
                    var whereStatement = null;
                    utilityjs.getFromRollbase("object_name", null, integratedFields, null, function(data){
                         $scope.data = data;
                    });
                    //
                    //////////////////////


                    HOW TO USE #2:  - only pulls one field at a time
                    If you just need to grab some fields from the object itself, use the standard fields.  You can combine integrated and standard fields as well.
                    In the standardFields json, fieldLabel is the field you want returned; tag is what's returned in the json.

                    CODE:
                    var standardFields = [
                          {fieldLabel: "logo_image",  tag: "imageURL"   },
                          {fieldLabel: "urladdress",  tag: "urlAddress" }
                    ]
                    var whereStatement = null
                    utilityjs.getFromRollbase("object_name", standardFields, null, whereStatement, function(data){
                         $scope.data = data;
                    });

              */
              //
              //////////////////////////////////

              //////////////////////////////////
              getFromRollbase:function(main, standard, fields, whereStatement, callback ){



                        // null exceptions
                        if (standard == undefined || standard == null){
                          standard = [];
                        }
                        if (fields == undefined || fields == null){
                          fields = []
                        }
                        if (whereStatement == undefined || whereStatement == null){
                          whereStatement = []
                        }
                        /////////////////



                        // build sql statement
                        var statement = ""
                        n = standard.length; while(n--){
                          statement += ", " + standard[n].fieldLabel
                        }

                        var buildObject = {  meta: [], nameList: [] },
                            sql = "SELECT name, id " + statement + " FROM " + main + " " +  whereStatement;

                        /////////////////


                        // start process
                        rbf_selectQuery(sql, 100000, function(data) {

                          if (data.length == 0){
                            // will return false if empty
                            callback(false)
                          }

                          else{
                              // callback for complete load
                              var checks = 0;
                              if (fields.length * data.length != 0){
                                  totalChecksNeeded = fields.length * data.length;
                              }else{
                                  totalChecksNeeded = data.length
                              }
                              checkAll = function(){
                                  checks ++
                                  if (checks >= totalChecksNeeded){
                                      //$scope.isLoading = false
                                      callback(buildObject)
                                  }
                              };
                              /////////////////

                              // organize field data for name
                              var fieldName = {};
                              n = fields.length; while(n--){
                                fieldName[fields[n].field] = { name: fields[n].name }
                              }
                              /////////////////



                              // main logic
                              i = data.length; while(i--){
                                    var name    = data[i][0] + "_" + i,  // required
                                        id      = data[i][1],            // required
                                        key     = data[i][0];

                                        // set defaults
                                        buildObject.meta['_' + id] = { }
                                        buildObject[name] = {
                                            data: buildObject.meta['_' + id],
                                            key: key
                                        }
                                        /////////////////


                                        //place into standard fields
                                        for (n = 0; n < standard.length; n++){
                                         buildObject[name][standard[n].tag] =  data[i][(standard.length + 1) - n];
                                        }

                                        buildObject.nameList.push(name)
                                        /////////////////


                                        // grab all related fields
                                        if (fields.length > 0 ){
                                            n = fields.length; while(n--){

                                              rbf_getRelatedFields(fields[n].field, id, fields[n].grabField, function(_self, _id, _data){

                                                  buildObject.meta['_' + _id][fieldName[_self].name] = _data;

                                                checkAll()
                                            })
                                        }
                                        }else{
                                          checkAll()
                                        }
                                        /////////////////

                              }
                              /////////////////
                          }



                        });
                        /////////////////



              },
              //////////////////////////////////


              //////////////////////////////////
              /*

                    var packet = [
                       {objName: "employee",  intName: "R12870837", fields: ["firstName", "lastName"] },
                       {objName: "givingP",   intName: "R12870860", fields: ["name", "id"] }
                     ]
                    whereStatement = null;

                    utilityjs.getFromRelated("roster", packet, whereStatement, function(data){
                      console.log(data)
                    })

              */
              getFromRelated:function(objName, packet, whereStatement, callback ){

                        // whereStatement
                        whereStatement = whereStatement || '';
                        var sql = "SELECT id FROM " + objName + " " +  whereStatement,
                            returnPacket = {};

                        console.log(sql)

                        // start process
                        idPackets = [];
                        rbf_selectQuery(sql, 100000, function(data) {

                            var i = data.length; while(i--){
                              idPackets.push(data[i])
                            }
                            getRelatedData()
                        });

                        function getRelatedData(){
                          count = 0;
                          function sqlStart(){
                              fieldCount = 0;

                              if (count >= packet.length){
                                sqlComplete();
                              }
                              else{

                                  function fieldLoopStart(){
                                      if (fieldCount >= packet[count].fields.length){
                                          fieldLoopComplete();
                                      }
                                      else{
                                          var _relatedId = packet[count].intName,
                                              _field = packet[count].fields[fieldCount];
                                              idCount = 0;

                                              function idLoopStart(){

                                                if (idCount >= idPackets.length){
                                                    idLoopComplete();
                                                }
                                                else{
                                                    _objId = idPackets[idCount];

                                                    rbf_getRelatedFields(_relatedId, _objId, _field, function(_self, _id, _data){

                                                      returnPacket[packet[count].objName][idCount][_field] = _data[0]
                                                    
                                                      idCount++; idLoopStart();
                                                    })

                                                }
                                              }

                                              function idLoopComplete(){
                                                 fieldCount++; fieldLoopStart();
                                              }

                                              idLoopStart();

                                      }

                                  };

                                  function fieldLoopComplete(){
                                      count++; sqlStart();
                                  }

                                  // create object / init loop
                                  returnPacket[packet[count].objName] = {};
                                  for (i = 0; i < idPackets.length; i++){
                                     returnPacket[packet[count].objName][i] = {};
                                    for (n = 0; n < packet[count].fields.length; n++){
                                        returnPacket[packet[count].objName][i][packet[count].fields[n]] = '';
                                    }
                                  }
                                  fieldLoopStart();

                              }

                          }

                          function sqlComplete(){
                            callback(returnPacket);
                          }
                          sqlStart();
                        }



              },
              //////////////////////////////////


              ///////////////////////////////////////////
              /*  CREATE OBJECT FROM SPREADSHEET
                  var packet = [
                    {objName: "employee",  intName: "R12870837", fields: ["firstName", "lastName", "name"] },
                    {objName: "givingP",   intName: "R12870860", fields: ["name", "id"] }
                  ]
                  whereStatement = null;

                  utilityjs.getFromRelated("roster", packet, whereStatement, function(_self, _id, _data){
                    console.log(_data)
                  })
              */
              ///////////////////////////////////////////
              buildObjectFromSpreadsheet:function(url, callback){
                Papa.parse(url, {
                  download: true,
                  complete: function(results) {
                      utilityjs.buildObjectFromSpreadsheet_format(results, function(data){
                        callback(data)
                      });
                  }
                });
              },

              buildObjectFromSpreadsheet_format:function(csv, callback ){

                var tableInfo = csv.data;
                var headers = [];
                var finalObj = {};

                // convert headers into obj key
                var assemblyList = []
                for (i = 0; i < tableInfo[0].length; i++){
                  value = tableInfo[0][i].toLowerCase();
                  finalObj[value] = {};
                  assemblyList.push(value)
                }

                // grab first left hand column - the keys
                var keys = [];
                for (i = 0; i < tableInfo.length; i++){
                   field = tableInfo[i][0].toLowerCase()
                   if (field == ''){
                     keys.push( ("key_" + i) )
                   }
                   else{
                     keys.push(field);
                   }
                }

                // assemble into object with key/values
                for (i = 0; i < tableInfo.length; i++){
                  for (m = 0; m < tableInfo[i].length; m++){
                    var value = tableInfo[i][m];
                    var name = assemblyList[m];
                    var key = keys[i]
                        finalObj[name][key] = value
                  }
                }

                callback(finalObj)
              },
              //
              ///////////////////////////////////////////



              //////////////////////////////////
              /*  CREATE LIBRARY FROM SPREADSHEET

                  HOW TO USE:
                  Convert an object with one or many stringified spreadsheets into a usable parsed object or array.

                  CODE:
                  utilityjs.createLibrary(spreadsheetObject, "json"/"array", callback(data){})

              */
              //////////////////////////////////
              createLibrary:function(data, format, removeDuplicates, callback){


                    // defaults
                    var masterKey = [];
                    var masterObject = {};
                    var keyCount = 0;

                    if (format == undefined || format == null){
                      format = "json";
                    };

                    if (removeDuplicates == undefined || removeDuplicates == null){
                      removeDuplicates = true;
                    }
                    //

                    var i = data.nameList.length; while(i--){
                      // defaults
                      var headerArray = [],
                        keyArray = [],
                        arrayObject = {};

                      // current json
                      jsonObj = JSON.parse(data[data.nameList[i]].json);


                      // build header list
                      for (n = 0; n < jsonObj.length; n++){
                        if (jsonObj[n] !== null){
                          var key = jsonObj[n].shift()
                            if (key == ""){ key = "key_" + keyCount; keyCount++ }
                          var a =  jsonObj[n];

                          // first row becomes the header
                          if (n == 0){
                            headerArray = a;
                            for (m = 0; m < headerArray.length; m++){
                              if (format == "json"){
                                masterObject[headerArray[m].toLowerCase() ] = {};
                              }
                              if (format == "array"){
                                masterObject[headerArray[m].toLowerCase() ] = [];
                              }
                            }
                          }
                          // everything else becomes values
                          else{
                            keyArray.push(key);
                            for (m = 0; m < a.length; m++){
                              masterKey.push( {group: headerArray[m], key: key, value: a[m]} )
                            }
                          };
                        }
                      }

                    }

                    for (i = 0; i < masterKey.length; i++){
                      var group   = masterKey[i].group.toLowerCase();
                      var key   = masterKey[i].key;
                      var value   = masterKey[i].value;

                      if (format == "json"){
                        masterObject[group][key] = value;
                      }
                      if (format == "array"){
                        masterObject[group].push( {group: group, key: key, value: value} )
                      }

                    }


                    // eliminate duplicates in array / json duplicates are automatically eliminated
                    if (removeDuplicates){
                        if (format == "array"){
                          for (m = 0; m < headerArray.length; m++){
                            var arr = [],
                                collection = [];
                            // add uniques to collection
                            $.each(masterObject[headerArray[m]], function (index, value) {
                                if ($.inArray(value.value, arr) == -1) {
                                    arr.push(value.value);
                                    collection.push(value);
                                }
                            });
                            // merge back into masterObject
                            masterObject[headerArray[m]] = collection
                          }
                        }
                    }

                    callback( masterObject );



              },




              //////////////////////////////////
              /*
                  HOW TO USE:
                  Converts a rollbase image string from:  #Mon Sep 08 21:37:05 UTC 2014 fileSize=5066 origFileName=2MilButton.gif contentType=image/gif fileName=6317346334085565201.gif
                  to a useable one:                       https://www.gdg.do/storage/servlet/Image?c=9616156&fileName=6317346334085565201.gif&contentType=image%2Fgif

                  CODE:
                  utilityjs.parseRollbaseImageString(programInfo.imageURL)

              */
              //////////////////////////////////

              //////////////////////////////////
              parseRollbaseImageString:function(imgString){

                            if (imgString != null){
                              var urlAddress = $.trim(document.URL);

                              var string = $.trim(imgString);
                                  // remove linebreaks
                                  var string = string.replace(/(\r\n|\n|\r)/gm,""),
                                      contentType = string.match("contentType=image/(.*)fileName")[1],
                                      fileName    = string.match("fileName=(.*)")[1],
                                      cUrl        = urlAddress.match("c=(.*)&p")[1];

                                    _return = "https://www.gdg.do/storage/servlet/Image?c=" + cUrl + "&fileName=" + fileName + "&contentType=image%2F" + contentType;

                                  return _return
                            }
                            else{
                              return "";
                            }
              },
              //////////////////////////////////


              //////////////////////////////////
              parseRollbaseFileString:function(objId, data, key){


                    var file = $.trim(data.file),
                        ////////  file type and name
                        originalName  = file.match("origFileName=(.*)")[1],
                        originalTrim  = originalName.replace(/\s+/g, ''),
                        justName      = originalName.replace(/\.[^/.]+$/, ""),
                        fileType      = originalTrim.split('.').pop().toLowerCase(),
                        objData       = data,
                        ////////



                        //////// filesize
                        fileSize = (parseInt(file.match("fileSize=(.*)")[1]) * .00001).toFixed(2) + "KB",

                        //////// filesize
                        dateStamp = new Date(file.match("#(.*)")[1]),
                        month = dateStamp.getMonth() + 1,
                        year  = dateStamp.getUTCFullYear(),
                        day  = dateStamp.getDate(),


                        //////// location in rollbase
                        urlAddress    = $.trim(document.URL),
                        urlString     = urlAddress.match("gdg.do/(.*)/portal/")[1],
                        urlLocation   = "https://www.gdg.do/" + urlString + "/servlet/File?dir=data&objDefId=" + objId + "&id=" + data.id + "&name=file",
                        fileIcon      = 'fa-file';


                        // common file types
                        if (fileType == "jpg" || fileType == "jpeg"  || fileType == "png"  || fileType == "gif"  || fileType == "bmp"){
                            fileIcon = 'fa-file-image-o'
                        }
                        if (fileType == "pdf"){
                            fileIcon = 'fa-file-pdf-o'
                        }
                        if (fileType == "docx" ){
                            fileIcon = 'fa-file-word-o'
                        }
                        if (fileType == "rtf" ){
                            fileIcon = 'fa-file-text-o'
                        }
                        if (fileType == "zip" ){
                            fileIcon = 'fa-file-archive-o'
                        }
                        if (fileType == "mp3" ){
                            fileIcon = 'fa-file-archive-o'
                        }

                        // return string
                        return {url: urlLocation, ext: fileType, name: justName, icon: fileIcon, size: fileSize, uploaded: { dateStamp: dateStamp, year: year, month: month, day: day}, originalData: objData }

              },
              //////////////////////////////////



              //////////////////////////////////
              parseURLString:function(pageIdentifier){


                      var pageID = window.location.href;
                      var num = pageIdentifier.length + 2;
                      var id = '';
                      var result;
                      if (!pageID) {
                        pageID = document.URL;
                      }

                      if (pageID.indexOf('?' + pageIdentifier + "=") >= 0) {
                        pageIdentifier = '?' + pageIdentifier + "=";
                      } else {
                        pageIdentifier = '&' + pageIdentifier + "=";
                      }

                      pageID = pageID.substring(pageID.indexOf(pageIdentifier) + num, pageID.length);
                      if (pageID.indexOf('&') > -1) {
                        pageID = pageID.substring(0, pageID.indexOf('&'));
                      }
                      if (!pageID) {
                        result = 0;
                      } else if (pageID.indexOf(':') >= 0 || pageID.indexOf('/') >= 0) {
                        result = 0;
                      } else {
                        result = pageID;
                      }
                      return result;


              },
              //////////////////////////////////



              //////////////////////////////////
              getURLParameter:function(pageIdentifier) {
                var pageID = window.location.href;
                var num = pageIdentifier.length + 2;
                var id = '';
                var result;
                if (!pageID) {
                  pageID = document.URL;
                }

                if (pageID.indexOf('?' + pageIdentifier + "=") >= 0) {
                  pageIdentifier = '?' + pageIdentifier + "=";
                } else {
                  pageIdentifier = '&' + pageIdentifier + "=";
                }

                pageID = pageID.substring(pageID.indexOf(pageIdentifier) + num, pageID.length);
                if (pageID.indexOf('&') > -1) {
                  pageID = pageID.substring(0, pageID.indexOf('&'));
                }
                if (!pageID) {
                  result = 0;
                } else if (pageID.indexOf(':') >= 0 || pageID.indexOf('/') >= 0) {
                  result = 0;
                } else {
                  result = pageID;
                }
                return result;
              }
              //////////////////////////////////



      }




}();
///////////////////////////////////////////
