//#region Imports
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Appearance, NativeModules, SafeAreaView} from 'react-native';
import {AppearanceContext} from './app/context/appearanceContext';
import {AuthContext} from './app/context/AuthContext';
import Login from './app/screens/auth/login/login';
import Register from './app/screens/auth/Register/Register';
import {_DarkTheme, _LightTheme} from './app/services/colorThemeService';
import {colors, darkColors, fontFamily, fontSize} from './app/styles/variables';
import SideDrawer from './app/shared/navigation/Drawer/Drawer';
import {BaseToast} from 'react-native-toast-message/lib/src/components/BaseToast';
import {ErrorToast} from 'react-native-toast-message/lib/src/components/ErrorToast';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TOKEN_PREFIX} from './app/utils/Commanutils';
import {showToast} from './app/services/toastService';
import {toastTypes} from './app/constant/constants';
import Otp from './app/screens/auth/Otp/Otp';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {persistor, store} from './app/Redux/Store';
import {PersistGate} from 'redux-persist/integration/react';

const {RootCheckModule} = NativeModules;
const RootStack = createNativeStackNavigator();
const options = {
  headerShown: false,
};

const authstack = () => (
  <RootStack.Navigator screenOptions={options} initialRouteName="Login">
    <RootStack.Screen name="Login" component={Login} />
    <RootStack.Screen name="Register" component={Register} />
    <RootStack.Screen name="Otp" component={Otp} />
  </RootStack.Navigator>
);

export default function App() {
  const [mode, setmode] = React.useState(Appearance.getColorScheme());
  const LIGHT = 'light';
  const [loginnavigation, setloginnavigation] = useState<boolean>(true);
  React.useEffect(() => {
    checkMode();
    return () => {};
  }, []);
  const checkMode = async () => {
    try {
      Appearance.addChangeListener((res: any) => {
        setmode(res.colorScheme);
      });
    } catch (error) {
      // console.log(error, 'while fetching apperance');
    }
  };
  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        text2NumberOfLines={2}
        style={{
          borderLeftColor: colors.secondary,
          backgroundColor: colors.Hard_White,
        }}
        text1Style={{
          fontSize: fontSize.normal,
          fontFamily: fontFamily.regular,
          color: colors.Hard_Black,
        }}
        text2Style={{
          fontSize: fontSize.small,
          fontFamily: fontFamily.regular,
          color: colors.Hard_Black,
        }}
      />
    ),

    info: (props: any) => (
      <BaseToast
        {...props}
        text1NumberOfLines={2}
        text2NumberOfLines={2}
        style={{
          borderLeftColor: colors.goldenYellow,
          backgroundColor: colors.Hard_White,
        }}
        text1Style={{
          fontSize: fontSize.normal,
          fontFamily: fontFamily.regular,
          color: colors.Hard_Black,
        }}
      />
    ),

    error: (props: any) => (
      <ErrorToast
        {...props}
        text2NumberOfLines={2}
        style={{borderLeftColor: 'red', backgroundColor: colors.Hard_White}}
        text1Style={{
          fontSize: fontSize.normal,
          fontFamily: fontFamily.bold,
          color: colors.Hard_Black,
        }}
        text2Style={{
          fontSize: fontSize.small,
          fontFamily: fontFamily.regular,
          color: colors.Hard_Black,
        }}
      />
    ),
  };

  const [state, dispatch] = React.useReducer(
    (prevstate: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevstate,
            userToken: action.userToken,
            initialRoute: action.initialRoute,
            isLoading: false,
            isSignout: false,
            userData: action?.user,
          };

        case 'SIGN_UP':
          return {
            ...prevstate,
            isSignout: false,
            userToken: null,
            initialRoute: action.data.initialRoute,
            userData: null,
          };

        case 'SIGN_IN':
          return {
            ...prevstate,
            isSignout: false,
            userToken: action.data.token,
            initialRoute: action.data.initialRoute,
            userData: action?.user,
          };
        case 'WELCOME_USER':
          return {
            ...prevstate,
            isSignout: false,
            userToken: null,
            initialRoute: action.data.initialRoute,
            userData: null,
          };
        case 'SIGN_OUT':
          return {
            ...prevstate,
            userToken: null,
            isSignout: true,
            userData: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      initialRoute: 'Auth',
      notverified: false,
      userToken: null,
      userData: null,
    },
  );

  const authContext = React.useMemo(
    () => ({
      welcomeUser: async () => {
        try {
        } catch (error: any) {}
      },
      signIn: async (data: any) => {
        try {
          await AsyncStorage.setItem(TOKEN_PREFIX, 'temporarytoken');

          showToast(toastTypes.success, 'Login SuccessFul');

          let initialRoute = 'Auth';
          dispatch({
            type: 'SIGN_IN',
            data: {token: 'temporarytoken'},
          });
          return [null, null];
        } catch (error: any) {
          console.log(error);
          return [null, error];
        }
      },
      // RegisterOtpVerify: async (data: any) => {
      //   try {
      //     const result = await API.post('app-user/login', data);
      //     const res = result?.data?.data;
      //     await AsyncStorage.setItem(TOKEN_PREFIX, res?.token);
      //     await AsyncStorage.setItem(USER_DATA, JSON.stringify(res?.user));
      //     showToast(`${toastTypes.success}`, 'Login Successfully');
      //     let initialRoute = 'Auth';
      //     dispatch({
      //       type: 'SIGN_UP',
      //       data: {initialRoute},
      //     });
      //     return [result, null];
      //   } catch (error: any) {
      //     console.log(error);
      //     return [null, error];
      //   }
      // },

      signUp: async (data: any) => {
        return null; //API.post('app-user/singup', data);
      },
      signOut: async () => {
        try {
          await AsyncStorage.clear();
          let initialRoute = 'Auth';
          dispatch({
            type: 'SIGN_OUT',
            data: {initialRoute},
          });
        } catch (error: any) {
          console.log(error);
          return [null, error];
        }
      },
    }),
    [],
  );

  return (
    <>
      {/* <SafeAreaView style={{flex: 1}}> */}
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthContext.Provider value={authContext}>
              <AppearanceContext.Provider
                value={{
                  colors: mode == LIGHT ? colors : darkColors,
                  setloginnavigation,
                  loginnavigation,
                }}>
                <NavigationContainer
                  theme={mode === LIGHT ? _LightTheme : _DarkTheme}>
                  <RootStack.Navigator screenOptions={options}>
                    {/* <RootStack.Screen name="Auth" component={authstack} /> */}
                    {state?.userToken != null ? (
                      <RootStack.Screen name="App" component={SideDrawer} />
                    ) : (
                      <RootStack.Screen name="Auth" component={authstack} />
                    )}

                    {/* <RootStack.Screen name="App" component={SideDrawer} /> */}
                  </RootStack.Navigator>
                </NavigationContainer>
              </AppearanceContext.Provider>
            </AuthContext.Provider>
            <Toast config={toastConfig} />
          </PersistGate>
        </Provider>
      </SafeAreaView>
    </>
  );
}
