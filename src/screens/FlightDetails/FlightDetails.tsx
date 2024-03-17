import {Alert, BackHandler, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';

import {moderateScale, screenWidth} from '../../common/constants';
import {colors, globalStyles} from '../../themes';
import typography from '../../themes/typography';
import {images} from '../../assets/images';
import Button from '../../components/Button';

const FlightDetails = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();

  const data = useMemo(() => route.params?.data, [route]);
  console.log('routeData', data);

  useEffect(() => {
    // Back handler
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={[globalStyles.p16, globalStyles.mainContainer]}>
      {/* Header */}
      <View
        style={[
          globalStyles.flexRow,
          globalStyles.itemsCenter,
          globalStyles.justifyBetween,
        ]}>
        <Entypo
          name="chevron-thin-left"
          size={moderateScale(20)}
          color={colors.black}
          onPress={onBackPress}
        />

        <Text
          style={{
            ...typography.fontSizes.f20,
            ...typography.fontWeights.medium,
          }}>
          Flight Details
        </Text>

        <View style={{width: 20}} />
      </View>

      {/* Card */}
      <View style={localStyles.card}>
        <View style={localStyles.flightLogo}>
          <Text
            style={{
              ...typography.fontSizes.f28,
              ...typography.fontWeights.medium,
              color: colors.grayDark,
            }}>
            {data.airline}
          </Text>
        </View>

        <View
          style={[
            globalStyles.flexRow,
            globalStyles.itemsCenter,
            globalStyles.justifyBetween,
            globalStyles.mh16,
          ]}>
          <View
            style={{
              width: screenWidth * 0.15,
            }}>
            <Text
              style={{
                ...typography.fontSizes.f22,
                ...typography.fontWeights.semiBold,
              }}>
              {data?.formattedDepartureTime}
            </Text>
            <Text
              style={{
                ...typography.fontSizes.f12,
                ...typography.fontWeights.medium,
                color: colors.black,
              }}>
              {data?.origin}
            </Text>
          </View>

          <View style={[globalStyles.flexRow, globalStyles.itemsCenter]}>
            <View style={localStyles.circle} />
            <View style={localStyles.line} />
            <View style={localStyles.logoBg}>
              <images.FlightLogo />
            </View>
            <View style={localStyles.line} />
            <View style={localStyles.circle} />
          </View>

          <View
            style={{
              width: screenWidth * 0.15,
            }}>
            <Text
              style={{
                ...typography.fontSizes.f22,
                ...typography.fontWeights.semiBold,
                textAlign: 'right',
              }}>
              {data?.formattedArrivalTime}
            </Text>
            <Text
              style={{
                ...typography.fontSizes.f12,
                ...typography.fontWeights.medium,
                color: colors.black,
                textAlign: 'right',
              }}>
              {data?.destination}
            </Text>
          </View>
        </View>

        <View
          style={[
            globalStyles.flexRow,
            globalStyles.itemsCenter,
            globalStyles.justifyBetween,
            globalStyles.mt12,
            globalStyles.mh16,
          ]}>
          <Text
            style={{
              ...typography.fontSizes.f12,
              ...typography.fontWeights.light,
              color: colors.grayDark,
              width: screenWidth * 0.3,
            }}>
            Indira Gandhi International Airport
          </Text>
          <Text
            style={{
              ...typography.fontSizes.f12,
              ...typography.fontWeights.light,
              color: colors.grayDark,
              width: screenWidth * 0.3,
              textAlign: 'right',
            }}>
            Subhash Chandra Bose International Airport
          </Text>
        </View>

        <View style={localStyles.dateTimeContainer}>
          <View style={localStyles.dateTimeInput}>
            <AntDesign
              name="calendar"
              size={moderateScale(20)}
              color={colors.grayDark}
            />
            <Text
              style={{
                ...typography.fontSizes.f14,
                ...typography.fontWeights.medium,
                color: colors.black,
                marginLeft: moderateScale(8),
              }}>
              15/07/2022
            </Text>
          </View>
          <View style={localStyles.dateTimeInput}>
            <AntDesign
              name="clockcircleo"
              size={moderateScale(20)}
              color={colors.grayDark}
            />
            <Text
              style={{
                ...typography.fontSizes.f14,
                ...typography.fontWeights.medium,
                color: colors.black,
                marginLeft: moderateScale(8),
              }}>
              09.30
            </Text>
          </View>
        </View>

        <View
          style={[
            globalStyles.flexRow,
            globalStyles.itemsCenter,
            globalStyles.selfCenter,
          ]}>
          <Text
            style={{
              ...typography.fontSizes.f22,
              ...typography.fontWeights.light,
              ...globalStyles.mr8,
              color: colors.grayDark,
            }}>
            Price
          </Text>
          <Text
            style={{
              ...typography.fontSizes.f32,
              ...typography.fontWeights.semiBold,
              color: colors.black,
            }}>
            ${data.price}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={[globalStyles.mt25, globalStyles.rowSpaceBetween]}>
        <Button
          title="Cancel"
          onPress={onBackPress}
          btnContainer={{
            width: screenWidth / 2 - moderateScale(25),
          }}
          isBordered
        />
        <Button
          title="Confirm"
          onPress={() => {
            Alert.alert(
              'Success!',
              'Your flight has been booked successfully.',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.goBack(),
                },
              ],
            );
          }}
          btnContainer={{
            width: screenWidth / 2 - moderateScale(25),
          }}
        />
      </View>
    </View>
  );
};

export default FlightDetails;

const localStyles = StyleSheet.create({
  card: {
    ...globalStyles.mt24,
    backgroundColor: colors.white,
    borderRadius: moderateScale(16),
    elevation: 3,
    paddingVertical: moderateScale(16),
    marginVertical: moderateScale(10),
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(2),
  },
  flightLogo: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    padding: moderateScale(8),
    marginRight: moderateScale(8),
    alignSelf: 'center',
  },
  circle: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    backgroundColor: colors.grayLight,
  },
  line: {
    height: moderateScale(1),
    width: moderateScale(50),
    backgroundColor: colors.grayLight,
  },
  logoBg: {
    padding: moderateScale(8),
    backgroundColor: colors.primary,
    borderRadius: moderateScale(50),
  },
  dateTimeContainer: {
    ...globalStyles.flexRow,
    ...globalStyles.itemsCenter,
    ...globalStyles.justifyEvenly,
    ...globalStyles.pv24,
    ...globalStyles.mv24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.grayLight,
  },
  dateTimeInput: {
    ...globalStyles.flexRow,
    ...globalStyles.itemsCenter,
    ...globalStyles.p12,
    width: screenWidth * 0.38,
    borderWidth: 1,
    borderColor: colors.grayLight,
    borderRadius: moderateScale(8),
  },
});
