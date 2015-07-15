/////////////////////////////////////////////
//  CONSOLE FOR IE8 AND BELOW
if ( !window.console ) {
  window.console = new function() {
    this.log = function(str) {};
    this.dir = function(str) {};
  };
};
//
/////////////////////////////////////////////

////////////////////////////////////////////

//  ELIMINATES DUPLICATES IN ARRAY
function arrayUnique(array) {
  var a = array.concat();
  for(var i=0; i<a.length; ++i) {
    for(var j=i+1; j<a.length; ++j) {
      if(a[i] === a[j])
        a.splice(j--, 1);
      }
    } 
    return a;
  };
/////////////////////////////////////////////
  
  
/////////////////////////////////////////////
// CONTROLLER
angular.module('myApp', ["ngSanitize", "truncate", "angularMoment"])
.controller('homeController', ['$scope', '$parse', '$timeout', function ($scope, $parse, $timeout) {
    



    ///////////////////////////////////////////
    $scope.setDefaults = function(){
      // page settings
      $scope.page = {
        initLanguage: "english",
        initMessage: "Loading, please wait...",
        isLoading: false,
        isBuilding: true,
        continueBtn: false,
        current: "selection",
        showFAQ: false,
        showPP: false
      }

    
      $scope.info = [];

      $scope.countrySelection = null;

      $scope.nominees = [
        {firstName: "", lastName: "", email: ""}
      ];

      $scope.shirtOptions = [
        "XS", "S", "M", "L", "XL", "XXL"
      ]

      $scope.languageSelection = null;
      $scope.usingOrgData = null;
      $scope.rosterCollection = {
          firstName: '',
          lastName: '',
          email: '',
          businessUnit: '',
          tshirt: '',
          //emergencyContactName: '',
          //emergencyContactNumber: '',
          specialRequirements: '',
          distance: '',
          mobile: '',
          guests: []
      };

      $scope.validateCheck = {
          firstName: false,
          lastName: false,
          email: false,
          businessUnit: false,
          tshirt: false,
          //emergencyContactName: false,
          //emergencyContactNumber: false,
          specialRequirements: false,
          distance: false,
          mobile: false,
          task: false
      };      

      $scope.loading = {
        submit: false
      }

      $scope.distanceOptions = ["1k", "7k", "14k", "21k", "Kid's Run - 1.8k"];

      $scope.hasVolunteerTasks = false;
      $scope.taskSelected = {selection: null}


    };
    ///////////////////////////////////////////




    ///////////////////////////////////////////
    $scope.init = function(){
      
      $scope.setDefaults();    
   
      // get country data
      $scope.getCountrySelection(function(data){
        $timeout(function(){
          $scope.page.isBuilding = false;
          $scope.countryList = data;
        });   
      });
      
      // set initial language
      var defaultLanguage = "english"   
      $scope.updateLanguage(defaultLanguage);
      
    }
    ///////////////////////////////////////////
    
    ///////////////////////////////////////////
    $scope.updateLanguage = function(language){
      
      $scope.ln = {};
      var q = "SELECT translation_file FROM spreadsheets_volunteerism WHERE name ='" + language + "'"
        rbf_selectQuery(q, 1, function(data){ 
      $timeout(function(){
        p = JSON.parse(data[0])   
        for (var key in p) {
          if (p.hasOwnProperty(key)) {      
          $parse(key).assign($scope,  p[key])
          }
        }
      }); 
    })
   
    }
    ///////////////////////////////////////////







              ///////////////////////////////////////////
             $scope.pullFAQ = function(language, callback){
                
                // get program_types records
                var standardFields = [
                {fieldLabel: "faq_" + language, tag: "faq" }
                ]
                
                var whereStatement = null;
                $scope.isLoading = true
                utilityjs.getFromRollbase("program_type", standardFields, null, whereStatement, function(data){
                  
                  d = []
                  var i = data.nameList.length; while(i--){
                    var name = data[data.nameList[i]].key
                    d[name] = data[data.nameList[i]]
                  }
                  d.nameList = data.nameList;
                  
                  $timeout(function(){
                    $scope.info.faq = data[data.nameList[0]].faq;
                  });
                })
                
              }
              ///////////////////////////////////////////
              
              ///////////////////////////////////////////
              $scope.pullPrivacy = function(language, callback){
                
                
                // get program_types records
                var standardFields = [
                {fieldLabel: "privacy_" + language,         tag: "privacy" }
                ]
                var whereStatement = null;
                
                
                $scope.isLoading = true
                utilityjs.getFromRollbase("program_type", standardFields, null, whereStatement, function(data){
                  
                  d = []
                  var i = data.nameList.length; while(i--){
                    var name = data[data.nameList[i]].key
                    d[name] = data[data.nameList[i]]
                  }
                  
                  d.nameList = data.nameList;    
                  $timeout(function(){
                    $scope.info.privacy = data[data.nameList[0]].privacy;
                  });           

                  //callback(d[$scope.currentSelection.currentProgram.name].privacy);
                })
                
              }
              ///////////////////////////////////////////


  ///////////////////////////////////////////
    $scope.getDistanceOptions = function(eventID) {
       rbf_selectQuery("select distance_options#code from volunteerism_event where id='" + eventID + "'", 5, function(vals) {
          var values = vals[0][0].split(",");
             $timeout(function(){  
                $scope.distanceOptions = values;   
             });
         });
     }
     ///////////////////////////////////////////  
     

    ///////////////////////////////////////////
    $scope.updateSelection = function(i){
          $scope.listOfTasks = [];
           $scope.getDistanceOptions(i.id);

            if (i.volunterTasks.id.length > 0){
                $scope.hasVolunteerTasks = true;

                function loop(){
                
                var standardFields = [
                 {fieldLabel: "__of_open_spaces",         tag: "open"},
                 {fieldLabel: "__of_remaining_spaces",    tag: "remaining"},
                 {fieldLabel: "name",    tag: "name"},
                ]


                var whereStatement = 'WHERE id = "' + i.volunterTasks.id[count] + '"'
                utilityjs.getFromRollbase("volunteerism_task", standardFields, null, whereStatement, function(data){
                        data[data.nameList[0]].id = i.volunterTasks.id[count];
                        data[data.nameList[0]].description = data[data.nameList[0]].name + ", Available Slots: " + (data[data.nameList[0]].open - data[data.nameList[0]].remaining) 
                        if ((data[data.nameList[0]].open - data[data.nameList[0]].remaining) > 0){
                           $scope.listOfTasks.push(data[data.nameList[0]])
                        }
                        count++;
                        if (count < i.volunterTasks.id.length){
                          loop();
                        }
                        else{
                          loopComplete();
                        }
                });       


                }
                function loopComplete(){
                  $timeout(function(){
                    $scope.usingOrgData = i;
                    $scope.page.current = "collect";
                  })
                }

                var count = 0; 
                loop();



            } 
            else{
              $timeout(function(){
                $scope.hasVolunteerTasks = false;
                $scope.usingOrgData = i;
                $scope.page.current = "collect";
              })
            }
     

         
    }
    ///////////////////////////////////////////

    ///////////////////////////////////////////
    $scope.clearRegistration = function(){
      $scope.rosterCollection.firstName = '';
      $scope.rosterCollection.lastName = '';
      $scope.rosterCollection.email = '';
      $scope.rosterCollection.businessUnit = '';
      $scope.rosterCollection.tshirt = $scope.shirtOptions[0];
      //$scope.rosterCollection.emergencyContactName = '';
      //$scope.rosterCollection.emergencyContactNumber = '';
      $scope.rosterCollection.specialRequirements = '';
      $scope.rosterCollection.distance = '';
      $scope.rosterCollection.mobile = '';     
    };

    $scope.clearGuests = function(){
      $scope.rosterCollection.guests = [];
    };
    ///////////////////////////////////////////

    ///////////////////////////////////////////
    $scope.addGuest = function(){
      if(!$scope.rosterCollection.hasOwnProperty("guests")){
          $scope.rosterCollection.guests = [];
      }
      $scope.rosterCollection.guests.push({name: '', tshirt: '', distance: '', mobile: ''});

    }
    ///////////////////////////////////////////


    ///////////////////////////////////////////
    $scope.removeGuest = function(index){
      $scope.rosterCollection.guests.splice(index, 1)
    }
    ///////////////////////////////////////////

    ///////////////////////////////////////////
    $scope.removeNominee = function(index){
        $scope.nominees.splice(index, 1);
    }
    ///////////////////////////////////////////


    ///////////////////////////////////////////
    $scope.submitForm = function(){
          
        $scope.validateCheck = {
            firstName: false,
            lastName: false,
            email: false,
            businessUnit: false,
            tshirt: false,
            //emergencyContactName: false,
            //emergencyContactNumber: false,
            specialRequirements: false,
            distance: false,
            mobile: false,
            task: false
        };            
          $scope.loading.submit = true;
          var checkValidation = true; 
          

          
          function validateString(cString){
              if(cString == undefined || cString == null || cString == ""){
                return true;
              }
              else{
                return false;
              }
          };

          function validateEmail(email) {
              var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
              return !re.test(email);
          }

          function validateShirt(tshirt) {
              if((tshirt == "") || (tshirt == undefined) || (tshirt == null)) { return true; }
          }

          if( validateString($scope.rosterCollection.firstName) ){ $scope.validateCheck.firstName = true; checkValidation = false; }
          if( validateString($scope.rosterCollection.lastName) ){ $scope.validateCheck.lastName = true; checkValidation = false; }
          if( validateString($scope.rosterCollection.business_unit) ){ $scope.validateCheck.businessUnit = true; checkValidation = false; }
          if( validateEmail($scope.rosterCollection.email) ){ $scope.validateCheck.email = true; checkValidation = false; }
          if( validateShirt($scope.rosterCollection.tshirt) ){ $scope.validateCheck.tshirt = true; checkValidation = false; }
          /*if( validateString($scope.rosterCollection.emergencyContactName) ){ $scope.validateCheck.emergencyContactName = true; checkValidation = false; }
          if( validateString($scope.rosterCollection.emergencyContactNumber) ){ $scope.validateCheck.emergencyContactNumber = true; checkValidation = false; }*/
          if ($scope.hasVolunteerTasks && $scope.taskSelected.selection == null){
              $scope.validateCheck.task = true; checkValidation = false;
          }
          if ($scope.taskSelected.selection != null && $scope.hasVolunteerTasks){
            if($scope.rosterCollection.guests.length + 1 > $scope.taskSelected.selection.open ){
                 $scope.validateCheck.task = true; checkValidation = false;
                 alert("There's not enough slots open to register for this task.");
            }
          }

         
          function createMainRecord(){
            var x = new Array();
                x["role"]                     = "registrant"
                x["first_name"]               = $scope.rosterCollection.firstName;
                x["last_name"]                = $scope.rosterCollection.lastName;
                x["business_unit"]            = $scope.rosterCollection.businessUnit;
                x["email"]                    = $scope.rosterCollection.email;
                //x["emergency_contact_name"]   = $scope.rosterCollection.emergencyContactName;
                //x["emergency_contact_number"] = $scope.rosterCollection.emergencyContactNumber;
                x["shirt_size"]               = $scope.rosterCollection.tshirt;
                x["special_requirements"]     = $scope.rosterCollection.specialRequirements;
                x["mobile_number"]            = $scope.rosterCollection.mobile;
                x["is_fitness_fundraiser_"]   = $scope.usingOrgData.fitnessFundraiser; 
                x["distance"]                 = $scope.rosterCollection.distance;

                x["R13138969"]                = $scope.usingOrgData.id;                                
                x["guest_of"]                 = "";

                // attach roster task if applicable
                if ($scope.hasVolunteerTasks){
                    x["R13138978"]            = $scope.taskSelected.selection.id
                }

                
                rbf_createRecord("volunteerism_rooster", x , false, function(data){
                  if ($scope.usingOrgData.fitnessFundraiser){
                    createGuestRecords();
                  }
                  else{
                    loopComplete();
                  }
                });            
          }
          
         
          function createGuestRecords(){

                if ($scope.rosterCollection.guests.length > 0){
                    if( validateString($scope.rosterCollection.guests[count].firstName) ){ $scope.rosterCollection.guests[count].firstName  = "Guest"}
                    if( validateString($scope.rosterCollection.guests[count].lastName) ){ $scope.rosterCollection.guests[count].lastName = count}

                    var x = new Array();
                        x["role"]                     = "guest"
                        x["first_name"]               = $scope.rosterCollection.guests[count].firstName;
                        x["last_name"]                = $scope.rosterCollection.guests[count].lastName;
                        x["business_unit"]            = "";
                        x["email"]                    = "";
                       // x["emergency_contact_name"]   = "";
                       // x["emergency_contact_number"] = "";
                        x["shirt_size"]               = $scope.rosterCollection.guests[count].tshirt;
                        x["special_requirements"]     = "";
                        x["mobile_number"]            = $scope.rosterCollection.guests[count].mobile;
                        x["is_fitness_fundraiser_"]   = $scope.usingOrgData.fitnessFundraiser; 
                        x["distance"]                 = $scope.rosterCollection.guests[count].distance;

                        x["R13138969"]                = $scope.usingOrgData.id;                                
                        x["guest_of"]                 = $scope.rosterCollection.lastName + ", " + $scope.rosterCollection.firstName; 
                       
                        // attach roster task if applicable
                        if ($scope.hasVolunteerTasks){
                            x["R13138978"]            = $scope.taskSelected.selection.id;
                        }
                       
                        rbf_createRecord("volunteerism_rooster", x , false, function(data){
                          count++;

                          if (count > $scope.rosterCollection.guests.length - 1){                        
                            loopComplete(); 
                          }  
                          else{
                            createGuestRecords();
                          }                      
                        });   
                    }
                    else{
                       loopComplete();
                    }


          }

          function loopComplete(){
            $timeout(function(){
              $('html, body').animate({ scrollTop: 0 }, 0);
              $scope.page.current = "submit";
              $scope.loading.submit = false;
            })
          }
          
          if (checkValidation){
            count = 0 ; 
            createMainRecord();
          }
          else{
             $('html, body').animate({ scrollTop: 0 }, 0);
             $scope.loading.submit = false;
          }

    };
    ///////////////////////////////////////////


    ///////////////////////////////////////////
    $scope.reset = function(){
       location.reload();
    }
    ///////////////////////////////////////////



              
  ///////////////////////////////////////////
  $scope.getCountrySelection = function(callback){
      console.log("inside country selection")
      var integratedFields = [
        {field: "R9716968", grabField: "display_name", name: "displayName" }
      ]

      var whereStatement = "WHERE c_current_volunteer_programs >0"
      utilityjs.getFromRollbase("country_data", null, integratedFields, whereStatement, function(data){               
        $scope.languageData = data;
        console.info(data)
        getCountryData();
      })

      function getCountryData(){
        // get country_data records
        if ($scope.countryData == undefined){
        
        var integratedFields = [
          {field: "R9716968", grabField: "name", name: "language" },
          {field: "R9717338", grabField: "name", name: "programs" },
          {field: "R9784000", grabField: "name", name: "groupings"}
        ]
        
        var whereStatement = "WHERE c_current_volunteer_programs >0"
        utilityjs.getFromRollbase("country_data", null, integratedFields, whereStatement, function(data){
           
          $scope.countryData = []
          // merge fields
          var i = data.nameList.length; while(i--){
          var name = data.nameList[i];
          $scope.countryData[name] = data[name];
          console.log("FASFDSAFSADF")
          $scope.countryData[name].display = $scope.languageData[name]
          }
          $scope.countryData.nameList = data.nameList
          
          //$scope.countryData = data;
          $scope.pullLanguages(function(data){
            d = utilityjs.sortArrayWithObjects(data, 'country', false)
            callback(d)
          })

        })
        }
        else{
        callback()
        }
      }         

  }
  ///////////////////////////////////////////

  ///////////////////////////////////////////
  $scope.pullLanguages = function(callback){
      var nameList =  $scope.countryData.nameList,
      list = [];
      
        var i = nameList.length; 
        while(i--){
        
            name = nameList[i];
            displayName = $scope.countryData[name].key;
            console.info("displayname", displayName)

            displayLanguages = $scope.countryData[name].display.data.displayName;
            rootLanguage = $scope.countryData[name].data.language
            _array = displayLanguages;
            
            _obj = [];
            for (m = 0; m <  _array.length; m++){
            _obj.push({name: _array[m], index: m})
            
            } 

            list.push({raw: name, country: displayName, languages: _obj, root: rootLanguage})
          
        }

      callback(list)
  }
  ///////////////////////////////////////////

  /////////////////////////////////////////// 
  $scope.selectLanguage = function(languageObj){

      if (languageObj != null){

          var useLanguage = languageObj.name,
          q = "SELECT name FROM language WHERE display_name='" + useLanguage + "'";
          
          rbf_selectQuery(q, 1, function(data){ 
            $scope.updateLanguage(data[0][0]);
                        $scope.pullFAQ(data[0][0], function(data){})
                        $scope.pullPrivacy(data[0][0], function(data){})
            $scope.page.continueBtn = true;       
          })

      }
      
  }

  /////////////////////////////////////////// 


$scope.highlightReq = function(){
  console.log("TEST")
  $("#req").css("background-color", "yellow")
}  

  /////////////////////////////////////////// 
  $scope.activeSection = function(section){
  
      $scope.orgData = null;

      if(section == 'programSelect'){

          var standardFields = [
           {fieldLabel: "id",                             tag: "id"},
           {fieldLabel: "__of_open_space",                tag: "openslots"},
           {fieldLabel: "currently_registered",           tag: "currently_registered"},
           {fieldLabel: "description",                    tag: "description"},
           {fieldLabel: "name",                           tag: "name"},
           {fieldLabel: "logo",                           tag: "image"},
           {fieldLabel: "fitness_fundraiser",             tag: "fitnessFundraiser"}
          ]
          var integratedFields = [
            {field: "R13138960", grabField: "id", name: "id" }
          ]

          var whereStatement = 'WHERE country_link_single = "' + $scope.countrySelection.country + '"'


           


          utilityjs.getFromRollbase("volunteerism_event", standardFields, integratedFields, whereStatement, function(data){

                  console.warn("!!!!!", data)
              $scope.orgData = []  
              $timeout(function(){
                if (data != false){
                  for (n = 0; n < data.nameList.length; n++){
                    

                    e = { id:                       data[data.nameList[n]].id,
                          name:                     data[data.nameList[n]].key,
                          image:                    utilityjs.parseRollbaseImageString(data[data.nameList[n]].image),
                          description:              data[data.nameList[n]].description,
                          currently_registered:     data[data.nameList[n]].currently_registered,
                          openslots:                data[data.nameList[n]].openslots,
                          fitnessFundraiser:        data[data.nameList[n]].fitnessFundraiser,
                          volunterTasks:            data[data.nameList[n]].data
                        } 

                    $scope.orgData.push(e);  

 

                  }

                  $timeout(function(){
                    $scope.page.current = section;
                  });
                }
                else{
                  alert("No programs are available in your country at this time")
                  return


                }
              });
             

          });

      }
      
      
  }
  /////////////////////////////////////////// 
            
            
}]);
          
//
/////////////////////////////////////////////

          
          
          
          /////////////////////////////////////////////
          ////  BOOTSTRAP ANGULAR COMPONENTS //////////
          $(function(){
            
            
            angular.element(document).ready(function() {
              angular.bootstrap(document, ['myApp']);
            });
            
          });
          //
          ///////////////////////////////////////////