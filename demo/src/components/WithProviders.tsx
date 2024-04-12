import type { ThemeOverrides } from '@rothko-ui/ui';
import { RothkoProvider } from '@rothko-ui/ui';
import { useRouter } from 'next/router';

const themeOverride: ThemeOverrides = {
  typography: {
    body: {
      regular: {
        value: "'Soehne-Buch', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
      },
      // regular: { value: `"Helvetica Neue", "Helvetica", Arial, sans-serif` },
      bold: { value: "'LabGrotesque-Bold'" },
      italic: { value: "'LabGrotesque-Italic'" },
      light: { value: "'LabGrotesque-Light'" },
    },
    header: { value: "'LabGrotesque-Regular'" },
    /* header: {
      value: "'Soehne-Buch', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
    },
    */
  },
};

type WithProvidersProps = {
  children: React.ReactNode;
  theme?: 'dark' | 'light';
};

const WithProviders = ({ children, theme = 'dark' }: WithProvidersProps) => {
  const router = useRouter();
  return (
    <RothkoProvider overrides={themeOverride} theme={router.pathname === '/' ? 'dark' : theme}>
      {children}
    </RothkoProvider>
  );
};

export default WithProviders;
