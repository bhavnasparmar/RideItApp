//login.tsx
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  fontFamily,
  fontSize,
  responsiveHeight,
  responsiveWidth
} from '../../../styles/variables';
import Container from '../../../ui/container';
import CusButton from '../../../ui/custom-button';
import CusText from '../../../ui/custom-text';
import InputField from '../../../ui/InputField';
import Spacer from '../../../ui/spacer';
import Wrapper from '../../../ui/wrapper';

import { AppearanceContext } from '../../../context/appearanceContext';
import CheckBox from '../../../ui/check-box';
import { styles } from './loginStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ErrorToast } from 'react-native-toast-message';
import { TOKEN_PREFIX } from '../../../utils/Commanutils';
import { toastTypes } from '../../../constant/constants';
import { showToast } from '../../../services/toastService';

const Login = () => {
  const navigation: any = useNavigation();
  const { colors }: any = React.useContext(AppearanceContext);
  const [mobileError, setMobileError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const isFocused: any = useIsFocused();
  const [regexMobileError, setregexMobileError] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  // const [validateflag, setvalidateflag] = useState<boolean>(false);
  const [userInput, setUserInput] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);
  const [Form, setForm] = useState({
    contact: '',
    // password: '',
  });


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  useEffect(() => { }, [isFocused]);

  const validateEmailOrMobile = (input: string): { isValid: boolean; errorMessage: string | null } => {
    // const trimmedInput = input.trim();
    const trimmedInput = (input ?? '').trim();
  
    if (!trimmedInput) {
      return { isValid: false, errorMessage: 'Please enter email or mobile number' };
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;
  
    if (emailRegex.test(trimmedInput)) {
      return { isValid: true, errorMessage: null };
    }
  
    if (mobileRegex.test(trimmedInput)) {
      return { isValid: true, errorMessage: null };
    }
  
    return { isValid: false, errorMessage: 'Enter a valid email or  mobile number' };
  };
  
  const handleChange = (name: string, value: string) => {
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // const validate = async () => {
  //   Keyboard.dismiss();
  //   const value = Form.mobile_number.trim();

  //   if (!value) {
  //     setMobileError(true);
  //     setregexMobileError(false);
  //     setInputError('Please enter Phone number or Email');
  //     return;
  //   }

  //   const { isValid, errorMessage } = validateEmailOrMobile(value);

  //   if (!isValid) {
  //     setregexMobileError(true);
  //     setMobileError(false);
  //     setInputError(errorMessage ?? 'Invalid input');
  //     return;
  //   }

  //   // All good
  //   setMobileError(false);
  //   setregexMobileError(false);
  //   setInputError(null);
  //   setvalidateflag(true);
  // };


  return (
    <>
      <Container
        Xcenter
        itemPosition="center"
      /*  contentStyles={{
        display: 'flex',
        justifyContent: 'space-between',
        minHeight:
          Platform.OS === 'ios'
            ? responsiveHeight(90)
            : keyboardHeight === 0
              ? responsiveHeight(99)
              :responsiveHeight(99),
      }} */
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'height' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
          <Wrapper
            customStyles={{
              marginBottom:
                keyboardHeight === 0
                  ? 0
                  : Platform.OS === 'ios'
                    ? responsiveHeight(40)
                    : '10%',
            }}>
            {/* <Container Xcenter Ycenter> */}

            <Wrapper
              row
              justify="apart"
              customStyles={{ paddingHorizontal: responsiveWidth(0) }}>
              {/* <IonIcon color={colors.black} name="chevron-back-outline" size={25} onPress={() => { setloginnavigation(false) }} />
                            <Wrapper justify="center">
                                <TouchableOpacity onPress={() => { setloginnavigation(false) }}>
                                    <CusText
                                        text={'Skip'}
                                        color={colors.orange}
                                        title
                                        size="SN"
                                    />
                                </TouchableOpacity>
                            </Wrapper> */}
            </Wrapper>
            <Spacer y="SemiS" />
            <Wrapper position="center" row justify="center">
              <Image
                source={require('../../../assets/Images/mainlogo.png')}
                style={styles.logodesign}
                resizeMode="contain"
              />
            </Wrapper>
            <Spacer y="SemiS" />

            <TouchableOpacity>
              <CusText
                text={'Login To Your Account'}
                color={colors.darkGray}
                size="XL"
                position="center"
                title
                extraBold
              />
            </TouchableOpacity>
            <Spacer y="S" />
            <Wrapper
              position="center"
              row
              justify="center"
              width={responsiveWidth(90)}>
              
              <InputField
         preffixIcon={'person-outline'}
         value={Form.contact}
         textColor={colors.black}
         editable={true}
         suffixIcon={null}
         onChangeText={(val) => {
           setMobileError(false);
           setregexMobileError(false);
           handleChange('contact', val);
         }}
         keyboardType={
           /^[0-9]+$/.test(Form.contact) ? 'number-pad' : 'email-address'
         }
         maxLength={/^\d+$/.test(Form.contact) ? 10 : undefined}
         autoCapitalize="none"
         autoCorrect={false}
         cursorColor={colors.black}
         placeholder="Mobile/Email"
         error={inputError}
              />

            </Wrapper>
            {/* <Spacer y="XS" />
            <Wrapper
              position="center"
              row
              justify="center"
              width={responsiveWidth(90)}>
              <InputField
                preffixIcon={'lock-closed-outline'}
                suffixIcon={'eye-outline'}
                value={Form.mobile_number}
                textColor={colors.black}
                onChangeText={val => {
                  if (val) {
                    setMobileError(false);
                    setregexMobileError(false);
                  }
                  setForm({...Form, mobile_number: val});
                }}
                keyboardType="number-pad"
                maxLength={10}
                error={
                  mobileError
                    ? 'Mobile number required'
                    : regexMobileError
                    ? 'Mobile number invalid'
                    : ''
                }
                cursorColor={colors.black}
                placeholder="Password"
              />
            </Wrapper> */}
            <Spacer y="XS" />
            <Wrapper row justify="apart">
              <Wrapper row>
                <CheckBox label={''} value={true} />
                <CusText
                  text={'Remember Me'}
                  color={colors.darkGray}
                  size="N"
                  position="center"
                  title
                />
              </Wrapper>
              <Wrapper>
                {/* <TouchableOpacity onPress={() => { }}>
                  <CusText
                    text={'Forget password?'}
                    color={colors.secondary}
                    size="N"
                    position="center"
                    title
                  />
                </TouchableOpacity> */}
              </Wrapper>
            </Wrapper>
            <Spacer y="N" />
            <Wrapper
              position="center"
              justify="center"
              width={responsiveWidth(90)}>
              <CusButton
                //color={colors.black}
                loading={loading}
                width={responsiveWidth(90)}
                title="Sign In"
                textcolor={colors.white}
                onPress={() => {
                  Keyboard.dismiss();
                  const userInput = Form.contact;
              
                  const { isValid, errorMessage } = validateEmailOrMobile(userInput);
              
                  if (!isValid) {
                    setMobileError(true);
                    setInputError(errorMessage ?? null);
                  } else {
                    setMobileError(false);
                    setInputError(null);
              
                    console.log("Input is valid:", userInput);
                  }
                }}
              />
            </Wrapper>
            <Spacer y="N" />
            <Wrapper
              color={colors.white}
              row
              align="center"
              customStyles={{ borderTopWidth: 2, borderColor: colors.border }}
              justify="center">
              <Wrapper
                customStyles={{
                  position: 'absolute',
                  top: responsiveWidth(-3),
                  zIndex: 3,
                }}
                color={colors.background}>
                <CusText size="SS" text={' or continue with '} />
              </Wrapper>
            </Wrapper>

            <Spacer y="N" />
            <Wrapper row align="center" justify="center">
              <Wrapper
                color={colors.white}
                row
                justify="center"
                align="center"
                customStyles={styles.socialLogin}>
                <Image
                  style={styles.socialImg}
                  source={require('../../../assets/Images/facebook.png')}
                />
              </Wrapper>
              <Wrapper
                color={colors.white}
                row
                justify="center"
                align="center"
                customStyles={styles.socialLogin}>
                <Image
                  style={styles.socialImg}
                  source={require('../../../assets/Images/google.png')}
                />
              </Wrapper>
            </Wrapper>

            <Spacer y="L" />
          </Wrapper>
        </KeyboardAvoidingView>
      </Container>
      <Wrapper position="center">
        <Wrapper row>
          <CusText text="Don't have an account? " position="center" />
          <CusText
            text="Sign Up"
            color={colors.secondary}
            extraBold
            onPress={() => {
              navigation.navigate('Register');
            }}
          />
        </Wrapper>
      </Wrapper>
      <Spacer y="N" />
      {/* </Container> */}
    </>
  );
};

export default Login;
