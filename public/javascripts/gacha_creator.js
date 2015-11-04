$(document).ready(function(){
   $( "#char-list,#lineup-list" ).sortable({
      connectWith: ".connectedSortable",
      dropOnEmpty: true
    }).disableSelection(); 
    
   $("#featured-list").sortable({
      connectWith:".connectedSortable",
      dropOnEmpty: true,
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
      receive: function(event, ui) {
         $(ui.item).find("input").attr("name","lineupChars");
      }
    }).disableSelection(); 
   
});

function sendForm(){
   $.ajax({
         type: "POST",
         url: "gacha_creator",
         data: $("#gacha-form").serialize(), // serializes the form's elements.
         success: function(data)
         {
            alert(data); // show response from the php script.
         }
   });
}