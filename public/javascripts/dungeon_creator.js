    var openField;
   
    $(function() {
        var tabTitle = $( "#tab_title" ),
          tabContent = $( "#tab_content" ),
          tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
          tabCounter = 2;
     
        var tabs = $( "#tabs" ).tabs();
     
        // modal dialog init: custom buttons and a "close" callback resetting the form inside
        var dialog = $( "#dialog" ).dialog({
          autoOpen: false,
          modal: true,
          width: '400px',
          buttons: {
            Add: function() {
              addTab();
              $( this ).dialog( "close" );
            },
            Cancel: function() {
              $( this ).dialog( "close" );
            }
          },
          close: function() {
            form[ 0 ].reset();
            $('#tab_content li').each(function(i){
              $(this).removeClass('enemy-field');
              $(this).removeClass('team-field');
              $(this).attr('entityId','');
              $(this).attr('entityType','');
              $(this).text('Empty');
              $(this).attr('title','Empty');
            })
          }
        });
     
        // addTab form: calls addTab function on submit and closes the dialog
        var form = dialog.find( "form" ).submit(function( event ) {
          addTab();
          dialog.dialog( "close" );
          event.preventDefault();
        });
     
        // actual addTab function: adds new tab using the input from the form above
        function addTab() {
          var label = "Stage " + tabTitle.val() || "Tab " + tabCounter,
            id = "tabs-" + tabCounter,
            li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
            tabContentHtml = tabContent.html();
     
          tabs.find( ".ui-tabs-nav" ).append( li );
          tabs.append( "<div id='" + id + "' style='overflow:scroll'><ul class='tab_content'>" + tabContentHtml + "</ul></div>" );
          tabs.tabs( "refresh" );
          tabCounter++;
        }
     
        // addTab button: just opens the dialog
        $( "#add_tab" )
          .button()
          .click(function() {
            dialog.dialog( "open" );
          });
     
        // close icon: removing the tab on click
        tabs.delegate( "span.ui-icon-close", "click", function() {
          var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
          $( "#" + panelId ).remove();
          tabs.tabs( "refresh" );
        });
     
        tabs.bind( "keyup", function( event ) {
          if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
            var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
            $( "#" + panelId ).remove();
            tabs.tabs( "refresh" );
          }
        });
        
        
        var stageliDialog = $( "#stage-li-dialog" ).dialog({
          autoOpen: false,
          modal: true,
         // width: '200px',
          buttons: {
            Done: function() {
              openField.attr('entityType',$("#openField-form :checked").val());
              openField.attr('entityId',$("#openField-form :selected").val());
              if($("#openField-form :checked").val() == 'E'){
                openField.text('E');
                openField.attr('title',$("#openField-form :selected").text());
                openField.addClass('enemy-field');
              }else if($("#openField-form :checked").val() == 'C'){
                openField.text('T' + $("#openField-form :selected").val());
                openField.addClass('team-field');
              }
              $("#field-content").html("");
              $( this ).dialog( "close" );
            },
            Cancel: function() {
              $("#field-content").html("");
              $( this ).dialog( "close" );
            }
          },
          close: function() {
            stageliDialog.find( "form" )[0].reset();
          }
        });
        
        $(".stage-li").click(function(){
            openField = $(this);
            stageliDialog.dialog("open");
        });
        
        $('input[type="radio"]').click(function(){
          if ($(this).is(':checked')){
            if($(this).val() == 'C'){
              $("#field-content").html("<select name='entityId'>"+
                                          "<option value='1'>1</option>"+
                                          "<option value='2'>2</option>"+
                                          "<option value='3'>3</option>"+
                                          "<option value='4'>4</option>"+
                                          "<option value='5'>5</option>"+
                                          "<option value='6'>6</option>"+
                                       "</select>");
            }else if($(this).val() == 'E'){
              $.ajax({
                type: "POST",
                url: "/getEnemies",
                success: function(data)
                {
                  var html="";
                  console.log(data);
                  console.log(data.enemies[0].Name);
                  html += "<select name='entityId'>";
                  data.enemies.forEach(function(element){
                      html += "<option value="+element._id+">"+element.Name+"</option>";
                  });
                  html += "</select>";
                  $("#field-content").html(html);
                },
                error: function(err){
                    swal('Error',err.code,'error');
                }
              });
            }
          }
        });
    });
    
    
    function createDungeon(){
      //console.log($("#tabs").find('li.stage-li')[0]);
      var stageCount = 1;
      var stages = $("#tabs").find('div');
      var stagesObject = [];
      var stageObject = {
        "Characters":[
        ],
        "Enemies":[
        ]
      };
      
      
      if(stages != null){
        stages.each(function(){
          var tiles = $(this).find('li.stage-li');
          tiles.each(function(){
            if($(this).attr('entityType') == 'C'){
              stageObject.Characters.push({
                "TeamMember": $(this).attr('entityId'),
                "CharacterPos": {
                  "x": $(this).attr('posX'),
                  "y": $(this).attr('posY')
                }
              });
            }else if($(this).attr('entityType') == 'E'){
              stageObject.Enemies.push({
                "EnemyId": $(this).attr('entityId'),
                "EnemyPos": {
                  "x": $(this).attr('posX'),
                  "y": $(this).attr('posY')
                }
              });
            }
          });
          stagesObject.push(stageObject);
          stageObject = {
            "Characters":[
            ],
            "Enemies":[
            ]
          };
        });
      }else{
        swal('Error','no hay ningun stage','error');
      }
      if(stagesObject != null){
        $.ajax({
                type: "POST",
                url: "/dungeon_creator",
                data:{
                  "DungeonName": $("#dungeonName").val(),
                  "BackgroundImg" : $("#backgroundImg").val(),
                  "Stages": JSON.stringify(stagesObject)
                },
                success: function(data)
                {
                  swal('Creado correctamente','dungeon creado','success');
                },
                error: function(err){
                    swal('Error',err.code,'error');
                }
              });
      }     
    }