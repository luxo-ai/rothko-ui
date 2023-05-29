import type { CardCopy } from '../types';

const themeCopy: CardCopy = {
  title: 'Theming Guide',
  description:
    'Customize and personalize your Rothko UI components with ease using our powerful theming capabilities. Take control of the visual style, colors, typography, and more to create a cohesive and branded experience for your applications.',
  sections: {
    creatingTheme: {
      headerVariant: 'h2',
      headerText: 'Creating a Theme',
      body: [
        {
          headerVariant: 'h3',
          headerText: 'To create a Theme',
          body: 'To create a custom theme, simply import the `ThemeProvider` from Rothko UI and wrap your application with it. Then, provide a theme object that defines the desired styles and configurations. You can customize various aspects, such as the primary color, font family, border radius, and more.',
        },
      ],
    },
    overridingStyles: {
      headerVariant: 'h2',
      headerText: 'Overriding Styles',
      body: [
        {
          headerVariant: 'h3',
          headerText: 'Rothko UI follows a consistent and intuitive theming approach.',
          body: 'You can easily override specific component styles by targeting their respective keys in the theme object. This allows you to fine-tune the appearance and behavior of individual components to align with your design vision.',
        },
      ],
    },
    themingVariables: {
      headerVariant: 'h2',
      headerText: 'Theming Variables',
      body: [
        {
          headerVariant: 'h3',
          headerText: 'Our theming system leverages a comprehensive set of variables.',
          body: "This makes it effortless to update your entire application's visual style from a single source. By modifying these variables, you can achieve a consistent look and feel throughout your UI and ensure effortless maintenance as your design requirements evolve.",
        },
      ],
    },
    darkLightMode: {
      headerVariant: 'h2',
      headerText: 'Dark Mode Support',
      body: [
        {
          headerVariant: 'h3',
          headerText: 'Rothko UI provides built-in support for dark mode.',
          body: 'This allows you to create visually striking and accessible interfaces. With a simple toggle, you can switch between light and dark themes seamlessly, enhancing the user experience and adapting to user preferences.',
        },
      ],
    },
  },
};
export default themeCopy;
