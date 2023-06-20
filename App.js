//web     851956817755-amm1dqdv0km26j2k3pfnde5dlc0pjkd6.apps.googleusercontent.com
//android 851956817755-k6luh4v6aat83mre2pisf77e4j949nv0.apps.googleusercontent.com
// 851956817755-fi757630crk39t10s6eashiqu6rjl67e.apps.googleusercontent.com


import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, ScrollView} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from './components/Card';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  // const [token, setToken] = useState("");
  // const [refreshing, setRefreshing] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState(null);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  // });
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "851956817755-k6luh4v6aat83mre2pisf77e4j949nv0.apps.googleusercontent.com",
    webClientId: "851956817755-hi2tqbv3gfkdanqun35lelvkcvndllh4.apps.googleusercontent.com",
    expoClientId: "851956817755-fi757630crk39t10s6eashiqu6rjl67e.apps.googleusercontent.com",
    // scopes:['openId','profile','email'],
    prmopt:'consent',
  });

  React.useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
  
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication.accessToken);
        }
      }
     else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(JSON.parse(user));
    } catch (error) {
      // Add your own error handler here
    }
  };

  return (
    <View style={styles.container}>
      {/* <ScrollView vertical={true}> */}

      <View>
      <Text style={styles.text}>Hello and welcome to our React-Native App!!</Text>
      </View>
      <Card
        imageSource={require('./assets/the-dark-knight.jpg')}
        title="The Dark Knight"
        description="This movie was released in 2008."
      />

    {!userInfo ? (
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            promptAsync();
            onRefresh();
          }}
        />
        
      ) : (
        <View>
          {/* <Text style={styles.text}>Successful Login.</Text> */}
          <Card
        imageSource={require('./assets/dark-knight-rises.jpg')}
        title="Dark Knight Rises"
        description="This movie was released in 2012."
      />
      <Button
      title="remove info"
      onPress={async () => {await AsyncStorage.removeItem("@user");
      setUserInfo(null);}}
    />
          </View>
          )}

      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
    fontWeight: "bold",
    marginBottom: 48,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    alignItems: 'center',
    // paddingLeft: 60,
  },
});
