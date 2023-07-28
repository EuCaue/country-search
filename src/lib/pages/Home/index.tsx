import React from 'react';
import CountryCards from '../../components/CountryCards';
import DataProvider from '../../context';
import SearchRegion from '../../components/SearchRegion';
import CountryDetails from '../../components/CountryDetails';

const Home: React.FC = () => {
  const [show, setShow] = React.useState<boolean>(false);

  return (
    <DataProvider>
      {!show ? (
        <>
          <SearchRegion />
          <CountryCards setShow={setShow} />
        </>
      ) : (
        <CountryDetails setShow={setShow} />
      )}
    </DataProvider>
  );
};
export default Home;
