import { deleteMedicalSpecialty } from "../actions/actions.js";
export function deleteSpecialty(id:number){
    deleteMedicalSpecialty(id)
    .then(response => {
        if(response.status === 200){
            const medicalSpecialty = document.querySelector(`.specialty-${id}`) as HTMLDivElement;
            medicalSpecialty.remove();
            location.reload();
        }else{
            alert('make sure you have delete all patient records');
        }
    })
}