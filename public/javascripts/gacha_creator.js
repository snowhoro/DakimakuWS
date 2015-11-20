$(document).ready(function(){
   $( "#char-list,#lineup-list" ).sortable({
      connectWith: ".connectedSortable",
      dropOnEmpty: true,
      appendTo: document.body
    }).disableSelection(); 
    
   $("#featured-list").sortable({
      connectWith:".connectedSortable",
      dropOnEmpty: true,
      appendTo: document.body,
      receive: function(event, ui) {
         $(ui.item).find("input").attr("name","featuredChars");
            // so if > 10
            /*if ($(this).children().length > 5) {
                //ui.sender: will cancel the change.
                //Useful in the 'receive' callback.
                $(ui.sender).sortable('cancel');
            }*/
      }
   }).disableSelection();
   
   $("#lineup-list" ).sortable({
      connectWith: ".connectedSortable",
      dropOnEmpty: true,
      appendTo: document.body,
      receive: function(event, ui) {
         $(ui.item).find("input").attr("name","lineupChars");
      }
    }).disableSelection(); 
  
   $(window).load(function(){
       $(".char-select").mCustomScrollbar();      
   });
   
});

function sendForm(){
   swal({   title: "Are you sure?",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Confirm",   
            closeOnConfirm: false }, 
            function(){   
               $.ajax({
                     type: "POST",
                     url: "gacha_creator",
                     data: $("#gacha-form").serialize(), // serializes the form's elements.
                     success: function(data){
                        swal("Creado", "created successfuly.", "success"); 
                     },
                     error: function(err){
                        swal("Error",err,"error");
                     }
               });
               
            });
}