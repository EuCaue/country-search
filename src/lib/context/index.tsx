import React from 'react';

export type DataType = {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  subregion: string;
  region: string;
  population: number;
  latlng: [number, number];
  demonym: string;
  area: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  flags: {
    svg: string;
    png: string;
  };
  currencies: Array<{
    code: string;
    name: string;
    symbol: string;
  }>;
  languages: Array<{
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
  }>;
  translations: {
    br: string;
    pt: string;
    nl: string;
    hr: string;
    fa: string;
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    hu: string;
  };
  flag: string;
  regionalBlocs: Array<{
    acronym: string;
    name: string;
  }>;
  cioc: string;
  independent: boolean;
};

type ContextType = {
  data: DataType[] | [];
  setData: React.Dispatch<React.SetStateAction<DataType[] | []>>;
  setSelectCard: React.Dispatch<React.SetStateAction<DataType | null>>;
  selectCard: DataType | null;
  originalArray: DataType[] | [];
};

export const DataContext = React.createContext<ContextType>({
  data: [],
  originalArray: [],
  selectCard: null,
  setSelectCard: () => {},
  setData: () => {}
});

const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [data, setData] = React.useState<DataType[] | []>([]);
  const [originalArray, setOriginalArray] = React.useState<DataType[] | []>([]);
  const [selectCard, setSelectCard] = React.useState<DataType | null>(null);

  const providerValues = React.useMemo(
    () => ({ data, setData, originalArray, selectCard, setSelectCard }),
    [data, originalArray, selectCard]
  );

  const getData = async (): Promise<DataType[]> => {
    const response = await fetch('data.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    return response.json();
  };

  React.useEffect(() => {
    void getData().then((r) => {
      setData(r);
      setOriginalArray(r);
    });
  }, []);

  return (
    <DataContext.Provider value={providerValues}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): ContextType => React.useContext(DataContext);

export default DataProvider;
