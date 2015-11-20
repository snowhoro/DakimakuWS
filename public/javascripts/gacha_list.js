var gachaTable;
var rowData;

$(document).ready(function(){
    gachaTable = $('#gacha_table').DataTable();
    
    $('#gacha_table tbody').on( 'click', 'tr', function () {
        rowData = gachaTable.row( this ).data();
    });
});

function changeGachaStatus(){

        swal({   
            title: "Are you sure?",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Confirm",   
            closeOnConfirm: false }, 
            function(){   
               $.ajax({
                     type: "POST",
                     url: "gacha_status",
                     data: {
                         GachaId: rowData[0]
                     }, // serializes the form's elements.
                     success: function(data){
                        location.href = location.href;
                     },
                     error: function(err){
                        swal("Error",err,"error");
                     }
               });
               
        });
}

function deleteGacha(){

        swal({   
            title: "Are you sure?",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Confirm",   
            closeOnConfirm: false }, 
            function(){   
               $.ajax({
                     type: "POST",
                     url: "gacha_delete",
                     data: {
                         GachaId: rowData[0]
                     }, // serializes the form's elements.
                     success: function(data){
                        location.href = location.href;
                     },
                     error: function(err){
                        swal("Error",err,"error");
                     }
               });
               
        });
}