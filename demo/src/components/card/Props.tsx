import { Code, Heading5, Heading3 } from '@rothko-ui/react';
import toKebabCase from 'lodash.kebabcase';
import sortBy from 'lodash.sortby';
import Link from 'next/link';
import React, { useMemo } from 'react';

import styles from './Card.module.scss';
import { Flex } from '../flex';
import { Table, TableData, TableRow } from '../table';
import type { ComponentProperty } from './types';

type PropsTableProps = {
  props: readonly ComponentProperty[];
};

const PropsTable = ({ props: propsMeta }: PropsTableProps) => {
  const sortedPropsMeta = useMemo(() => {
    return sortBy([...propsMeta], ['name']);
  }, [propsMeta]);

  return (
    <Table headers={['Name', 'Type', 'Default', 'Description']}>
      {sortedPropsMeta.map(({ name, type, defaultValue, description }) => (
        <TableRow key={name}>
          <TableData>{name}</TableData>
          <TableData>
            <Code style={{ fontSize: '0.875rem' }}>{type}</Code>
          </TableData>
          {defaultValue === null ? (
            <TableData />
          ) : (
            <TableData>
              <Code style={{ fontSize: '0.875rem' }}>{defaultValue}</Code>
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
  if (Array.isArray(copy)) {
    return (
      <section>
        <Heading3 className={styles.hashLinkableHeader} id="props">
          <Link href="#props" scroll>
            Props
          </Link>
        </Heading3>
        <Flex className={styles.propsContainer} flexDirection="column" rowGap="3rem">
          {copy.map(propsCopy => (
            <div key={propsCopy.title}>
              <Heading5 style={{ marginBottom: '1rem' }}>{propsCopy.title}</Heading5>
              <PropsTable props={propsCopy.props} />
            </div>
          ))}
        </Flex>
      </section>
    );
  }

  const title = copy.title || 'Props';
  const titleAsKebab = title && toKebabCase(title);

  return (
    <section>
      <Heading3 className={styles.hashLinkableHeader} id={titleAsKebab}>
        <Link href={`#${titleAsKebab}`} scroll>
          {title}
        </Link>
      </Heading3>
      <div className={styles.propsContainer}>
        <PropsTable props={copy.props} />
      </div>
    </section>
  );
};

export default Props;
