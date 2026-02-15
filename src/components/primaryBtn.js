import { Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../utils/globalStyles";

export const PrimaryBtn = ({ callbackFn, btnText }) => {
    return <TouchableOpacity onPress={callbackFn} className={`mb-6 p-2 rounded-xl px-6 justify-center items-center border`} style={[globalStyles.bgYellow]}>
        <Text style={[globalStyles.black]} className="font-bold">{btnText}</Text>
    </TouchableOpacity>;
}