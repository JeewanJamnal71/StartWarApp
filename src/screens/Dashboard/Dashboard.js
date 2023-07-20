import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, FlatList, Text, ActivityIndicator, Button } from 'react-native';
import CardComponent from '../../components/CardComponent/CardComponent';
import { fetchStarWarData } from '../../redux/slices/starwarDataSlice';
import { fetchStarWarHomeData } from '../../redux/slices/starWarHomeSlice';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from '../../components/SearchBar/SearchBar';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import { searchData, setPageNumber } from '../../redux/slices/starwarDataSlice';
import Loader from '../../utils/Loader';
import styles from './styles';
import { showAlert } from '../../utils/Validations';
import moment from 'moment';
import { speciesColor } from '../../constants/colors';
import { themeColor } from '../../constants/colors';

const Dashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.starwarReducer.starwarData);
  const loading = useSelector((state) => state.starwarReducer.loading);
  const error = useSelector((state) => state.starwarReducer.error);
  const homeWorldData = useSelector((state) => state.starWarHomeReducer.homeData);
  const homeWorldDataLoading = useSelector((state) => state.starWarHomeReducer.loading);
  const homeWorldDataError = useSelector((state) => state.starWarHomeReducer.error);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItemData, setSelectedItemData] = useState([])
  const [selectedItemHomeData, setSelectedItemHomeData] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isLoadingMoreItems, setIsLoadingMoreItems] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false) 

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

  // get homeworld updated data in modal
  useEffect(() => {
    if(isModalVisible){
      if(homeWorldData){
        setSelectedItemHomeData(homeWorldData)
      }
    }
  }, [homeWorldData])


  const handleSearch = useCallback((searchItem) => {
    let searchText = searchItem ? searchItem.toLowerCase() : "";
    if(searchText !== ""){
      setIsSearching(true)
      const filteredArray = data.filter((item) => {
        const nameFilter = item.name.toLowerCase().includes(searchText);
        const homeworldFilter = item.homeworld.toLowerCase().includes(searchText);
        const filmsFilter = item.films.includes(searchText);
        const speciesFilter = item.species.includes(searchText);
      
        return nameFilter || homeworldFilter || filmsFilter || speciesFilter;
      });
      dispatch(searchData(filteredArray));
    }else{
      setIsSearching(false)
      dispatch(setPageNumber(1))
      dispatch(fetchStarWarData({value: 1}));
    }
    
  },[data.length]);

  const renderHeader=()=>{
    return(
      <SearchBar onSearch={handleSearch} />   
    )
  }

  const onItemSelected=useCallback(async(item)=>{
    setIsModalVisible(true)
    dispatch(fetchStarWarHomeData(item.homeworld))
    setIsLoadingMoreItems(false)
    setSelectedItemData(item);
  },[])

  const renderItemList=(item)=>{
    const _height = item?.height !== "" ? parseInt(item?.height) : '';
    const heightInMeter = _height !== "" ? _height/100 : _height;
    let imageUrl = item.picture ? item.picture.replace(/\/\d+\/\d+$/, "/300/400") : '';
    let _species = item?.species?.length>0 ? item?.species[0] : null;
    const _speciesId = _species ? _species.split('/').filter(Boolean).pop() : _species;
    const _cardColor = _speciesId ? speciesColor[_speciesId] : themeColor.white

    let data = {
      name: item?.name,
      createdDate: moment(item?.created).format("DD-MM-yyyy"),
      cardColor: _cardColor,
      height: heightInMeter,
      image: imageUrl,
      mass: item.mass,
      speciesId: _speciesId,
      dob: item?.birth_year,
      filmsLength: item?.films.length,
      homeworld: item?.homeworld
    }
    return( 
      <CardComponent item={data} onSelectItem={onItemSelected}/>
    )
  }

  const renderFooter=()=>{
    return( 
      <View style={styles.paginationContainer}>
        
        { 
          isSearching ? null :
          isLoadingMoreItems ? <ActivityIndicator size="large" color={themeColor.default}/> 
          : <Button title='Load more' onPress={loadMoreData}></Button>
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
 
  return (
    <View style={styles.mainContainer}>
        {renderHeader()}
        {
          error ? <Text style={styles.textStyle}>ERROR: {error}</Text> : 
          loading ? <Loader/> : data.length > 0 ?
          <>
            <FlatList
              data={data}
              initialNumToRender={10}
              renderItem={({item})=>renderItemList(item)}
              keyExtractor={(item) =>item.name+item.created+item.birth_year}
              contentContainerStyle={styles.contentContainer}
              onEndReachedThreshold={0}
              windowSize={100}
              ListFooterComponent={renderFooter}
            />
          </> : <Text style={styles.textStyle}>No Data!!!</Text> 
        }

        {
          isModalVisible ? 
            <ModalComponent 
              data={selectedItemData} 
              modalVisible={isModalVisible}
              loading={homeWorldDataLoading} 
              homeData={selectedItemHomeData}
              error={homeWorldDataError}
              onClose={closeModal} />
          : null
        }
        
    </View>
  );
};


export default Dashboard;