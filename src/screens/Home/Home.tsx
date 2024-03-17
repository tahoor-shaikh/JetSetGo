import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {getFlightsList} from '../../services/HomeService';
import {colors, globalStyles} from '../../themes';
import typography from '../../themes/typography';
import Card from '../../components/Card';
import SortAndFilterSection from '../../components/SortAndFilterSection';
import {moderateScale} from '../../common/constants';
import FilterModal from '../../components/FilterModal';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [isSortApplied, setIsSortApplied] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [flightsData, setFlightsData] = useState<any>([]);
  const [filterData, setFilterData] = useState<any>([]);

  useEffect(() => {
    getScreenData();
  }, []);

  const sortData = (data: any) => {
    const sortedData = data.sort((a: any, b: any) => {
      return a.price - b.price;
    });

    return sortedData;
  };

  const getScreenData = async (fromSort = false, isFilterApply = false) => {
    try {
      setLoading(true);
      const response = await getFlightsList();

      // If filter is applied
      if (isFilterApply) {
        let filteredData = response.filter((item: any) => {
          return filterData.some((filterItem: any) => {
            return filterItem.label === item.airline && filterItem.isSelect;
          });
        });

        // If sort is applied after filter
        if (fromSort) {
          const sortedData = sortData(filteredData);
          filteredData = sortedData;
          setIsSortApplied(true);
        } else {
          setIsSortApplied(false);
        }

        setFlightsData(filteredData);
        setIsFilterApplied(true);

        return;
      }

      // If sort is applied
      if (fromSort && !isSortApplied) {
        const sortedData = sortData(response);
        setFlightsData(sortedData);
        setIsSortApplied(true);
        return;
      }

      // If no sort or filter is applied
      setFlightsData(response);
      setIsSortApplied(false);
      setIsFilterApplied(false);

      const airlineTextData = response.map((item: any) => {
        return item.airline;
      });
      const uniqueTextData = Array.from(new Set(airlineTextData));
      const uniqueFilterData = uniqueTextData.map((item: any) => {
        return {
          label: item,
          isSelect: false,
        };
      });

      setFilterData(uniqueFilterData);
    } catch (error) {
      console.log('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <View
          style={[
            globalStyles.flex,
            globalStyles.center,
            {
              backgroundColor: colors.white,
            },
          ]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={[
            globalStyles.pt10,
            globalStyles.ph16,
            {
              backgroundColor: colors.white,
              flexGrow: 1,
              paddingBottom: moderateScale(60),
            },
          ]}
          ListHeaderComponent={
            <Text
              style={[
                typography.fontSizes.f20,
                globalStyles.mb20,
                {
                  textAlign: 'center',
                  fontWeight: '500',
                },
              ]}>
              Flights List
            </Text>
          }
          data={flightsData}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => <Card data={item} />}
        />
      )}
      {flightsData.length > 0 && (
        <View style={localStyles.footer}>
          <SortAndFilterSection
            onSortPress={() => getScreenData(!isSortApplied, isFilterApplied)}
            onFilterPress={() => {
              setShowFilterModal(true);
            }}
            isSortApplied={isSortApplied}
            isFilterApplied={isFilterApplied}
          />
        </View>
      )}

      <FilterModal
        visible={showFilterModal}
        // visible={true}
        onClose={() => setShowFilterModal(false)}
        filterData={filterData}
        setFilterData={setFilterData}
        onApplyPress={() => {
          setShowFilterModal(false);

          const isFilterDataApplied = filterData.some(
            (item: any) => item.isSelect,
          );

          getScreenData(isSortApplied, isFilterDataApplied);
        }}
      />
    </>
  );
};

export default Home;

const localStyles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
