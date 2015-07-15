// on ready
$(function(){
    // appends grantr to location
    $('#header-section').each(function(){
        var injectString =
        "<div class='navbar-inner'>" +
          "<div class='small-12'> " +
            "<div class='logo small-2 columns'>" +
              "<img src='https://www.gdg.do/storage/servlet/Image?c=9616156&fileName=7206016874115246615.png&contentType=image%2Fpng&suggestedName=Img+_+Staples+Logo.png' border='0' align='absmiddle' style='height: 65px;'/>" +
            "</div>" +
            "<div class='slogan small-10 columns'>" +
              "<h2><strong>Community</strong>&amp;<strong>Giving</strong></h2>" +
              "<h4>Committed to giving back to our local communities</h4>" +
            "</div>" +
          "</div>" +
          "<div id='top-nav' class='small-12 columns'>" +
            "<h5>" +
              "<span ng-click='activeSection(\"selection\")' class='Language translate isPointer'>{{header.link1}}</span>" +
              "<!--<span ng-click=\"page.showFAQ = true\"        class='FAQ translate isPointer' )'>{{header.link2}}</span>-->" +
              "<!--<span ng-click=\"page.showPP  = true\"        class='Privacy translate isPointer')'>{{header.link3}}</span>-->" +
            "</h5>"
          "</div>" +
        "</div>" +

        $(this).append(injectString);
    });



    // appends grantr to location
    $('#home-body-section').each(function(){
        var injectString =


        // SECTION 1

      "<div class='row small-12' style='margin: 0 auto;'>" +

        "<div class='row page-default' ng-class='{selection: \"visible\", programSelect: \"hidden\", collect: \"hidden\", submit: \"hidden\"}[page.current]'>" +
          "<div class='hero-unit'>" +
            "<div id='transbackground' ng-class='{true: \"hidden\" }[page.isLoading]'>" +

            // country select
              "<div class='row' ng-class='{false: \"hidden\"}[page.isBuilding]' }> " +
                "<div class='small-10 small-offset-1'>" +
                  "<center><p><i class=\"fa fa-spinner fa-pulse\"></i></p></center>" +
                "</div>" +
              "</div>" +
              "<div class='row' ng-class='{true: \"hidden\"}[page.isBuilding]' }> " +
                "<div class='medium-4 medium-offset-4 small-10 small-offset-1 columns'>" +
                  "<div class='small-6  pull-left'><small><strong>{{country}}:</strong></small></div>" +
                  "<div class='small-6  pull-left'>" +
                    "<select ng-model='countrySelection' ng-change='languageSelection = null'  ng-options='entry.country for entry in countryList    '>" +
                      "<option value=''>{{selectACountry}}</option>" +
                    "</select>" +
                  "</div>" +
                "</div>" +
              "</div>" +

              // language select
              "<div class='row'>" +
                "<div ng-class='{\"hidden\" : countrySelection == null}'>" +
                  "<div class='medium-4 medium-offset-4 small-10 small-offset-1 columns'>" +
                    "<div class='small-6  pull-left'><small><strong>{{language}}:</strong></small></div>" +
                    "<div class='small-6  pull-left'>" +
                      "<select ng-model='languageSelection' ng-change='selectLanguage(languageSelection)' ng-options='entry.name for entry in countrySelection.languages'>" +
                        "<option value=''>{{selectALanguage}}</option>" +
                      "</select>" +
                    "</div>" +
                  "</div><br><br><br>" +
                "</div>" +
              "</div>" +

              // button
              "<div class='row'>" +
                "<div  ng-if='languageSelection != null && page.continueBtn'>" +
                  "<div class='small-12'>" +
                    "<div class='medium-offset-8 small-8 small-offset-2'><button ng-click='activeSection(\"programSelect\")' class='success tiny'>{{nextbtn}} &nbsp;<i class='fa fa-chevron-right'></i></button></div>" +
                  "</div>" +
                "</div>" +
              "</div>" +

            "</div>" +
          "</div>" +
        "</div>" +

      "</div>" +

        ///////////////


        // SECTION 2
        "<div class='row small-12' style='margin: 0 auto;'>" +

        "<div class='row page-default' ng-class='{selection: \"hidden\", programSelect: \"visible\", collect: \"hidden\", submit: \"hidden\"}[page.current]'><br><br>" +

          // no programs
            "<div ng-if='orgData.length == 0'>" +
              "<div class='small-12 columns'>" +
                "<center>" +
                  "<h3>{{noprogram}}</h3>" +
                  "<button ng-click='activeSection(\"selection\")' class='button tiny'><i class='fa fa-chevron-left'></i>  {{backbtn}}</button>" +
                "</center>" +
              "</div>" +
            "</div>" +

            // program selection
            "<div ng-if='orgData.length > 0' ng-repeat='i in orgData'>" +
               "<div class='small-12 columns' style='cursor: pointer'>" +

               "<div class='small-3 columns'>" +
               "<img style='max-width: 200px; height: auto; border: 1px solid #eee;' src='{{i.image}}' />" +
               "</div>" +
               "<div class='small-6 columns'>" +
                 "<h4><span class='translate'> {{i.name}} </span>&nbsp;&nbsp;&nbsp;<span ng-if='i.fitnessFundraiser'> *Fitness Fundraiser*</span><br></h4>" +
                 "<div class='small-12'><p class='description'>{{i.description}}</p><br></div>" +
                 "<div class='small-12'><p class='available'><label>{{available}}: {{i.openslots - i.currently_registered}}</label></p></div>" +
              "</div>" +
              "<div class='small-3 columns right'>" +
                 "<button class='button primary' ng-if='i.openslots - i.currently_registered > 0' ng-click='updateSelection(i)'>" +
                    "<i class='fa fa-plus'></i>  {{signupbtn}}" +
                 "</button>" +
                 "<br>" +
                 "<button class='button secondary' ng-if='i.openslots - i.currently_registered <= 0'>" +
                    "<i class='fa fa-times'></i>  {{eventfilled}}" +
                 "</button>" +
               "</div>" +
               "<hr>" +
               "</div>" +
            "</div>" +

        "</div>" +
      "</div>" +


      ///////////////

      // SECTION 3  -
      "<div class='row small-12' style='margin: 0 auto;'>" +


      "<div class='row page-default'  ng-class='{selection: \"hidden\", programSelect: \"hidden\", collect: \"visible\", submit: \"hidden\"}[page.current]'><br><br>" +

         // message
        "<div class='row'>" +
          "<div class='small-10 small-offset-1'>" +
              "<div class='small-6 left'>" +
                "<h3>Volunteer Event:  <span class='translate'> {{usingOrgData.name}} </span> </h3>" +
              "</div>" +
              "<div class='small-4 right'>" +
                "<button class='button small' ng-click='activeSection(\"programSelect\")'><i class='fa fa-chevron-left'></i>  Back </button>" +
              "</div>" +
              "<hr>" +
              "<div class='small-4 columns left'>" +
                "<img style='max-width: 200px; height: auto; padding-bottom: 20px; border: 1px solid #eee;' src='{{usingOrgData.image}}' />" +
              "</div>" +
              "<div class='small-6 columns left'>" +
                "<p>{{usingOrgData.description}}</p><br><br>" +
                "<span class='available'><strong>{{available}}: {{usingOrgData.openslots - usingOrgData.currently_registered}} </strong></span><br><br>" +
                "<div class='required'>" +
                // Allen - we need this below text translated
                  "<p id='req'>*{{requireditemtext}}</p>" +
              "</div>" +
            "</div>" +
            "<hr/>" +
          "</div>" +
        "</div>" +

        //s3
        "<div class='row'>" +
          "<h5 style='margin-left: 8%; margin-right: 8%;'>{{intro.lang}}</h5>" +
          "<div class='small-10 small-offset-1 columns'>" +
            "<strong>" +
              "<div ng-if='hasVolunteerTasks' class='row'>" +
                "<div class='small-12 left' style='margin: 20px 0 20px 0;'>" +
                  "<div class='small-6 left'>" +
                    "<h3>{{selecttask}}*</h3>" +
                  "</div>" +
                  "<div class='small-6 right'>" +
                     "<label><span class='has-error right' ng-if='validateCheck.task'>*{{required}}*</span></label>" +
                    "<select ng-model='taskSelected.selection' ng-options='task as task.description for task in listOfTasks' class='right'></select>" +
                  "</div>" +
                 "<hr>" +
                "</div>" +
              "</div>" +

              // name
              "<div class='row'>" +
                "<div class='small-6 left'>" +
                  "<h3>{{registrationinfo}}: </h3>" +
                "</div>" +
                "<div class='small-6 right'>"  +
                    "<button class='button small alert' ng-click='clearRegistration()'><i class='fa fa-trash'></i> {{clearbtn}}</button>" +
                "</div>" +
              "</div>" +

              "<div class='row'>" +
                "<div class='small-12'>"  +
                  "<div id='associate-info' class='row'>" +
                    "<div class='small-3 columns left'>" +
                      "<label>{{firstname}}*:  <span class='has-error right' ng-if='validateCheck.firstName'>*required*</span></label>" +
                    "</div>" +
                    "<div class='small-6 columns left'>" +
                      "<input class='full-width' ng-model='rosterCollection.firstName' />" +
                    "</div>" +
                  "</div>" +
                  "<div id='associate-info' class='row'>" +
                    "<div class='small-3 columns left'>" +
                      "<label>{{lastname}}*:  <span class='has-error right' ng-if='validateCheck.lastName'>*required*</span></label>" +
                    "</div>" +
                    "<div class='small-6 columns left'>" +
                      "<input class='full-width' ng-model='rosterCollection.lastName' />" +
                    "</div>" +
                  "</div>" +
                  "<div id='associate-info' class='row'>" +
                    "<div class='small-3 columns left'>" +
                      "<label>{{businessunit}}*:  <span class='has-error right' ng-if='validateCheck.businessUnit'>*required*</span></label>" +
                    "</div>" +
                    "<div class='small-6 columns left'>" +
                      "<input class='full-width' ng-model='rosterCollection.business_unit' />" +
                    "</div>" +
                  "</div>" +
                  "<div id='associate-info' class='row'>" +
                    "<div class='small-3 columns left'>" +
                      "<label>{{email}}*:  <span class='has-error right' ng-if='validateCheck.email'>*required*</span> </label>" +
                    "</div>" +
                    "<div class='small-6 columns left'>" +
                      "<input class='full-width' ng-model='rosterCollection.email' />" +
                    "</div>" +
                  "</div>" +

                  "<div id='associate-info' class='row'>" +
                    "<div class='small-3 columns left'>" +
                      "<label>Office Location:</label>" +
                    "</div>" +
                    "<div class='small-6 columns left'>" +
                      "<input class='full-width' ng-model='rosterCollection.officeLocation' />" +
                    "</div>" +
                  "</div>" +

                  "<div id='associate-info' class='row'>" +
                    "<div class='small-3 columns left'>" +
                      "<label>{{mobile}}:</label>" + 
                    "</div>" +
                    "<div class='small-6 columns left'>" +
                      "<input class='full-width' ng-model='rosterCollection.mobile' />" +
                    "</div>" +
                  "</div>" +

                  "<div id='associate-info' class='row'>" +
                    "<div class='small-3 columns left'>" +
                      "<label>{{shirtsize}}*: <span class='has-error right' ng-if='validateCheck.tshirt'>*required*</span></label>" +
                    "</div>" +
                    "<div class='small-6 columns left'>" +
                      "<select ng-model='rosterCollection.tshirt' ng-options='size as size for size in shirtOptions' ng-init='rosterCollection.tshirt = '' />" +
                    "</div>" +
                  "</div>" +
                  "<div id='associate-info' class='row'>" +
                    "<div class='small-3 columns left'>" +
                      "<label>{{specialrequirements}}:</label>" +
                    "</div>" +
                    "<div class='small-6 columns left'>" +
                      "<textarea ng-model='rosterCollection.specialRequirements'></textarea>" +
                    "</div>" +
                  "</div>" +
                "</div>" +

                "<div id='associate-info' class='row'>" +
                    "<div class='small-3 columns left'>" +
                      "<label>Attend Evening BBQ:</label>" +
                    "</div>" +
                    "<div class='small-6 columns left'>" +
                      "<select ng-model='rosterCollection.bbq' ng-options='bbq as bbq for bbq in bbq' ng-init='rosterCollection.bbq = '' />" +
                    "</div>" +
                  "</div>" +

                "<div id='associate-info' class='row'>" +
                    "<div class='small-3 columns left'>" +
                      "<label>Would you be able to use your car to transport associates for the event(car pool)?*: <span class='has-error right' ng-if='validateCheck.tshirt'>*required*</span></label>" +
                    "</div>" +
                    "<div class='small-6 columns left'>" +
                      "<select ng-model='rosterCollection.carpool' ng-options='car as car for car in carpool' ng-init='rosterCollection.carpool = '' />" +
                    "</div>" +
                  "</div>" +

                "<div class='small-12'>"  +
                  "<div ng-if='usingOrgData.fitnessFundraiser'>" +
                    "<div id='associate-info' class='row'>" +
                      "<div class='small-3 columns left'>" +
                        "<label>{{distance}}:</label>" +
                      "</div>" +
                      "<div class='small-6 columns left'>" +
                        "<select class='full-width' ng-model='rosterCollection.distance' ng-options='d as d for d in distanceOptions'/></select>" +
                      "</div>" +
                    "</div>" +
                  "</div>" +
                "</div>" +
              "</div>" +

              // guests
              "<div class='row' ng-if='usingOrgData.fitnessFundraiser'>" +
                "<div class='small-12'>"  +
                  "<hr>" +
                  "<div class='row'>" +
                    "<div class='small-6 columns left'>" +
                      "<h3>{{guests}}: </h3>" +
                    "</div>" +
                    "<div class='small-6 columns right'>"  +
                      "<div ng-if='usingOrgData.fitnessFundraiser'>" +
                        "<button class='button primary' ng-disabled='rosterCollection.guests.length >= 5' ng-click='addGuest()'>" +
                          "<span ng-if='rosterCollection.guests.length < 5 && rosterCollection.guests.length == 0'><i class='fa fa-plus-circle'></i>  {{haveguestsbtn}}</span>" +
                          "<span ng-if='rosterCollection.guests.length < 5 && rosterCollection.guests.length > 0'><i class='fa fa-plus-circle'></i> {{addanotherbtn}}</span>" +
                          "<span ng-if='rosterCollection.guests.length >= 5'>{{maxReached}}</span>" +
                        "</button>" +
                      "</div>" +
                      "<button ng-if='rosterCollection.guests.length > 0' class='button small alert' ng-click='clearGuests()' ><i class='fa fa-trash'></i>  {{clearbtn}}</button>" +
                    "</div>" +
                  "</div>" +

                  "<div ng-repeat='guests in rosterCollection.guests'>" +
                    "<div class='small-12'>" +
                      "<div id='associate-info' class='row'>" +
                        "<div class='small-3 columns left'>" +
                          "<label>{{firstname}}:</label>" +
                        "</div>" +
                        "<div class='small-6 columns left'>" +
                          "<input class='full-width' ng-model='rosterCollection.guests[$index].firstName' />" +
                        "</div>" +
                      "</div>" +
                      "<div id='associate-info' class='row'>" +
                        "<div class='small-3 columns left'>" +
                          "<label>{{lastname}}:</label>" +
                        "</div>" +
                        "<div class='small-6 columns left'>" +
                          "<input class='full-width' ng-model='rosterCollection.guests[$index].lastName' />" +
                        "</div>" +
                      "</div>" +
                      "<div id='associate-info' class='row'>" +
                        "<div class='small-3 columns left'>" +
                          "<label>{{shirtsize}}:</label>" +
                        "</div>" +
                        "<div class='small-6 columns left'>" +
                          "<select ng-model='rosterCollection.guests[$index].tshirt' ng-options='size as size for size in shirtOptions' ng-init='rosterCollection.guests[$index].tshirt = shirtOptions[2]' />" +
                        "</div>" +
                      "</div>" +
                    "</div>" +


                    "<div class='small-12' ng-if='usingOrgData.fitnessFundraiser'>" +
                      "<div id='associate-info' class='row'>" +
                        "<div class='small-3 columns left'>" +
                          "<label>{{distance}}:</label>" +
                        "</div>" +
                        "<div class='small-6 columns left'>" +
                          "<select class='full-width' ng-model='rosterCollection.guests[$index].distance' ng-options='d as d for d in distanceOptions'/></select>" +
                        "</div>" +
                      "</div>" +
                      "<div id='associate-info' class='row'>" +
                        "<div class='small-3 columns left'>" +
                          "<label>{{mobile}}:</label>" +
                        "</div>" +
                        "<div class='small-6 columns left'>" +
                          "<input class='full-width' ng-model='rosterCollection.guests[$index].mobile' />" +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                    "<div class='row'>" +
                      "<div class='small-3 columns right' style='margin-top: 30px;'>" +
                        "<button ng-click='removeGuest($index)' class='button alert tiny expand'><i class='fa fa-minus-circle'></i>  {{removebtn}}</button>" +
                      "</div>" +
                    "</div>" +
                    "<hr>" +
                  "</div>" +
                "</div>" +
              "</div>" +


              // submit button
              "<div class='row'>" +
                "<div class='small-12'>"  +
                  "<br><br>" +
                  "<hr><br><center><button ng-disabled='rosterCollection.guests.length + 1 > (usingOrgData.openslots - usingOrgData.currently_registered) || loading.submit' class='button success' ng-click='submitForm();highlightReq()'>" +
                    "<span ng-if='rosterCollection.guests.length + 1 <= (usingOrgData.openslots - usingOrgData.currently_registered)' >{{submitbtn}} </span>" +
                    "<span ng-if='rosterCollection.guests.length + 1 >  (usingOrgData.openslots - usingOrgData.currently_registered)' >{{notenoughbtn}} </span>" +
                  "</button></center><hr>" +
                "</div>" +
              "</div>" +

            "</strong>" +
          "</div>" +
        "</div>" +
      "</div>" +

"</div>" +

      ///////////////

        // SECTION 4
        "<div class='row small-12' style='margin: 0 auto;'>" +

        "<div class='row page-default' ng-class='{selection: \"hidden\", programSelect: \"hidden\", collect: \"hidden\", submit: \"visible\"}[page.current]'><br><br>" +

          // thank you
          "<div class='row'>" +
            "<div class='small-10 small-offset-1'>" +
              "<center>" +
                "<h2>{{thankyou}}</h2><br>" +
                "<h6>"+"{{thankyouregistration}}"+"</h6>" +
                "<button ng-click='reset()'>{{returnbtn}}</button>" +
              "</center>" +
            "</div>"  +
          "</div>" +

        "</div>" +
"</div>" +

      ///////////////

      // FAQ

      "<div id=\"faqModal\" ng-class='{true: \"show-modal\", false: \"hide-modal\"}[page.showFAQ]'>" +
        "<br><br>" +
          "<div class=\"row\">" +
            "<div class=\"small-12\">" +
               "<span ng-click=\"page.showFAQ = false\" class=\"exitBtn isPointer\" )'=\"\">Close</span>" +
               "<hr><span ng-bind-html='info.faq'></span><hr>" +
            "</div>" +
          "</div>" +
      "</div>" +

      // privacy policy

      "<div id=\"ppModal\" ng-class='{true: \"show-modal\", false: \"hide-modal\"}[page.showPP]'>" +
        "<br><br>" +
          "<div class=\"row\">" +
            "<div class=\"small-12\">" +
              "<span ng-click=\"page.showPP = false\" class=\"exitBtn isPointer\" )'=\"\">Close</span>" +
              "<hr><span ng-bind-html='info.privacy'></span><hr>" +
            "</div>" +
          "</div>" +
      "</div>" +


        // closer
        "";

        $(this).append(injectString);
    });



    // appends grantr to location
    $('#footer-section').each(function(){
        var injectString =
      "<div id='footer'>" +
        "<div class='footer-bar'>" +
        "</div>" +
        "<div class='small-12'>" +
          "<div class='small-2 columns'>" +
            "<p>&copy 2015 Staples</p>" +
          "</div>" +
          "<div class='small-1 columns' style='padding: 5px;'>" +
            "<img src='https://www.gdg.do/storage/servlet/Image?c=9616156&fileName=4143555243267908359.png&contentType=image%2Fpng&suggestedName=Img+_+Paperclip+Heart+Logo.png'>" +
          "</div>" +
          "<div class='small-2 columns' style='padding: 5px;'>" +
            "<img src='https://www.gdg.do/storage/servlet/Image?c=9616156&fileName=2722709157373155891.png&contentType=image%2Fpng&suggestedName=Img+_+2M_Change.png'>" +
          "</div>" +
          "<div class='small-6 columns'>" +
            "<div class='footer-image'></div>" +
          "</div>" +
       "</div>" +


    "</div>";
        $(this).append(injectString);
    });


})