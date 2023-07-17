export type CardCopy = {
  title: string;
  description: string;
  sections?: Record<string, Section>;
};

export type Section = {
  headerVariant: HeaderVariant;
  headerText: string;
  body: Body;
};

export type Body = string | string[] | React.ReactElement | Section | Section[];

export type HeaderVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body';
