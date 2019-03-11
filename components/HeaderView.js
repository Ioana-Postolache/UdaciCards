import React from 'react'
import { Text } from 'react-native'
import { purple} from '../utils/colors'

export default function HeaderView ({ headerText }) {
  return (
    <Text style={{color:purple, fontSize: 30, padding: 30, textAlign: "center"}}>
      {headerText}
    </Text>
  )
}
