import { getPatientById, Patient } from "@/services/api";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { globalColors, globalStyles } from '@/styles/global';

export default function PatientDetails() {

    const { id } = useLocalSearchParams< { id: string }>();

    const [patient, setPatient] = useState<Patient | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPatient()
    }, []);
    
    async function fetchPatient() {
        try {
            console.log(`fetching data for id: ${id}`);
            const data = await getPatientById(Number(id));
            setPatient(data)
        } catch(err) {
            setError( err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

     return (
        <View style={globalStyles.container}>

            <Pressable 
                onPress={() => {
                    if (router.canGoBack()) {
                        router.back();
                    } else {
                        router.replace("/(tabs)/patients");
                    }
                }}
            >
                <Text style={styles.backButton}>← Back</Text>
            </Pressable>

            {loading && <ActivityIndicator size="large" />}
            
            {error && <Text>{error}</Text>}

            {patient ? (
                <>
                <Text style={globalStyles.title}>{patient.name}</Text>
                <Text style={globalStyles.textSecondary}>Patient ID: {patient.id}</Text>
                <Text style={globalStyles.textSecondary}>{patient.sex} {patient.age}</Text>
                <Text style={globalStyles.textSecondary}>Diagnosis: {patient.diagnosis}</Text>
                </>
            ) : (
                <Text>Patient not found.</Text>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  backButton: {
        fontSize: 18,
        color: "blue",
        marginBottom: 12,
    }
});