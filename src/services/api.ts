const BASE_URL = `${process.env.EXPO_PUBLIC_API_URL}/patients`;

console.log("API URL:", process.env.EXPO_PUBLIC_API_URL);
console.log("BASE URL:", BASE_URL);

export type Patient = {
  id: number;
  createdAt: string;
  name: string | null;
  sex: Sex | null;
  age: number | null;
  diagnosis: string | null;
  priority: Priority | null;
};

export type Sex = "Male" | "Female";

export type Priority = 1 | 2 | 3 | 4;

export const getPatients = async () => {
    const response = await fetch(`${BASE_URL}?recentFirst=true`);
    
    if(!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const data: Patient[] = await response.json();

    return data;
}

export const getPatientById = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`);

    console.log(`${BASE_URL}/${id}`);
    
    if(!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const data: Patient = await response.json();

    return data;
}