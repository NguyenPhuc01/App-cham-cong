import { View, Text, Button } from "react-native";

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={() => route.params?.onLogin()} />
    </View>
  );
}
