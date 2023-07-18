import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  loading: true,
  error: null,
  homeData:[]
};

export const fetchStarWarHomeData = createAsyncThunk('starWarHomeSlice/fetchHomeData', async (apiUrl,{ getState }) => {
  try {
    const _response = await axios.get(apiUrl);
    if(_response.data){
        return _response.data
    }else{
        return []
    }
  }catch (error) {
    console.log(error)
    throw new Error(error);
  }
});


export const starWarHomeSlice = createSlice({
  name: "startwarhome",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchStarWarHomeData.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchStarWarHomeData.fulfilled, (state, action) => {
      state.loading = false;
      state.homeData = action.payload;
    })
    .addCase(fetchStarWarHomeData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// export const { reducer } = starWarDataSlice;
export default starWarHomeSlice;