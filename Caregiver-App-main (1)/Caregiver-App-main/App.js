import * as React from "react";
import Amplify, { Auth, Storage } from "aws-amplify";
import awsConfig from "./aws-exports";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import CaregiverHomePage from "./components/HomePage/CaregiverHomePage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthenticationNavigator from "./components/CaregiverCaregiveeChoice/AuthenticationNavigator";
import { RootSiblingParent } from 'react-native-root-siblings';
import login from "./components/Server/BackendLogin";
import { LogBox } from "react-native";
//login("something");

// uncomment to disable the logging popups
LogBox.ignoreAllLogs();

Auth.configure(awsConfig);
Storage.configure({
  bucket: 'caregiver-android',
  region: 'us-east-1'
});

const Stack = createNativeStackNavigator();
export default function App() {
  const [userAuthenticated, setAuthentication] = useState(false);
  const [isCaregiver, setIsCaregiver] = useState(false);
  const [username, setUsername] = useState();
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    let isMounted = true;
    async function verifyAuthenticatedUser() {
      try {
        setAuthUser(await Auth.currentAuthenticatedUser());
        if (authUser) {
          setAuthentication(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
    verifyAuthenticatedUser();
    return () => (isMounted = false);
  }, []);

  async function logout (){
    setAuthentication(false);
    try {
      await Auth.signOut({ global: true });
      console.log("Logged Out");
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="home"
            options={{ headerShown: false }}
          >
            {(props) => userAuthenticated ? 
              <CaregiverHomePage {...props} user={authUser.username} logoutFunction={logout}></CaregiverHomePage> : 
              <AuthenticationNavigator {...props} logoutFunction={logout}></AuthenticationNavigator>}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
