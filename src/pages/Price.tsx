import { priceData } from "../etc/api";
import { useQuery } from "react-query";
import styled from "styled-components";
import { ReactComponent as LoadingIcon } from "../assets/Loading.svg";
import { ChartProps, PriceData } from "../etc/types";

const Container = styled.div``;
const PriceTab = styled.div<{ isValue?: boolean }>`
  height: 3%;
  margin-bottom: 1%;
  border-radius: 13px;
  border: 2px solid rgba(0, 0, 0, 1);
  padding: 11px;
  flex-wrap: wrap;
  & > span {
    font-size: 12px;
    color: darkgray;
  }
`;

function Price({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<PriceData>(["priceInfo", coinId], () => priceData(coinId), { refetchInterval: 3000 });
  return (
    <>
      {isLoading ? (
        <LoadingIcon fill='transparent' width={600} height={600} />
      ) : (
        <Container>
          <PriceTab>
            최고 가격: {Number(data?.quotes.USD.ath_price).toLocaleString("en-us", { maximumFractionDigits: 0, style: "currency", currency: "USD" })}{" "}
            <span>{String(data?.quotes.USD.ath_date).substring(10, 0)}</span>
          </PriceTab>
          <PriceTab>현재 가격: {Number(data?.quotes.USD.price).toLocaleString("en-us", { maximumFractionDigits: 0, style: "currency", currency: "USD" })}</PriceTab>
          <PriceTab>시가 총액: {Number(data?.quotes.USD.market_cap).toLocaleString("en-us", { maximumFractionDigits: 0, style: "currency", currency: "USD" })}</PriceTab>
          <PriceTab>1 시간: {data?.quotes.USD.percent_change_1h}%</PriceTab>
          <PriceTab>24 시간: {data?.quotes.USD.percent_change_24h}%</PriceTab>
          <PriceTab>주간: {data?.quotes.USD.percent_change_7d}%</PriceTab>
          <PriceTab>월간: {data?.quotes.USD.percent_change_30d}%</PriceTab>
          <PriceTab>년간: {data?.quotes.USD.percent_change_1y}%</PriceTab>
          <PriceTab>고점 대비: {data?.quotes.USD.percent_from_price_ath}%</PriceTab>
        </Container>
      )}
    </>
  );
}

export default Price;
