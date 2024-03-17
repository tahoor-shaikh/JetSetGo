import {StyleSheet} from 'react-native';
import flex from './flex';
import margin from './margin';
import padding from './padding';
import commonStyle from './commonStyle';
export * from './colors';

// Combine All Styles Here
export const globalStyles = StyleSheet.create({
  ...flex,
  ...margin,
  ...padding,
  ...commonStyle,
});
