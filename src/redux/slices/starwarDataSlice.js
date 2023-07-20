import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import HTTPService from "../../services/HttpServices";
import { baseUrl, imageBaseUrl } from "../../constants/url";

let totalItems = 0

const initialState = {
  starwarData: [],
  loading: true,
  error: null,
  pageNumber:1,
  totalPages: 0
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

export const starWarDataSlice = createSlice({
  name: "startwar",
  initialState,
  reducers: {
    searchData(state,action){
      state.starwarData = action.payload;
    },
    setPageNumber(state,action){
      state.pageNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchStarWarData.pending, (state) => {
      state.loading = state.pageNumber === 1 ? true : false;   // if page number > 1, then loader on initial fetch hide
      state.error = null;
    })
    .addCase(fetchStarWarData.fulfilled, (state, action) => {
      state.totalPages = Math.ceil(totalItems/10)
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

export const { searchData, setPageNumber } = starWarDataSlice.actions;
export default starWarDataSlice;