import { getAllMedicalSpecialties } from "../actions/actions.js";
import { displayPatientsInSpecialty } from "../patient/displayPatient.js";
export function getSpecialties() {
    getAllMedicalSpecialties().then(medicalSpecialties => {
        recreateMedicalSpecialties(medicalSpecialties);
    });
}
function recreateMedicalSpecialties(medicalSpecialties) {
    medicalSpecialties.forEach(medicalSpecialty => createMedicalSpecialty(medicalSpecialty));
}
function createMedicalSpecialty(medicalSpecialty) {
    const specialtiesContainer = document.querySelector('.specialties-container');
    const specialtyContainer = document.createElement('div');
    specialtyContainer.className = 'specialty-container';
    specialtyContainer.classList.add(`specialty-${medicalSpecialty.id}`);
    const header = document.createElement('div');
    header.className = 'title';
    header.classList.add(`${medicalSpecialty.id}`);
    const specialty = document.createElement('h2');
    specialty.className = `medical-specialty-title-${medicalSpecialty.id}`;
    specialty.innerText = medicalSpecialty.name;
    const physicianInCharge = document.createElement('h3');
    physicianInCharge.className = `physician-${medicalSpecialty.id}`;
    physicianInCharge.innerText = "Dr. " + medicalSpecialty.physicianInCharge;
    const buttons = document.createElement('div');
    buttons.className = `buttons`;
    const buttonDelete = document.createElement('button');
    buttonDelete.className = `button`;
    buttonDelete.classList.add(`button-delete-${medicalSpecialty.id}`);
    buttonDelete.innerText = "Delete";
    const buttonUpdate = document.createElement('button');
    buttonUpdate.className = `button`;
    buttonUpdate.classList.add(`button-update-${medicalSpecialty.id}`);
    buttonUpdate.innerText = "Update";
    const buttonPatients = document.createElement('button');
    buttonPatients.className = `button`;
    buttonPatients.id = `patient-${medicalSpecialty.id}`;
    buttonPatients.classList.add(`button-patients-${medicalSpecialty.id}`);
    buttonPatients.innerText = "Patients";
    buttonPatients.onclick = showPatients;
    header.append(specialty, physicianInCharge);
    buttons.append(buttonDelete, buttonUpdate, buttonPatients);
    specialtyContainer.append(header, buttons);
    specialtiesContainer.append(specialtyContainer);
    function showPatients() {
        var _a;
        const id = Number((_a = buttonPatients.getAttribute('id')) === null || _a === void 0 ? void 0 : _a.split('-')[1]);
        console.log(id);
        displayPatientsInSpecialty(id);
    }
}
