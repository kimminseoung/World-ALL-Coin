import { priceData } from "./../api";
import { useQuery } from "react-query";
import styled from "styled-components";
import { ReactComponent as LoadingIcon } from "../assets/Loading.svg";

const Container = styled.div``;
const PriceTab = styled.div<{ isValue?: boolean }>`
  width: 30%;
  height: 3%;
  margin-bottom: 1%;
  border-radius: 13px;
  border: 3px solid #000;
  padding: 15px 20px;
  color: ${props => (props.isValue ? "blue" : "red")};
`;
interface ChartProps {
  coinId: string;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: string;
  circulating_supply: string;
  total_supply: string;
  max_supply: string;
  beta_value: string;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: USDInfo;
  };
}
interface USDInfo {
  ath_date: string;
  ath_price: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_1h: number;
  percent_change_1y: number;
  percent_change_6h: number;
  percent_change_7d: number;
  percent_change_12h: number;
  percent_change_15m: number;
  percent_change_24h: number;
  percent_change_30d: number;
  percent_change_30m: number;
  percent_from_price_ath: number;
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
}
function Price({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<PriceData>(["priceInfo", coinId], () => priceData(coinId));
  console.log(data);
  return (
    <>
      {isLoading ? (
        <LoadingIcon fill='transparent' width={600} height={600} />
      ) : (
        <Container>
          <PriceTab >15m: {data?.quotes.USD.percent_change_15m}</PriceTab>
          <PriceTab isValue>30m: {data?.quotes.USD.percent_change_30m}</PriceTab>
          <PriceTab isValue>1h: {data?.quotes.USD.percent_change_1h}</PriceTab>
          <PriceTab isValue>6h: {data?.quotes.USD.percent_change_6h}</PriceTab>
          <PriceTab isValue>12h: {data?.quotes.USD.percent_change_12h}</PriceTab>
          <PriceTab isValue>24h: {data?.quotes.USD.percent_change_24h}</PriceTab>
          <PriceTab isValue>7d: {data?.quotes.USD.percent_change_7d}</PriceTab>
          <PriceTab isValue>30d: {data?.quotes.USD.percent_change_30d}</PriceTab>
          <PriceTab isValue>1y: {data?.quotes.USD.percent_change_1y}</PriceTab>
        </Container>
      )}
    </>
  );
}

export default Price;
