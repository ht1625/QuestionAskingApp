import React, { useRef } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Animated,
    Pressable,
    View,
    Image,
} from 'react-native';
import {
    useTheme,
    Text,
    IconButton,
    Surface,
    Searchbar,
} from 'react-native-paper';
import { useScrollToTop } from '@react-navigation/native';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import { StackNavigationProp } from '@react-navigation/stack';
import Genre from './assets/Genre.json';

export const SearchScreen = ({ navigation }: Props) => {
    const ref = useRef(null);
    const { colors, roundness } = useTheme();
    useScrollToTop(ref);

    const {
        onScroll,
        containerPaddingTop,
        scrollIndicatorInsetTop,
        translateY,
    } = useCollapsibleHeader({
        navigationOptions: {
            headerStyle: {
                backgroundColor: colors.background,
                textAlign: 'center',
                elevation: 0,
                shadowOpacity: 0,
            },
        },
    });

    const stickyHeaderHeight = 60;

    return (
        <View>
            <Animated.FlatList
                onScroll={onScroll}
                contentContainerStyle={{
                    paddingTop: containerPaddingTop + stickyHeaderHeight,
                }}
                scrollIndicatorInsets={{
                    top: scrollIndicatorInsetTop + stickyHeaderHeight,
                }}
                ref={ref}
                key="Genre"
                data={Genre}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                ListHeaderComponent={() => (
                    <Text style={styles.headline}>All Moods & Genres</Text>
                )}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() =>
                            navigation.navigate('Filter', {
                                genre: item,
                            })
                        }>
                        <Image
                            source={item.image}
                            style={{ width: 150, height: 200, borderRadius: 4, backgroundColor: 'green' }}
                        />
                        <Text style={{ color: 'black', textAlign: 'center' }} numberOfLines={1}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <Animated.View
                style={{
                    transform: [{ translateY }],
                    position: 'absolute',
                    backgroundColor: colors.background,
                    top: containerPaddingTop,
                    height: stickyHeaderHeight,
                    paddingHorizontal: 4,
                    width: '100%',
                }}>
                <Searchbar placeholder="Search" onChangeText={() => { }} />
            </Animated.View>
        </View>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    headline: {
        textAlign: 'center',
        marginVertical: 4,
    },
});