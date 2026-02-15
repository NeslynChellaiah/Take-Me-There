import { Button, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, Image } from "react-native"
import { colors, globalStyles } from "../utils/globalStyles";
import Svg, { Path } from "react-native-svg";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import { ValidationError } from "../components/validationError";
import { Snackbar } from "react-native-paper";
import { PrimaryBtn } from "../components/primaryBtn";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import axios from "axios";
import { backendUrl } from "../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";




export const LoginScreen = () => {
  const [isSignUp, seIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [btnClicked, setBtnClicked] = useState(false);
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [mobile, setMobile] = useState();
  const [dob, setDob] = useState(new Date())

  const dobChange = (event, selectedDate) => {
    if (selectedDate) {
      setDob(selectedDate);
    }
  };


  const signInOrUp = async () => {
    setBtnClicked(true);
    if (isSignUp) {
      if (!email.trim() || !name.trim() || !password.trim().length >= 6 || mobile.length !== 10) {
        return;
      }
      if (password !== confirmPassword) {
        return;
      }
    } else if (!isSignUp) {
      if (!email.trim() || !password.trim()) {
        return;
      }
    }

    try {
      const resp = await (isSignUp ? createUserWithEmailAndPassword(auth, email, password) : signInWithEmailAndPassword(auth, email, password));
      if (isSignUp) {
        const user = await axios.post(backendUrl + '/user', {
          "name": name,
          "mobile": mobile,
          "email": email,
          "id": resp?.user?.uid,
          "dob": dob
        });
      }
      await axios.get(backendUrl + '/user', { headers: { uid: resp?.user?.uid } }).then(async (response) => {
        const user = response.data;
        await AsyncStorage.setItem('user', JSON.stringify({ name: user?.name, mobile: user?.mobile, email: user.email, dob: user?.dob, id: user?.id }));
      })
        .catch(err => {
          console.log(err);
        });
    } catch (e) {
      isSnackBarVisible && setIsSnackBarVisible(false);
      setSnackMessage(e.message);
      setIsSnackBarVisible(true);
      console.log(e.message, e.toString());
    }
  }

  const toggleSignUp = () => {
    seIsSignUp(!isSignUp);
    setBtnClicked(false);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, globalStyles.bgWhite, { paddingTop: StatusBar.currentHeight }]}>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className='items-center flex-1  justify-center content-center overflow-y-scroll' >
          <Svg
            height="60%"
            width="100%"
            style={{ position: 'absolute', top: 0 }}
          >
            <Path
              fill="#ffbe00"
              d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            />
          </Svg>

          <View className='w-full mb-4 px-20'>
            <Text className="font-bold">Email *</Text>
            <TextInput style={[globalStyles.credInput, globalStyles.bgWhite, { borderColor: (btnClicked && !email.trim()) ? colors.red : colors.black }]} value={email} onChangeText={setEmail} />
            {(btnClicked && !email.trim()) && <ValidationError message={'Email cannot be empty.'} />}
          </View>
          {
            isSignUp && <>
              <View className='w-full mb-6 px-20'>
                <Text className="font-bold">Name *</Text>
                <TextInput style={[globalStyles.credInput, globalStyles.bgWhite, { borderColor: (btnClicked && !name.trim()) ? colors.red : colors.black }]} value={name} onChangeText={setName} />
                {(btnClicked && !name.trim()) && <ValidationError message={'Name cannot be empty.'} />}
              </View>
              <View className='w-full mb-6 px-20'>
                <Text className="font-bold">Mobile Number *</Text>
                <TextInput maxLength={10} keyboardType="numeric" style={[globalStyles.credInput, globalStyles.bgWhite, { borderColor: (btnClicked && mobile.length != 10) ? colors.red : colors.black }]} value={mobile} onChangeText={setMobile} />
                {(btnClicked && mobile.trim().length != 10) && <ValidationError message={mobile.trim() ? 'Mobile number should be of 10 digits.' : 'Mobile Number cannot be empty.'} />}
              </View>
              <View className='w-full mb-6 px-20 flex-row items-center'>
                <Text className="font-bold">Date of Birth *</Text>
                <DateTimePicker
                  value={dob}
                  mode="date"
                  display="default"
                  onChange={dobChange}
                />
              </View>
            </>
          }
          <View className='w-full mb-6 px-20'>
            <Text className="font-bold">Password *</Text>
            <TextInput secureTextEntry={true} className='w-full' style={[globalStyles.credInput, globalStyles.bgWhite, { borderColor: (btnClicked && !password.trim()) ? colors.red : colors.black }]} value={password} onChangeText={setPassword} />
            {(btnClicked && password.trim().length < 6) && <ValidationError message={'Password should be at least 6 characters.'} />}
          </View>

          {
            isSignUp &&
            <View className='w-full mb-6 px-20'>
              <Text className="font-bold">Confirm Password *</Text>
              <TextInput secureTextEntry={true} className='w-full' style={[globalStyles.credInput, globalStyles.bgWhite, { borderColor: (btnClicked && !confirmPassword.trim()) ? colors.red : colors.black }]} value={confirmPassword} onChangeText={setConfirmPassword} />
              {(password !== confirmPassword) && <ValidationError message={'Password does not match.'} />}
            </View>
          }

          <PrimaryBtn callbackFn={signInOrUp} btnText={!isSignUp ? 'Login' : 'Sign Up'} />

          <View className='flex-row'>
            <Text className='mr-2'>
              {isSignUp ? "Have an account?" : "New user?"}
            </Text>
            <TouchableOpacity onPress={toggleSignUp}>
              <Text style={[globalStyles.yellow]} className='font-bold'>{isSignUp ? 'Login' : 'Sign Up'}</Text>
            </TouchableOpacity>
          </View>

          <Snackbar
            visible={isSnackBarVisible}
            onDismiss={() => setIsSnackBarVisible(false)}
            duration={2000}
          >
            {snackMessage}
          </Snackbar>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

});