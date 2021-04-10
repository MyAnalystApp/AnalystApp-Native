import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, LogBox, PermissionsAndroid, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import ManualAdd from './ManualAdd';
import RenderProducts from './RenderProducts';

const { width } = Dimensions.get("window");

export default function ScanBill({ /*categoriesData, people,*/ AddProductSaveButtonHandler, ScanBillDoneButtonHandler }) {

    const [image, setImage] = useState(null);
    const [scannedData, setScannedData] = useState(false);
    const [viewMode, setViewMode] = useState("scan");

    const doneButtonHandler = (productList, totalExpenseForUser) => {
        ScanBillDoneButtonHandler(productList, totalExpenseForUser);
        setImage(null);
        setScannedData(null);
    }

        /** Main ML code */

    const ocr_with_py = async (src) => {
        console.log("Inside ocr_with_py");
        fetch("http://c6f7c5517705.ngrok.io/image_ocr",{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                src: src
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log("This is inside ocr_with_py method :");
            console.log(data)
            setScannedData(data);
        })
        .catch(err=>{
            console.log(err);
            Alert.alert("Some Error while processing the image.")
        })
    }

    const handleUpload = async(image) =>{
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'OCR_InOut')
        data.append("cloud_name", "graystack")
        console.log(image)
        fetch("https://api.cloudinary.com/v1_1/graystack/image/upload",{
          method:"post",
          body:data
        }).then(res=>res.json())
        .then(data=>{
          console.log(data.secure_url)
          ocr_with_py(data.secure_url)
        })
        .catch((err) => {
            console.log(err);
        })
    }

        /** Main ML code END */


        /** ScanBill Buttons */

    useEffect(() => {
        // (async () => {
        // if (Platform.OS !== 'web') {
        //     const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        //     if (status !== 'granted') {
        //     Alert.alert('Sorry, we need camera roll permissions to make this work!');
        //     }
        // }
        // })();

        LogBox.ignoreLogs(['Functions are not valid as a React child']);
    }, []);

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                    title: 'Camera Permission',
                    message: 'App needs camera permission',
                    },
                );

                // If CAMERA Permission is granted
                if(granted==='granted') {
                    return true;
                }
            } catch (err) {
                console.log("Permission Denied for 1st permission",err);
                return false;
            }
        } else {
            console.log("Returning true from 1st permission");
            return true;
        }
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                    title: 'External Storage Write Permission',
                    message: 'App needs write permission',
                    },
                );

                // If WRITE_EXTERNAL_STORAGE Permission is granted
                if(granted==='never_ask_again') {
                    return true;
                }
            } catch (err) {
                console.log("Permission Denied for 2nd permission",err);
                Alert.alert('Write permission err', err);
                return false;
            }
        } else {
            console.log("Returning true from 2nd permission");
            return true;
        }

        return true;
    };

    const clickImage = async () => {
        console.log("Take photo is pressed");

        let options = {
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
            includeBase64: true,
        };

        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, (response) => {
        
                //console.log('base64 -> ', response.base64);   // Bahot bada text (galti se bhi print matt karao)
                console.log('uri -> ', response.uri);
                console.log('width -> ', response.width);
                console.log('height -> ', response.height);
                console.log('fileSize -> ', response.fileSize);
                console.log('type -> ', response.type);
                console.log('fileName -> ', response.fileName);
                //setFilePath(response);

                if (response.errorCode == 'camera_unavailable') {
                    Alert.alert('Camera not available on device');
                    return;
                } else if (response.errorCode == 'permission') {
                    Alert.alert('Permission not satisfied');
                    return;
                } else if (response.errorCode == 'others') {
                    Alert.alert(response.errorMessage);
                    return;
                } else {
                    setImage(response);

                    // YAHA hai image @GrayStack

                    // if (!result.cancelled) {
                    //     setImage(result);
                    //     let name = result.uri.split(".")
                    //     let newfile = {
                    //       uri:result.uri,
                    //       type:`test/${name[3]}`,
                    //       name:`test.${name[3]}`
                    //     }
                    //     await handleUpload(newfile);
                    // }
                }
                
            });
        } else {
            Alert.alert('Access denied!')
        }

        sheetRef.current.snapTo(1);
    }

    const pickImage = async () => {
        console.log("Chooose from Gallery is Pressed!!");

        let options = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: true,
        };

        launchImageLibrary(options, (response) => {

            /*
            //console.log('base64 -> ', response.base64);   // Bahot bada text (galti se bhi print matt karao)
            console.log('uri -> ', response.uri);
            console.log('width -> ', response.width);
            console.log('height -> ', response.height);
            console.log('fileSize -> ', response.fileSize);
            console.log('type -> ', response.type);
            console.log('fileName -> ', response.fileName);
            //setFilePath(response);
            */

            if (response.errorCode == 'camera_unavailable') {
                Alert.alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                Alert.alert('Permission denied');
                return;
            } else if (response.errorCode == 'others') {
                Alert.alert(response.errorMessage);
                return;
            } else {
                setImage(response);

                // YAHA hai image @GrayStack

                // if (!result.cancelled) {
                //     setImage(result);
                //     let name = result.uri.split(".")
                //     let newfile = {
                //         uri:result.uri,
                //         type:`test/${name[3]}`,
                //         name:`test.${name[3]}`
                //     }
                //     await handleUpload(newfile);
                // }
            }
            
        });

        sheetRef.current.snapTo(1)
    };

        /** ScanBill Buttons END */
    
        /** BottomSheet Methods  */

    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.panelTitle}>Upload Photo</Text>
            </View>
            <TouchableOpacity style={styles.panelButton} onPress={clickImage}>
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
                <Text style={styles.panelButtonTitle}>Choose From Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.panelButton}
                onPress={() => { 
                    sheetRef.current.snapTo(1);
                    console.log("Cancel is clicked")
                }}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
    
    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
            </View>
        </View>
    );

    const sheetRef = React.useRef(null);
    let fall = new Animated.Value(1);
 
        /** BottomSheet END  */

    return (
        <ScrollView style={{flex: 1}} >
            <BottomSheet
                ref={sheetRef}
                snapPoints={[250, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />

            { scannedData ? (
                <RenderProducts doneButtonHandler={doneButtonHandler} scannedData={scannedData} />
            ) : (
                <Animated.View style={{ opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)) }}>

                    {viewMode == "scan" ? (
                        <View>
                            <View style={{alignItems: 'center', backgroundColor: 'white', marginHorizontal: 25, borderRadius: 8, paddingTop: 10, marginBottom: 10}}>
                                <Image style={{width: width - 50 , height: width - 180, borderRadius: 20, marginBottom: 20 }} source={{uri: 'https://cdn.dribbble.com/users/644659/screenshots/4462433/icon_4.gif'}} />
                            </View>
                            
                            <TouchableOpacity onPress={() => { console.log("Bottom sheet is called"); sheetRef.current.snapTo(0);}} >
                                <View style={styles.cameraButton}>
                                    <Image style={{width: 20, height: 20, marginRight: 10, tintColor: '#ccc'}} source={require('../../../assets/icons/scan.png')} />
                                    <Text style={{color: "#93BA04", textAlign: "center", fontFamily: 'GothamBold', fontSize: 16}}>
                                        Scan your Bill
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={{fontFamily: 'GothamLight', color:"grey", textAlign: "center", fontSize: 20, paddingTop: 20, marginBottom: 20}}>OR</Text>

                            <TouchableOpacity onPress={() => setViewMode("add")} >
                                <View style={{
                                    backgroundColor: "#EEF8FF",
                                    padding: 14, 
                                    marginHorizontal: 25,
                                    borderRadius:8,
                                    flexDirection: 'row',
                                    justifyContent: 'center'
                                }}>
                                    <Image style={{width: 50, height: 50, marginRight: 10}} source={require('../../../assets/icons/form.jpeg')} />
                                    <Text style={{alignSelf: 'center' ,color: "#1B9ED6", textAlign: "center", fontFamily: 'GothamBold', fontSize: 18}}>
                                        Add Manually
                                    </Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    ) : (
                        <View>
                            <ManualAdd  
                                // categoriesData={categoriesData}
                                // people={people}
                                AddProductSaveButtonHandler={AddProductSaveButtonHandler} 
                            />

                            <TouchableOpacity onPress={() => setViewMode("scan")} >
                                <View style={styles.cameraButton}>
                                    <Image style={{width: 20, height: 20, marginRight: 10, tintColor: '#ccc'}} source={require('../../../assets/icons/scan.png')} />
                                    <Text style={{color: "#93BA04", textAlign: "center", fontFamily: 'GothamBold', fontSize: 16}}>
                                        Better Scan It
                                    </Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    )}
                    
                </Animated.View>
            )}

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    cameraButton : {
        backgroundColor: "white",
        padding: 14, 
        marginHorizontal: 25,
        borderRadius:8,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    panel: {
        padding: 30,
        backgroundColor: 'white',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        marginHorizontal: 25
    },
    header: {
        backgroundColor: '#F5F7F9',
        borderColor: "#D3D3D3",
        shadowColor: 'black',
        shadowOffset: {width: -10, height: -3},
        shadowRadius: 5,
        shadowOpacity: 0.4,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 0,
        borderRadius: 4,
        backgroundColor: 'transparent',
    },
    panelTitle: {
        fontSize: 18,
        fontFamily: 'GothamBold',
        height: 35,
        marginBottom: 5,
        color: "grey"
    },
    panelButton: {
        padding: 10,
        borderRadius: 6,
        backgroundColor: 'white',
        alignItems: 'center',
        marginVertical: 6,
        borderWidth: 2,
        borderColor: "#F3F7DF"
    },
    panelButtonTitle: {
        fontSize: 12,
        fontFamily: 'GothamMedium',
        color: "#93BA04",
    },
})