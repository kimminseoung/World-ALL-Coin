import styled from "styled-components";
import { useParams, useLocation, Switch, useRouteMatch, useHistory } from "react-router";
import { Link, Route } from "react-router-dom";
import { useQuery } from "react-query";
import Price from "./Price";
import ChartTab from "./Chart";
import { infoData, priceData } from "./../api";
import { Helmet } from "react-helmet";
import { ReactComponent as LoadingIcon } from "../assets/Loading.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  min-width: 480px;
  max-width: 1024px;
  margin: 0 auto;
  padding-top: 6%;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  flex-direction: column;
  margin-bottom: 5%;
`;
const Title = styled.h1`
  color: ${props => props.theme.accentColor};
  font-size: 48px;
  small {
    font-size: 24px;
  }
`;
const CoinWrapper = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 30px;
  & > div:first-child {
    width: 40%;
  }
  & > div:last-child {
    width: calc(100% - 40%);
    padding-left: 5%;
  }
`;
const OverView = styled.div``;
const OverInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: ${props => props.theme.accentColor};
  border-radius: 10px;
  padding: 13px;
  text-align: center;
  small {
    margin-top: 8px;
    font-size: 10px;
    color: ${props => props.theme.bgColor};
  }
  span {
    display: inline-block;
    width: 25%;
    margin: 8px;
    font-size: 14px;
    color: ${props => props.theme.bgColor};
    b {
      margin-top: 5px;
      text-transform: capitalize;
      font-size: 13px;
      display: block;
      letter-spacing: 1px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: 0.6s;
      &:hover {
        overflow: visible;
      }
    }
  }
`;
const Describtion = styled.div`
  margin: 20px 0;
  color: ${props => props.theme.textColor};
  line-height: 20px;
  h5 {
    font-weight: bold;
    margin-bottom: 5px;
  }
`;
const Tabs = styled.div`
  height: 10vh;
  display: flex;
  align-items: center;
`;
const Tab = styled.div<{ isActive: boolean }>`
  a {
    display: block;
    padding: 10px 30px;
    margin: 0 6px;
    border-radius: 8px;
    transition: 0.3s;
    background-color: ${props => (props.isActive ? props.theme.accentColor : props.theme.bgColor)};
    color: ${props => (props.isActive ? props.theme.bgColor : props.theme.textColor)};
    border: 1px solid #eee;
    /* &:hover {
      color: crimson;
    } */
  }
`;
const Back = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
  margin: 0 10px;
  font-size: 36px;
  background-color: ${props => props.theme.bgColor};
  .back {
    transition: 0.2s;
    cursor: pointer;
  }
  .back:hover {
    transform: translateX(-3px);
    color: ${props => props.theme.accentColor};
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
  const { isLoading: infoLoading, data: infodata } = useQuery<InfoData>(["info", coinId], () => infoData(coinId));
  const { isLoading: priceLoading, data: pricedata } = useQuery<PriceData>(["price", coinId], () => priceData(coinId), { refetchInterval: 3000 }); // use to React_Query
  const loading = infoLoading || priceLoading;
  console.log(infodata);
  console.log(pricedata);

  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : loading ? "Loading..." : infodata?.name}</title>
      </Helmet>
      <Back
        onClick={() => {
          history.push("/");
        }}
      >
        <FontAwesomeIcon className='back' icon={faLeftLong} />
      </Back>
      {loading ? (
        <LoadingIcon fill='transparent' width={600} height={600} />
      ) : (
        <CoinWrapper>
          <div>
            <Header>
              <Title>
                {state?.name ? state.name : loading ? "Loading..." : infodata?.name}
                <small>({infodata?.symbol})</small>
              </Title>
            </Header>
            <OverView>
              <OverInfo>
                <span>
                  순위
                  <b>{infodata?.rank}</b>
                </span>
                <span>
                  구조
                  <b>{infodata?.org_structure}</b>
                </span>
                <span>
                  가격(달러)
                  <b>{Number(pricedata?.quotes.USD.price).toLocaleString("en-us", { maximumFractionDigits: 2, style: "currency", currency: "USD" })}</b>
                </span>
                <span>
                  시총
                  <b>{Number(pricedata?.quotes.USD.market_cap).toLocaleString("en-us", { maximumFractionDigits: 0, style: "currency", currency: "USD" })}</b>
                </span>
                <span>
                  첫 발행일
                  <b>{infodata?.started_at==null?"알 수 없음":String(infodata?.started_at).substring(10, 0)}</b>
                </span>
                <span>
                  마지막 발행일
                  <b>{String(infodata?.last_data_at).substring(10, 0)}</b>
                </span>
                <span>
                  총 유통량
                  <b>{Number(pricedata?.total_supply).toLocaleString("ko-KR")}</b>
                </span>
                <span>
                  최대 발행량
                  <b>{Number(pricedata?.max_supply) === 0 ? "미정" : Number(pricedata?.max_supply).toLocaleString("ko-KR")}</b>
                </span>
                <span>
                  현재까지 유통량
                  <b>{Number(pricedata?.circulating_supply).toLocaleString("ko-KR")}</b>
                </span>
                <small>※ 가격(달러) 소수점 두번째 까지출력</small>
              </OverInfo>
              <Describtion>
                <h5>설명</h5>
                {infodata?.description}
              </Describtion>
            </OverView>
          </div>
          <div>
            <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>Price</Link>
              </Tab>
            </Tabs>
            <Switch>
              <Route path={`/:coinId/price`}>
                <Price coinId={coinId} />
              </Route>
              <Route path={`/:coinId/chart`}>
                <ChartTab coinId={coinId} />
              </Route>
            </Switch>
          </div>
        </CoinWrapper>
      )}
    </Container>
  );
}

export default Coin;
