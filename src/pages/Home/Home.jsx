import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { images } from "../../constants";

import { baseUrl, fetchApi } from "../../utils/fetchApi";
import Property from "../../components/Property";

const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
  imageUrl,
}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <img src={imageUrl} width={500} height={300} alt="banner" />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1}
        <br />
        {title2}
      </Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">
        {desc1}
        <br />
        {desc2}
      </Text>
      <Button fontSize="xl">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);

const Home = () => {
  const [propertyForSale, setPropertyForSale] = useState([]);
  const [propertyForRent, setPropertyForRent] = useState([]);

  useEffect(() => {
    const getStaticProps = async () => {
      const propertyForSaleData = await fetchApi(
        `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
      );

      setPropertyForSale(propertyForSaleData?.hits);
      console.log(propertyForSale);

      const propertyForRentData = await fetchApi(
        `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
      );

      setPropertyForRent(propertyForRentData?.hits);
    };

    // getStaticProps();
  }, []);

  return (
    <Box>
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl={images.BuyImg}
      />
      <Flex flexWrap="wrap">
        {propertyForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      <Banner
        purpose="BUY A HOME"
        title1="Find, Buy & Own Your"
        title2="Dream Home"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl={images.RentImg}
      />

      {propertyForSale.map((property) => (
        <Property property={property} key={property.id} />
      ))}
    </Box>
  );
};

export default Home;
