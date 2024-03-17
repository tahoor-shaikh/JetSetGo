import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {colors, globalStyles} from '../../themes';
import typography from '../../themes/typography';
import {moderateScale} from '../../common/constants';

interface SortAndFilterSectionProps {
  onSortPress: () => void;
  onFilterPress: () => void;
  isSortApplied?: boolean;
  isFilterApplied?: boolean;
}

const SortAndFilterSection = (props: SortAndFilterSectionProps) => {
  const {
    onSortPress,
    onFilterPress,
    isSortApplied = false,
    isFilterApplied = false,
  } = props;
  return (
    <View
      style={[
        globalStyles.pv12,
        globalStyles.flexRow,
        globalStyles.itemsCenter,
        globalStyles.justifyEvenly,
        {
          borderTopWidth: 1,
          borderTopColor: colors.borderColor,
          borderBottomWidth: 1,
          borderBottomColor: colors.borderColor,
          backgroundColor: colors.white,
        },
      ]}>
      <TouchableOpacity
        style={[
          globalStyles.flexRow,
          globalStyles.itemsCenter,
          globalStyles.mv8,
        ]}
        onPress={onSortPress}
        activeOpacity={0.8}>
        <FontAwesome5
          name="sort"
          size={moderateScale(20)}
          color={isSortApplied ? colors.primary : colors.grayDark}
        />

        <Text
          style={{
            color: isSortApplied ? colors.primary : colors.grayDark,
            ...typography.fontSizes.f16,
            ...typography.fontWeights.semiBold,
            ...globalStyles.ml8,
          }}>
          Sort
        </Text>
      </TouchableOpacity>
      <View
        style={{
          width: 1,
          backgroundColor: colors.black,
          height: '100%',
          opacity: 0.1,
          marginLeft: moderateScale(8),
        }}
      />
      <TouchableOpacity
        style={[globalStyles.flexRow, globalStyles.itemsCenter]}
        onPress={onFilterPress}
        activeOpacity={0.8}>
        <AntDesign
          name="filter"
          size={moderateScale(20)}
          color={isFilterApplied ? colors.primary : colors.grayDark}
        />
        <Text
          style={{
            color: isFilterApplied ? colors.primary : colors.grayDark,
            ...typography.fontSizes.f16,
            ...typography.fontWeights.semiBold,
            ...globalStyles.ml8,
          }}>
          Filter
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SortAndFilterSection;

const styles = StyleSheet.create({});
