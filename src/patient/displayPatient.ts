import { getMedicalSpecialtyById } from "../actions/actions.js";
import { medicalSpecialtyI, patientI } from "../interface/interfaces.js";
import { deletePatientInSpecialty } from "./deletePatient.js";

export function displayPatientsInSpecialty(id:number){
    getMedicalSpecialtyById(id).then(medical => generatePatientsModel(medical));
}

function generatePatientsModel(medicalSpecialty:medicalSpecialtyI){
    const patients:patientI[] = medicalSpecialty.patients;
    generatePatientInterface(patients);
}

function generatePatientInterface(patients:patientI[]){
    const divModalPatient = document.querySelector('.modal-patient') as HTMLDivElement;
    divModalPatient.classList.add('display');
    const divModalContainerPatient:HTMLDivElement = document.createElement('div');
    divModalContainerPatient.classList.add('modal-container-patient');
    const divModalContainerBackPatient:HTMLDivElement = document.createElement('div');
    divModalContainerBackPatient.classList.add('modal-container-back-patient');

    const divHeaderContainer:HTMLDivElement = document.createElement('div');
    divHeaderContainer.className = 'patient-header-container';

    const divBodyContainer:HTMLDivElement = document.createElement('div');
    divBodyContainer.className = 'patient-body-container'
    
    const buttonAddPatient:HTMLButtonElement = document.createElement('button');
    buttonAddPatient.innerText = 'Create New Patient';
    buttonAddPatient.className = 'button';
    buttonAddPatient.onclick = createNewPatient;
    divHeaderContainer.append(buttonAddPatient);
    
    const buttonClose:HTMLButtonElement = document.createElement('button');
    buttonClose.innerText = "X";
    buttonClose.className = 'button';
    buttonClose.classList.add('button-close-patients');
    buttonClose.onclick = closePatient;
    divHeaderContainer.append(buttonClose);


    patients.forEach(patient => {
        const divPatient:HTMLDivElement = document.createElement('div');
        divPatient.id = `patient-${patient.id}`
        divPatient.className = 'patient-card'
        const divDate:HTMLDivElement = document.createElement('div');
        const headName:HTMLHeadElement = document.createElement('h2');
       headName.innerText = "Name: "+ patient.name;
       
       const headDNI:HTMLHeadElement = document.createElement('h2');
       headDNI.innerText = "DNI: "+ patient.dni;

       const headAge:HTMLHeadElement = document.createElement('h2');
       headAge.innerText = "Age: "+ patient.age;

       const headNumberOfAppointments:HTMLHeadElement = document.createElement('h2');
       headNumberOfAppointments.innerText = "Number of appointments: "+patient.numberOfAppointments;
       
       const headDates:HTMLHeadElement = document.createElement('h2');
       headDates.innerText = "Dates:";

       patient.dates.forEach(date =>{
        const headDate:HTMLHeadElement = document.createElement('h3');
        headDate.innerText = date.date;
        divDate.append(headDate);
       })

       const deleteButton:HTMLButtonElement = document.createElement('button');
       deleteButton.id = `patient-${patient.id}`
       deleteButton.className='button';
       deleteButton.innerText  = 'X';
       deleteButton.onclick = deletePatient;

       function deletePatient(){
        const id:number = Number(deleteButton.getAttribute('id')?.split('-')[1]);
            deletePatientInSpecialty(id).then(response => {
                if(response.status ===200){
                    console.log('Hola')
                    const patient = document.querySelector(`#patient-${id}`) as HTMLDivElement
                    console.log(patient);
                    patient.remove();

                }
            })
            
        }

       divPatient.append(headName, headDNI, headAge, divDate, deleteButton);
       divBodyContainer.append(divPatient);
    })

    
    divModalContainerBackPatient.append(divHeaderContainer, divBodyContainer)
    divModalContainerPatient.append(divModalContainerBackPatient);
    divModalPatient.append(divModalContainerPatient);

    function closePatient(){
        divModalContainerPatient.remove();
        divModalPatient.classList.remove('display');
    }

    function createNewPatient(){
        
    }

    

}