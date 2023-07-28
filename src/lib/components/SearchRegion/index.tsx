import {
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconSearch
} from '@tabler/icons-react';
import React from 'react';
import Fuse from 'fuse.js';
import styles from './styles.module.css';
import { useDataContext } from '../../context';

const SearchRegion: React.FC = () => {
  const [filter, setFilter] = React.useState<string>('Filter By Region');
  const [showFilterList, setShowFilterList] = React.useState<boolean>(false);
  const $searchRef = React.useRef<HTMLInputElement | null>(null);
  const { data, setData, originalArray } = useDataContext();

  const fuse = React.useMemo(
    () =>
      new Fuse(data, {
        keys: ['name'],
        includeScore: false
      }),
    [data]
  );

  const handleSearchCountry = React.useCallback(() => {
    const searchValue = $searchRef?.current?.value;
    if (searchValue == null || searchValue.trim() === '') {
      return filter === 'Filter By Region'
        ? originalArray
        : originalArray.filter((dataFilter) => dataFilter.region === filter);
    }
    const result = fuse.search(searchValue).map((obj) => obj.item);
    return result;
  }, [fuse, filter, originalArray]);

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      setData(() => {
        const newData = originalArray.filter(
          (dataFilter) => dataFilter.name === filter
        );
        return newData;
      });
    },
    [filter, originalArray, setData]
  );

  const handleFilterClick = React.useCallback(
    (filterText: string) => {
      setShowFilterList(false);
      if (filterText === filter) {
        setFilter('Filter by Region');
        if ($searchRef.current?.value.trim() === '') {
          setData([...originalArray]);
        }
      } else {
        setFilter(filterText);
        const newData = data?.filter(
          (dataFilter) => dataFilter.region === filterText
        );
        setData(newData);
      }
    },
    [data, filter, originalArray, setData]
  );

  const filters = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  // eslint-disable-next-line arrow-body-style
  const dataList = React.useMemo(() => {
    return (
      <datalist id="countrys">
        {originalArray?.map(({ name }) => (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <option
            key={name}
            value={name}
          />
        ))}
      </datalist>
    );
  }, [originalArray]);

  return (
    <span className={styles.container}>
      {dataList}
      <form
        className={styles.form}
        role="search"
        // onSubmit={handleSubmit}
        onSubmit={(ev) => {
          ev.preventDefault();
        }}
      >
        <button
          type="submit"
          className={styles.searchButton}
        >
          <IconSearch size={22} />
        </button>
        <label
          htmlFor="search"
          className={styles.label}
        >
          <input
            type="search"
            id="search"
            list="countrys"
            ref={$searchRef}
            onChange={() => {
              setData(handleSearchCountry);
            }}
            className={styles.searchInput}
            placeholder="Search for a country..."
            required
            aria-label="Search a country"
            title="Search for a country!"
          />
        </label>
      </form>
      <div className={styles.filterContainer}>
        <button
          type="button"
          className={styles.buttonFilter}
          onClick={() => {
            setShowFilterList(!showFilterList);
          }}
        >
          {filter}{' '}
          {showFilterList ? <IconCaretDownFilled /> : <IconCaretUpFilled />}
        </button>
        <ul
          className={styles.filterList}
          style={{ display: showFilterList ? 'inline-flex' : 'none' }}
        >
          {filters.map((filterText) => (
            <li key={filterText}>
              <button
                type="button"
                title={`Filter ${filterText} Region`}
                aria-label={`Filter by this region: ${filterText}`}
                onClick={() => {
                  handleFilterClick(filterText);
                }}
              >
                {filterText}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </span>
  );
};

export default SearchRegion;
