import { Text, TouchableOpacity } from "react-native";
import { colors, globalStyles } from "../utils/globalStyles";

export const SecondaryBtn = ({ callbackFn, btnText, classes }) => {
    return <TouchableOpacity onPress={callbackFn} className={`mb-6 p-2 rounded-xl px-6 justify-center items-center border `+classes} style={[globalStyles.bgBlack, {borderColor: colors.yellow}]}>
        <Text style={[globalStyles.white]} className="font-bold">{btnText}</Text>
    </TouchableOpacity>;
}