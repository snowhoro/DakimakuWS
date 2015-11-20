$(document).ready(function(){
  /*$(".char_input").blur(function(){
     if($(this).val() == ""){
         swal("Error","Completa el campo, chabon","error");
         $(this).focus();
     }
  }); */
  
  $("#enemy-submit").click(function(){
        var notEmpty = true;
        $("#enemy-form :input").each(function(){
            if($(this).val() == ""){
                swal('Error','te faltan campos amigo','error');
                notEmpty = false;
            }
        });
        if(notEmpty){
            $.ajax({
                type: "POST",
                url: "/enemy_creator",
                data: $("#enemy-form").serialize(), // serializes the form's elements.
                success: function(data)
                {
                    swal('Succes','Creado con exito','success');
                },
                error: function(err){
                    swal('Error',err.code,'error');
                }
            });
        }
  });
  
});