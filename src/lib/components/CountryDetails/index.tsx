import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import iso from 'iso-3166-1';
import { useDataContext } from '../../context';
import styles from './styles.module.css';

const CountryDetails: React.FC<{
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShow }) => {
  const { selectCard } = useDataContext();
  const handleGoBack = React.useCallback(() => {
    setShow(false);
  }, [setShow]);

  return (
    <div className={styles.container}>
      <button
        type="button"
        aria-label="Click to go back"
        title="Click to go back"
        onClick={handleGoBack}
        className={styles.buttonBack}
      >
        <IconArrowLeft />
        Back
      </button>

      <span className={styles.detailsa}>
        <img
          src={selectCard?.flags.svg}
          alt={`${selectCard!.name} Flag`}
          className={styles.countryImg}
        />
        <span className={styles.detailsContainer}>
          <p className={styles.detailsCountryName}>{selectCard?.name}</p>
          <ul className={styles.detailsList}>
            <span className={styles.column}>
              <li className={styles.itemDetailList}>
                <p>Native Name:</p>
                {selectCard?.nativeName}
              </li>
              <li className={styles.itemDetailList}>
                <p>Population:</p>
                {selectCard?.population.toLocaleString()}
              </li>
              <li className={styles.itemDetailList}>
                <p>Region:</p>
                {selectCard?.region}
              </li>
              <li className={styles.itemDetailList}>
                <p>Sub Region:</p>
                {selectCard?.subregion}
              </li>
              <li className={styles.itemDetailList}>
                <p>Capital:</p>
                {selectCard?.capital}
              </li>
            </span>

            <span className={styles.column}>
              <li className={styles.itemDetailList}>
                <p>Top Level Domain:</p>
                {selectCard?.topLevelDomain}
              </li>

              <li className={styles.itemDetailList}>
                <p>Currencies:</p>
                {selectCard?.currencies?.map((currency, index, array) => (
                  <span key={currency.code}>
                    {currency.name}
                    {index + 1 > array.length - 1 ? '' : ','}
                  </span>
                ))}
              </li>

              <li className={styles.itemDetailList}>
                <p>Languages:</p>
                {selectCard?.languages?.map((language, index, array) => (
                  <span key={language.iso639_2}>
                    {language.name}
                    {index + 1 > array.length - 1 ? '' : ','}
                  </span>
                ))}
              </li>
            </span>
          </ul>

          {selectCard?.borders != null ? (
            <span className={styles.borderCountries}>
              <p>Border Countries:</p>
              <span className={styles.countryBoxContainer}>
                {selectCard?.borders.map((country) => (
                  <div
                    key={country}
                    className={styles.countryBox}
                  >
                    {iso.whereAlpha3(country)?.country}
                  </div>
                ))}
              </span>
            </span>
          ) : (
            <></>
          )}
        </span>
      </span>
    </div>
  );
};

export default CountryDetails;
