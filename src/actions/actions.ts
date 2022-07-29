import { medicalSpecialtyI } from "../interface/interfaces.js";

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