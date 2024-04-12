import { Flex, FlexItem, Table, TableData, TableRow, Typography } from '@rothko-ui/ui';
import React from 'react';
import styles from './Cards.module.scss';
import type { ComponentProperty } from './types';
import { toKebabCase } from '@rothko-ui/utils';
import Link from 'next/link';

type PropsTableProps = {
  props: readonly ComponentProperty[];
};

const PropsTable = ({ props: propsMeta }: PropsTableProps) => {
  return (
    <Table headers={['Name', 'Type', 'Default', 'Description']}>
      {propsMeta.map(({ name, type, defaultValue, description }) => (
        <TableRow key={name}>
          <TableData>{name}</TableData>
          <TableData>
            <code style={{ fontSize: '0.875rem' }}>{type}</code>
          </TableData>
          {defaultValue === null ? (
            <TableData />
          ) : (
            <TableData>
              <code style={{ fontSize: '0.875rem' }}>{defaultValue}</code>
            </TableData>
          )}
          <TableData>{description}</TableData>
        </TableRow>
      ))}
    </Table>
  );
};

type PropsCopy = {
  props: readonly ComponentProperty[];
  title?: string;
};

const Props = ({ copy }: { copy: PropsCopy | Required<PropsCopy>[] }) => {
  const Title = Typography['h3'];
  if (Array.isArray(copy)) {
    return (
      <section>
        <Title className={styles.headerIdk} id="props">
          <Link href="#props" scroll>
            Props
          </Link>
        </Title>
        <Flex className={styles.propsContainer} flexDirection="column" rowGap="3rem">
          {copy.map(propsCopy => (
            <FlexItem key={propsCopy.title}>
              <Typography.h5 style={{ marginBottom: '1rem' }}>{propsCopy.title}</Typography.h5>
              <PropsTable props={propsCopy.props} />
            </FlexItem>
          ))}
        </Flex>
      </section>
    );
  }

  const title = copy.title || 'Props';
  const titleAsKebab = title && toKebabCase(title);

  return (
    <section>
      <Title className={styles.headerIdk} id={titleAsKebab}>
        <Link href={`#${titleAsKebab}`} scroll>
          {title}
        </Link>
      </Title>
      <div className={styles.propsContainer}>
        <PropsTable props={copy.props} />
      </div>
    </section>
  );
};

export default Props;
