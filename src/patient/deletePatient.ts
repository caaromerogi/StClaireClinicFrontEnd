import { deletePatient } from "../actions/actions.js";
export function deletePatientInSpecialty(id:number){
    return deletePatient(id);
}