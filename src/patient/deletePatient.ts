import { deletePatient } from "../actions/actions.js";
export function deletePatientInSpecialty(id:number){
    deletePatient(id).then(response => {
        if(response.status ===200){
            const patient = document.querySelector(`#patient-${id}`) as HTMLDivElement
            patient.remove();
        }else{
            alert('There was an error, reload and try again');
        }
    })   
}