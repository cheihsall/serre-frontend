import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RealtimeService } from '../realtime.service';


@Component({
 selector: 'app-systeme',
 templateUrl: './systeme.component.html',
 styleUrls: ['./systeme.component.scss']
})
export class SystemeComponent implements OnInit {
 constructor(private socketService:RealtimeService,private router: Router,){

  setInterval(() => { //fonction pour l'arrosage automatique
    //console.log('ok');
    const date = new Date(); //declaration date et heure
    const fullDate = date.toLocaleDateString();
    const heure = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const scheduledHours = ['07:00:00', '19:00:00'];// tableau des heures d'arrosage

    const arrose = (data: any) => { // on donne a la fontion les parametre issue de la base de donnee
    //  console.log(data.nombreArrosage);
      if (data.nombreArrosage === 2) { // si dans la base de donnee le nombre d'arrosage = 2 il arrose le oignon
        this.socketService.arroseOignon();
         // console.log('ognon arrosé');
      }
      if (data.nombreArrosage === 3) {// sil est egal a 3 il arrose tomate
        this.socketService.arroseTomate();
        //console.log('tomate arrosé');
      }
    };

    if (scheduledHours.includes(heure)) {
      this.socketService.Parametre().subscribe(arrose);
    }

    if (heure === '12:00:00') {
      this.socketService.Parametre().subscribe((data: any) => {
        console.log(data.nombreArrosage);
        if (data.nombreArrosage === 3) {
          this.socketService.arroseTomate();
        //console.log('tomate arrosé');

        }
      });
    }
   }, 1000);
 }
 /* déclaration des images utilisés dans le Systémes */
 imgOuvert='assets/ouvert.png'; // porte ouvert
 imgFermer='assets/fermerr.jpg'; //porte Fermer
 imageSrc = 'assets/extract.png'; //image de l'extracteur d'air
 imgtomate ='assets/tomate.jpg'; //image de la plante Tomate
 imgOignon ='assets/oignon.webp'; //image de la plante Oignon
 imgpompe ='assets/pompe.jpeg'; //image de la pompe qui gére l'arrosage par défaut
 imgpompegif ='assets/pompe.gif'; //image gif de la pompe

 humidite_sol:any;
 isSpeechEnabled: boolean = true;
text: any;
filter_entree: any;
 temperature: any
 humidity: any
 id:String ="642dde9ce97263f1504ed958";
 nombreArrosage: Number= 3;
 /* déclaration des Etats activé et désactivé des boutons */
 clicked = false; //active/désactive bouton ouverture fenetre
 clicke =true; //active/désactive bouton fermeture fenetre


 clickedA=false; //active/désactive bouton ouverture Extracteur
 clickeE=true;  //active/désactive bouton fermeture Extracteur


 cArrose=false;//active/désactive bouton Arrosage
 cArreter=true;//active/désactive bouton Arreter


/* recupération des images du systéme sous forme de tableau */
 imageButtons = [ {src:'assets/extract.png', srcs:'', srcr :''}];
 imageButtonOn = [ {src:'assets/extracteur.gif',  srcr:'', srcs : ''}];


 imageFermer = [ {src:'assets/fermerr.jpg', srcs:'', srcr :''}];
 imageOuvert = [ {src:'assets/openserre.webp',  srcr:'', srcs : ''}];


 imageArroser = [ {src:'assets/pompe.gif', srcs:'', srcr :''}];
 imageArreter = [ {src:'assets/pompe.jpeg',  srcr:'', srcs : ''}];


 imageArroT = [ {src:'assets/pompe.gif', srcs:'', srcr :''}];
 imagetomate = [ {src:'assets/tomate.jpg',  srcr:'', srcs : ''}];


 imageArrosO = [ {src:'assets/pompe.gif', srcs:'', srcr :''}];
 imageArreterO = [ {src:'assets/oignon.webp',  srcr:'', srcs : ''}];







 ngOnInit(){

  this.socketService.realtime().subscribe({
    next:(data:any)=>{
    this.filter_entree = data
    if(this.filter_entree.etatoit == 1){

    }
    if(this.filter_entree.etatpompe == 1){

    }
    if(this.filter_entree.etatvent == 1){

    }

    }
  })
 }
 toggleSpeech() {
  this.isSpeechEnabled = !this.isSpeechEnabled;
}
 textToSpeech(text: string) {
  if (this.isSpeechEnabled &&  'speechSynthesis' in window) {
    const msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
  } else {
    console.log('synthese vocale desactivé');

    //alert("Désolé, votre navigateur ne prend pas en charge la synthèse vocale.");
  }
}
 /*Fonction pour Extracteur d'aire  */
Allumer(imageNameObject: { srcr: string; srcs: string; src: string;}) {
   this.imageSrc = imageNameObject.src;
   this.socketService.Allumer()


 }
 Eteindre(imageNameObject: { srcr: string; srcs: string; src: string;}) {
   this.imageSrc = imageNameObject.src;
   this.socketService.Eteindre()
 }
 /*Fonction  pour Toit  */
 ouverture(imageNameObject: { srcr: string; srcs: string; src: string;}) {


   this.imgFermer = imageNameObject.src;
     this.socketService.ouverture()
 }
 Fermeture(imageNameObject: { srcr: string; srcs: string; src: string;}) {


   this.imgFermer = imageNameObject.src;
     this.socketService.Fermeture()
 }
 /* Fonction pour arrosage par défaut */
 arrose(imageNameObject: { srcr: string; srcs: string; src: string;}) {
   this.imgpompe = imageNameObject.src;
   this.socketService. arroser()
 }
 /*  */
 arreter(imageNameObject: { srcr: string; srcs: string; src: string;}) {
   this.imgpompe = imageNameObject.src;
   this.socketService.arreter()

 }
 arroseTomate(imageNameObject: { srcr: string; srcs: string; src: string;}) {
   this. imgtomate= imageNameObject.src;
   this.socketService. arroseTomate()
   this.socketService.ApparroseTomate(this.id, this.nombreArrosage).subscribe((data)=>{

//console.log('parametreS TOMATE applique avec succes');
this.text='Parametre tomate applique avec succes !'
    this.textToSpeech(this.text,);
Swal.fire({
  position: 'center',
  icon: 'success',
  title: 'parametreS TOMATE applique avec succes !',
});window.setTimeout(function(){location.reload()},2000)


}
,(err)=>{
 console.log('erreur serveur');

})

 }
 arretomate(imageNameObject: { srcr: string; srcs: string; src: string;}) {
   this. imgtomate= imageNameObject.src;
   this.socketService.arretomate ()
   this.socketService.Reset(this.id, this.nombreArrosage).subscribe((data)=>{

    //console.log('parametre apllique avec succes');
    this.text='Parametre réinitialisé avec succes !'
    this.textToSpeech(this.text,);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Parametre réinitialiser avec succes !',
    });window.setTimeout(function(){location.reload()},2000)


    }
    ,(err)=>{
     console.log('erreur serveur');

    })


 }
 arroseOignon(imageNameObject: { srcr: string; srcs: string; src: string;}) {
   this.imgOignon= imageNameObject.src;
   this.socketService.arroseOignon()
   this.socketService.ApparroseOignon(this.id, this.nombreArrosage).subscribe((data)=>{

   // console.log('parametre OIGNON applique avec succes');
    this.text='Parametre oignon applique avec succes !'
    this.textToSpeech(this.text,);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Parametre OIGNON appliqué avec succes !',
    });window.setTimeout(function(){location.reload()},2000)


    }
    ,(err)=>{
     console.log('erreur serveur');

    })



 }
 arretOignon(imageNameObject: { srcr: string; srcs: string; src: string;}) {
   this.imgOignon= imageNameObject.src;
   this.socketService.arretOignon()
   this.socketService.Reset(this.id, this.nombreArrosage).subscribe((data)=>{

  //  console.log('parametre reinitialiser avec succes');
  /*  $scope.textToSpeech = function(text) {
      if ('speechSynthesis' in window) {
        var msg = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(msg);
      } else {
        alert("Désolé, votre navigateur ne prend pas en charge la synthèse vocale.");
      }
    };*/

this.text='Parametre reinitialiser avec succes !'
  this.textToSpeech(this.text,);

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Parametre reinitialiser avec succès !',
    });window.setTimeout(function(){location.reload()},2000)


    }
    ,(err)=>{
     console.log('erreur serveur');

    })



 }

}
