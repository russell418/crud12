//declaration de tout mes inputs
const nom=document.querySelector('#nom');
const prenom=document.querySelector('#prenom');
const status=document.querySelector('#status');
const poste=document.querySelector('#poste');
const phone=document.querySelector('#phone');
const email=document.querySelector('#email');
const pays=document.querySelector('#pays');
const identifiant=document.querySelector('#identifiant')
const save=document.querySelector('#save');
const update=document.querySelector('#update');
 // declaration des span de la gestion des erreurs
 
const errornom=document.querySelector('#errornom');
const errorprenom=document.querySelector('#errorprenom');
const errorphone=document.querySelector('#errorphone');
const erroremail=document.querySelector('#erroremail');
const errorid= document.querySelector("#errorid");

//declaration de mon tableau ID
const maTabledesId=[];
let id;
let tbody=document.querySelector("tbody"); 

 // operation de recuperation id d'une manière aleatoire
do{
  id =  Math.floor(Math.random() * Math.floor(10));
} while(maTabledesId.includes(id));
maTabledesId.push(id);

 //déclaration de mon tableau
var employer=[
  {
  id:id,  
  nom:"fakula",
  prenom:"nancy",
  email:"nancyfakula@gmail.com",
  poste:"directeur generale",
  numeroTelephone:"+243810951614",
  estMarie: "true",
  pays:"RDC"
}
]

// appel de la fonction affichage
afficherTable(employer);

//fonction pour vider mes champs 
 function ClearTable(){
  tbody.textContent="";
  errornom.textContent="";
  errorprenom.textContent="";
  erroremail.textContent="";
  errorphone.textContent="";
  update.style.display="none";
}

 //fonction d'initialization des inputs
function initializeInput(){
  nom.value="";
  prenom.value="";
  statut.value="";
  poste.value="";
  phone.value="";
  email.value="";
  pays.value="";
}
//fonction d'affichage et de la création de mon tableau
/**
 * 
 * @param {*}employers
 * @returns {void}
 */
function afficherTable(employers){
  identifiant.style.display='none';  
  ClearTable();
  for(let employer of employers){
 let tr= document.createElement("tr");
 tr.setAttribute("id",employer.id);   
 let tdNom=document.createElement("td");
 tdNom.textContent=employer.nom;
 let tdPrenom=document.createElement("td");
 tdPrenom.textContent=employer.prenom;
 let tdStatus=document.createElement("td");
 tdStatus.textContent=employer.status;
 let tdPoste=document.createElement("td");
 tdPoste.textContent=employer.poste;
 let tdTelephone=document.createElement("td");
 tdTelephone.textContent=employer.telephone;
 let tdEmail=document.createElement("td");
 tdEmail.textContent=employer.email;
 let tdPays=document.createElement("td");
 tdPays.textContent=employer.pays;

 let buttonmodifier=document.createElement("button");
 buttonmodifier.setAttribute("type","button");
 buttonmodifier.setAttribute("class","btn btn-primary");
 buttonmodifier.setAttribute("data-target",employer.id);
 buttonmodifier.addEventListener('click',onUpdate);
 buttonmodifier.textContent="modifier";
 let tdModifier=document.createElement("td").appendChild(buttonmodifier);
 
 let buttondelete=document.createElement("button");
 buttondelete.setAttribute("type","button");
 buttondelete.setAttribute("class","btn btn-danger");
 buttondelete.setAttribute("data-target",employer.id);
 buttondelete.setAttribute("id",employer.id);
 buttondelete.textContent="supprimer";
 buttondelete.addEventListener('click',(e)=>{
 const message=confirm("etes-vous sure de vouloir supprimer");
     if(message){
  const tr=document.getElementById(e.target.attributes.id.nodeValue);
  tr.parentNode.removeChild(tr); 
     }else{
         return;
     }
 })
 
 let tdDelete=document.createElement("td").appendChild(buttondelete);
 tr.appendChild(tdNom);
 tr.appendChild(tdPrenom);
 tr.appendChild(tdStatus);
 tr.appendChild(tdPoste);
 tr.appendChild(tdTelephone);
 tr.appendChild(tdEmail);
 tr.appendChild(tdPays);
 tr.appendChild(tdModifier);
 tr.appendChild(tdDelete);
 tbody.appendChild(tr);
  }
}
 //Enregistrement des objects
save.addEventListener('click',(e) => {

  if(!nom.value.length){
      errornom.textContent="ce champs ne doit pas etre vide";
   }
   if(!prenom.value.length){
      errorprenom.textContent="ce champs ne doit pas etre vide";
   }
   if(!email.value.length){
      erroremail.textContent="ce champs ne doit pas etre vide";
   }
   if(!phone.value.length){
      errorphone.textContent="ce champs ne doit pas etre vide";
   }
  else if(nom.value.length || prenom.value.length || email.value.length || phone.value.length){
    employer.push({
      id:id,  
      nom:nom.value,
      prenom:prenom.value,
      email:email.value,
      poste:poste.value,
      numeroTelephone:phone.value,
      estMarie: status.value,
      pays:pays.value
     });
 
 afficherTable(employer);
 initializeInput();
  }
 },false);

  /**
  * remplir mes inputs
  *  @param {e} 
  */
 function onUpdate(e){
  save.style.display="none";
  update.style.display="inherit";
  identifiant.style.display="inherit";

  let selechamp=employer.find(employers => employers.id == e.target.dataset.target);
  identifiant.value=selechamp.id;
  nom.value=selechamp.nom;
  prenom.value=selechamp.prenom,
  email.value=selechamp.email,
  poste.value=selechamp.poste,
  phone.value=selechamp.numeroTelephone,
  status.value=selechamp.estMarie,
  pays.value=selechamp.pays
}

 // modification des donnees ou mise à jour
  update.addEventListener('click',(e)=>{
      let index= employer.findIndex(employers => employers.id === identifiant.value);
       employer.splice(index,1,{
        id:id,  
        nom:nom.value,
        prenom:prenom.value,
        email:email.value,
        poste:poste.value,
        numeroTelephone:phone.value,
        estMarie: status.value,
        pays:pays.value
       })
       afficherTable(employer);
       update.style.display="none";
       save.style.display="inherit";
       initializeInput();
  })

