/*FORMULAIRE    */

$(document).ready(function() {

    $('#form').on('submit', function(e){

        e.preventDefault();

        $('.box__files').each(function(){
            if($(this).val().length==0){
                $(this).remove();   
            }   
        });
        
        var mesCases = $('input:required');
        var regex =/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        var message = $('#message');
        
        
        var boutonForm = $('#sendbutton');
        var destemail = $('#mail1');
        var votreemail = $('#votreemail');
        
        console.log(destemail.val());

        mesCases.each(function(){

            if($(this).val().length==0){  
                // Si l'un des inputs est vide
                $(this).addClass('error');
            }else{										// Si aucun des inputs n'est vide	
                $(this).removeClass('error');
            }
        });

        if(regex.test($('#votreemail').val())==true){	//Si votre email est ok
            $(votreemail).removeClass('error');
            console.log("votre email ok");
        } else {										//Si votre email n'est pas un email
            $(votreemail).addClass('error');
            console.log('votre email faux');		
        }

        if(regex.test($('#mail1').val())==true){			//Si email destinataire ok
            $(destemail).removeClass('error');
            console.log("email destinataire ok");
        } else {										//Si email destinaire n'est pas un email
            $(destemail).addClass('error');
            console.log('email destinataire faux');		
        }


        if($(message).val().length==0){					//Si message est vide
            $(message).addClass('error');
            console.log("message vide !");
        }else{											//Si message est ok
            $(message).removeClass('error');
            console.log("message ok");
        }

        if ($('#files1').val()){			          	//Si un fichier a été selectionné
            $('#files1').removeClass('error');
            console.log("fichier telechargé")
        }else{											//Si aucun fichier n'a été selectionné
            $('#files1').addClass('error');
            console.log('pas de fichier telechargé !')
        }

        if(!$('input, textarea').hasClass('error')){	//Si aucun élément ne possède la classe error => je peux envoyer
            console.log('envoyer');
            envoyer();
        } 
    });


    function envoyer(){

        var monForm = $('form');
        var formdata = new FormData(monForm[0]);
        var data = formdata;

        $.ajax({
            url: "http://vesoul.codeur.online/front/bmelissa/wetransfer/php/send.php",
            type: "POST",
            dataType : 'json', 
            contentType: false, 
            processData: false,
            data: data,
            cache: false,
            success: function(data) {
                // Success message
                $('#success').html("<div class='alert alert-success'>");
                $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $('#success > .alert-success')
                    .append("<strong>Votre article a été posté. </strong>");
                $('#success > .alert-success')
                    .append('</div>');
                //clear all fields
                $('#contactForm').trigger("reset");
            },
            error: function(data) {
                // Fail message
                $('#success').html("<div class='alert alert-danger'>");
                $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $('#success > .alert-danger').append("<strong>Désolé le serveur ne répond pas, réessayez plus tard !");
                $('#success > .alert-danger').append('</div>');
                //clear all fields
                $('#contactForm').trigger("reset");
            },
        });
    }
});

$('.add__button').click(function(){

    nombre_email = $('.mail').length;
    nombre_email++; //j'ajoute + un à "nombre d'élément"
    $('#destemail').append('<input type="text" value="" name="destemail[]" id="mail'+ nombre_email+'" class="mail" placeholder="email du destinataire" required/>');

    console.log(nombre_email);
});


$('.box__input').on('change', 'input', function(){

    nombre_element = $('.box__files').length;
    nombre_element++; //j'ajoute + un à "nombre d'élément"
    $('#sendform').append('<input type="file" value="" name="fichiers[]" id="files'+ nombre_element+'" class="box__files multi" required/>');
});
