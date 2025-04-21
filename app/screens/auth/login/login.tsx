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
  const {colors}: any = React.useContext(AppearanceContext);
  const [mobileError, setMobileError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const isFocused: any = useIsFocused();
  const [regexMobileError, setregexMobileError] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [Form, setForm] = useState({
    mobileNo: '',
    password: '',
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
  useEffect(() => {}, [isFocused]);


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
              customStyles={{paddingHorizontal: responsiveWidth(0)}}>
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
                value={Form.mobileNo}
                textColor={colors.black}
                onChangeText={val => {
                  if (val) {
                    setMobileError(false);
                    setregexMobileError(false);
                  }
                  setForm({...Form,mobileNo: val});
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
                placeholder="Mobile/Email"
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
                value={Form.mobileNo}
                textColor={colors.black}
                onChangeText={val => {
                  if (val) {
                    setMobileError(false);
                    setregexMobileError(false);
                  }
                  setForm({...Form, mobileNo: val});
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
                <TouchableOpacity onPress={() => {}}>
                  <CusText
                    text={'Forget password?'}
                    color={colors.secondary}
                    size="N"
                    position="center"
                    title
                  />
                </TouchableOpacity>
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
                onPress={() => {}}
              />
            </Wrapper>
            <Spacer y="N" />
            <Wrapper
    color={colors.white}
              row
              align="center"
              customStyles={{borderTopWidth: 2, borderColor: colors.border}}
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
      <Spacer y="XXS" />
      {/* </Container> */}
    </>
  );
};

export default Login;
