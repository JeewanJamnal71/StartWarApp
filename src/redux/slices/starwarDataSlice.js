import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

let totalNumberOfPages = 0

const initialState = {
  starwarData: [],
  loading: true,
  error: null,
  pageNumber:1,
  totalPages:0
};

export const fetchStarWarData = createAsyncThunk('starWarDataSlice/fetchData', async (data) => {
  try {
    let _params = data.type === 'search' ? data.value !== '' ? 'search' : 'page' : 'page'
    const textResponse = await axios.get(`https://swapi.dev/api/people/?${_params}=${data.value}`);
    if(textResponse.data && textResponse.data.results.length>0){
      totalNumberOfPages = textResponse.data.count;
      const imageResponses = await Promise.all(
        textResponse.data.results.map((textItem) => {
          return axios.get(`https://picsum.photos/v2/list?page=1&limit=${textResponse.data.results.length}`).then(response => response.data)
          .catch(error => {
            console.error(error);
            return null;
          });
        })
      );
      
      const _mergedDataResponse = mergeData(textResponse.data.results, imageResponses[0]);
      return _mergedDataResponse;
    }else{
      return []
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
      state.totalPages = action.payload.length
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchStarWarData.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchStarWarData.fulfilled, (state, action) => {
      state.loading = false;
      state.starwarData = action.payload;
      state.totalPages = totalNumberOfPages;
    })
    .addCase(fetchStarWarData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { searchData } = starWarDataSlice.actions;
export default starWarDataSlice;