import type { IconName } from '@fortawesome/fontawesome-svg-core';
import React, {
  CSSProperties,
  memo,
  ReactNode,
  useEffect,
  useState
} from 'react';
import { Spinner } from 'react-bootstrap';
import { forceCheck } from 'react-lazyload';

import { Icon } from './icon';
import { Responsive } from './responsive';
import { LazyLoader } from './loader';
import { Fader } from './transitioner';

/**
 * The Tabler component.
 * @template L The number of columns.
 */
export const Tabler = <L extends number>(props: TablerProps<L>) => {
  const {
    columns,
    classes,
    distribution,
    emptyMessage = '',
    heading = '',
    items,
    itemsLoaded
  } = props;

  if (!itemsLoaded) {
    return (
      <div className={classes?.tablerLoading}>
        <Spinner animation={'border'} size={'sm'} />
        <span>Loading...</span>
      </div>
    );
  } else if (!items.length) {
    return (
      <div className={classes?.tablerLoading}>
        <span>{emptyMessage}</span>
      </div>
    );
  }

  const centerAlignedIndices = columns.map((header, key) => {
    const { centerAlign } = header;
    if (centerAlign) return key;
  });

  const gridTemplateColumns = distribution.join(' ');

  const TablerRowItems = () => {
    return (
      <TablerRows
        centerAlignedIndices={centerAlignedIndices}
        classes={classes}
        gridTemplateColumns={gridTemplateColumns}
        items={items}
      />
    );
  };

  return (
    <div className={classes?.tablerContainer}>
      <TableHeading
        heading={heading}
        numOfItems={items.length}
        classes={classes}
      />
      <Responsive
        defaultView={
          <div className={classes?.tablerDefaultGrid}>
            <TablerRowHeader
              classes={classes}
              columns={columns}
              gridTemplateColumns={gridTemplateColumns}
            />
            <TablerRowItems />
          </div>
        }
        mobileView={
          <div className={classes?.tablerMobileList}>
            <TablerRowItems />
          </div>
        }
      />
    </div>
  );
};

/**
 * Represents the Tabler heading text and number of rows.
 */
const TableHeading = ({ heading, numOfItems, classes }: TablerHeadingProps) => {
  if (!heading) return null;
  const plurality = numOfItems === 1 ? 'result' : 'results';
  return (
    <div className={classes?.tablerHeadingWrapper}>
      <div className={classes?.tablerHeadingTitle}>{heading}</div>
      <div className={classes?.tablerHeadingItemCount}>
        {numOfItems} {plurality}
      </div>
    </div>
  );
};

/**
 * Represents the header row of the Tabler component.
 */
const TablerRowHeader = ({
  columns,
  gridTemplateColumns,
  classes
}: TablerRowHeaderProps) => {
  return (
    <div className={classes?.tablerRowHeader} style={{ gridTemplateColumns }}>
      {columns.map((column: TablerColumnHeader, key: number) => {
        const { label, centerAlign = false } = column;
        const style: CSSProperties = {
          textAlign: centerAlign ? 'center' : 'left'
        };
        return (
          <span style={style} key={key}>
            {label}
          </span>
        );
      })}
    </div>
  );
};

/**
 * Represents the collection of {@link TablerRowItem}s.
 */
const TablerRows = ({
  centerAlignedIndices,
  gridTemplateColumns,
  items,
  classes
}: TablerRowsProps) => {
  return (
    <>
      {items.map((fields, key) => {
        return (
          <TablerRowItem
            centerAlignedIndices={centerAlignedIndices}
            classes={classes}
            fields={fields}
            key={key}
            index={key}
            style={{ gridTemplateColumns }}
          />
        );
      })}
    </>
  );
};

/**
 * Represents a single tabler row item.
 */
const TablerRowItem = memo(
  ({
    centerAlignedIndices,
    classes,
    fields,
    index,
    style
  }: TablerRowItemProps) => {
    const [isLoaded, setLoaded] = useState(false);
    useEffect(() => {
      forceCheck();
      setLoaded(true);
    }, [isLoaded]);

    const [isInView, setInView] = useState(false);

    return (
      <LazyLoader setInView={setInView} height={200} offset={100}>
        <Fader
          key={index}
          determinant={isInView}
          duration={500}
          delay={30}
          className={classes?.tablerRowItem}
          postTransitions={'background-color .1s ease'}
          style={style}>
          <TablerItemFields
            fields={fields}
            classes={classes}
            centerAlignedIndices={centerAlignedIndices}
          />
          <Responsive
            mobileView={<CrudButtons fields={fields} classes={classes} />}
          />
        </Fader>
      </LazyLoader>
    );
  }
);

/**
 * Represents the collection of fields for a single row item.
 */
const TablerItemFields = ({
  fields,
  classes,
  centerAlignedIndices
}: TablerItemFieldsProps) => {
  const itemFields = fields
    .filter((e) => e)
    .map((cell: TablerItemCell, key: number) => {
      let value = cell.value;
      const { type, subvalue = '', showOnCondition } = cell.options;

      if (
        showOnCondition &&
        !new Boolean(showOnCondition.condition!).valueOf()
      ) {
        value = null;
      }

      const isCenterAligned = centerAlignedIndices.includes(key);
      const style = { textAlign: isCenterAligned ? 'center' : 'left' };

      return (
        <Responsive
          key={key}
          defaultView={
            <DefaultView
              style={style as CSSProperties}
              value={value}
              subvalue={subvalue}
              classes={classes}
            />
          }
          mobileView={<MobileView field={cell} classes={classes} key={key} />}
        />
      );
    });

  return <>{itemFields}</>;
};

/**
 * The default view for each field.
 */
const DefaultView = ({ value, subvalue, style, classes }: DefaultViewProps) => {
  if (!subvalue)
    return (
      <span className={classes?.tablerItemValue} style={style}>
        {value}
      </span>
    );

  return (
    <div className={classes?.tablerItemValue}>
      <span style={style}>{value}</span>
      <div className={classes?.tablerItemSubvalue}>{subvalue}</div>
    </div>
  );
};

/**
 * The mobile view for each field.
 */
const MobileView = ({ field, classes }: MobileView) => {
  const {
    value,
    options: { icon, type, hideIfEmpty = false, hideOnMobile = false }
  } = field;

  if (!value && hideIfEmpty) return null;
  if (hideOnMobile) return null;

  switch (type) {
    case TablerFieldType.BUTTON:
      return null;
    case TablerFieldType.IMAGE:
      return <>{value}</>;
    case TablerFieldType.INDEX:
      return <div className={classes?.tablerItemIndex}>{value}</div>;
    default:
      return (
        <div className={classes?.tablerMobileField}>
          <span>
            <Icon name={icon!} />
          </span>
          <span>{value}</span>
        </div>
      );
  }
};

/**
 * The CRUD buttons for each field.
 */
const CrudButtons = memo(({ fields, classes }: CrudButtons) => {
  return (
    <div className={classes?.tablerCrudButtons}>
      {fields
        .filter(({ options }) => options.type === TablerFieldType.BUTTON)
        .map(({ value }, key) => {
          return <span key={key}>{value}</span>;
        })}
    </div>
  );
});

/**
 * Represents a single column header for the Tabler component.
 */
export class TablerColumnHeader {
  label: string | JSX.Element;
  centerAlign: boolean;

  constructor(
    label: string | JSX.Element,
    options: TablerColumnHeaderOptions = {}
  ) {
    this.label = label;
    this.centerAlign = options.centerAlign ?? false;
  }
}

/**
 * Represents a single item cell for the Tabler component.
 */
export class TablerItemCell {
  value: ReactNode;
  options: TablerItemFieldOptions;

  constructor(value: ReactNode, options: TablerItemFieldOptions = {}) {
    this.value = value;
    this.options = options;
  }
}

export enum TablerFieldType {
  BUTTON = 'button',
  IMAGE = 'image',
  INDEX = 'index'
}

export interface TablerProps<L extends number> {
  columns: Array<TablerColumnHeader>;
  distribution: FixedLengthArray<string, L>;
  emptyMessage: string;
  heading: string;
  items: Array<FixedLengthArray<TablerItemCell, L>>;
  itemsLoaded: boolean;
  classes?: TablerClasses;
}

export interface FixedLengthArray<T extends any, L extends number>
  extends Array<T> {
  0: T;
  length: L;
}

type TablerRowsProps = {
  centerAlignedIndices: CenterAlignedIndices;
  gridTemplateColumns: string;
  items: TablerItemCell[][];
  classes?: TablerClasses;
};

type TablerHeadingProps = {
  heading: string;
  numOfItems: number;
  classes?: TablerClasses;
};

type TablerColumnHeaderOptions = {
  centerAlign?: boolean;
};

type TablerRowHeaderProps = {
  columns: TablerColumnHeader[];
  gridTemplateColumns: string;
  classes?: TablerClasses;
};

type TablerRowItemProps = {
  centerAlignedIndices: CenterAlignedIndices;
  fields: TablerItemCell[];
  index: number;
  style: CSSProperties;
  classes?: TablerClasses;
};

type TablerItemFieldsProps = {
  centerAlignedIndices: CenterAlignedIndices;
  fields: TablerItemCell[];
  classes?: TablerClasses;
};

type TablerItemFieldOptions = {
  type?: TablerFieldType;
  icon?: IconName;
  subvalue?: string;
  hideIfEmpty?: boolean;
  hideOnMobile?: boolean;
  showOnCondition?: {
    condition: boolean;
  };
};

type DefaultViewProps = {
  value: ReactNode;
  subvalue: string;
  style: CSSProperties;
  classes?: TablerClasses;
};

type MobileView = {
  field: TablerItemCell;
  classes?: TablerClasses;
};

type CrudButtons = {
  fields: TablerItemCell[];
  classes?: TablerClasses;
};

type TablerClasses = {
  tablerLoading: string;
  tablerContainer: string;
  tablerDefaultGrid: string;
  tablerMobileList: string;
  tablerHeadingWrapper: string;
  tablerHeadingTitle: string;
  tablerHeadingItemCount: string;
  tablerRowHeader: string;
  tablerRowItem: string;
  tablerItemValue: string;
  tablerItemSubvalue: string;
  tablerItemIndex: string;
  tablerMobileField: string;
  tablerCrudButtons: string;
};

type CenterAlignedIndices = (number | undefined)[];
