import {View, Text, StyleSheet} from 'react-native';
import React, {memo, useMemo} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors, globalStyles} from '../../themes';
import {moderateScale, screenWidth} from '../../common/constants';
import {images} from '../../assets/images';
import typography from '../../themes/typography';
import Button from '../Button';
import moment from 'moment';

interface CardProps {
  data: any;
  onCheckPress: (data: any) => void;
}

const Card = (props: CardProps) => {
  const {data, onCheckPress} = props;

  const formattedTime = useMemo(() => {
    // Arrival and departure times
    const arrivalTime = data?.arrivalTime;
    const departureTime = data?.departureTime;

    // Calculate the difference between arrival and departure times
    const arrivalMoment = moment(arrivalTime);
    const departureMoment = moment(departureTime);
    const duration = moment.duration(arrivalMoment.diff(departureMoment));

    // Format the duration as hours and minutes
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();

    // Format the result
    const formattedResult = `${hours.toString().padStart(2, '0')} hr ${minutes
      .toString()
      .padStart(2, '0')} min`;

    return formattedResult;
  }, [data]);

  const formattedArrivalTime = useMemo(
    () => moment(data?.arrivalTime).format('HH.mm'),
    [data],
  );

  const formattedDepartureTime = useMemo(
    () => moment(data?.departureTime).format('HH.mm'),
    [data],
  );

  return (
    <View style={localStyles.card}>
      <View
        style={[
          globalStyles.flexRow,
          globalStyles.justifyBetween,
          globalStyles.itemsCenter,
          globalStyles.mb12,
        ]}>
        <View style={[globalStyles.flexRow, globalStyles.itemsCenter]}>
          <View style={localStyles.flightLogo}>
            <Text
              style={{
                ...typography.fontSizes.f12,
                ...typography.fontWeights.medium,
                color: colors.grayDark,
              }}>
              {data.airline}
            </Text>
          </View>

          <Text>
            {data?.gate} {data?.flightNumber}
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: colors.grayDark,
            }}>
            {formattedTime}
          </Text>
        </View>
      </View>

      <View
        style={[
          globalStyles.flexRow,
          globalStyles.itemsCenter,
          globalStyles.justifyBetween,
        ]}>
        <View
          style={{
            width: screenWidth * 0.15,
          }}>
          <Text
            style={{
              ...typography.fontSizes.f16,
              ...typography.fontWeights.semiBold,
            }}>
            {formattedDepartureTime}
          </Text>
          <Text
            style={{
              ...typography.fontSizes.f10,
              ...typography.fontWeights.medium,
              color: colors.grayDark,
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
              ...typography.fontSizes.f16,
              ...typography.fontWeights.semiBold,
              textAlign: 'right',
            }}>
            {formattedArrivalTime}
          </Text>
          <Text
            style={{
              ...typography.fontSizes.f10,
              ...typography.fontWeights.medium,
              color: colors.grayDark,
              textAlign: 'right',
            }}>
            {data?.destination}
          </Text>
        </View>
      </View>

      <View style={localStyles.separator} />

      <View
        style={[
          globalStyles.flexRow,
          globalStyles.itemsCenter,
          globalStyles.justifyBetween,
          globalStyles.mb16,
        ]}>
        <View style={[globalStyles.flexRow, globalStyles.itemsCenter]}>
          <MaterialCommunityIcons
            name="sofa-single-outline"
            size={moderateScale(16)}
            color={colors.grayDark}
          />
          <Text
            style={{
              ...typography.fontSizes.f12,
              ...globalStyles.ml8,
              color: colors.grayDark,
            }}>
            {data?.seatsAvailable} seats available
          </Text>
        </View>

        <View style={[globalStyles.flexRow, globalStyles.itemsCenter]}>
          <Text
            style={{
              ...typography.fontSizes.f12,
              ...globalStyles.mr8,
              color: colors.grayDark,
            }}>
            From
          </Text>
          <Text
            style={{
              ...typography.fontSizes.f16,
              ...typography.fontWeights.semiBold,
              color: colors.black,
            }}>
            ${data.price}
          </Text>
        </View>
      </View>
      <Button
        title="Check"
        onPress={() =>
          onCheckPress({
            ...data,
            formattedArrivalTime,
            formattedDepartureTime,
            formattedTime,
          })
        }
      />
    </View>
  );
};

export default memo(Card);

const localStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(16),
    elevation: 3,
    padding: moderateScale(16),
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
  },
  circle: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    backgroundColor: colors.grayLight,
  },
  line: {
    height: moderateScale(1),
    width: moderateScale(40),
    backgroundColor: colors.grayLight,
  },
  logoBg: {
    padding: moderateScale(8),
    backgroundColor: colors.primary,
    borderRadius: moderateScale(50),
  },
  separator: {
    height: moderateScale(1),
    backgroundColor: colors.separator,
    marginVertical: moderateScale(16),
  },
});
