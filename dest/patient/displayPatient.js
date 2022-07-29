import { getMedicalSpecialtyById } from "../actions/actions.js";
import { deletePatientInSpecialty } from "./deletePatient.js";
export function displayPatientsInSpecialty(id) {
    getMedicalSpecialtyById(id).then(medical => generatePatientsModel(medical));
}
function generatePatientsModel(medicalSpecialty) {
    const patients = medicalSpecialty.patients;
    generatePatientInterface(patients);
}
function generatePatientInterface(patients) {
    const divModalPatient = document.querySelector('.modal-patient');
    divModalPatient.classList.add('display');
    const divModalContainerPatient = document.createElement('div');
    divModalContainerPatient.classList.add('modal-container-patient');
    const divModalContainerBackPatient = document.createElement('div');
    divModalContainerBackPatient.classList.add('modal-container-back-patient');
    const divHeaderContainer = document.createElement('div');
    divHeaderContainer.className = 'patient-header-container';
    const divBodyContainer = document.createElement('div');
    divBodyContainer.className = 'patient-body-container';
    const buttonAddPatient = document.createElement('button');
    buttonAddPatient.innerText = 'Create New Patient';
    buttonAddPatient.className = 'button';
    buttonAddPatient.onclick = createNewPatient;
    divHeaderContainer.append(buttonAddPatient);
    const buttonClose = document.createElement('button');
    buttonClose.innerText = "X";
    buttonClose.className = 'button';
    buttonClose.classList.add('button-close-patients');
    buttonClose.onclick = closePatient;
    divHeaderContainer.append(buttonClose);
    patients.forEach(patient => {
        const divPatient = document.createElement('div');
        divPatient.id = `patient-${patient.id}`;
        divPatient.className = 'patient-card';
        const divDate = document.createElement('div');
        const headName = document.createElement('h2');
        headName.innerText = "Name: " + patient.name;
        const headDNI = document.createElement('h2');
        headDNI.innerText = "DNI: " + patient.dni;
        const headAge = document.createElement('h2');
        headAge.innerText = "Age: " + patient.age;
        const headNumberOfAppointments = document.createElement('h2');
        headNumberOfAppointments.innerText = "Number of appointments: " + patient.numberOfAppointments;
        const headDates = document.createElement('h2');
        headDates.innerText = "Dates:";
        patient.dates.forEach(date => {
            const headDate = document.createElement('h3');
            headDate.innerText = date.date;
            divDate.append(headDate);
        });
        const deleteButton = document.createElement('button');
        deleteButton.id = `patient-${patient.id}`;
        deleteButton.className = 'button';
        deleteButton.innerText = 'X';
        deleteButton.onclick = deletePatient;
        function deletePatient() {
            var _a;
            const id = Number((_a = deleteButton.getAttribute('id')) === null || _a === void 0 ? void 0 : _a.split('-')[1]);
            deletePatientInSpecialty(id).then(response => {
                if (response.status === 200) {
                    console.log('Hola');
                    const patient = document.querySelector(`#patient-${id}`);
                    console.log(patient);
                    patient.remove();
                }
            });
        }
        divPatient.append(headName, headDNI, headAge, divDate, deleteButton);
        divBodyContainer.append(divPatient);
    });
    divModalContainerBackPatient.append(divHeaderContainer, divBodyContainer);
    divModalContainerPatient.append(divModalContainerBackPatient);
    divModalPatient.append(divModalContainerPatient);
    function closePatient() {
        divModalContainerPatient.remove();
        divModalPatient.classList.remove('display');
    }
    function createNewPatient() {
    }
}
