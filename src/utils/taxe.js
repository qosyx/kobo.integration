function calcultaxe(puissanceMoteur, poidsCharge, type, nombreDePlace) {
    var taxe = 0;
    if (type === "VPP" || type === "vehicule privé de marchandises") {
        if (puissanceMoteur<=7) {
            taxe = 20000;
        }else if (8<=puissanceMoteur && puissanceMoteur<=10) {
            taxe=30000
        }
        else if (11<=puissanceMoteur && puissanceMoteur<=15) {
            taxe=40000
        } else{
            taxe=60000
        }
    } 
    else if (type==="vehicule public de personne") {
        
            if (0<=nombreDePlace && nombreDePlace<=9) {
                taxe=38000
            } else if (10<=nombreDePlace && nombreDePlace<=20) {
                taxe=57000
            } else if (nombreDePlace>=20) {
                taxe=86800
            
        }
    } 
    else if (type==="vehicule public de marchandise") {

            if (0<=poidsCharge && poidsCharge<=2500) {
                taxe=49500
                }else if (2600<=poidsCharge && poidsCharge<=5000){
                    taxe=57000
                }else if (5010<=poidsCharge && poidsCharge<=10000) {
                    taxe=86800
                }else if (poidsCharge>10000){
                    taxe=136400
                }       
        } 
    else if (type==="vehicule à moteur à 3 roues") {
            taxe=15000
        } 
    else if (type ==="privé de société ou d'entreprise") {
            if (puissanceMoteur<=7) {
                taxe=150000
            } else {
                taxe=200000
            }
        }
    
    return taxe;
}
