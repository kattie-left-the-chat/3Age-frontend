import { ScrollView, Text } from "react-native";
import { globalStyles } from "@/styles/global";

export default function AddPatientScreen() {
    return (
        <ScrollView style={globalStyles.container}>
            <Text style={globalStyles.title}>Add</Text>
        </ScrollView>
   );
}