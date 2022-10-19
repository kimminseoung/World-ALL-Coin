import styled from "styled-components";
import { useParams, useLocation, Switch, useRouteMatch, useHistory } from "react-router";
import { Link, Route } from "react-router-dom";
import { useQuery } from "react-query";
import Price from "./Price";
import ChartTab from "./Chart";
import { infoData, priceData } from "../etc/api";
import { Helmet } from "react-helmet";
import { ReactComponent as LoadingIcon } from "../assets/Loading.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { InfoData, PriceData, RouteParams, RouteState } from "../etc/types";

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
  color: ${props => props.theme.textColor};
  font-size: 48px;
  small {
    font-size: 24px;
  }
`;
const CoinWrapper = styled.div`
  display: flex;
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
  background-color: ${props => props.theme.textColor};
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
  line-height: 25px;
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
    background-color: ${props => (props.isActive ? props.theme.textColor : props.theme.bgColor)};
    color: ${props => (props.isActive ? props.theme.bgColor : props.theme.textColor)};
    border: 1px solid #eee;
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

function Coin() {
  const { state } = useLocation<RouteState>();
  const { coinId } = useParams<RouteParams>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const history = useHistory();
  const { isLoading: infoLoading, data: infodata } = useQuery<InfoData>(["info", coinId], () => infoData(coinId));
  const { isLoading: priceLoading, data: pricedata } = useQuery<PriceData>(["price", coinId], () => priceData(coinId), { refetchInterval: 3000 });
  const loading = infoLoading || priceLoading;
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
                  <b>{infodata?.started_at == null ? "알 수 없음" : String(infodata?.started_at).substring(10, 0)}</b>
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
                  발행된 유통량
                  <b>{Number(pricedata?.circulating_supply).toLocaleString("ko-KR")}</b>
                </span>
                <small>※ 가격(달러) 소수점 두 번째까지 출력</small>
              </OverInfo>
              {infodata?.description === "" ? null : (
                <Describtion>
                  <h5>설명</h5>
                  {infodata?.description}
                </Describtion>
              )}
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
