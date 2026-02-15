import { Image, Text, TouchableOpacity, View } from "react-native";

const cabImages = {
  sedan: require("../../assets/sedan.png"),
  auto: require("../../assets/auto.png"),
  hatchback: require("../../assets/hatch.png"),
};

export const CabType = ({ cabType }) => {
  return (
    <TouchableOpacity onPress={()=>alert()} className="p-4 mx-4 mt-4 bg-[#ffbe00]/[0.70] rounded-sm border border-[#25182e] drop-shadow-xl">
      <View className="flex flex-row justify-between items-center">
        <View className="flex justify-center items-center">
          <Image source={cabImages[cabType.type]} style={{ width: 75, height: 50 }} />
          <Text className="font-bold capitalize">{cabType.type}</Text>
        </View>
        <Text className="font-bold">₹ 123-123</Text>
      </View>
    </TouchableOpacity>
  );
};
