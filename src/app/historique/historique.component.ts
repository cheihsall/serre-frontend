import { RealtimeService } from './../realtime.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup} from "@angular/forms";
import * as _ from 'lodash';
import { Historique } from 'model/historique';
//import pdfMake from 'pdfmake/build/pdfmake';
//import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})

export class HistoriqueComponent implements OnInit{
  temperature: any;
  humserre: any;
  lumiere: any;
  humsol: any;
  Date=new Date();
  totalLenght: any; // pagination
  page : number=1; // pagination
  updateForm!: FormGroup;
  filterTerm!: string;// pagination
  donne8h! : any;
  donne12h!:any;
  donne19h!:any;
  item:any; // les donnees a telecharger
  startDate:any; // la date de debut
  endDate:any; //la date de fin
  showForm= false; // pour faire apparaite le formulaire de telechargement
  filter_entree!: Historique[];
 restaure!: Historique[]; // pour faire revenir la liste une fois le filtre est effacé

    constructor(

    private RealtimeService: RealtimeService

    ){  }


    downloadPdf() { // fonction pour telecharger l'historique des donnees de la serre
      const startDate = new Date(this.startDate); // date de debut egalt date de debut choisie dans le formulaire
  const endDate = new Date(this.endDate); // de meme que date de fin
  this.RealtimeService.gethisto().subscribe((data: any) => {
    const filteredData = data.filter((item: any) => { //filtrer les donnee a partir des date
      const date = new Date(item.date);
      return date >= startDate && date <= endDate; // retourner les donnner tous les date se trouvant entre la date de but et de fin chosie
    });
        const docDefinition = { // definition du doccument
          content: [
            { text: 'HSITORIQUE DES DONNEES DE LA SERRE ', style: 'header' }, //texte d'entete
            {
              table: {
                headerRows: 1,
                widths: ['*', '*','*', '*','*', '*'], // nombre de colone
                body: [ //le corps du document
                  [
                    { text: 'Date', style: 'tableHeader', fillColor: '#91D333' },// titre de chaque colone
                    { text: 'Heure', style: 'tableHeader', fillColor: '#91D333' },
                    { text: 'Temperature(°c)', style: 'tableHeader', fillColor: '#91D333' },
                    { text: 'Humidite(%)', style: 'tableHeader', fillColor: '#91D333' },
                    { text: 'Humidite sol(%)', style: 'tableHeader', fillColor: '#91D333' },
                    { text: 'Luminosite(lux)', style: 'tableHeader', fillColor: '#91D333' }
                  ],

                 // ['Date', 'heure', 'Temperature(°c)', 'Humidite(%)', 'humidite sol(%)', 'luminosite(lux)'],
                  ...filteredData.map((item: any) =>  [item.date, item.heure, item.temperature, item.humidite, item.humidite_sol, item.lumiere])
                ]
              },
              style: 'data'
            }
          ],
          styles: {
            header: { fontSize: 18, bold: true },// style du heder
            data: { fontSize: 11 },// style des donnees
            tableHeader: { bold: true, fontSize: 11, color: 'white' } // style de l'entete des colone
          }
        };
        pdfMake.createPdf(docDefinition).download(); // on apel la fonction en lui passant le document a telecharger
      });
    }



  ngOnInit(){
   this.RealtimeService.gethisto().subscribe((data:any) => {
   // console.log(data);
    this.filter_entree=data as unknown as Historique[]
    this.restaure=data as unknown as Historique[]
   // console.log(this.filter_entree);
console.log(this.endDate);
   })
    /* console.log(this.filter_entree) */

  }

//recherche par calendrier

calend(e:any) {
  const search = new Date(e.target.value)
 // console.log(e.target.value)
  if (e.target.value == '') { // pour vider la recherche et restaurer la liste
    this.filter_entree = this.restaure as unknown as Historique[]
    return
  }


  this.filter_entree = this.filter_entree.filter((el:any) => { // pour filtrer la recherche
    const date = new Date(el.date)

    //console.log(date.getFullYear(), search.getFullYear(), search.getMonth(), search.getDate())

    return date.getFullYear() === search.getFullYear() && date.getMonth() === search.getMonth() && date.getDate() === search.getDate();
  })


}


}













