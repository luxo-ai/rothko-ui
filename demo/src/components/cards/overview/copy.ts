import type { CardCopy } from '../types';

const overviewCopy: CardCopy = {
  title: 'Overview',
  description:
    'Welcome to Rothko UI, a cutting-edge and lightweight UI component library designed to elevate your web development projects. Rothko UI stands out from the crowd by offering a sleek and modern design aesthetic that aligns perfectly with the latest trends in UI/UX.',
  sections: {
    features: {
      headerVariant: 'h3',
      headerText: 'Features',
      body: [
        {
          headerVariant: 'body',
          headerText: 'Modern and Minimalist Design',
          body: "Rothko UI's default styling reflects the contemporary design landscape, featuring cleaner lines and a minimalist approach. You can create sleek and sophisticated interfaces that effortlessly align with the latest design trends. The library places a strong emphasis on component design that feels natural for mobile or tablet devices, ensuring a seamless user experience across the modern web.",
        },
        {
          headerVariant: 'body',
          headerText: 'Lightweight Package',
          body: 'Rothko UI is designed with efficiency in mind. The library offers a lightweight package, ensuring fast loading times and optimal performance for your applications. You can enjoy the benefits of a robust UI component library without sacrificing speed or resource consumption.',
        },
        {
          headerVariant: 'body',
          headerText: 'Strong Customization',
          body: "Rothko UI provides extensive customization options to tailor the components to your project's specific needs. From colors and typography to layout and interaction, you have the power to create a unique and personalized UI. The library empowers developers to shape their applications according to their vision.",
        },
        /*
        {
          headerVariant: 'body',
          headerText: 'Opinionated Default Styling',
          body: "While Rothko UI is strongly customizable, it offers an opinionated default styling. The library's components are meticulously designed to provide a cohesive and visually striking experience out of the box. This opinionated approach saves you time and effort by offering a well-crafted starting point while still allowing room for customization.",
        },
        */
      ],
    },
  },
};

export default overviewCopy;
