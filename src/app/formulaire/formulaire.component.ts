import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RealtimeService } from '../realtime.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit{
  message: any;


  registerForm: FormGroup;
  errMsg: any;
  donnee: any;
  submitted = false;
  eror = false;
  success = false;
  code: any;


  inputType: any = "password";
  web: any;


  constructor(
    public formBuilder: FormBuilder,
    private userService: RealtimeService,
    private route: Router) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required]],
    });
  }


  loginUser() {

    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    // appellle service login
    this.userService.login(this.registerForm.value).subscribe({
      next:(data: any) => {
       // console.log(data);





          localStorage.setItem('token',  data.access_token);

          this.route.navigate(['/systeme'])


      },

      error:(err) => {
//console.log(err.error.code);
          this.eror = true;
          //if (err.error.code == 'undefined'){ this.message ='rr'}
          this.message = err.error.code;
          setTimeout(() => {
            window.location.reload();
          }, 2000);
      }

    });
  }



  ngOnInit() {
    this.userService.login_nfc().subscribe({
      next:(data: any) => {
     //  console.log(data);
this.donnee = data
const rfid = {idcarte: this.donnee};
    this.userService.login(rfid).subscribe({
      next:(data: any) => {
        //console.log(data);
        this.success = true;
          this.message = "Accés autorisé !";
          localStorage.setItem('token', data.access_token);

          this.route.navigate(['/systeme'])
      },

      error:(err) => {
        this.eror = true;
          this.message = err.error.code;

          setTimeout(() => {
            window.location.reload();
          }, 3000);



     }

      });


    }
  })


        

}



/*

function getVoices() {
 let voices = speechSynthesis.getVoices();
 if(!voices.length){
   // some time the voice will not be initialized so we can call spaek with empty string
   // this will initialize the voices
   let utterance = new SpeechSynthesisUtterance("");
   speechSynthesis.speak(utterance);
   voices = speechSynthesis.getVoices();
 }
 return voices;
}


function speak(text: string, voice: SpeechSynthesisVoice | null, rate: number, pitch: number, volume: number) {
 // create a SpeechSynthesisUtterance to configure the how text to be spoken
 let speakData = new SpeechSynthesisUtterance();
 speakData.volume = volume; // From 0 to 1
 speakData.rate = rate; // From 0.1 to 10
 speakData.pitch = pitch; // From 0 to 2
 speakData.text = text;
 speakData.lang = 'fr';
 speakData.voice = voice;

 // pass the SpeechSynthesisUtterance to speechSynthesis.speak to start speaking
 speechSynthesis.speak(speakData);

}

if ('speechSynthesis' in window) {

 let voices = getVoices();
 let rate = 1, pitch = 1, volume = 1;
 let text = "bonjour! je me nomme papa gentil et je suis une intelligence artificielle ";

 speak(text, voices[5], rate, pitch, volume);

 setTimeout(()=>{ // speak after 2 seconds
   rate = 1;
    pitch = 1;
     volume = 0.5;
   text = "dite moi en quoi puis-je vous aidez";
   speak(text, voices[10], rate, pitch, volume );
 }, 2000);
}else{
 console.log(' Speech Synthesis Not Supported😞');
}*/
}
