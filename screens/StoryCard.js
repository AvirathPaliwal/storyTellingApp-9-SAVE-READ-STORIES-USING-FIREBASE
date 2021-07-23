import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image, FlatList,
    TouchableOpacity
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Ionicons from "react-native-vector-icons/Ionicons";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from "firebase";

let customFonts = {
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class StoryCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
            light_theme: true,
            story_id: this.props.story.key,
            story_data: this.props.story.value,
            is_liked: false,
            likes: this.props.story.value.likes

        };
    }

    componentDidMount() {
        this._loadFontsAsync();
        this.fetchUser();

    }

    async fetchUser() {
        let theme;
        await firebase
            .database()
            .ref('/users/' + firebase.auth().currentUser.uid)
            .on("value", (snapshot) => {
                theme = snapshot.val().current_theme;
                this.setState({ light_theme: theme === "light" })
            })

    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts)
        this.setState({ fontsLoaded: true })
    }

    keyExtractor = (item, index) => index.toString();


    renderItem = ({ item: mystory }) => {
        return <StoryCard story={mystory} />;
    }
    likeAction = () => {
// true (like) ---- dislike (false)
        if (this.state.is_liked) {
            firebase
                .database()
                .ref('posts')
                .child(this.state.story_id)
                .child('likes')
                .set(firebase.database.ServerValue.increment(-1));
            this.setState({ likes: (this.state.likes -= 1), is_liked: false });
        }
        else {
          firebase
          .database()
          .ref('posts')
          .child(this.state.story_id)
          .child('likes')
          .set(firebase.database.ServerValue.increment(1));
          this.setState({
              likes:(this.state.likes +=1),
              is_liked: true,
            })

        }
    }



    render() {
        let story = this.state.story_data
        if (!this.state.fontsLoaded) {
            // !true = fale
            return <AppLoading />;
        }
        else {
            let images = {
                image_1: require('../assets/story_image_1.png'),
                image_2: require('../assets/story_image_2.png'),
                image_3: require('../assets/story_image_3.png'),
                image_4: require('../assets/story_image_4.png'),
                image_5: require('../assets/story_image_5.png'),
            };
            return (
                // <View style={styles.container}>
                <TouchableOpacity
                    style={styles.container}
                    onPress={() =>
                        this.props.navigation.navigate("StoryScreen",
                            { story: story })}
                >
                    <SafeAreaView style={styles.droidSafeArea} />
                    <View style={
                        this.state.light_theme ? styles.cardContainerLight : styles.cardContainer}>
                        <Image
                            source={images[story.preview_image]}
                            style={styles.storyImage} />
                        <View style={styles.titleContainer}>
                            <Text style={
                                this.state.light_theme ? styles.storyTitleTextLight : styles.storyTitleText}>
                                {story.title}</Text>
                            <Text style={
                                this.state.light_theme ? styles.storyAuthorTextLight : styles.storyAuthorText}>
                                {story.author}</Text>
                            <Text style={
                                this.state.light_theme ? styles.descriptionTextLight : styles.descriptionText}>
                                {story.description}</Text>
                        </View>
                        <View style={styles.actionContainer}>
                            <TouchableOpacity style={this.state.is_liked ?
                                styles.likeButtonLiked :
                                styles.likeButtonDisliked}
                                onPress={() => {
                                    this.likeAction()
                                }}>
                                <Text
                                    style={this.state.light_theme ? styles.likeTextLight : styles.likeText}>
                                    {this.state.likes}
                                </Text>
                                <Ionicons
                                    name={'heart'}
                                    size={RFValue(30)}
                                    color={this.state.light_theme ? 'black' : 'white'} />


                            </TouchableOpacity>

                        </View>


                    </View>
                </TouchableOpacity >
            );
        }
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    cardContainer: {
        margin: RFValue(13),
        backgroundColor: "#2f345d",
        borderRadius: RFValue(20)
    },
    cardContainerLight: {
        margin: RFValue(13),
        backgroundColor: "white",
        borderRadius: RFValue(20)
    },
    storyImage: {
        resizeMode: "contain",
        width: "95%",
        alignSelf: "center",
        height: RFValue(250)
    },
    titleContainer: {
        paddingLeft: RFValue(20),
        justifyContent: "center"
    },
    storyTitleText: {
        fontSize: RFValue(25),
        fontFamily: "Bubblegum-Sans",
        color: "white"
    },
    storyTitleTextLight: {
        fontSize: RFValue(25),
        fontFamily: "Bubblegum-Sans",
        color: "black"
    },
    storyAuthorText: {
        fontSize: RFValue(18),
        fontFamily: "Bubblegum-Sans",
        color: "white"
    },
    storyAuthorTextLight: {
        fontSize: RFValue(18),
        fontFamily: "Bubblegum-Sans",
        color: "black"
    },
    descriptionText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: 13,
        color: "white",
        paddingTop: RFValue(10)
    },
    descriptionTextLight: {
        fontFamily: "Bubblegum-Sans",
        fontSize: 13,
        color: "black",
        paddingTop: RFValue(10)
    },
    actionContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: RFValue(10)
    },
    likeButton: {
        width: RFValue(160),
        height: RFValue(40),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#eb3948",
        borderRadius: RFValue(30)
    },
    likeText: {
        color: "white",
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
    },
    likeTextLight: {
        color: "black",
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
    },
    likeButtonLiked: {
        width: RFValue(160),
        height: RFValue(40),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#eb3948',
        borderRadius: RFValue(30),
    },
    likeButtonDisliked: {
        width: RFValue(160),
        height: RFValue(40),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#eb3948',
        borderWidth: 2,
        borderRadius: RFValue(30),
    },
});


