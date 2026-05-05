import {Animated, FlatList, StyleSheet, View} from 'react-native';

import { ThemedView } from '@/components/themed-view';
import useOrderBook, {OrderBook} from "@/hooks/tickers/use-order-book";
import ScrollView = Animated.ScrollView;

import styled from 'styled-components/native'
import {useCallback, useMemo, useState} from "react";
import OrderBookRow from "@/components/order-book/OrderBookRow";
import ToggleBottom, { VIEW_ORDER } from "@/components/order-book/ToggleBottom";
import {useLocalSearchParams} from "expo-router";

const AGREGATION = {
    P0: 'P0',
    P1: 'P1',
    P2: 'P2',
    P3: 'P3',
    P4: 'P4',
}

const BookTopContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`
const BookLabel = styled.Text`
    font-size: 16px;
`;

const OrderContainer = styled.View`
    display: flex;
    flex-direction: column;
`;

const MidPrice = styled.Text`
    font-size: 24px;
    margin-top: 12px;
    margin-bottom: 12px;
`

export default function TabTwoScreen() {
    const [view, setView] = useState<typeof VIEW_ORDER[keyof typeof VIEW_ORDER]>(VIEW_ORDER.ALL);
    const { symbol } = useLocalSearchParams<{ symbol: string }>();
    const [agregation, setAgregation] = useState<typeof AGREGATION[keyof typeof AGREGATION]>(AGREGATION.P0)
    const { data: responseData } = useOrderBook(symbol, agregation);

    const data = useMemo(() => {
        if (view === VIEW_ORDER.ALL) {
            return {
                bidOrders: responseData.bidOrders.slice(15),
                askOrders: responseData.askOrders.slice(0,10),
            }
        }
        return responseData;
    }, [responseData, view])

    const getMaxOrderCount = useCallback((orders: OrderBook[]) => {
        return orders.reduce(
            (acc: number, curr: OrderBook) => (curr.count > acc ? curr.count : acc),
            0
        )
    }, []);

    const maxBidOrders: number = useMemo(() => getMaxOrderCount(data.bidOrders), [getMaxOrderCount, data.askOrders]);
    const maxAskOrders: number = useMemo(() => getMaxOrderCount(data.askOrders), [getMaxOrderCount, data.askOrders]);

    const midPrice = ((data.bidOrders[data.bidOrders.length - 1]?.price || 0) + data.askOrders[0]?.price || 0) /2;

    const showBidOrders = view === VIEW_ORDER.ALL || view === VIEW_ORDER.BID;
    const showAskOrders = view === VIEW_ORDER.ALL || view === VIEW_ORDER.ASK;
    return (
        <View style={{ display: 'flex', height: '100%' }}>
            <ScrollView style={{ paddingHorizontal: 16 }} >
                <ThemedView style={styles.titleContainer}>
                    <BookTopContainer>
                        <View>
                            <BookLabel>Price</BookLabel>
                            <BookLabel>BTC</BookLabel>
                        </View>
                        <View>
                            <BookLabel>Amount</BookLabel>
                            <BookLabel>USD</BookLabel>
                        </View>
                    </BookTopContainer>
                    <OrderContainer>
                        <FlatList
                            data={showBidOrders ? data?.bidOrders : []}
                            renderItem={({ item}) => <OrderBookRow data={item} maxOrders={maxBidOrders}  />}
                            keyExtractor={item => `${item.price}-${item.count}`}
                            scrollEnabled={false}
                        />
                        <MidPrice>{midPrice}</MidPrice>
                        <FlatList
                            data={showAskOrders ? data?.askOrders : []}
                            renderItem={({ item}) => <OrderBookRow data={item} maxOrders={maxAskOrders}  />}
                            keyExtractor={item => `${item.price}-${item.count}`}
                            scrollEnabled={false}
                        />
                    </OrderContainer>
                </ThemedView>
            </ScrollView>
            <ToggleBottom onPress={setView} type={view} onPressAggregation={setAgregation} />
        </View>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'column',
        gap: 8,
    },
});
