var emailAdress = document.querySelector('#sendbutton');
var auteur = document.querySelector('#auteur');
var destinataire = document.querySelector('#destinataire');
var message = document.querySelector('#message');
var fichier = document.querySelector('#fichier');

emailAdress.addEventListener('click', isValidEmailAddress);

console.log("aloha");

function isValidEmailAddress(emailAddress) {

    console.log("aloha");

    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};

$.ajax({
    url: "./php/send.php", // je dis que l'url correspond à la variable url plus haut
    type: 'POST', // La méthode indiquée dans le formulaire (get ou post)
    success: function(data) { // Je récupère la réponse du fichier PHP sans aucun erreur 
        data = JSON.parse(data); // je récupère ces données et les traduit en JSON pour en faire des objets et pouvoir parcourir le JSON comme je veux

        console.log(data);
        // si la personne n'a pas rentré son nom
        if (data.auteur == true) {
            $("#auteur").css('border', '1px dotted red');
            $("#auteur").css('background-color', 'rgba(255,0,0,0.5)');
        } // si la personne a entré son nom
        else{
            $("#auteur").css('border', '1px dotted black');
            $("#auteur").css('background-color', 'transparent');
        }

        // si la personne n'a pas rentré son email
        if (data.destinataire == true) {
            $("#destinataire").css('border', '1px dotted red');
            $("#destinataire").css('background-color', 'rgba(255,0,0,0.5)');

        } // si la personne a rentré son email
        // alors je regarde s'il est bien écrit en appelant la fonction REGEX
        else if(isValidEmailAddress(mail)){
            $("#emailAdress").css('border', '1px dotted green');
            $("#emailAdress").css('background-color', 'rgba(0,241,140,0.7)');
        }// si la personne a rentré son mail mais qu'il n'est pas valide
        else{
            $("#emailAdress").css('background-color', 'rgba(255,0,0,0.5)');
            $("#emailAdress").css('border', '1px dotted red');
        }
        // si la personne n'a pas rentré de message
        if (data.message == true) {
            $("#message").css('border', '1px dotted red');
            $("#message").css('background-color', 'rgba(255,0,0,0.5)');
        }//si la personne a rentré un message
        else{
            $("#message").css('border', '1px dotted black');
            $("#message").css('background-color', 'white');
        }
        // si la personne n'a pas rentré de fichier
        if (data.fichier == true) {
            $("#fichier").css('border', '1px dotted red');
            $("#fichier").css('background-color', 'rgba(255,0,0,0.5)');
        }//si la personne a rentré un fichier
        else{
            $("#fichier").css('border', '1px dotted black');
            $("#fichier").css('background-color', 'white');
        }
    }
});



