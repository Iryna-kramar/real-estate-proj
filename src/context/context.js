import React, { useState } from "react";
import axios from "axios";

const PropertyContext = React.createContext();

const PropertyProvider = ({ children }) => {
  const [propertyForSale, setPropertyForSale] = useState([]);
  const [propertyForRent, setPropertyForRent] = useState([]);

  const baseUrl = "https://bayut.p.rapidapi.com";

  const fetchApi = async (url) => {
    const { data } = await axios.get(url, {
      headers: {
        "X-RapidAPI-Key": "b5f3a12cd0mshf04141b6e4670edp186cc4jsnc80db980c122",
        "X-RapidAPI-Host": "bayut.p.rapidapi.com",
      },
    });
    return data;
  };
  

  const getStaticProps = async () => {
    const propertyForSaleData = await fetchApi(
      `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
    );

    setPropertyForSale(propertyForSaleData?.hits);

    const propertyForRentData = await fetchApi(
      `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
    );

    setPropertyForRent(propertyForRentData?.hits);
  };

  return (
    <PropertyContext.Provider
      value={{
        fetchApi,
        propertyForRent,
        setPropertyForRent,
        propertyForSale,
        setPropertyForSale,
        getStaticProps,
        baseUrl,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export { PropertyProvider, PropertyContext };
