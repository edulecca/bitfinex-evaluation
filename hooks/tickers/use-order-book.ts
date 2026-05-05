import {useQuery} from "@tanstack/react-query";

export type OrderBook = {
    price: number;
    count: number;
    amount: number;
}

interface IUseOrderBook {
    askOrders: OrderBook[],
    bidOrders: OrderBook[],
}


const URL = 'https://api-pub.bitfinex.com/v2/book/';

const getOrderBook = async (symbol: string,  precision: string) => {
    //const response = await fetch('https://api-pub.bitfinex.com/v2/book/tBTCUSD/P0?len=25')
    const response = await fetch(`https://api-pub.bitfinex.com/v2/book/${symbol}/${precision}?len=25`)
        // .then(res => res.json())
        // .then(res => console.log(res))
        // .catch(err => console.error(err));
    return response.json();
}

const useOrderBook = (symbol: string,  precision: string) => {
    const response = useQuery({
        queryKey: ['order-book', symbol, precision],
        queryFn: () => getOrderBook(symbol,  precision),
        refetchInterval: 5000,
        initialData: [],
        select: (data) => {
            if (!data) return [];
            return data.reduce((acc: IUseOrderBook, curr: any) => {
                if (curr[2] > 0) {
                    return ({
                        ...acc,
                        bidOrders: [
                            ...acc.bidOrders,
                            {
                                price: curr[0],
                                count: curr[1],
                                amount: curr[2],
                            },
                        ]
                    })
                }
                return ({
                    ...acc,
                    askOrders: [
                        ...acc.askOrders,
                        {
                            price: curr[0],
                            count: curr[1],
                            amount: curr[2],
                        },
                    ]
                })
            }, { askOrders: [], bidOrders: [] })
         }

    })

    return response;
}

export default useOrderBook;