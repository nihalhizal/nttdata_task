import { createSlice } from "@reduxjs/toolkit";
import { apiConfig } from "../config";

const axios = require("axios");

const initialState = {
  data: [],
  isLoading: true,
  offersCount: 0,
};

export const dataSlide = createSlice({
  name: "data",
  initialState,
  reducers: {
    getData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    getOffers: (state, action) => {
      state.offersCount = action.payload;
    },
    getOffersData: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    reset: (state, action) => {
      state.data = [];
      state.isLoading = true;
      state.offersCount = 0;
    },
  },
});

export const getCase1Async = (data) => async (dispatch) => {
  try {
    const response = await axios.get(`${apiConfig.REACT_APP_API_URL}`);
    dispatch(getData(response.data.offerList));
  } catch (err) {
    throw new Error(err);
  }
};

export const getCase2Async = (data) => async (dispatch) => {
  dispatch(setLoading(false));
  try {
    const response = await axios.get(`${apiConfig.REACT_APP_API_URL2}`);
    dispatch(getData(response.data.offerList));
  } catch (err) {
    throw new Error(err);
  } finally {
    dispatch(setLoading(true));
  }
};

export const getCase3Async = (data) => async (dispatch) => {
  dispatch(setLoading(false));
  try {
    const response = await axios.get(`${apiConfig.REACT_APP_API_URL3}`);
    dispatch(getOffersData(response.data));
    dispatch(getOffers({ num_offers: data - 1 }));
  } catch (err) {
    throw new Error(err);
  } finally {
    dispatch(setLoading(true));
  }
};

export const getOfferCountAsync = (data) => async (dispatch) => {
  try {
    const response = await axios.get(`${apiConfig.REACT_APP_API_URL4}`);
    dispatch(getOffers(response.data));
  } catch (err) {
    throw new Error(err);
  }
};

export const reduxReset = (data) => async (dispatch) => {
  dispatch(reset());
};

export const { getData, setLoading, getOffers, getOffersData, reset } =
  dataSlide.actions;

export const resData = (state) => state.data.data;
export const isLoading = (state) => state.data.isLoading;
export const offersCount = (state) => state.data.offersCount;

export default dataSlide.reducer;
