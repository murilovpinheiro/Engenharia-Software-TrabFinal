import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center'
  },
  viewTimer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnTimer: {
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 30,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00132A',
    paddingVertical: 16,
    paddingHorizontal: 24,

    innerHeight: '100%'
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  }
});

export default styles;
