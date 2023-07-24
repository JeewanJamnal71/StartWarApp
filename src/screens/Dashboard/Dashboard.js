import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Text, ActivityIndicator, Button, RefreshControl, ScrollView } from 'react-native';
import CardComponent from '../../components/CardComponent/CardComponent';
import { fetchStarWarData } from '../../redux/slices/starwarDataSlice';
import { fetchStarWarHomeData } from '../../redux/slices/starWarHomeSlice';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from '../../components/SearchBar/SearchBar';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import { searchData, setPageNumber, filterData, resetData  } from '../../redux/slices/starwarDataSlice';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import Loader from '../../utils/Loader';
import styles from './styles';
import { showAlert } from '../../utils/Validations';
import { speciesColor } from '../../constants/colors';
import { themeColor } from '../../constants/colors';

const Dashboard = () => {
  const dispatch = useDispatch();

  // reduex states
  const data = useSelector((state) => state.starwarReducer.starwarData);
  const starWarSearchData = useSelector((state) => state.starwarReducer.starwarSearchedData);
  const loading = useSelector((state) => state.starwarReducer.loading);
  const error = useSelector((state) => state.starwarReducer.error);
  const homeWorldData = useSelector((state) => state.starWarHomeReducer.homeData);
  const homeWorldDataLoading = useSelector((state) => state.starWarHomeReducer.loading);
  const homeWorldDataError = useSelector((state) => state.starWarHomeReducer.error);
  const totalPages = useSelector((state) => state.starwarReducer.totalPages);

  // states
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItemData, setSelectedItemData] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [isLoadingMoreItems, setIsLoadingMoreItems] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isFilterSelected, setIsFilterSelected] = useState(false)
  const [filterType, setFilterType] = useState(null)
  const [refreshing, setRefreshing] = useState(false);

  useEffect(()=>{
    dispatch(resetData())
  },[])

  // fetch starwar data
  useEffect(() => {
    dispatch(setPageNumber(1))
    dispatch(fetchStarWarData({value: 1}));
  }, [dispatch]);


  // display error toast
  useEffect(() => {
    if(error){
      showAlert('error',error)
      setIsLoadingMoreItems(false)
    }
  }, [error]);

  const resetStates=()=>{
    setCurrentPage(1)
    setSelectedItemData([])
    setIsSearching(false)
    setIsLoadingMoreItems(false)
    setIsModalVisible(false)
    setIsFilterSelected(false)
    setFilterType(null)
    setRefreshing(false);
  }

  const handleSearch = useCallback((searchItem) => {
    let searchText = searchItem ? searchItem.toLowerCase() : "";
    if(searchText !== ""){
      setIsSearching(true)
    }else{
      setIsSearching(false)
    }
    dispatch(searchData(searchText));
  },[data.length]);

   // when searching off but filter on
  useEffect(() => {
    if(filterType){
      dispatch(filterData(filterType))
    }
  }, [isSearching]);

  const onSelectFilter=useCallback((_selectedFilterType)=>{
    if(_selectedFilterType === 'none'){
      setIsFilterSelected(false)
      setFilterType(null)
      
    }else{
      setIsFilterSelected(true)
      setFilterType(_selectedFilterType)
    }
    dispatch(filterData(_selectedFilterType))
  },[])

  const renderHeader=()=>{
    return(
      <View style={styles.headerContainerStyle}>
        <SearchBar onSearch={handleSearch} />  
        <FilterComponent onFilter={onSelectFilter} filterType={filterType}/>
      </View> 
    )
  }

  const onItemSelected=useCallback(async(item)=>{
    setIsModalVisible(true)
    dispatch(fetchStarWarHomeData(item.homeworld))
    setIsLoadingMoreItems(false)
    setSelectedItemData(item);
  },[])

  const convertStarWarsDateToGregorian = (starWarsDate) => {
    const yearsBeforeYavin = parseInt(starWarsDate, 10);
    const battleOfYavinYear = 0; // The Battle of Yavin occurred in the year 0 BBY
    const gregorianYear = battleOfYavinYear - yearsBeforeYavin;
    const gregorianDate = `01-01-${gregorianYear.toString().padStart(4, '0')}`;
    return gregorianDate;
  };
  
  const renderItemList=useCallback((item)=>{
    const _height = item?.height !== "" ? parseInt(item?.height) : '';
    const heightInMeter = typeof _height === 'number' ? _height/100 : _height;
    let imageUrl = item.picture ? item.picture.replace(/\/\d+\/\d+$/, "/300/400") : '';
    let _species = item?.species?.length>0 ? item?.species[0] : null;
    const _speciesId = _species ? _species.split('/').filter(Boolean).pop() : _species;
    const _cardColor = _speciesId ? speciesColor[_speciesId] : themeColor.default

    let data = {
      name: item?.name,
      createdDate: item?.created,
      cardColor: _cardColor,
      height: heightInMeter,
      image: imageUrl,
      mass: item.mass,
      speciesId: _speciesId,
      dob: item?.birth_year,
      filmsLength: item?.films?.length,
      homeworld: item?.homeworld,
      gender: item?.gender
    }
    return( 
      <View key={item.name+item.created+item.birth_year}>
        <CardComponent item={data} onSelectItem={onItemSelected}/>
      </View>
    )
  },[isLoadingMoreItems])

  const renderFooter=()=>{
    return( 
      <View style={styles.paginationContainer}>
        
        { 
          isSearching || isFilterSelected ? null :
          isLoadingMoreItems ? <ActivityIndicator size="large" color={themeColor.default}/> : 
          currentPage >= totalPages ? null :
          <Button 
            android_ripple={{color: themeColor.lightGreyColor, borderless: true}}
            title='Load more' 
            onPress={loadMoreData}
            color= {themeColor.default}>
          </Button>
        }
        
      </View>
    )
  }

  const loadMoreData=async()=>{
    setIsLoadingMoreItems(true)
    if(!isSearching){  
      await dispatch(setPageNumber(currentPage+1))
      await dispatch(fetchStarWarData({value: currentPage+1}));
      setCurrentPage(prevPage => prevPage + 1);
    }
    setIsLoadingMoreItems(false)
  }

  const closeModal=useCallback(()=>{
    setIsModalVisible(false)
  },[])

  const onRefresh =useCallback(() => {
    setRefreshing(true);
    dispatch(resetData())
    dispatch(setPageNumber(1))
    dispatch(fetchStarWarData({value: 1}));
    resetStates()
  }, []);
 
  return (
    <View style={styles.mainContainer}>
      {/* <ScrollView style={styles.scrollViewStyle}
        refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }> */}
        {renderHeader()}
        {
          loading ? <Loader/> : 
          starWarSearchData.length > 0 ?
            <FlatList
              data={starWarSearchData}
              initialNumToRender={10}
              renderItem={({item})=>renderItemList(item)}
              keyExtractor={(item) =>item.name+item.created+item.birth_year}
              contentContainerStyle={styles.contentContainer}
              onEndReachedThreshold={0}
              windowSize={100}
              ListFooterComponent={renderFooter}
              nestedScrollEnabled={true}
            />
           : isSearching || isFilterSelected? <Text style={styles.textStyle}>No {isSearching ? 'Searched' : 'Filtered'} Data Found!!!</Text> : data.length > 0 ?
            <FlatList
              data={data}
              initialNumToRender={10}
              renderItem={({item})=>renderItemList(item)}
              keyExtractor={(item) =>item.name+item.created+item.birth_year}
              contentContainerStyle={styles.contentContainer}
              onEndReachedThreshold={0}
              windowSize={100}
              nestedScrollEnabled={true}
              ListFooterComponent={renderFooter}
            />
           :
           <Text style={styles.textStyle}>No Data Found!!!</Text>
           
        }

        {
          isModalVisible ?
            <ModalComponent 
              data={selectedItemData} 
              modalVisible={isModalVisible}
              loading={homeWorldDataLoading} 
              homeData={homeWorldData}
              error={homeWorldDataError}
              onClose={closeModal} />
           : null
        }
      {/* </ScrollView>   */}
    </View>
  );
};


export default Dashboard;