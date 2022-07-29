import { getMedicalSpecialtyById } from "../actions/actions.js";
import { medicalSpecialtyI, patientI } from "../interface/interfaces.js";

export function displayPatientsInSpecialty(id:number){
    getMedicalSpecialtyById(id).then(medical => generatePatientsModel(medical));
}

function generatePatientsModel(medicalSpecialty:medicalSpecialtyI){
    medicalSpecialty.patients
}