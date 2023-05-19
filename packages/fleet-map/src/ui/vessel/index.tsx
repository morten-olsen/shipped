import { Vessel } from "@shipped/engine"
import styled from "styled-components";

type Props = {
  vessel: Vessel;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  border-bottom: 0.5px solid #fff;
`;

const Value = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
`;

const Label = styled.div`
  font-size: 0.5rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  flex: 1;
`;

const Unit = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: #fff;
`;

const Header = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-top: 1rem;
`;

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const VesselInfo: React.FC<Props> = ({ vessel }) => {
  return (
    <Wrapper>
      <Header>Stats</Header>
      <Card>
        <Label>Fuel</Label>
        <Value>{(vessel.fuel.current / vessel.fuel.capacity * 100).toFixed(2)}<Unit>%</Unit></Value>
      </Card>
      <Card>
        <Label>Cash</Label>
        <Value>{numberWithCommas(vessel.cash)}<Unit>$</Unit></Value>
      </Card>
      <Card>
        <Label>Goods</Label>
        <Value>{vessel.goods}<Unit>kg</Unit></Value>
      </Card>
      <Card>
        <Label>Power</Label>
        <Value>{(vessel.power * 100).toFixed(1)}<Unit>%</Unit></Value>
      </Card>
      <Card>
        <Label>Score</Label>
        <Value>{(vessel.cash / (vessel.score.fuelUsed / vessel.score.rounds)).toFixed(0)}<Unit>$/F/R</Unit></Value>
      </Card>
      
      <Header>History</Header>
      <Card>
        <Label>Distance travelled</Label>
        <Value>{(vessel.score.distanceTravelled).toFixed(1)}</Value>
      </Card>
      <Card>
        <Label>Fuel used</Label>
        <Value>{(vessel.score.fuelUsed).toFixed(1)}</Value>
      </Card>
      <Card>
        <Label>Rounds</Label>
        <Value>{vessel.score.rounds}</Value>
      </Card>
    </Wrapper>
  )
};

export { VesselInfo }
