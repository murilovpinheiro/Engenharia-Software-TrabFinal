import React from 'react';
import {
  Text,
  View,
  Dimensions
} from 'react-native';
import { PieChart } from 'react-native-svg-charts'

 class ExerciseChart extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      selectedSlice: {
        label: '',
        value: 0
      },
      labelWidth: 0
    }
  }
  render() {
    const { labelWidth, selectedSlice } = this.state;
    const { label, value } = selectedSlice;
    const keys = ['google', 'facebook', 'linkedin', 'youtube', 'Twitter'];
    const values = [15, 25, 35, 45, 55];
    const colors = ['#600080', '#9900cc', '#c61aff', '#d966ff', '#ecb3ff']
    const data = keys.map((key, index) => {
        return {
          key,
          value: values[index],
          svg: { fill: colors[index] },
          arc: { outerRadius: (70 + values[index]) + '%', padAngle: label === key ? 0.1 : 0 },
          onPress: () => this.setState({ selectedSlice: { label: key, value: values[index] } })
        }
      })
    const deviceWidth = Dimensions.get('window').width

    return (
      <View style={{ justifyContent: 'center', height: '100%'}}>
        <PieChart
          style={{ flex: 1 }}
          outerRadius={'80%'}
          innerRadius={'45%'}
          data={data}
        />
        <Text
          onLayout={({ nativeEvent: { layout: { width } } }) => {
            this.setState({ labelWidth: width });
          }}
          style={{
            //flex: 1,
            //borderWidth: 4, borderColor: 'red',
            width: '100%',
            position: 'absolute',
            
            //left: deviceWidth / 2 - labelWidth / 2,
            textAlign: 'center',
            //width: '100%'
            fontFamily: 'Lexend', fontSize: 20, color: 'white'
          }}>
          {`${label} \n ${value}`}
        </Text>
      </View>
    )
  }
}

export default ExerciseChart;