import { StyleSheet } from 'react-native';
import { colors } from './colors';
import flex from './flex';

// App Common Styles
export default StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.offWhiteV2,
    ...flex.flex,
  },
  relative: {
    position: 'relative'
  },
  absolute: {
    position: 'absolute'
  },

});
