import { getAllMedicalSpecialties } from "../actions/actions.js"
import { medicalSpecialtyI, patientI, dateI } from "../interface/interfaces.js";
import { displayPatientsInSpecialty } from "../patient/displayPatient.js";
import { createNewPatient } from "../patient/createNewPatient.js";
import { deleteSpecialty } from "./deleteSpecialty.js";
import { updateSpecialty } from "./updateSpecialty.js";

export function getSpecialties(){
    getAllMedicalSpecialties().then(medicalSpecialties =>{
        recreateMedicalSpecialties(medicalSpecialties);
    })
}

function recreateMedicalSpecialties(medicalSpecialties:medicalSpecialtyI[]){
    medicalSpecialties.forEach(medicalSpecialty => createMedicalSpecialty(medicalSpecialty));
}

function createMedicalSpecialty(medicalSpecialty:medicalSpecialtyI){
    const specialtiesContainer = document.querySelector('.specialties-container') as HTMLDivElement;

    const specialtyContainer:HTMLDivElement = document.createElement('div');
    specialtyContainer.className = 'specialty-container';
    specialtyContainer.classList.add(`specialty-${medicalSpecialty.id}`);

    const header:HTMLDivElement = document.createElement('div');
    header.className = 'title';
    header.classList.add(`${medicalSpecialty.id}`);

    const specialty:HTMLHeadElement = document.createElement('h2');
    specialty.className = `medical-specialty-title-${medicalSpecialty.id}`;
    specialty.innerText = medicalSpecialty.name;

    const physicianInCharge:HTMLHeadElement = document.createElement('h3');
    physicianInCharge.className = `physician-${medicalSpecialty.id}`;
    physicianInCharge.innerText = "Dr. " + medicalSpecialty.physicianInCharge;

    const buttons:HTMLDivElement = document.createElement('div');
    buttons.className = `buttons`

    const buttonDelete:HTMLButtonElement = document.createElement('button');
    buttonDelete.className=`button`;
    buttonDelete.classList.add(`button-delete-${medicalSpecialty.id}`);
    buttonDelete.innerText = "Delete"
    buttonDelete.onclick= deleteMedicalSpecialty;

    const buttonUpdate:HTMLButtonElement = document.createElement('button');
    buttonUpdate.className=`button`;
    buttonUpdate.classList.add(`button-update-${medicalSpecialty.id}`);
    buttonUpdate.innerText = "Update"
    buttonUpdate.onclick= updateMedicalSpecialty;

    const buttonPatients:HTMLButtonElement = document.createElement('button');
    buttonPatients.className=`button`;
    buttonPatients.id = `patient-${medicalSpecialty.id}`;
    buttonPatients.classList.add(`button-patients-${medicalSpecialty.id}`);
    buttonPatients.innerText = "Patients"
    buttonPatients.onclick= showPatients;


    const buttonAddPatient:HTMLButtonElement = document.createElement('button');
    buttonAddPatient.innerText = 'Create New Patient';
    buttonAddPatient.className = 'button';
    buttonAddPatient.onclick = createPatient;
    
    header.append(specialty,physicianInCharge);
    buttons.append(buttonDelete, buttonUpdate, buttonPatients, buttonAddPatient);
    specialtyContainer.append(header, buttons);
    specialtiesContainer.append(specialtyContainer);

    function showPatients(){
        const id:number = Number(buttonPatients.getAttribute('id')?.split('-')[1]);
        displayPatientsInSpecialty(id)
    }

    function createPatient(){
        const id:number = Number(buttonPatients.getAttribute('id')?.split('-')[1]);
        createNewPatient(id)
    }

    function deleteMedicalSpecialty(){
        const id:number = Number(buttonDelete.getAttribute('class')?.split('-')[2]);
        deleteSpecialty(id);
    }

    function updateMedicalSpecialty(){
        const id:number = Number(buttonUpdate.getAttribute('class')?.split('-')[2]);
        updateSpecialty(id);
        
    }

}

