import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Patient, Priority } from "../services/api";
import { globalStyles } from '@/styles/global';

type PatientItemProps = Patient & {
    onPress?: () => void;
};

export default function PatientItem({
    id,
    createdAt,
    name,
    sex,
    age,
    diagnosis,
    priority,
    onPress
}: PatientItemProps) {

    function borderColor(priority: Priority | null): string {
        switch(priority) {
            case 1:
                return 'red';
            case 2:
                return 'yellow';
            case 3:
                return 'green';
            case 4:
                return 'black';
            default:
                return 'grey';
        }
    }

    const color = borderColor(priority);

    const displayName = name?.trim() ? name : "Unknown";
    const displayAgeSex =
    age && sex
        ? `${age} ${sex}`
        : age
        ? String(age)
        : sex
        ? sex
        : '-';

    const displayDiagnosis = diagnosis?.trim() ? diagnosis : '-';

    const cardContent = (
        <>
            <Text style={globalStyles.textSecondary}>{id}, {new Date(createdAt).toLocaleString()}</Text>
            <Text style={styles.value}>{displayName}</Text>
            <Text style={styles.goal}>{displayAgeSex}</Text>
            <Text style={styles.goal}>{displayDiagnosis}</Text>
        </>
    )

    if(onPress) {
        return (
            <Pressable
                style={[styles.card, {borderLeftColor: color}]}
                onPress={onPress}
            >
                {cardContent}
            </Pressable>
        );
    }

    return (
        <View
            style={[styles.card, {borderLeftColor: color}]}
        >
            {cardContent}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#16213e',
        borderRadius: 12,
        padding: 16,
        borderLeftWidth: 4
    },
    value: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: 4
    },
    goal: {
        fontSize: 14,
        color: '#a0a0b0',
        marginTop: 2
    }
})