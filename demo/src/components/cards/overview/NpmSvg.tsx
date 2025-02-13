import useTheme from '../../../hooks/useTheme';

const NpmSvg = () => {
  const { theme } = useTheme();
  return (
    <svg
      fill={theme === 'dark' ? '#FFF' : '#000'}
      display="flex"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="18px"
      height="18px"
    >
      <path d="m0 0h24v24h-24z" fill="none" />
      <path d="m20 3c.552 0 1 .448 1 1v16c0 .552-.448 1-1 1h-16c-.552 0-1-.448-1-1v-16c0-.552.448-1 1-1zm-3 4h-10v10h5v-7.5h2.5v7.5h2.5z" />
    </svg>
  );
};

export default NpmSvg;
