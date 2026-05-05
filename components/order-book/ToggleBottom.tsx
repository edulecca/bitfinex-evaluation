import {Button, TouchableOpacity, View} from "react-native";
import { Text } from 'react-native'

export const VIEW_ORDER = {
    ALL: 'all',
    BID: 'bid',
    ASK: 'ask',
};

type ToggleBottomType = {
    onPress: (value: typeof VIEW_ORDER[keyof typeof VIEW_ORDER]) => void;
    type: typeof VIEW_ORDER[keyof typeof VIEW_ORDER];
    onPressAggregation: () => {};
}

const ToggleBottom = ({ onPress, type, onPressAggregation }: ToggleBottomType) => {
    const onPressHandler = () => {
        if (type === VIEW_ORDER.ALL) {
            onPress(VIEW_ORDER.BID)
        }
        if (type === VIEW_ORDER.BID) {
            onPress(VIEW_ORDER.ASK)
        }
        if (type === VIEW_ORDER.ASK) {
            onPress(VIEW_ORDER.ALL)
        }
    }

    const onPressAggregationHandler = () => {

    }

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            borderRadius: 20,
            marginHorizontal: 20,
            marginBottom: 20,
        }}>
            <View style={{ width: '80%'}}>
                {/*THESE MUST BE REFACTOR TO A DROPDOWN ELEMENT*/}
                <Button
                    onPress={onPressAggregation}
                    title="Agregation"
                    color="#841584"
                />
            </View>
            <TouchableOpacity style={{ height: 70, width: '20%' }} onPress={onPressHandler}>
                { type === VIEW_ORDER.ALL ? (
                    <>
                        <View style={{ backgroundColor: 'red', height: 35, borderRadius: 20 }} />
                        <View style={{ backgroundColor: 'green', height: 35, borderRadius: 20 }} />
                    </>
                ) : <View style={{ backgroundColor: type === VIEW_ORDER.BID ? 'red' : 'green', height: 70, borderRadius: 20 }} />}
            </TouchableOpacity>
        </View>
    )
}

export default ToggleBottom;