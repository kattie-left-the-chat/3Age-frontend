import { Stack } from "expo-router";
import { globalColors } from "@/styles/global";

export default function RootLayout() {
    return ( 
        <Stack screenOptions={{ headerShown: false }} >
            <Stack.Screen name ="(tabs)" />
            <Stack.Screen name="patient/[id]" />
        </Stack>
    );
}