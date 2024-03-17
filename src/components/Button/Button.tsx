import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {colors, globalStyles} from '../../themes';
import typography from '../../themes/typography';
import {moderateScale} from '../../common/constants';

interface ButtonTypes {
  title?: string;
  onPress?: () => void;
  btnContainer?: StyleProp<ViewStyle>;
  loading?: boolean;
  rightUi?: React.ReactNode;
  leftUi?: React.ReactNode;
  isBordered?: boolean;
}

const Button: React.FC<ButtonTypes> = (props: ButtonTypes) => {
  const {
    title,
    onPress,
    btnContainer,
    loading = false,
    rightUi,
    leftUi,
    isBordered,
  } = props;

  return (
    <TouchableOpacity
      style={[
        styles.btnContainer,
        globalStyles.pv12,
        {
          backgroundColor: isBordered ? colors.transparent : colors.primary,
        },
        btnContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <View style={[globalStyles.flexRow, globalStyles.itemsCenter]}>
          {leftUi && <View style={globalStyles.mr4}>{leftUi}</View>}
          <Text
            style={[
              typography.fontSizes.f16,
              {
                color: isBordered ? colors.primary : colors.white,
                textAlign: 'center',
              },
            ]}>
            {title}
          </Text>
          {rightUi && <View style={globalStyles.ml4}>{rightUi}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnContainer: {
    ...globalStyles.center,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: moderateScale(8),
  },
});
