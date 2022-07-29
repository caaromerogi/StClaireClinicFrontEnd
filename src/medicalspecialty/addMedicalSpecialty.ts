import { medicalSpecialtyI } from "../interface/interfaces.js";
import { postMedicalSpecialty } from "../actions/actions.js";

export function addMedicalSpecialty(){
    const addSpecialtyButton = document.querySelector('#create-medical-specialty') as HTMLButtonElement;
    addSpecialtyButton.addEventListener('click', openForm)
}

export function openForm(){
    const setModalWindow = document.querySelector('.modal-new-specialty') as HTMLDivElement;
    setModalWindow.classList.add(`display`);

    const submitButton = document.querySelector('#submit-new-specialty') as HTMLButtonElement;
    submitButton.addEventListener('click', submitNewSpecialty);

    const closeButton = document.querySelector('.close-button') as HTMLButtonElement;
    closeButton.addEventListener('click', closeForm);

}

function closeForm(){
    const setModalWindow = document.querySelector('.modal-new-specialty') as HTMLDivElement;
    setModalWindow.classList.remove(`display`);

}

function submitNewSpecialty(){

    const name = document.querySelector('#new-specialty-name') as HTMLInputElement;

    const physician = document.querySelector('#new-physician') as HTMLInputElement;
    
    if(validation(name.value, physician.value)){
        const newMedicalSpecialty:medicalSpecialtyI ={
            id:null,
            name: name.value,
            physicianInCharge:physician.value, 
            patients:[]
        }
        postMedicalSpecialty(newMedicalSpecialty)
        .then(response => console.log(response));
        location.reload();
    
        name.value = "";
        physician.value = "";
    
        closeForm();
        console.log(newMedicalSpecialty)
    }

    

}

function validation(name:string, physician:string){
    let state:boolean=true;

    if(name.length<5){
        alert('Name must have more than 5 char');
        state = false;
    }
    if(name.length>100){
        alert('Name must have less than 100 char');
        state = false;
    }
    if(physician.length<10){
        alert('Physician name must have more than 10 char');
        state=false;
    }
    if(physician.length>45){
        alert('Physician name must have less than 45 char');
        state=false;
    }

    return state;
}