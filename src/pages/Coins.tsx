import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../etc/api";
import { Helmet } from "react-helmet";
import { ICoin } from "../etc/types";
import Loading from "../component/Loading";

const Title = styled.h1`
  color: ${props => props.theme.textColor};
  font-size: 36px;
`;
const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  width: 35px;
  height: 35px;
`;
const CoinList = styled.ul`
  display: grid;
  gap: 3px;
  grid-template-columns: repeat(6, 1fr);
`;
const Coin = styled.li`
  margin: 0 5px;
  background-color: ${props => props.theme.accentColor};
  color: ${props => props.theme.textColor};
  margin-bottom: 10px;
  height: 120px;
  border-radius: 15px;
  a {
    width: 100%;
    border-radius: 15px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    span {
      margin-top: 5px;
      font-size: 0.813rem;
    }
    &:hover {
      transform: translateY(-10px);
      background-color: ${props => props.theme.accentColor};
      color: ${props => props.theme.white};
    }
  }
`;

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  return (
    <Container>
      <Helmet>
        <title>Hello World ALL Coin</title>
      </Helmet>
      <Header>
        <Title>World ALL Coin</Title>
      </Header>
      {isLoading ? (
        <Loading />
      ) : (
        <CoinList>
          {data?.slice(0, 100).map(coin => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}/chart`,
                  state: { name: coin.name },
                }}
              >
                <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} alt={coin.name} />
                <span>{coin.name}</span>
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
