// import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useLocation, Switch, useRouteMatch, useHistory } from "react-router";
import { Link, Route } from "react-router-dom";
import { useQuery } from "react-query";
import Price from "./Price";
import { infoData, priceData } from "./../api";
import ChartTab from "./Chart";
import { Helmet } from "react-helmet";
import { ReactComponent as LoadingIcon } from "../assets/Loading.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 11vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;
const Title = styled.h1`
  color: ${props => props.theme.accentColor};
  font-size: 48px;
`;
const OverView = styled.div`
  margin-top: 3%;
`;
const OverInfo = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.accentColor};
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  span {
    text-transform: uppercase;
    font-size: 11px;
    b {
      margin-top: 5px;
      text-transform: capitalize;
      font-size: 13px;
      display: block;
      letter-spacing: 1px;
    }
  }
`;
const Describtion = styled.div`
  margin: 20px 0;
  color: ${props => props.theme.white}; ;
`;
const Tabs = styled.div`
  display: flex;
  margin: 10px 0;
  justify-content: center;
`;
const Tab = styled.div<{ isActive: boolean }>`
  a {
    display: block;
    padding: 10px 30px;
    margin: 0 6px;
    border-radius: 8px;
    transition: 0.3s;
    background-color: ${props => (props.isActive ? props.theme.textColor : props.theme.accentColor)};
    color: ${props => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
    &:hover {
      color: #fff;
    }
  }
`;
const Back = styled.div`
  position: absolute;
  top: 5%;
  left: 6%;
  width: 100px;
  height: 30px;
  font-size: 36px;
  background-color: ${props => props.theme.bgColor};
  .back {
    transition: 0.2s;
    cursor: pointer;
  }
  .back:hover {
    transform: translateX(-3px);
    color: ${props => props.theme.white};
  }
`;
interface RouteState {
  name: string;
}
interface RouteParams {
  coinId: string;
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  tags: Tag[];
  team: Team[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
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
interface Tag {
  id: string;
  name: string;
  coin_counter: number;
  ico_counter: number;
}
interface Team {
  id: string;
  name: string;
  position: string;
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
function Coin() {
  const { state } = useLocation<RouteState>();
  const { coinId } = useParams<RouteParams>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const history = useHistory();
  const { isLoading: infoLoading, data: infodata } = useQuery<InfoData>(["info", coinId], () => infoData(coinId)); // use to React_Query
  const { isLoading: priceLoading, data: pricedata } = useQuery<PriceData>(["price", coinId], () => priceData(coinId), { refetchInterval: 3000 }); // use to React_Query
  const loading = infoLoading || priceLoading;
  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : loading ? "Loading..." : infodata?.name}</title>
      </Helmet>
      <Header>
        <Title>{state?.name ? state.name : loading ? "Loading..." : infodata?.name}</Title>
      </Header>
      <Back
        onClick={() => {
          history.push("/");
        }}
      >
        <FontAwesomeIcon className="back" icon={faLeftLong} />
      </Back>
      {loading ? (
        <LoadingIcon fill='transparent' />
      ) : (
        <>
          <OverView>
            <OverInfo>
              <span>
                rank
                <b>{infodata?.rank}</b>
              </span>
              <span>
                symbol
                <b>{infodata?.symbol}</b>
              </span>
              <span>
                price
                <b>${pricedata?.quotes.USD.price.toFixed(2)}</b>
              </span>
            </OverInfo>
            <Describtion>{infodata?.description}</Describtion>
            <OverInfo>
              <span>
                total_supply
                <b>{pricedata?.total_supply}</b>
              </span>
              <span>
                max_supply
                <b>{pricedata?.max_supply}</b>
              </span>
            </OverInfo>
            <Tabs>
              <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>가격</Link>
              </Tab>
              <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>차트</Link>
              </Tab>
            </Tabs>
          </OverView>
          <Switch>
            <Route path={`/:coinId/price`}>
              <Price />
            </Route>
            <Route path={`/:coinId/chart`}>
              <ChartTab coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
