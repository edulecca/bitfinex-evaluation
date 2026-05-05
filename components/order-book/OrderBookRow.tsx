import type { OrderBook as OrderBookType } from '../../hooks/tickers/use-order-book';
import styled from 'styled-components/native'

const RowContainer = styled.View`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 4px
`;

const RowIncremental = styled.View<{isBid: boolean; width: number}>`
    background-color: ${props => props.isBid ? "#FF7F7F" : "#83F28F"};
    position: absolute;
    right: 0;
    width: ${props => `${props.width}%`};
    height: 100%;
`;

const RowStyled = styled.View<{isBid: boolean}>`
    border-radius: 16px;
    height: 24px;
    justify-content: space-between;
    vertical-align: center;
`

const AmountText = styled.Text`
    font-size: 16px;
`

const PriceText = styled(AmountText)<{isBid: boolean}>`
    color: ${props => props.isBid ? "red" : "green"};
`

type OrderBookRow = { data: OrderBookType; maxOrders: number }

const OrderBookRow = ({ data, maxOrders }: OrderBookRow) => {
    const { price, count, amount } = data;
    const isBid = amount > 0;

   return (
       <RowContainer>
           <RowIncremental isBid={isBid} width={(count * 100)/maxOrders} />
           <PriceText isBid={isBid}>{new Intl.NumberFormat("us-US", { style: "currency", currency: "USD" }).format(
               price,
           )}</PriceText>
           <AmountText>{amount}</AmountText>
       </RowContainer>
   )


}

export default OrderBookRow;