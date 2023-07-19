import React, { useEffect, useState, useCallback, useTransition } from 'react';
import { View, FlatList, Text } from 'react-native';
import CardComponent from '../../components/CardComponent/CardComponent';
import { fetchStarWarData } from '../../redux/slices/starwarDataSlice';
import { fetchStarWarHomeData } from '../../redux/slices/starWarHomeSlice';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '../../components/Pagination/Pagination';
import SearchBar from '../../components/SearchBar/SearchBar';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import { searchData } from '../../redux/slices/starwarDataSlice';
import Toast from 'react-native-toast-message';
import Loader from '../../utils/Loader';
import styles from './styles';
import { showAlert } from '../../utils/Validations';

const Dashboard = () => {
  const data = useSelector((state) => state.starwarReducer.starwarData);
  const loading = useSelector((state) => state.starwarReducer.loading);
  const error = useSelector((state) => state.starwarReducer.error);
  const totalPages = useSelector((state) => state.starwarReducer.totalPages);
  const homeWorldData = useSelector((state) => state.starWarHomeReducer.homeData);
  const homeWorldDataLoading = useSelector((state) => state.starWarHomeReducer.loading);
  const homeWorldDataError = useSelector((state) => state.starWarHomeReducer.error);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItemData, setSelectedItemData] = useState([])
  const [selectedItemHomeData, setSelectedItemHomeData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  

  // fetch starwar data
  useEffect(() => {
    dispatch(fetchStarWarData({type: 'page',value: 1}));
  }, [dispatch]);

  // get homeworld updated data in modal
  useEffect(() => {
    if(showModal){
      if(homeWorldData){
        setSelectedItemHomeData(homeWorldData)
      }
    }
  }, [homeWorldData])

  // display error toast
  useEffect(() => {
    if(error){
      showAlert('error',error)
    }
  }, [error]);


  const handleNextPage = async() => {
    await dispatch(fetchStarWarData({type: 'page',value: currentPage+1}));
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = async() => {
    await dispatch(fetchStarWarData({type: 'page',value: currentPage-1}));
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleSearch = useCallback((searchItem) => {
    let searchText = searchItem ? searchItem.toLowerCase() : "";
    if(searchText !== ""){
      const filteredArray = data.filter((item) => {
        const nameFilter = item.name.toLowerCase().includes(searchText);
        const homeworldFilter = item.homeworld.toLowerCase().includes(searchText);
        const filmsFilter = item.films.includes(searchText);
        const speciesFilter = item.species.includes(searchText);
      
        return nameFilter || homeworldFilter || filmsFilter || speciesFilter;
      });
      dispatch(searchData(filteredArray));
    }else{
      dispatch(fetchStarWarData({type: 'page',value: currentPage}));
    }
    
  },[data.length]);

  const renderHeader=()=>{
    return(
      <SearchBar onSearch={handleSearch} />   
    )
  }

  const onItemSelected=useCallback(async(item)=>{
    setSelectedItemData(item);
    dispatch(fetchStarWarHomeData(item.homeworld))
    setShowModal(true)
  },[dispatch])

  const renderItemList=(item)=>{
    return( 
      <CardComponent item={item} onSelectItem={onItemSelected}/>
    )
  }

  const renderFooter=()=>{
    return( 
      <View style={styles.paginationContainer}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
      </View>
    )
  }

  const closeModal=useCallback(()=>{
    setShowModal(false)
  },[showModal])

  return (
    <View style={styles.mainContainer}>
        {renderHeader()}
        {
          error ? <Text style={styles.textStyle}>ERROR: {error}</Text> : 
          loading ? <Loader/> : data.length > 0 ?
          <>
            <FlatList
              data={data}
              renderItem={({item})=>renderItemList(item)}
              keyExtractor={(item) =>item.name+item.created}
              contentContainerStyle={styles.contentContainer}
            />
            {renderFooter()}
          </> : <Text style={styles.textStyle}>No Data!!!</Text> 
        }
        {
          showModal ? 
          <ModalComponent 
            data={selectedItemData} 
            modalVisible={showModal} 
            onClose={closeModal} 
            loading={homeWorldDataLoading} 
            homeData={selectedItemHomeData}
            error={homeWorldDataError}/>
          : null
        }
        
    </View>
  );
};


export default Dashboard;