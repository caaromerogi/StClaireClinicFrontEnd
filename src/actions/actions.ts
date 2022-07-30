import { dateI, medicalSpecialtyI, medicalSpecialtyUpdateI, patientI } from "../interface/interfaces.js";

export async function getAllMedicalSpecialties(){
    const response:Response = await fetch('http://localhost:8080/api/');

    const data:medicalSpecialtyI[] = await response.json();

    return data;
}

export async function getMedicalSpecialtyById(id:number){
    const response:Response =await fetch(`http://localhost:8080/api/${id}`);

    const data:medicalSpecialtyI = await response.json();

    return data;
}

export async function postMedicalSpecialty(medicalSpecialty:medicalSpecialtyI){
    const response:Response = await fetch('http://localhost:8080/api/create/medical-specialty',
    {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(medicalSpecialty)
      }) 

    return response;
}

export async function deletePatient(id:number){
    const response:Response = await fetch(`http://localhost:8080/api/delete/patient/${id}`,
    {
        method: 'DELETE'
      });
    
      return response;

}

export async function createPatient(id:number, patient:patientI){
    const response:Response = await fetch(`http://localhost:8080/api/create/${id}/patient`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(patient)
    })
    return response;
}

export async function updatePatientDates(id:number, date:dateI){
    const response:Response = await fetch(`http://localhost:8080/api/update/patient/${id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(date)
    })
    return response;
}

export async function deleteMedicalSpecialty(id:number){
    const response:Response = await fetch(`http://localhost:8080/api/delete/${id}`,{
        method: 'DELETE'
    })
    return response
}

export async function updateMedicalSpecialty(id:number, medicalSpecialty:medicalSpecialtyUpdateI){
    const response:Response = await fetch(`http://localhost:8080/api/update/${id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(medicalSpecialty)
    })

    return response;
}