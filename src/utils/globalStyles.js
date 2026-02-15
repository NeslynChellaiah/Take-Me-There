import { StyleSheet } from "react-native";

export const colors = {
    red: '#ca1f3d',
    yellow: '#ffbe00',
    black: '#25182e',
    white: '#fffafa'
}

export const globalStyles = StyleSheet.create({
    bgRed: {
        backgroundColor: colors.red
    },
    bgYellow: {
        backgroundColor: colors.yellow
    },
    bgBlack: {
        backgroundColor: colors.black
    },
    bgWhite: {
        backgroundColor: colors.white
    },
    red: {
        color: colors.red
    },
    yellow: {
        color: colors.yellow
    },
    black: {
        color: colors.black
    },
    white: {
        color: colors.white
    },
    credInput: {
        height: 40,
        padding: 8,
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 8
    }
});