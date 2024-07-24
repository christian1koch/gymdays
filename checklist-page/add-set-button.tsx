import React from "react";
import { View, Pressable, GestureResponderEvent } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

interface AddSetButtonProps {
  onPress: null | ((event: GestureResponderEvent) => void) | undefined;
}

const AddSetButton: React.FC<AddSetButtonProps> = ({ onPress }) => {
  return (
    <View style={{ marginLeft: 5, marginRight: 5 }}>
      <Pressable onPress={onPress}>
        <Entypo name="circle-with-plus" size={42} color="#18181b" />
      </Pressable>
    </View>
  );
};

export default AddSetButton;
