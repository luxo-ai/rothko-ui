import {
  Accordion,
  AccordionPanel,
  Alert,
  Avatar,
  BackLinkButton,
  BottomPopup,
  BreadCrumbItem,
  BreadCrumbs,
  Button,
  Checkbox,
  ExpandableLabel,
  FilterGroup,
  Input,
  Label,
  Modal,
  OptionGroup,
  Radio,
  SkeletonBoxWithLabel,
  Tag,
  ThemeProvider,
  ToastContextProvider,
  useToaster,
  Toast,
  Dropdown,
  NestedDropdown,
  Search,
  Typography,
  RothkoProvider,
  useRothko,
} from '@rothko-ui/ui';
import { useState } from 'react';
import './App.css';
import * as lorem from 'lorem-ipsum';
import EthereumQRPlugin from 'ethereum-qr-code';

const on = false;

const App = () => {
  const qr = new EthereumQRPlugin();

  return (
    <RothkoProvider
      themeOverrides={
        on
          ? {
              color: {
                primary: { 100: { value: 'red' }, transparent: { 400: { value: '#ff00bf443' } } },
              },
            }
          : undefined
      }
    >
      <ThemeProvider>
        <ToastContextProvider>
          <div className="app-container">
            <header className="app-header">
              <Typography.h1 bold italic light kind="secondary">
                use me to test components
              </Typography.h1>
              <Typography.body>testing</Typography.body>
            </header>
            <Typography.body>testing</Typography.body>
            <ThemeButton />
            <div id="#my-qr-code"></div>
            <main className="example-cards">
              <ButtonCard />
              <NestedDropdownCard />
              <SearchCard />
              <SingleDropdownCard />
              <MultiDropdownCard />
              <ToastCard />
              <BreadCrumbsCard />
              <TagCard />
              <FilterGroupCard />
              <RadioCard />
              <BottomPopupCard />
              <OptionGroupCard />
              <ModalCard />
              <LabelCard />
              <InputCard />
              <CheckboxCard />
              <AlertCard />
              <AccordionCard />
              <AvatarCard />
            </main>
          </div>
        </ToastContextProvider>
      </ThemeProvider>
    </RothkoProvider>
  );
};

const ThemeButton = () => {
  const { toggleMode } = useRothko();
  return <Button onClick={toggleMode}>toggle theme</Button>;
};

const NestedDropdownCard = () => {
  const [singleVal, setSingleVal] = useState<string | null>(null);
  return (
    <div className="white-padded-card">
      <h3>NestedDropdown</h3>
      <div className="accordion-container">
        <NestedDropdown value={singleVal} onChange={v => setSingleVal(v)} options={nestedOptions} />
      </div>
    </div>
  );
};

const nestedOptions = [
  {
    id: '0',
    label: 'Sub',
    subcategories: [
      {
        id: '01',
        label: 'Sub-One',
      },
      {
        id: '02',
        label: 'Sub-Two',
      },
      { id: '03', label: 'Sub-Three' },
    ],
  },
  {
    id: '1',
    label: 'Two',
  },
  {
    id: '2',
    label: 'Three',
  },
];

const getBooks = async (q: string) => {
  const books = await fetch(`http://openlibrary.org/search.json?q=${q}`);
  const j = await books.json();
  console.log('ayo', j);
  return (j.docs as any[]).map((x, i) => ({ id: `${i}-${x.title}`, label: x.title }));
};

const SearchCard = () => {
  return (
    <div className="white-padded-card">
      <h3>Search</h3>
      <div className="accordion-container">
        <Search
          onSearch={q => console.log('?', q)}
          placeholder="Search..."
          dataFetcher={getBooks}
        />
      </div>
    </div>
  );
};

const MultiDropdownCard = () => {
  const [singleVal, setSingleVal] = useState<number>();
  return (
    <div className="white-padded-card">
      <h3>Multi Dropdown</h3>
      <div className="accordion-container">
        <Dropdown
          multiple
          value={singleVal}
          onChange={v => setSingleVal(v as number)}
          options={[
            {
              id: 0,
              label: 'Zero',
            },
            {
              id: 1,
              label: 'One',
            },
            {
              id: 2,
              label: 'Two',
            },
            {
              id: 3,
              label: 'Three',
            },
            {
              id: 4,
              label: 'Four',
            },
            {
              id: 5,
              label: 'Five',
            },
          ]}
        />
      </div>
    </div>
  );
};

const SingleDropdownCard = () => {
  const [selectedValue, setSelectedValue] = useState<number[]>([]);
  return (
    <div className="white-padded-card">
      <h3>Single Dropdown</h3>
      <div className="accordion-container">
        <Dropdown
          value={selectedValue}
          onChange={v => setSelectedValue(v as number[])}
          options={[
            {
              id: 0,
              label: 'Zero',
            },
            {
              id: 1,
              label: 'One',
            },
            {
              id: 2,
              label: 'Two',
            },
          ]}
        />
      </div>
    </div>
  );
};

const ToastCard = () => {
  const { addToast } = useToaster();
  return (
    <div className="white-padded-card">
      <h3>Toasts</h3>
      <div className="accordion-container">
        <button
          onClick={() => {
            addToast({
              label: lorem.loremIpsum({ count: 1 }),
              content: lorem.loremIpsum({ count: 3 }),
              withLife: true,
              kind: 'warning',
              duration: Math.random() * 3000 + 9000,
            });
          }}
        >
          Click
        </button>
      </div>
    </div>
  );
};

const BreadCrumbsCard = () => {
  return (
    <div className="white-padded-card">
      <h3>Bread Crumbs</h3>
      <div className="accordion-container">
        <BreadCrumbs>
          <BreadCrumbItem to="ok">One</BreadCrumbItem>
          <BreadCrumbItem onClick={() => console.log('ok')}>Two</BreadCrumbItem>
          <BreadCrumbItem>Three</BreadCrumbItem>
        </BreadCrumbs>
      </div>
    </div>
  );
};

const TagCard = () => {
  return (
    <div className="white-padded-card">
      <h3>Tag</h3>
      <div className="accordion-container">
        <Tag
          onClose={() => {
            console.log('ayo');
          }}
          appearance="filled"
          kind="danger"
        >
          my first tag
        </Tag>
      </div>
    </div>
  );
};

const FilterGroupCard = () => {
  const [selectedValue, setSelectedValue] = useState<number[]>([]);
  return (
    <div className="white-padded-card">
      <h3>Filter Group</h3>
      <div className="accordion-container">
        <FilterGroup
          kind="info"
          value={selectedValue}
          multible
          options={[
            { id: 1, label: 'One' },
            { id: 2, label: 'Two' },
            { id: 3, label: 'Three' },
          ]}
          onSelect={ids => setSelectedValue(ids as number[])}
        />
      </div>
    </div>
  );
};

const AccordionCard = () => {
  return (
    <div className="white-padded-card">
      <h3>Accordion</h3>
      <div className="accordion-container">
        <Accordion kind="black" mutuallyExclusive bordered>
          <AccordionPanel title="Label 1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit
            at imperdiet dui accumsan sit. Aliquam id diam maecenas ultricies mi eget.
          </AccordionPanel>
          <AccordionPanel title="Label 2">
            Massa ultricies mi quis hendrerit dolor magna. Consequat id porta nibh venenatis cras
            sed felis eget. Magna fringilla urna porttitor rhoncus dolor purus non enim praesent.
            Malesuada proin libero nunc consequat interdum varius.
          </AccordionPanel>
          <AccordionPanel title="Label 3">
            Montes nascetur ridiculus mus mauris vitae ultricies leo. Sed vulputate odio ut enim
            blandit volutpat maecenas volutpat. Amet venenatis urna cursus eget nunc.
          </AccordionPanel>
        </Accordion>
      </div>
    </div>
  );
};

const AvatarCard = () => {
  return (
    <div className="white-padded-card">
      <h3>Avatar</h3>
      <Avatar name="Jim Spot" url="assets/dog.png" />
      <div>
        <SkeletonBoxWithLabel
          backgroundColor="#a5aae3"
          foregroundColor="#e18a8a"
          speed={1}
          height={100}
          width={100}
        />
      </div>
    </div>
  );
};

const ButtonCard = () => {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  return (
    <div className="white-padded-card">
      <h3>Button</h3>
      <div>
        <Button
          pill
          loading={loading1}
          appearance="outline"
          kind="danger"
          onClick={() => setLoading1(!loading1)}
          style={{ maxWidth: 200, marginBottom: '1rem' }}
        >
          Click me
        </Button>
      </div>
      <div>
        <Button
          loading={loading2}
          kind="black"
          size="l"
          onClick={() => setLoading2(!loading2)}
          style={{ maxWidth: 200, marginBottom: '1rem' }}
        >
          Big Button
        </Button>
      </div>
      <div>
        <Button
          loading={loading3}
          kind="success"
          onClick={() => setLoading3(!loading3)}
          style={{ maxWidth: 200, marginBottom: '1rem' }}
        >
          Small Button
        </Button>
        <div>
          <BackLinkButton />
        </div>
      </div>
    </div>
  );
};

const AlertCard = () => {
  return (
    <div className="white-padded-card">
      <h3>Alert</h3>
      <Alert>Testing</Alert>
    </div>
  );
};

const CheckboxCard = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  return (
    <div className="white-padded-card">
      <h3>Checkbox</h3>
      <Checkbox kind="danger" checked={checked1} onChange={() => setChecked1(!checked1)} />
      <Checkbox kind="info" checked={checked2} onChange={() => setChecked2(!checked2)}>
        Hello world
      </Checkbox>
    </div>
  );
};

const InputCard = () => {
  return (
    <div className="white-padded-card">
      <h3>Input</h3>
      <Input />
      <Input size="s" />
      <Input size="l" />
    </div>
  );
};

const LabelCard = () => {
  return (
    <div className="white-padded-card">
      <h3>Label</h3>
      <Label>Hello world</Label>
      <ExpandableLabel label="Expandable">Details</ExpandableLabel>
    </div>
  );
};

const ModalCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="white-padded-card">
      <h3>Modal</h3>
      <Button onClick={() => setModalOpen(true)}>Open modal?</Button>
      <Modal
        title="Modal medium Modal medium Modal medium Modal medium"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        size="m"
      >
        Details about life you know....
        <Button style={{ display: 'block', marginTop: '1rem' }} onClick={() => setModalOpen(false)}>
          Click me to close
        </Button>
      </Modal>
    </div>
  );
};

const OptionGroupCard = () => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  return (
    <div className="white-padded-card">
      <h3>Option Group</h3>
      <OptionGroup
        fillRemainingSpace
        value={selectedValue}
        onChange={v => setSelectedValue(v)}
        kind="info"
        maxRow={1}
        maxCol={2}
        options={[
          { id: 1, label: 'One' },
          { id: 2, label: 'Two' },
          { id: 3, label: 'Three', data: { disabled: true } },
        ]}
      />
    </div>
  );
};

const BottomPopupCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="white-padded-card">
      <h3>Bottom Popup</h3>
      <Button onClick={() => setIsOpen(true)}>Open popup</Button>
      <BottomPopup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>Hello world</div>
      </BottomPopup>
    </div>
  );
};

const RadioCard = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  return (
    <div className="white-padded-card">
      <h3>Radio</h3>
      <Radio checked={checked1} onChange={c => setChecked1(c)} />
    </div>
  );
};

export default App;
