import { getMedicalSpecialtyById } from "../actions/actions.js";
export function displayPatientsInSpecialty(id) {
    getMedicalSpecialtyById(id).then(medical => generatePatientsModel(medical));
}
function generatePatientsModel(medicalSpecialty) {
    medicalSpecialty.patients;
}
