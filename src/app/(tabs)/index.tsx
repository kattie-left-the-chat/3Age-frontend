// import { registerRootComponent } from 'expo';

// import App from './App';

// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
// registerRootComponent(App);

import HomeHeader from '@/components/HomeHeader';
import { Text, ScrollView } from 'react-native';
import { globalStyles } from '@/styles/global';
import PatientsList from '@/components/PatientsList';
import { usePatientsContext } from '@/context/PatientsContext';

export default function HomeScreen() {

  const { patients: todos, error, loading } = usePatientsContext();
    
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Welcome to 3Age</Text>
      <HomeHeader />
      <PatientsList patients={todos} recentN={2} error={error} loading={loading} /> 
    </ScrollView>
  );
}