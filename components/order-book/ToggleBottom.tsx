import {TouchableOpacity, View} from "react-native";
import {IStyledComponent} from "styled-components";

export const VIEW_ORDER = {
    ALL: 'all',
    BID: 'bid',
    ASK: 'ask',
};

type ToggleBottomType = {
    onPress: (value: typeof VIEW_ORDER[keyof typeof VIEW_ORDER]) => void;
    type: typeof VIEW_ORDER[keyof typeof VIEW_ORDER];
}

const ToggleBottom = ({ onPress, type }: ToggleBottomType) => {
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