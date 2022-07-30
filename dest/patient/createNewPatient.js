import { createPatient, getMedicalSpecialtyById } from "../actions/actions.js";
//Validate that patient doesn't exist already
export function createNewPatient(id) {
    const divModelForm = document.querySelector('.modal-new-patient');
    divModelForm.classList.add('display');
    const buttonClose = document.querySelector('#close-new-patient');
    buttonClose.addEventListener('click', closeForm);
    const buttonSubmit = document.querySelector('#submit-new-patient');
    buttonSubmit.addEventListener('click', function () { submitNewPatient(id); });
}
function closeForm() {
    location.reload();
}
function submitNewPatient(id) {
    const inputName = document.querySelector('#new-patient-name');
    const inputDNI = document.querySelector('#new-patient-dni');
    const inputAge = document.querySelector('#new-patient-age');
    const inputDate = document.querySelector('#new-patient-date');
    if (validation(inputName.value, inputAge.value, inputDNI.value, inputDate.value) && dniValid(id, inputDNI.value)) {
        const newPatient = {
            id: null,
            name: inputName.value,
            dni: Number(inputDNI.value),
            age: String(inputAge.value),
            date: String(inputDate.value),
            numberOfAppointments: 0,
            dates: []
        };
        createPatient(id, newPatient).then(response => console.log(response));
        closeForm();
    }
}
function validation(name, inputAge, inputDNI, inputDate) {
    let state = true;
    if (isNaN(Number(inputAge))) {
        alert('Age only admits number characters');
        state = false;
    }
    if (Number(inputAge) < 1) {
        alert('Age cannot be zero or less');
        state = false;
    }
    if (isNaN(Number(inputDNI))) {
        alert('DNI only admits number characters');
        state = false;
    }
    if (name.length < 10) {
        alert('Name must have at least 10 characters');
        state = false;
    }
    if (name.length > 45) {
        alert('Name must have maximun 45 characters');
        state = false;
    }
    if (!Date.parse(inputDate)) {
        alert('Bad date field');
        state = false;
    }
    return state;
}
function dniValid(id, inputDNI) {
    let state = true;
    getMedicalSpecialtyById(id).then(medicalSpecialty => {
        medicalSpecialty.patients.forEach(patient => {
            console.log(patient.dni);
            if (patient.dni === Number(inputDNI)) {
                alert('The dni already exists, please add a new date in Patients section');
            }
        });
    });
    return state;
}
