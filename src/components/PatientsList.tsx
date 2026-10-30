import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { router } from "expo-router"
import PatientItem from "./PatientItem";
import { Patient } from "../services/api";

type RecentPatientProps  = {
  patients: Patient[];
  recentN?: number;
  error: string | null;
  loading: boolean;
};

export default function PatientsList({
    patients,
    recentN,
    error,
    loading
}: RecentPatientProps) {

    const patientsToDisplay = recentN !== undefined ? patients.slice(0, recentN) : patients;
    
    return (
        <View style={styles.grid}>
            {loading && <ActivityIndicator size="large" />}
            
            {error && <Text>{error}</Text>}

            {patientsToDisplay.map((patient) => (
                <PatientItem 
                    key={patient.id} {...patient}
                    onPress={() =>
                        router.push({
                            pathname: "/patient/[id]",
                            params: { id: String(patient.id) }
                        })
                    }
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'column',
        gap: 12
    }
})