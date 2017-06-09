<?php


$error = array();


if ($_SERVER["REQUEST_METHOD"] == "POST") {


    if (empty($_POST["auteur"])) {

        $error['auteur'] = true; //vide

    } else {

        $error['auteur'] = false; //correctement rempli

    }


    if (empty($_POST["destinataire"])) {

        $error['destinataire'] = true; // vide

    } else {

        $error['destinataire'] = false; //correctement rempli

    }


    if(empty($_POST['message'])){

        $error['message'] = true; //vide

    }else{

        $error['message'] = false; //correctement rempli
    }
    
    if(empty($_POST['fichier'])){

        $error['fichier'] = true; //vide

    }else{

        $error['fichier'] = false; //correctement rempli
    }
    
        if(!in_array(true, $error)){
        mail('reginaphalange088@laposte.net', 'Mail venant du site', $_POST["message"], 'From: "'.$_POST["auteur"].'"<'.$_POST["mail"].'>');
    }
}

echo json_encode($error);

?>