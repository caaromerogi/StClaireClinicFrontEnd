import { deletePatient } from "../actions/actions.js";
export function deletePatientInSpecialty(id) {
    deletePatient(id).then(response => {
        if (response.status === 200) {
            const patient = document.querySelector(`#patient-${id}`);
            patient.remove();
        }
        else {
            alert('There was an error, reload and try again');
        }
    });
}
