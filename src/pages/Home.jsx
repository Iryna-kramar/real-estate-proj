import React, { useEffect, useState, useContext } from "react";
import { Flex, Box, Text, Button, Link, Image } from "@chakra-ui/react";
import { images } from "../constants";

import Property from "../components/Property";
import { PropertyContext } from "../context/context";

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
    <Image src={imageUrl} width={500} height={300} alt="banner" />
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
  const {
    propertyForRent,
    propertyForSale,
    getStaticProps,
  } = useContext(PropertyContext);

  useEffect(() => {
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
      <Flex flexWrap="wrap">
        {propertyForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </Box>
  );
};

export default Home;
