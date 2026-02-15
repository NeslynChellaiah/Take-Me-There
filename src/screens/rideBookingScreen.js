import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { colors, globalStyles } from "../utils/globalStyles";
import { CabType } from "../components/cabType";
import { PrimaryBtn } from "../components/primaryBtn";
const cabType = [{
    id: 1,
    type: "auto"
},
{
    id: 2,
    type: "sedan"
},
{
    id: 3,
    type: "hatchback"
},
]
export const RideBookingScreen = () => {
    return (
        <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : undefined} behavior={Platform.OS === 'ios' ? 'padding' : undefined} className='relative flex-1 justify-end items-center'>
            <View style={[globalStyles.bgWhite]} className='w-full pb-4' >
                <TextInput placeholder="Pick Up" style={[globalStyles.credInput, styles.input]} className='mx-4 rounded-md' />
                <TextInput placeholder="Drop" style={[globalStyles.credInput, styles.input]} className='mx-4 rounded-md' />
                <FlatList
                    className='h-64 border-t mt-4 p2'
                    data={cabType}
                    renderItem={({ item }) => {
                        return (
                            <CabType cabType={item} onPress={() => alert()}/>
                        )
                    }}
                    keyExtractor={item => item.id}
                />
            </View>
            <View style={[globalStyles.bgWhite]} className='w-full pb-4 justify-end items-center'>
                <PrimaryBtn callbackFn={() => {}} btnText={"Request Ride"}/>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

});