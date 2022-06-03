import { createSlice } from "@reduxjs/toolkit";
import { apiConfig } from "../config";

const axios = require("axios");

const initialState = {
  resData: [],
  isLoading: false,
  offersCount: 0,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    getData: (state, action) => {
      state.resData = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    getOffers: (state, action) => {
      state.offersCount = action.payload;
    },
    getOffersData: (state, action) => {
      state.resData = [...state.resData, action.payload];
    },
    reset: (state) => {
      state.resData = [];
      state.isLoading = false;
      state.offersCount = 0;
    },
  },
});

export const getCase1Async = () => async (dispatch) => {
  try {
    const response = await axios.get(`${apiConfig.REACT_APP_API_URL}`);
    dispatch(getData(response.data.offerList));
  } catch (err) {
    throw new Error(err);
  }
};

export const getCase2Async = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${apiConfig.REACT_APP_API_URL2}`);
    dispatch(getData(response.data.offerList));
  } catch (err) {
    throw new Error(err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getCase3Async = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${apiConfig.REACT_APP_API_URL3}`);
    dispatch(getOffersData(response.data));
    dispatch(getOffers({ num_offers: data - 1 }));
  } catch (err) {
    throw new Error(err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getOfferCountAsync = () => async (dispatch) => {
  try {
    const response = await axios.get(`${apiConfig.REACT_APP_API_URL4}`);
    dispatch(getOffers(response.data));
  } catch (err) {
    throw new Error(err);
  }
};

export const reduxReset = () => async (dispatch) => {
  dispatch(reset());
};

export const { getData, setLoading, getOffers, getOffersData, reset } =
  taskSlice.actions;

export const resData = (state) => state.task.resData;
export const isLoading = (state) => state.task.isLoading;
export const offersCount = (state) => state.task.offersCount;

export default taskSlice.reducer;
