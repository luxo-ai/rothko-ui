import {
  Accordion,
  AccordionPanel,
  Alert,
  Avatar,
  BackLinkButton,
  Button,
  Checkbox,
  GentleImage,
  Input,
  Label,
  SkeletonBoxWithLabel,
  ThemeProvider,
  ExpandableLabel,
  Modal,
  Text,
} from '@aemiko/ui';
import { useState } from 'react';
import './App.css';

// linear-gradient(0.25turn, #9198e5, #e66465)

const App = () => {
  return (
    <ThemeProvider>
      <div className="app-container">
        <header className="app-header">
          <h2>use me to test components</h2>
        </header>
        <main className="example-cards">
          <ModalCard />
          <LabelCard />
          <InputCard />
          <GentleImageCard />
          <CheckboxCard />
          <AlertCard />
          <AccordionCard />
          <AvatarCard />
          <ButtonCard />
        </main>
      </div>
    </ThemeProvider>
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
          pill
          loading={loading3}
          kind="success"
          size="s"
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
      <Checkbox checked={checked1} onChange={() => setChecked1(!checked1)} />
      <Checkbox checked={checked2} onChange={() => setChecked2(!checked2)}>
        Hello world
      </Checkbox>
    </div>
  );
};

const GentleImageCard = () => {
  const [reloadCount, setReloadCount] = useState(0);
  return (
    <div className="white-padded-card">
      <h3>Gentle Image</h3>
      <Button onClick={() => setReloadCount(c => c + 1)}>Reload</Button>
      <GentleImage
        // in order to force reload
        key={`gentle-image-${reloadCount}`}
        width={300}
        height={300}
        alt="dog"
        src="assets/dog.png"
      />
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

export default App;
