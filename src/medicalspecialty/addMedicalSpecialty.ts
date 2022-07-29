import { medicalSpecialtyI } from "../interface/interfaces.js";
import { postMedicalSpecialty, getAllMedicalSpecialties } from "../actions/actions.js";

export function addMedicalSpecialty(){
    const addSpecialtyButton = document.querySelector('#create-medical-specialty') as HTMLButtonElement;
    addSpecialtyButton.addEventListener('click', openForm)
}

export function openForm(){
    const setModalWindow = document.querySelector('.modal') as HTMLDivElement;
    setModalWindow.classList.add(`display`);

    const submitButton = document.querySelector('#submit-new-specialty') as HTMLButtonElement;
    submitButton.addEventListener('click', submitNewSpecialty);

    const closeButton = document.querySelector('.close-button') as HTMLButtonElement;
    closeButton.addEventListener('click', closeForm);

}

function closeForm(){
    const setModalWindow = document.querySelector('.modal') as HTMLDivElement;
    setModalWindow.classList.remove(`display`);

}

function submitNewSpecialty(){

    const name = document.querySelector('#new-specialty-name') as HTMLInputElement;

    const physician = document.querySelector('#new-physician') as HTMLInputElement;
    
    const newMedicalSpecialty:medicalSpecialtyI ={
        id:null,
        name: name.value,
        physicianInCharge:physician.value, 
        patients:[]
    }
    postMedicalSpecialty(newMedicalSpecialty)
    .then(response => console.log(response));
    getAllMedicalSpecialties;

    name.value = "";
    physician.value = "";

    closeForm();
    console.log(newMedicalSpecialty)

}