import {Image, TouchableOpacity, View} from 'react-native';
import Wrapper from '../../../ui/wrapper';
import Spacer from '../../../ui/spacer';
import CusText from '../../../ui/custom-text';
import {borderRadius, responsiveWidth} from '../../../styles/variables';
import InputField from '../../../ui/InputField';
import React, {useContext, useRef, useState} from 'react';
import {AppearanceContext} from '../../../context/appearanceContext';
import Container from '../../../ui/container';
import CusButton from '../../../ui/custom-button';
import LinearGradient from 'react-native-linear-gradient';

import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {styles} from './OtpStyle';
import {showToast} from '../../../services/toastService';
import {toastTypes} from '../../../constant/constants';

const Otp = ({route}: any) => {
  const {colors}: any = React.useContext(AppearanceContext);
  const navigation: any = useNavigation();

  const [Form, setForm] = useState({
    inputfeild1: '',
    inputfeild2: '',
    inputfeild3: '',
    inputfeild4: '',
    inputfeild5: '',
    inputfeild6: '',
  });

  const input1: any = useRef();
  const input2: any = useRef();
  const input3: any = useRef();
  const input4: any = useRef();
  const input5: any = useRef();
  const input6: any = useRef();

  const [inputError, setInputError] = useState(false);
  const [inputError2, setInputError2] = useState(false);
  const [loading, setloading] = useState(false);
  const isFocused = useIsFocused();
  const [Data, setData] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      if (route?.params?.registerData) {
        setData(
          route?.params?.registerData ? route?.params?.registerData : null,
        );
      }

      return () => {
        setForm({
          ...Form,
          inputfeild1: '',
          inputfeild2: '',
          inputfeild3: '',
          inputfeild4: '',
          inputfeild5: '',
          inputfeild6: '',
        });
      };
    }, [isFocused]),
  );

  const inputKeyPress = (e: any, prev: any, next: any, inputName: any) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (prev != '') {
        prev.current?.focus();
      }
    } else if (e.nativeEvent.key === '-' || e.nativeEvent.key === '.') {
    } else {
      if (next != '' && e.nativeEvent.key != '') {
        next.current?.focus();
      }
    }
  };

  return (
    <>
      <Spacer y="SemiS" />
      <Wrapper position="center" row justify="center">
        <Image
          source={require('../../../assets/Images/mainlogo.png')}
          style={styles.logodesign}
          resizeMode="contain"
        />
      </Wrapper>
      <Spacer y="SemiS" />
      <Container Xcenter itemPosition="center">
        {!route?.params?.registerData ? (
          <>
            <Wrapper
              position="center"
              align="center"
              width={responsiveWidth(100)}>
              <CusText
                text="OTP Verification"
                size="L"
                color={colors.black}
                extraBold
              />
            </Wrapper>
            <Spacer y="N" />

            <Wrapper row justify="spEven" width={responsiveWidth(100)}>
            
              <InputField
                textColor={colors.black}
                label=""
                placeholder="*"
                keyboardType="numeric"
                value={Form.inputfeild1}
                maxLength={1}
                bordered={true}
                width={45}
                textAlign={'center'}
                ref={input1}
                onKeyPress={e => {
                  inputKeyPress(e, '', input2, 'inputfeild1');
                }}
                onChangeText={value => {
                  if (value) {
                    setInputError(false);
                  }
                  setForm({
                    ...Form,
                    inputfeild1: value != '.' && value != '-' ? value : '',
                  });
                }}
                textContentType="oneTimeCode"
              />

              <InputField
               textColor={colors.black}
                label=""
               placeholder="*"
                value={Form.inputfeild2}
                maxLength={1}
                keyboardType="numeric"
                bordered={true}
                width={45}
                textAlign={'center'}
                ref={input2}
                onKeyPress={e => {
                  inputKeyPress(e, input1, input3, 'inputfeild2');
                }}
                onChangeText={value => {
                  if (value) {
                    setInputError(false);
                  }
                  setForm({
                    ...Form,
                    inputfeild2: value != '.' && value != '-' ? value : '',
                  });
                }}
                textContentType="oneTimeCode"
              />
              <InputField
               textColor={colors.black}
                label=""
                placeholder="*"
                keyboardType="numeric"
                value={Form.inputfeild3}
                maxLength={1}
                bordered={true}
                width={45}
                textAlign={'center'}
                ref={input3}
                onKeyPress={e => {
                  inputKeyPress(e, input2, input4, 'inputfeild3');
                }}
                onChangeText={value => {
                  if (value) {
                    setInputError(false);
                  }
                  setForm({
                    ...Form,
                    inputfeild3: value != '.' && value != '-' ? value : '',
                  });
                }}
                textContentType="oneTimeCode"
              />
              <InputField
               textColor={colors.black}
                label=""
               placeholder="*"
                keyboardType="numeric"
                value={Form.inputfeild4}
                maxLength={1}
                bordered={true}
                width={45}
                textAlign={'center'}
                ref={input4}
                onKeyPress={e => {
                  inputKeyPress(e, input3, input5, 'inputfeild4');
                }}
                onChangeText={value => {
                  if (value) {
                    setInputError(false);
                  }
                  setForm({
                    ...Form,
                    inputfeild4: value != '.' && value != '-' ? value : '',
                  });
                }}
                textContentType="oneTimeCode"
              />
              <InputField
               textColor={colors.black}
                label=""
                placeholder="*"
                keyboardType="numeric"
                value={Form.inputfeild5}
                maxLength={1}
                bordered={true}
                width={45}
                textAlign={'center'}
                ref={input5}
                onKeyPress={e => {
                  inputKeyPress(e, input4, input6, 'inputfeild5');
                }}
                onChangeText={value => {
                  if (value) {
                    setInputError(false);
                  }
                  setForm({
                    ...Form,
                    inputfeild5: value != '.' && value != '-' ? value : '',
                  });
                }}
                textContentType="oneTimeCode"
              />
              <InputField
               textColor={colors.black}
                label=""
                placeholder="*"
                keyboardType="numeric"
                value={Form.inputfeild6}
                maxLength={1}
                bordered={true}
                width={45}
                textAlign={'center'}
                ref={input6}
                onKeyPress={e => {
                  inputKeyPress(e, input5, '', 'inputfeild6');
                }}
                onChangeText={value => {
                  if (value) {
                    setInputError(false);
                  }
                  setForm({
                    ...Form,
                    inputfeild6: value != '.' && value != '-' ? value : '',
                  });
                }}
                textContentType="oneTimeCode"
              />
            </Wrapper>
            <Spacer y="N" />
            {inputError == true ? (
              <Wrapper row justify="center">
                <CusText
                  size={'S'}
                  text={
                    inputError
                      ? (Form.inputfeild1 && Form.inputfeild2) ||
                        Form.inputfeild3 ||
                        Form.inputfeild4
                        ? 'Enter valid OTP'
                        : 'OTP is required'
                      : ''
                  }
                  error
                />
              </Wrapper>
            ) : null}
          </>
        ) : null}

        <Wrapper row justify="right" width={responsiveWidth(96)}>
          <Wrapper>
            <TouchableOpacity onPress={() => {}}>
              <CusText
                text={'Resend OTP'}
                color={colors.secondary}
                size="N"
                position="center"
                title
              />
            </TouchableOpacity>
          </Wrapper>
        </Wrapper>
        <Spacer y="N" />

        {/* <CusButton
          loading={loading}
          width={responsiveWidth(80)}
          title="Submit"
          lgcolor1={colors.primary}
          lgcolor2={colors.secondary}
          position="center"
          radius={borderRadius.ring}
          onPress={() => {
            if (route?.params?.registerData) {
              onSubmit();
            } else {
              navigation.navigate('ResetPassword');
            }

            //
          }}
        /> */}
        <Wrapper position="center" justify="center" width={responsiveWidth(90)}>
          <CusButton
            loading={loading}
            width={responsiveWidth(90)}
            title="Submit"
            textcolor={colors.white}
            onPress={() => {}}
          />
        </Wrapper>
        <Spacer y="L" />
        <Wrapper row justify="center">
          <Wrapper>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <CusText
                text={'Back To Login'}
                color={colors.black}
                size="N"
                position="center"
                title
              />
            </TouchableOpacity>
          </Wrapper>
        </Wrapper>
      </Container>
    </>
  );
};

export default Otp;
