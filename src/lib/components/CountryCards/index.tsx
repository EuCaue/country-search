import React from 'react';
import styles from './styles.module.css';
import { useDataContext, type DataType } from '../../context';

const CountryCard: React.FC<
  Partial<
    DataType &
      Required<{
        setShow: React.Dispatch<React.SetStateAction<boolean>>;
        index: number;
      }>
  >
> = ({ flags, name, population, region, capital, setShow, index }) => {
  const { setSelectCard, data } = useDataContext();

  const handleClick = React.useCallback(() => {
    if (setShow !== undefined && data !== null) {
      setShow(true);
      setSelectCard({ ...data[index!] });
    }
  }, [index, data, setSelectCard, setShow]);

  return (
    <div
      className={styles.containerCard}
      role="button"
      tabIndex={0}
      onKeyUp={handleClick}
      onClick={handleClick}
      aria-label={`Click on the card to see more details about ${name!}`}
    >
      <div className={styles.countryFlagImageContainer}>
        <img
          src={flags!.svg}
          alt={`Flag for the country ${name!}`}
          className={styles.countryFlagImage}
        />
      </div>

      <span className={styles.countryDetailsContainer}>
        <h1>{name}</h1>
        <ol className={styles.countryDetaisList}>
          <li>
            <span style={{ fontWeight: '600' }}>Population:</span>{' '}
            {population?.toLocaleString()}
          </li>
          <li>
            <span style={{ fontWeight: '600' }}>Region:</span> {region}
          </li>
          <li>
            <span style={{ fontWeight: '600' }}>Capital:</span> {capital}
          </li>
        </ol>
      </span>
    </div>
  );
};
const CountryCards: React.FC<{
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShow }) => {
  const { data } = useDataContext();

  return (
    <div className={styles.container}>
      {data?.map(({ flags, name, population, region, capital }, index) => (
        <CountryCard
          key={name}
          flags={flags}
          name={name}
          population={population}
          region={region}
          capital={capital}
          index={index}
          setShow={setShow}
        />
      ))}
    </div>
  );
};

export default CountryCards;
