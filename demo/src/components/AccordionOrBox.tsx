import { Accordion, AccordionPanel, Box, Typography } from '@rothko-ui/ui';
import { useIsMobileOrTablet } from '../hooks/useIsMobileOrTablet';

type AccordionOrBoxProps = {
  boxTitleVariant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children?: React.ReactNode;
  title: string;
};

const AccordionOrBox = ({ children, title, boxTitleVariant }: AccordionOrBoxProps) => {
  const isMobileOrTablet = useIsMobileOrTablet();
  if (isMobileOrTablet) {
    return (
      <Accordion iconKind="chevron">
        <AccordionPanel title={title}>{children}</AccordionPanel>
      </Accordion>
    );
  }
  const Header = Typography[boxTitleVariant];
  return (
    <>
      <Header style={{ marginTop: '3rem', marginBottom: '1rem' }}>{title}</Header>
      <Box width="fit-content" padding="2rem">
        {children}
      </Box>
    </>
  );
};

export default AccordionOrBox;
