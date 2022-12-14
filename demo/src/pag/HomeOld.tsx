import { Bell, Info } from '@rothko-ui/icons';
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
  Drawer,
  DrawerContext,
  Dropdown,
  ExpandableLabel,
  InlineRythmLoader,
  Input,
  Label,
  Modal,
  MultiSlider,
  NestedDropdown,
  Notification,
  OptionGroup,
  RothkoProvider,
  Search,
  SkeletonBoxWithLabel,
  Slider,
  TabBar,
  Tag,
  ToastContextProvider,
  Toggle,
  Typography,
  useRothko,
  useToaster,
  WithToolip,
} from '@rothko-ui/ui';
import EthereumQRPlugin from 'ethereum-qr-code';
import * as lorem from 'lorem-ipsum';
import React, { useState } from 'react';
import './App.css';

const on = false;

const Main = () => {
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
      <ToastContextProvider>
        <div className="app-container">
          <div style={{ margin: '0 auto', width: 'fit-content' }}>
            <img style={{ margin: '0 auto' }} src="/logo512.png" width={340} height={340} />
          </div>
          <div style={{ maxWidth: '30rem', marginLeft: '0rem', textAlign: 'center' }}>
            <Typography.titleBig style={{ color: 'white' }}>
              Powerful for developers. Fast for everyone.
            </Typography.titleBig>
          </div>
          <InlineRythmLoader asText size="m" kind="primary" />
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
            <ListCard />
            <SearchCard />
            <TooltipCard />
            <DrawerCard />
            <NotificationCard />
            <SliderCard />
            <MultiSliderCard />
            <TabBarCard />
            <ToggleCard />
            <ButtonCard />
            <NestedDropdownCard />
            <SingleDropdownCard />
            <MultiDropdownCard />
            <ToastCard />
            <BreadCrumbsCard />
            <TagCard />
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
    </RothkoProvider>
  );
};

const ThemeButton = () => {
  const { toggleMode } = useRothko();
  return <Button onClick={toggleMode}>toggle theme</Button>;
};

const ListCard = () => {
  const [singleVal, setSingleVal] = useState<boolean>(false);

  return (
    <div className="white-padded-card">
      <h3>List</h3>
      <Button onClick={() => setSingleVal(true)}>open me</Button>
      <div className="accordion-container">pk</div>
    </div>
  );
};

const TooltipCard = () => {
  const [singleVal, setSingleVal] = useState<boolean>(false);

  return (
    <div className="white-padded-card">
      <h3>Tooltip</h3>
      <Button onClick={() => setSingleVal(true)}>open me</Button>
      <div className="accordion-container">
        <WithToolip
          kind="right"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit
              at imperdiet dui accumsan sit. Aliquam id diam maecenas ultricies mi eget."
        >
          <Info height={20} width={20} />
        </WithToolip>
      </div>
    </div>
  );
};

const DrawerCard = () => {
  const [singleVal, setSingleVal] = useState<boolean>(false);

  return (
    <div className="white-padded-card">
      <h3>Drawer</h3>
      <Button onClick={() => setSingleVal(true)}>open me</Button>
      <div className="accordion-container">
        <DrawerContext.Provider
          value={{
            isOpen: singleVal,
            closeDrawer: () => setSingleVal(false),
            openDrawer: () => setSingleVal(true),
          }}
        >
          <Drawer>
            <Typography.h2>Hello world</Typography.h2>
            <Typography.body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit
              at imperdiet dui accumsan sit. Aliquam id diam maecenas ultricies mi eget.
            </Typography.body>
          </Drawer>
        </DrawerContext.Provider>
      </div>
    </div>
  );
};

const NotificationCard = () => {
  const [singleVal, setSingleVal] = useState<boolean>(false);

  return (
    <div className="white-padded-card">
      <h3>Notification</h3>
      <div className="accordion-container">
        <Notification color="success" size={10} count={400} maxCount={40}>
          <Bell width={24} height={24} />
        </Notification>
      </div>
    </div>
  );
};

const TabBarCard = () => {
  const [singleVal, setSingleVal] = useState<boolean>(false);
  const tabs = [
    { title: 'One', key: 'one', render: () => <Typography.h3>One</Typography.h3> },
    { title: 'Two', key: 'two', render: () => <Typography.h3>Two</Typography.h3> },
    { title: 'Three', key: 'three', render: () => <Typography.h3>Three</Typography.h3> },
  ] as const;

  return (
    <div className="white-padded-card">
      <h3>TabBar</h3>
      <div className="accordion-container">
        <TabBar kind="info" tabs={tabs} />
      </div>
    </div>
  );
};

const SliderCard = () => {
  const [singleVal, setSingleVal] = useState<number>(40);
  return (
    <div className="white-padded-card">
      <h3>Slider</h3>
      <div className="accordion-container">
        <Slider kind="primary" value={singleVal} max={100} onChange={v => setSingleVal(v)} />
      </div>
    </div>
  );
};

const MultiSliderCard = () => {
  const [singleVal, setSingleVal] = useState<[number, number]>([0, 50]);
  return (
    <div className="white-padded-card">
      <h3>Multi Slider</h3>
      <div className="accordion-container">
        <MultiSlider kind="primary" value={singleVal} max={100} onChange={r => setSingleVal(r)} />
      </div>
    </div>
  );
};

const ToggleCard = () => {
  const [singleVal, setSingleVal] = useState<boolean>(false);
  return (
    <div className="white-padded-card">
      <h3>Toggle</h3>
      <div className="accordion-container">
        <Toggle kind="success" toggled={singleVal} onChange={v => setSingleVal(v)} />
      </div>
    </div>
  );
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
          // mobile={false}
          header={<Typography.h5>Leaving home</Typography.h5>}
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
              label: 'Zero ds dsfdsdf fsdfsdfdsfdsfdsfds sdfdsfsdfds',
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
          search
          label="Testing"
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
          kind="success"
        >
          my first tag
        </Tag>
      </div>
    </div>
  );
};

const AccordionCard = () => {
  return (
    <div className="white-padded-card">
      <h3>Accordion</h3>
      <div className="accordion-container">
        <Accordion kind="primary" mutuallyExclusive bordered>
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
          shape="circle"
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
      <Checkbox
        style={{ marginBottom: 18 }}
        checked={checked1}
        onChange={() => setChecked1(!checked1)}
      />
      <Checkbox withCheck kind="info" checked={checked2} onChange={() => setChecked2(!checked2)}>
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
        kind="primary"
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

export default Main;
