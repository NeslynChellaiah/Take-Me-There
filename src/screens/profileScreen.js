import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { userImage } from '../utils/constants';
import { colors, globalStyles } from '../utils/globalStyles';
import { PrimaryBtn } from '../components/primaryBtn';
import { useEffect, useState } from 'react';
import { SecondaryBtn } from '../components/secondaryBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';




export const ProfileScreen = () => {

    const [user, setUser] = useState({});
    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await AsyncStorage.getItem('user');
                return JSON.parse(user);
            } catch (e) {
                console.log("Something went wrong", e)
            }
        }
        (async () => {
            const user = await getUser();
            setUser(user);
        })()
    }, [])

    const [isEdit, setIsEdit] = useState(false)
    const saveChanges = () => {
        setIsEdit(false)
    }

    const toggleEdit = () => {
        setIsEdit(true)
    }

    const revertChanges = () => {
        setIsEdit(false)
    }

    return <>
        <View className="flex-1 justify-between items-center px-20" style={[globalStyles.bgWhite]}>
            <View className="mt-20 flex w-full">
                <Avatar.Image className="self-center rounded-xl" size={100} source={{ uri: "data:image/png;base64," + userImage }} />
                <View className="justify-self-start">
                    <View className="flex-row mt-12">
                        <View>
                            <Text className="font-bold">Name: </Text>
                            <Text className="font-bold">Mobile: </Text>
                            <Text className="font-bold">E-Mail: </Text>
                            <Text className="font-bold">Date 0f Birth: </Text>
                        </View>

                        <View>
                            <Text className=" ">{user?.name}</Text>
                            <Text className=" ">{user?.mobile}</Text>
                            <Text className=" ">{user?.email}</Text>
                            <Text className=" ">{user?.dob}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View className="flex-row w-full justify-center mt-6">
                <PrimaryBtn callbackFn={isEdit ? saveChanges : toggleEdit} btnText={isEdit ? "Save" : "Edit"} />
                {isEdit && <SecondaryBtn classes={"ml-4"} callbackFn={revertChanges} btnText={"cancel"} />}
            </View>
        </View>
    </>
}

const styles = StyleSheet.create({

});