import React from "react"
import {Text, Component} from 'react-native'
import defaultStyles from "./style"

export default function MyTextRegular(props) {
    return (
        <Text {...props} style={[defaultStyles.textRegular, props.style]}>{props.children}</Text>
    );
}

// class MyTextRegular extends Component {
//     render() {
//       return (
//         <MyTextRegular>
//           <Text style={styles.text}>{this.props.children}</Text>
//         </MyTextRegular>
//       );
//     }
//   }

// export default props => <Text {...props} style={[defaultStyles.text, props.style]}>{props.children}</Text>
