import { Accordion, AccordionPanel, Box, Typography } from '@rothko-ui/ui';
import { useIsMobileOrTablet } from '../hooks/useIsMobileOrTablet';
import { ChevronDown, ChevronUp } from '@rothko-ui/icons';

type AccordionOrBoxProps = {
  boxTitleVariant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children?: React.ReactNode;
  title: string;
  fullWidth?: boolean;
};

const AccordionOrBox = ({ children, title, boxTitleVariant, fullWidth }: AccordionOrBoxProps) => {
  const isMobileOrTablet = useIsMobileOrTablet();
  if (isMobileOrTablet) {
    return (
      <Accordion
        iconOverride={({ open, color }) =>
          open ? (
            <ChevronUp width="1.5rem" height="1.5rem" fill={color} />
          ) : (
            <ChevronDown width="1.5rem" height="1.5rem" fill={color} />
          )
        }
      >
        <AccordionPanel title={title}>{children}</AccordionPanel>
      </Accordion>
    );
  }
  const Header = Typography[boxTitleVariant];
  return (
    <div>
      <Header>{title}</Header>
      <Box marginTop="1.25rem" width={fullWidth ? undefined : 'fit-content'} padding="2rem">
        {children}
      </Box>
    </div>
  );
};

export default AccordionOrBox;
