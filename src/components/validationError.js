import { Text } from "react-native"
import { colors } from "../utils/globalStyles"

export const ValidationError = ({message}) => {
    return <Text style={[{color: colors.red}]}>{message}</Text>
}