import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {moderateScale, screenWidth} from '../../common/constants';
import {colors, globalStyles} from '../../themes';
import typography from '../../themes/typography';
import Button from '../Button';

const FilterModal = (props: any) => {
  const {visible, onClose, filterData, setFilterData, onApplyPress} = props;
  console.log('filterData :>> ', filterData);

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            backgroundColor: colors.white,
            paddingVertical: moderateScale(26),
            paddingHorizontal: moderateScale(16),
            width: '100%',
          }}>
          <View style={globalStyles.rowSpaceBetween}>
            <Text
              style={{
                ...typography.fontSizes.f20,
                ...typography.fontWeights.bold,
                color: colors.grayDark,
              }}>
              Filter
            </Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.8}>
              <AntDesign
                name="close"
                size={moderateScale(20)}
                color={colors.grayDark}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={[
                typography.fontSizes.f18,
                typography.fontWeights.medium,
                globalStyles.mt24,
                globalStyles.mb8,
                {color: colors.black},
              ]}>
              Airlines
            </Text>

            {filterData.map((value: any, index: number) => (
              <TouchableOpacity
                key={index.toString()}
                style={[
                  globalStyles.rowSpaceBetween,
                  globalStyles.mb12,
                  globalStyles.ml8,
                ]}
                onPress={() => {
                  const temp = [...filterData];
                  console.log('temp :>> ', temp);
                  temp[index].isSelect = !temp[index].isSelect;
                  setFilterData(temp);
                }}>
                <Text
                  style={{
                    ...typography.fontSizes.f16,
                    color: colors.black,
                  }}>
                  {value.label}
                </Text>
                <View
                  style={{
                    height: 18,
                    width: 18,
                    borderRadius: 5,
                    borderWidth: 1.5,
                    borderColor: colors.primary,
                    ...globalStyles.center,
                  }}>
                  {value.isSelect && (
                    <AntDesign
                      name="check"
                      size={moderateScale(12)}
                      color={colors.primary}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={[globalStyles.mt25, globalStyles.rowSpaceBetween]}>
            <Button
              title="Reset"
              onPress={() => {
                setFilterData(
                  filterData.map((item: any) => {
                    return {
                      ...item,
                      isSelect: false,
                    };
                  }),
                );
              }}
              btnContainer={{
                width: screenWidth / 2 - moderateScale(25),
              }}
              isBordered
            />
            <Button
              title="Apply"
              onPress={() => {
                onApplyPress();
              }}
              btnContainer={{
                width: screenWidth / 2 - moderateScale(25),
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({});
