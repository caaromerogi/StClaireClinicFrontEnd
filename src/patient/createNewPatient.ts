import { createPatient, getMedicalSpecialtyById } from "../actions/actions.js";
import { patientI } from "../interface/interfaces.js";

//Validate that patient doesn't exist already
export function createNewPatient(id:number){
    console.log('id desde funcion'+id);
    const divModelForm = document.querySelector('.modal-new-patient') as HTMLDivElement;
    divModelForm.classList.add('display');

    const buttonClose = document.querySelector('#close-new-patient') as HTMLButtonElement;
    buttonClose.addEventListener('click', closeForm); 

    const buttonSubmit = document.querySelector('#submit-new-patient') as HTMLButtonElement;
    buttonSubmit.addEventListener('click', function(){submitNewPatient(id)});
    
}

function closeForm(){
    const divModelForm = document.querySelector('.modal-new-patient') as HTMLDivElement;
    divModelForm.classList.remove('display');
    location.reload();
}

function submitNewPatient(id:number){
    const inputName = document.querySelector('#new-patient-name') as HTMLInputElement;
    const inputDNI = document.querySelector('#new-patient-dni') as HTMLInputElement;
    const inputAge = document.querySelector('#new-patient-age') as HTMLInputElement;
    const inputDate = document.querySelector('#new-patient-date') as HTMLInputElement;

    if(validation(inputName.value, inputAge.value, inputDNI.value, id)){
        const newPatient:patientI ={
            id:null,
            name: inputName.value,
            dni: Number(inputDNI.value),
            age: String(inputAge.value),
            date: String(inputDate.value),
            numberOfAppointments:1,
            dates: []
        }
        createPatient(id, newPatient).then(response => console.log(response));
        closeForm();

        
    }
}

function validation(name:string, inputAge:string, inputDNI:string, idSpecialty:number){
    let state:boolean = true;

    if(isNaN(Number(inputAge))){
        alert('Age only admits number characters');
        state = false;
    }

    if(Number(inputAge)<1){
        alert('Age cannot be zero or less');
        state = false;
    }

    if(isNaN(Number(inputDNI))){
        alert('DNI only admits number characters')
    }

    if(name.length<10){
        alert('Name must have at least 10 characters');
        state=false;
    }
    if(name.length>45){
        alert('Name must have maximun 45 characters');
    }

    getMedicalSpecialtyById(idSpecialty).then(medicalSpecialty => {
        medicalSpecialty.patients.forEach(patient =>{
            if(patient.dni ===Number(inputDNI)){
                alert('The patient dni already exists, ask for a new date in Patients section')
                state=false;
                closeForm();
            }
        })
    })

    return state;
}

