import { getPatients, Patient } from '@/services/api';
import { createContext, useContext, useEffect, useState } from 'react';

type PatientsContextType = {
    patients: Patient[];
    loading: boolean;
    error: string | null;
};

const PatientsContext = createContext<PatientsContextType | undefined>(
    undefined
);

export function usePatientsContext() {
  const context = useContext(PatientsContext);

  if (!context) {
    throw new Error('usePatientsContext must be used within a PatientsProvider');
  }

  return context;
}

export function PatientsProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPatients()
    }, []);

    async function fetchPatients() {
        try {
            console.log("fetching Patients from api.")
            const data = await getPatients();
            setPatients(data);
        } catch (err) {
            setError( err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
    <PatientsContext.Provider value={{ patients: patients, loading, error }}>
      {children}
    </PatientsContext.Provider>
  );
}