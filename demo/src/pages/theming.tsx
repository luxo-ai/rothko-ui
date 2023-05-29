import WithNavigation from '../components/WithNavigation';
import ThemeCard from '../components/cards/theming';

const Theming = () => {
  return (
    <WithNavigation selected="theming">
      <ThemeCard />
    </WithNavigation>
  );
};

export default Theming;
