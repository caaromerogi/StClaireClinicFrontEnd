import { medicalSpecialtyUpdateI } from "../interface/interfaces.js";
import { updateMedicalSpecialty } from "../actions/actions.js";

export function updateSpecialty(id:number){
    const setModalWindow = document.querySelector('.modal-update-specialty') as HTMLDivElement;
    setModalWindow.classList.add(`display`);

    const submitButton = document.querySelector('#submit-update-specialty') as HTMLButtonElement;
    submitButton.addEventListener('click', function(){submitUpdatedSpecialty(id)});

    const closeButton = document.querySelector('.close-button') as HTMLButtonElement;
    closeButton.addEventListener('click', closeForm);

    const nameDefault = document.querySelector(`.medical-specialty-title-${id}`) as HTMLHeadElement;
    console.log(nameDefault.innerHTML);

    const nameSpecialty = document.querySelector('#update-specialty-name') as HTMLInputElement;
    nameSpecialty.value = nameDefault.innerHTML;


    const physicianDefault = document.querySelector(`.physician-${id}`) as HTMLInputElement;    

    const physician = document.querySelector('#update-physician') as HTMLInputElement;

    physician.value = physicianDefault.innerHTML;
}

function closeForm(){
    location.reload();
    const setModalWindow = document.querySelector('.modal-new-specialty') as HTMLDivElement;
    setModalWindow.classList.remove(`display`);
}

function submitUpdatedSpecialty(id:number){

    const name = document.querySelector('#update-specialty-name') as HTMLInputElement;

    const physician = document.querySelector('#update-physician') as HTMLInputElement;
    
    if(validation(name.value, physician.value)){
        const newMedicalSpecialty:medicalSpecialtyUpdateI ={
            name: name.value,
            physicianInCharge:physician.value
        }
        updateMedicalSpecialty(id, newMedicalSpecialty)
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