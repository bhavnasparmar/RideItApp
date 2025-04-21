import { tokenExpiredToggle } from "../Redux/Actions/TokenAction";
import { store } from "../Redux/Store";

//live server base url
export const API_URL = 'http://54.145.168.143:8080/';
export const IMAGE_URL = `${API_URL}static/`;
export const IMAGE_URL_GOAL = 'https://prosesenv.com/';
export const TOKEN_PREFIX = 'TOKEN_PREFIX';
export const REFRESH_TOKEN_PREFIX = 'REFRESH_TOKEN_PREFIX';
export const FCM_TOKEN = 'FCM_TOKEN';
export const USER_DATA = 'USER_DATA';

export const REGEX = {
  mobile:
    /^(?=(?:\D*\d){10,10}\D*$)\+?[0-9]{1,3}[\s-]?(?:\(0?[0-9]{1,5}\)|[0-9]{1,5})[-\s]?[0-9][\d\s-]{5,7}\s?(?:x[\d-]{0,4})?$/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,
  password: /^.{6,}$/,
  zipcode: /^[0-9]{6,6}$/,
  zipCode: /^\d{6}$/,
  onlyNumber: /^[0-9]\d*$/,
  numeric: /[\d]/, ///^[0-9\b]+$/,
  capital: /[A-Z]/,
  specialCharacter: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
  usernametest: /^[a-zA-Z0-9]+$/,
  name: /^[a-zA-Z0-9 ]*$/,
};


export const tokenExpiredflagChange = async (data: any) => {
  // console.log(" ", data)
  //  Store.dispatch(tokenExpiredToggle(data))
  store.dispatch(tokenExpiredToggle(data));
};