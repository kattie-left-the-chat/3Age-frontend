import { StyleSheet, View, Text } from 'react-native';
import { globalColors, globalStyles } from '@/styles/global';

export default function HomeHeader() {
    const currentDate = new Date().toLocaleDateString
    ('cs-CZ', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    return (
        <View style={globalStyles.header}>
            <Text style={styles.date}>{currentDate}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    date: {
        fontSize: 14,
        color: globalColors.secondary,
        marginTop: 4,
        marginBottom: 30
    }
});