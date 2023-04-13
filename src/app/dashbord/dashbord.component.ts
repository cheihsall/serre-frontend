
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { RealtimeService } from '../realtime.service';


import * as bcrypt from 'bcryptjs';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})

export class DashbordComponent implements OnInit {

  profileForm!:FormGroup

prenom:any;
nom:any;
email:any;
password:any;
cryptpass:any;
  submitted=false;
  invalid = false;
  succes = false;
  message = 'Actuel mot de pass incorrect'
  //champs ancien mot de passe
  inputType:any = "password";
  inputType_txt = 0;
  inputType_pwd = 1;
  //champs nouveau mot de passe
  inputType_nouveau:any = "password";
  inputType_nouveau_txt = 0;
  inputType_nouveau_pwd = 1;
  //champs confirmation nouveau mot de pass
  inputType_confirm:any = "password";
  inputType_confirm_txt = 0;
  inputType_confirm_pwd = 1;
  identifiant = '';


    pass: string = '';
  filter_entree:any;
    constructor(
       public formBuilder: FormBuilder, private router: Router,   private UserService: RealtimeService, ) {
      this.profileForm = this.formBuilder.group({

        actuelPass:['',[Validators.required ]],
        newPass:['',[Validators.required]],
       newPasswordconfirm:['', [Validators.required]],

    }
    )
    }
    destroy(){
      localStorage.removeItem('token');
this.router.navigateByUrl('/')
    }



    ngOnInit(): void {
     // console.log(this.filter_entree)
      this.UserService.getUser().subscribe({
        next:(data: any) => {
         this.prenom = data.prenom;
         this.nom = data.nom;
         this.identifiant= this.prenom + ' '+ this.nom
         this.email = data.email;
         this.password = data.password;

        }
        });
        this.UserService.realtime().subscribe({
          next:(data:any)=>{
          this.filter_entree = [data]

          }
        })
   }


    passeIdentique(){
      if ( (this.profileForm.value.newPass != this.profileForm.value.newPasswordconfirm ) || (this.profileForm.value.newPasswordconfirm == '')) {
        this.invalid = true;
      }
      else{
        this.invalid = false;
      }

    }

    async onSubmite(){

      this.submitted = true;
      this.passeIdentique();
      if(this.profileForm.invalid){

        return;
      }

      const goodPassword = await bcrypt.compare(
        this.profileForm.value.actuelPass,
        this.password, );
      this.cryptpass = await bcrypt.hash(this.profileForm.value.actuelPass, 10);
      if(!goodPassword ){
        this.succes = true;
        this.profileForm.value.newPass.reset;
        //console.log(this.cryptpass );
       // console.log(this.profileForm.value.newPass);


        return;
      }
      this.UserService.updatePassword(this.email, this.profileForm.value).subscribe((data)=>{

           Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Modification réussi !',
          });window.setTimeout(function(){location.reload()},1000)


       }
       ,(err)=>{
        this.pass= " mot_de_passe incorrect"
        setTimeout(() => {
          this.pass = ""
        }, 2000);
       })



    }

    reset() {
      this.ngOnInit();
      location.reload();
    }


    }



