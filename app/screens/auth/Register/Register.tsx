//login.tsx
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import {
  // colors,
  responsiveHeight,
  responsiveWidth,
} from '../../../styles/variables';
import Container from '../../../ui/container';
import CusButton from '../../../ui/custom-button';
import CusText from '../../../ui/custom-text';
import InputField from '../../../ui/InputField';
import Spacer from '../../../ui/spacer';
import Wrapper from '../../../ui/wrapper';

import { AppearanceContext } from '../../../context/appearanceContext';
import { styles } from './RegisterStyle';

const Register = () => {
  const navigation: any = useNavigation();
  const { colors }: any = React.useContext(AppearanceContext);

  const [mobileError, setMobileError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const isFocused: any = useIsFocused();
  const [regexMobileError, setregexMobileError] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [nameError, setNameError] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);
  // const [Form, setForm] = useState({
  //   name: '',
  //   mobile_number: '',
  // });

  const [Form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    mobile: '',
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

  const validateForm = () => {
    let isValid = true;

    if (!Form.name.trim()) {
      setNameError(true);
      isValid = false;
    }

    const { isValid: mobileValid, errorMessage } = validateEmailOrMobile(Form.contact);
    if (!mobileValid) {
      setInputError(errorMessage);
      isValid = false;
    }

    return isValid;
  };


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
    let updatedForm = {
      ...Form,
      [name]: value,
    };

    if (name === 'contact') {
      // const trimmed = value.trim();
      const trimmed = (value ?? '').trim(); 
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const mobileRegex = /^[0-9]{10}$/;

      if (emailRegex.test(trimmed)) {
        updatedForm.email = trimmed;
        updatedForm.mobile = '';
      } else if (mobileRegex.test(trimmed)) {
        updatedForm.mobile = trimmed;
        updatedForm.email = '';
      } else {
        updatedForm.email = '';
        updatedForm.mobile = '';
      }
    }

    setForm(updatedForm);
  };


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
        <Spacer y="SemiS" />
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


            <CusText
              text={'Create Your Account'}
              color={colors.darkGray}
              size="XL"
              position="center"
              title
              extraBold
            />

            <Spacer y="S" />
            <Wrapper
              position="center"
              row
              justify="center"
              width={responsiveWidth(90)}>
              <InputField
                preffixIcon={'person-outline'}
                value={Form.name}
                textColor={colors.black}
                onChangeText={val => {
                  setNameError(false);
                  setForm({ ...Form, name: val });
                }}
                keyboardType="number-pad"
                maxLength={10}
                error={nameError ? 'Name is required' : ''}
                cursorColor={colors.black}
                placeholder="User Name"
              />
            </Wrapper>
            <Spacer y="XS" />
            <Wrapper
              position="center"
              row
              justify="center"
              width={responsiveWidth(90)}>
              {/* <InputField
                preffixIcon={'mail-outline'}
                value={Form.mobileEmail}
                textColor={colors.black}
                onChangeText={val => {
                  if (val) {
                    setMobileError(false);
                    setregexMobileError(false);
                  }
                  setForm({...Form, mobileEmail: val});
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
              /> */}
              <InputField
                preffixIcon={'mail-outline'}
                value={Form.contact}
                textColor={colors.black}
                editable={true}
                suffixIcon={null}
                onChangeText={(val) => {
                  setMobileError(false);
                  setregexMobileError(false);
                  setInputError(null);
                  handleChange('contact', val);
                }}
                keyboardType={/^[0-9]+$/.test(Form.contact) ? 'number-pad' : 'email-address'}
                maxLength={/^\d+$/.test(Form.contact) ? 10 : undefined}
                autoCapitalize="none"
                autoCorrect={false}
                cursorColor={colors.black}
                placeholder="Mobile/Email"
                error={inputError}
              />
            </Wrapper>
            {/* <Spacer y="XS" />
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
            </Wrapper> */}
            <Spacer y="N" />
            <Wrapper
              position="center"
              justify="center"
              width={responsiveWidth(90)}>
              <CusButton
                loading={loading}
                width={responsiveWidth(90)}
                title="Get OTP"
                textcolor={colors.white}
                onPress={() => {
                  // navigation.navigate('Otp');

                  if (validateForm()) {
                    navigation.navigate('Otp', {
                      name: Form.name,
                      contact: Form.contact,
                      email: Form.email,
                      mobile: Form.mobile,
                    });
                  }
                }}
              />
            </Wrapper>

            <Spacer y="N" />

            <Wrapper
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
                row
                color={colors.white}
                justify="center"
                align="center"
                customStyles={styles.socialLogin}>
                <Image
                  style={styles.socialImg}
                  source={require('../../../assets/Images/facebook.png')}
                />
              </Wrapper>
              <Wrapper
                row
                color={colors.white}
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
            text="Sign In"
            color={colors.secondary}
            bold
            onPress={() => {
              navigation.navigate('Login');
            }}
          />
        </Wrapper>
      </Wrapper>
      <Spacer y="N" />
      {/* </Container> */}
    </>
  );
};

export default Register;
