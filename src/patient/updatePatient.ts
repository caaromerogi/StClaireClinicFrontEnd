import { updatePatientDates } from "../actions/actions.js";
import { dateI } from "../interface/interfaces.js";

export function updatePatient(id:number){
    const divModelForm = document.querySelector('.modal-new-date') as HTMLDivElement;
    divModelForm.classList.add('display');

    const buttonClose = document.querySelector('#close-new-date') as HTMLButtonElement;
    buttonClose.addEventListener('click', closeForm); 

    const buttonSubmit = document.querySelector('#submit-new-date') as HTMLButtonElement;
    buttonSubmit.addEventListener('click', function(){submitNewDate(id)});
}

function closeForm(){
    location.reload();
    const divModelForm = document.querySelector('.modal-new-date') as HTMLDivElement;
    divModelForm.classList.remove('display');
}

function submitNewDate(id:number){
    const inputDate = document.querySelector('#new-date') as HTMLInputElement;
    if(validate(inputDate.value)){
        const newDate:dateI = {
            date:inputDate.value
        }
        updatePatientDates(id,newDate).then(response => console.log(response));
        alert('The new date was added succesfully')
        closeForm(); 
    }
    closeForm();
   


}

function validate(date:string){
    let status:boolean = true;
    if(!Date.parse(date)){
        alert('Bad date input');
        status = false;
    }
    return status;
}