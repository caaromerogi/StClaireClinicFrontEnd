import { createPatient, getMedicalSpecialtyById } from "../actions/actions.js";
import { medicalSpecialtyI, patientI } from "../interface/interfaces.js";

//Validate that patient doesn't exist already
export function createNewPatient(id:number){
    const divModelForm = document.querySelector('.modal-new-patient') as HTMLDivElement;
    divModelForm.classList.add('display');

    const buttonClose = document.querySelector('#close-new-patient') as HTMLButtonElement;
    buttonClose.addEventListener('click', closeForm); 

    const buttonSubmit = document.querySelector('#submit-new-patient') as HTMLButtonElement;
    buttonSubmit.addEventListener('click', function(){submitNewPatient(id)});
    
}

function closeForm(){
    location.reload();
}

function submitNewPatient(id:number){
    const inputName = document.querySelector('#new-patient-name') as HTMLInputElement;
    const inputDNI = document.querySelector('#new-patient-dni') as HTMLInputElement;
    const inputAge = document.querySelector('#new-patient-age') as HTMLInputElement;
    const inputDate = document.querySelector('#new-patient-date') as HTMLInputElement;

    

    if(validation(inputName.value, inputAge.value, inputDNI.value, inputDate.value)&&dniValid(id, inputDNI.value)){
        const newPatient:patientI ={
            id:null,
            name: inputName.value,
            dni: Number(inputDNI.value),
            age: String(inputAge.value),
            date: String(inputDate.value),
            numberOfAppointments:0,
            dates: []
        }
        createPatient(id, newPatient).then(response => console.log(response));

        
    }
}

function validation(name:string, inputAge:string, inputDNI:string,inputDate:string){
    let state:boolean =true;

    if(isNaN(Number(inputAge))){
        alert('Age only admits number characters');
        state = false;
    }

    if(Number(inputAge)<1){
        alert('Age cannot be zero or less');
        state = false;

    }

    if(isNaN(Number(inputDNI))){
        alert('DNI only admits number characters');
        state = false;
    }

    if(name.length<10){
        alert('Name must have at least 10 characters');
        state=false;
    }
    if(name.length>45){
        alert('Name must have maximun 45 characters');
        state =false;
    }
    if(!Date.parse(inputDate)){
        alert('Bad date field');
        state = false;
    }
    return state;
}

function dniValid(id:number,  inputDNI:string){
    let state:boolean = true;
    getMedicalSpecialtyById(id).then(medicalSpecialty => {
        medicalSpecialty.patients.forEach(patient =>{
            console.log(patient.dni);
            if(patient.dni === Number(inputDNI)){ 
                alert('The dni already exists, please add a new date in Patients section')             
            }
        })
    })

    return state;
}

