import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { globalColors } from '@/styles/global';
import { PatientsProvider } from '@/context/PatientsContext';

export default function TabLayout() {
    return (
        <PatientsProvider>
            <Tabs screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: globalColors.background,
                    borderTopColor: globalColors.surface
                },
                tabBarActiveTintColor: globalColors.primary,
                tabBarInactiveTintColor: globalColors.secondary
            }} 
            >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => ( <Ionicons name="home" color={color} size={size} /> )
                }} 
            />
            <Tabs.Screen
                name='add-patient'
                options={{
                    title: 'Add',
                    tabBarIcon: ({color, size}) => ( <Ionicons name="add-circle-outline" color={color} size={size} /> )
                }}
            />
            <Tabs.Screen
                name='patients' 
                options={{ 
                    title: 'All',
                    tabBarIcon: ({ color, size }) => ( <Ionicons name="list-outline" color={color} size={size} /> )
                }}
            />
            </Tabs>
        </PatientsProvider>
    )
}