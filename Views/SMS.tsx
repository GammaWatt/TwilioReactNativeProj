import * as React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button,
    TextInput,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { encode as btoa } from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Section: React.FC<{
    title: string;
}> = ({ children, title }) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}>
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },
                ]}>
                {children}
            </Text>
        </View>
    );
};


const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});


const storeData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        // saving error
        console.error(e)
    }
}

const getData = async (key: string, callback: (x: string) => void) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            // value previously stored
            callback(value)
        }
    } catch (e) {
        // error reading value
        console.error(e)
    }
}

const SMS = () => {
    const [sid, onchangesid] = React.useState('')
    const [token, onchangetoken] = React.useState('')
    const [myPhone, onchangemyphone] = React.useState('')
    const [targetPhone, onchangetargetphone] = React.useState('')
    const [msgBody, onchangemsgbody] = React.useState('')

    getData('TwilioSID', (value) => onchangesid(value))
    getData('TwilioToken', (value) => onchangetoken(value))
    getData('Phone', (value) => onchangemyphone(value))
    getData('Target Phone', (value) => onchangetargetphone(value))

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    }}>
                    <Section title="API Keys">
                        <View>
                            <Text
                                selectable={true}
                                selectionColor='orange'
                                style={{ color: '#888888' }}
                            >
                                Phone #  +17163034605
                            </Text>
                            <TextInput
                                style={{ color: '#FFFF00' }}
                                onChangeText={onchangemyphone}
                                value={myPhone}
                            />
                        </View>
                        <View>
                            <Text
                                selectable={true}
                                selectionColor='orange'
                                style={{ color: '#888888' }}
                            >
                                SID  AC506e5d9f84f88bf16c657cd783971326
                            </Text>
                            <TextInput
                                style={{ color: '#FFFF00' }}
                                onChangeText={onchangesid}
                                value={sid}
                            />
                        </View>
                        <View>
                            <Text
                                selectable={true}
                                selectionColor='orange'
                                style={{ color: '#888888' }}
                            >
                                Token 9184823d0be70d90bf03b2921bccc349
                            </Text>
                            <TextInput
                                style={{ color: '#FFFF00' }}
                                onChangeText={onchangetoken}
                                value={token}
                            />
                        </View>
                        <Button
                            title="Save"
                            onPress={() => {
                                storeData('TwilioSID', sid);
                                storeData('TwilioToken', token);
                                storeData('Phone', myPhone);
                            }}
                        />
                    </Section>
                    <View>
                        <Text>To</Text>
                        <TextInput
                            style={{ height: 50, color: '#000000', flex: 1, borderWidth: 1, borderColor: 'darkgrey', backgroundColor: 'grey' }}
                            onChangeText={(e) => { onchangetargetphone(() => { console.log(e); return e; }) }}
                            value={targetPhone}
                            placeholder={'bar'}
                        />
                    </View>
                    <View>
                        <Text>SMS Message</Text>
                        <TextInput
                            style={{ height: 50, color: '#000000', flex: 1, borderWidth: 1, borderColor: 'darkgrey', backgroundColor: 'grey' }}
                            onChangeText={(e) => { onchangemsgbody(() => { console.log(e); return e; }) }}
                            value={msgBody}
                            placeholder={'foo'}
                        />
                    </View>
                    <View>
                        <Button
                            title="test"
                            onPress={() => {
                                console.log('test');
                            }}
                        />
                    </View>
                    <Section title="Step One">
                        <View>
                            <Button
                                title="Big fat button to tap"
                                onPress={() => {
                                    const AccountSID = sid;
                                    const AccountToken = token;

                                    const url = `https://api.twilio.com/2010-04-01/Accounts/${AccountSID}/Messages.json`

                                    const formData = Object.entries({
                                        To: targetPhone,
                                        From: myPhone,
                                        Body: msgBody
                                    })
                                        .map(e => encodeURIComponent(e[0]) + '=' + encodeURIComponent(e[1]))
                                        .join("&");

                                    fetch(url, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded',
                                            'Authorization': `Basic ${btoa(AccountSID + ":" + AccountToken)}`
                                        },
                                        body: formData
                                    })
                                        .then(e => console.log(e.text()))
                                        .catch(e => console.log(e))
                                }}
                            />
                        </View>
                    </Section>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


export default SMS;