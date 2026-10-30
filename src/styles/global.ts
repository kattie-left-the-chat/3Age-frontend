import { StyleSheet } from 'react-native';

export const globalColors = {
  background: '#1a1a2e',
  header: '#242444',
  surface: '#2a2a4a',
  primary: '#4fc3f7',
  text: '#ffffff',
  secondary: '#a0a0b0',
  alert: '#ff5252',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: globalColors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: globalColors.secondary,
    marginTop: 30,
    marginBottom: 16,
  },
  empty: {
    color: globalColors.secondary,
    fontSize: 14,
  },
  textSecondary: {
    fontSize: 14,
    color: globalColors.secondary
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});