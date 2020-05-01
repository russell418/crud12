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

 //declaration des span de la gestion des erreurs
const errornom=document.querySelector('#errornom');
const errorprenom=document.querySelector('#errorprenom');
const errorphone=document.querySelector('#errorphone');
const erroremail=document.querySelector('#erroremail');
const errorid= document.querySelector("#errorid");

 //je declare et je fais appel de mon tableau
let tbody=document.querySelector("tbody"); 

// appel de la fonction affichagetable 
afficherTable();

  //  fonction pour vider mes champs ainsi que ma table en fin d'eviter la reetion
 function ClearTable(){
  tbody.textContent="";
  errornom.textContent="";
  errorprenom.textContent="";
  erroremail.textContent="";
  errorphone.textContent="";
  update.style.display="none";
}
  
 // fonction d'initialization des inputs
function initializeInput(){
  nom.value="";
  prenom.value="";
  status.value="";
  poste.value="";
  phone.value="";
  email.value="";
  pays.value=""
  
}

// fonction d'affichage et de la création de mon tableau
/**
 * @param {*}employers
 * @returns {void}
 */
function afficherTable(){
  identifiant.style.display='none';  
  ClearTable();

  axios.get('http://167.71.45.243:4000/api/employes?api_key=itgmifv')
.then((employers)=>{
  for(let employer of employers.data){
    let tr= document.createElement("tr");
    tr.setAttribute("id",employer.id);   
    let tdNom=document.createElement("td");
    tdNom.textContent=employer.nom;
    let tdPrenom=document.createElement("td");
    tdPrenom.textContent=employer.prenom;
    let tdStatus=document.createElement("td");
    tdStatus.textContent=employer.estMarie;
    let tdPoste=document.createElement("td");
    tdPoste.textContent=employer.poste;
    let tdTelephone=document.createElement("td");
    tdTelephone.textContent=employer.numeroTelephone;
    let tdEmail=document.createElement("td");
    tdEmail.textContent=employer.email;
    let tdPays=document.createElement("td");
    tdPays.textContent=employer.pays;
   
    let buttonmodifier=document.createElement("button");
    buttonmodifier.setAttribute("type","button");
    buttonmodifier.setAttribute("class","btn btn-primary");
    buttonmodifier.setAttribute("data-target",employer._id);
    buttonmodifier.addEventListener('click',onUpdate);
    buttonmodifier.textContent="modifier";
    let tdModifier=document.createElement("td").appendChild(buttonmodifier);
    
    let buttondelete=document.createElement("button");
    buttondelete.setAttribute("type","button");
    buttondelete.setAttribute("class","btn btn-danger");
    buttondelete.setAttribute("data-target",employer._id);
    buttondelete.setAttribute("id",employer._id);
    buttondelete.textContent="supprimer";
    buttondelete.addEventListener('click',(e)=>{
    const message=confirm("etes-vous sure de vouloir supprimer");
        if(message){
          axios.delete(`http://167.71.45.243:4000/api/employes/${employer._id}?api_key=itgmifv`)
                .then(function(reponse){
                    afficherTable();
                }).catch(function(erreur){
                    console.log(erreur.response)
                }) 
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

})
}

 // Enregistrement des objects
 
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
     axios.post('http://167.71.45.243:4000/api/employes?api_key=itgmifv',{
      nom:nom.value,
      prenom:prenom.value,
      email:email.value,
      poste:poste.value,
      numeroTelephone:phone.value,
      estMarie: status.value,
      pays:pays.value
     })
      .then((response)=>{
          afficherTable();
          console.log(response);
      }).catch((err)=>{
          console.log(err.response.data)
      })
 initializeInput();
  }
 },false);

  /**
  * remplir mes inputs
   @param {e} 
  */
 function onUpdate(e){
  let ids=e.target.dataset.target;
  axios.get(`http://167.71.45.243:4000/api/employes/${ids}?api_key=itgmifv`)
        .then(function(response){
          save.style.display="none";
          update.style.display="inherit";
          identifiant.style.display="inherit";

          identifiant.value=response.data._id;
          nom.value=response.data.nom;
          prenom.value=response.data.prenom,
          email.value=response.data.email,
          poste.value=response.data.poste,
          phone.value=response.data.numeroTelephone,
          status.value=response.data.estMarie,
          pays.value=response.data.pays
console.log(response.data)

        }).catch((error)=>{
          console.log(error);  
        })
}
// modification des donnees

  update.addEventListener('click',(e)=>{
       let ids=identifiant.value;
       axios.put(`http://167.71.45.243:4000/api/employes/${ids}?api_key=itgmifv`, {
        nom:nom.value,
        prenom:prenom.value,
        email:email.value,
        poste:poste.value,
        numeroTelephone:phone.value,
        estMarie: status.value,
        pays:pays.value
      }).then(response => {
        console.log(response.data);
        afficherTable();  
        manipulateurForm.hideOverlay();
      }).catch(error => {
          console.log(error);
      });
       update.style.display="none";
       save.style.display="inherit";
       initializeInput();
  })

