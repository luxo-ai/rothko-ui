import WithNavigation from '../components/WithNavigation';
import { OverviewCard } from '../components/cards/overview';

const Overview = () => {
  return (
    <WithNavigation selected="overview">
      <OverviewCard />
    </WithNavigation>
  );
};

export default Overview;
