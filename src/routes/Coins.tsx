import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { ReactComponent as LoadingIcon } from "../assets/Loading.svg";
const Title = styled.h1`
  color: ${props => props.theme.accentColor};
  font-size: 48px;
`;
const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const CoinList = styled.ul``;
const Coin = styled.li`
  background-color: #eee;
  color: ${props => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;
const Header = styled.header`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Loading = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  font-size: 100px;
`;
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  return (
    <Container>
      <Helmet>
        <title>Welcome come to K-Coin</title>
      </Helmet>
      <Header>
        <Title>K-Coin</Title>
      </Header>
      {isLoading ? (
        <Loading>
          <LoadingIcon fill="transparent"/>
        </Loading>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map(coin => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
