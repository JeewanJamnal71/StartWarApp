import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import HTTPService from "../../services/HttpServices";

const initialState = {
  loading: true,
  error: null,
  homeData:[]
};

export const fetchStarWarHomeData = createAsyncThunk('starWarHomeSlice/fetchHomeData', async (apiUrl,{ getState }) => {
  try {
    const _response = await HTTPService.get(apiUrl);
    if(_response?.data && _response?.data?.name){
        return _response.data
    }else{
      throw new Error(_response);
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