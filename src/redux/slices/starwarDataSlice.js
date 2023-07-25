import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import HTTPService from "../../services/HttpServices";
import { baseUrl, imageBaseUrl } from "../../constants/url";

let totalItems = 0

const initialState = {
  starwarData: [],
  loading: true,
  error: null,
  pageNumber:1,
  totalPages: 0,
  starwarSearchedData: [], // all filtered data which is rendering at flatlist
  searchedText: ''
};

export const fetchStarWarData = createAsyncThunk('starWarDataSlice/fetchData', async (data) => {
  try { 
    const textResponse = await HTTPService.get(baseUrl+`people/?page=${data.value}`);
    if(textResponse?.data && textResponse?.data?.results?.length>0){
      totalItems = textResponse?.data?.count;
      const imageResponses = await Promise.all(
        textResponse.data.results.map((textItem) => {
          return HTTPService.get(imageBaseUrl+`${textResponse.data.results.length}`).then(response => response.data)
          .catch(error => {
            console.error(error);
            return null;
          });
        })
      );
      
      const _mergedDataResponse = mergeData(textResponse.data.results, imageResponses[0]);
      return _mergedDataResponse;
    }else{
      throw new Error(textResponse);
    }
    
  } catch (error) {
    throw new Error(error);
  }
});

const mergeData = (textData, imageResponses) => {
  let mergedArray = textData.map((obj, index) => {
    return { ...obj, picture: imageResponses[index]?.download_url};
  });
  return mergedArray
};

const searchFilter=(state,searchText)=>{
  const _filteredData = state.starwarData.filter((item) => {
    const nameFilter = item.name.toLowerCase().includes(searchText);
    return nameFilter;
  });
  return _filteredData
}

export const starWarDataSlice = createSlice({
  name: "startwar",
  initialState,
  reducers: {
    resetData(state,action){
      state.searchedText = ""
      state.starwarSearchedData = []
    },
    searchData(state,action){
      let searchText = action.payload
      if(searchText !== ""){
        state.searchedText = searchText
        let _seachedResult = searchFilter(state,searchText)
        state.starwarSearchedData = _seachedResult && _seachedResult?.length>0 ? _seachedResult : [];
        state.loading = false
      }else{
        state.searchedText = ''
        state.starwarSearchedData= []
        state.loading = false
      }
      
    },
    filterData(state,action){
      let filterType = action.payload;
      if(filterType === 'none'){
        if(state.searchedText !== undefined && state.searchedText !== ""){   // filter none but search input there
          let _searchedResult = searchFilter(state, state.searchedText)
          state.starwarSearchedData =  _searchedResult && _searchedResult?.length>0 ? _searchedResult : [];
          state.loading = false
        }else{ // no filter, not search
          state.starwarSearchedData = state.starwarData;
          state.loading = false
        }
      }else{
        const _filteredData = state.starwarData.filter((item) => {
          let otherFilter
          if(filterType === 'homeland'){
            otherFilter = item.homeworld !== "";
          }else if(filterType === 'film'){
            otherFilter = item.films.length > 0;
          }else if(filterType === 'species'){
            otherFilter = item.species.length > 0 ;
          }
          return otherFilter;
        });

        if(state.searchedText !== undefined && state.searchedText !== ""){   // filter and search together
          let dataAfterFilter = _filteredData?.length>0 ? _filteredData : [];
          let previousSearchData = searchFilter(state,state.searchedText)
          if(previousSearchData.length>0){
            let _dataAppended = [...previousSearchData,...dataAfterFilter]
            const duplicateRemove = Array.from(new Map(_dataAppended.map(obj => [JSON.stringify(obj), obj])).values()); // remove duplicate data
            state.starwarSearchedData = duplicateRemove.length>0 ? duplicateRemove : [];
            state.loading = false
          }else{
            state.starwarSearchedData = dataAfterFilter?.length>0 ? dataAfterFilter : [];
            state.loading = false
          }
        }else{ // only filter, not search
          state.starwarSearchedData = _filteredData?.length>0 ? _filteredData : [];
          state.loading = false
        }
        
      }
      
    },
    setPageNumber(state,action){
      state.pageNumber = action.payload;
    },
    setLoading(state,action){
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchStarWarData.pending, (state) => {
      state.loading = state.pageNumber === 1 ? true : false;   // if page number > 1, then loader on initial fetch hide
      state.error = null;
    })
    .addCase(fetchStarWarData.fulfilled, (state, action) => {
      state.starwarSearchedData = []
      state.totalPages = Math.ceil(totalItems/10)  // 10 number of item display at a time
      state.loading = false;
      if(state.pageNumber>1){ // if page number > 1, then concat people data
        let newValue = [...state.starwarData, ...action.payload]
        state.starwarData = newValue;
      }else{
        state.starwarData = action.payload;
      }
    })
    .addCase(fetchStarWarData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { searchData, setPageNumber, filterData, resetData, setLoading } = starWarDataSlice.actions;
export default starWarDataSlice;