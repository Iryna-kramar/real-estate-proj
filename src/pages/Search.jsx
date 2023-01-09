import React, { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { Flex, Box, Text, Icon, Image } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import SearchFilters from "../components/SearchFilters";
import Property from "../components/Property";
import { images } from "../constants";
import { PropertyContext } from "../context/context";

const Search = () => {
  const [searchFilters, setSearchFilters] = useState(false);
  const [properties, setProperties] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();


  const { fetchApi, baseUrl } = useContext(PropertyContext);

  const getServerSideProps = async () => {
    const purpose = searchParams.get("purpose") || "for-rent";
    const rentFrequency = searchParams.get("rentFrequency") || "yearly";
    const minPrice = searchParams.get("minPrice") || "0";
    const maxPrice = searchParams.get("maxPrice") || "1000000";
    const roomsMin = searchParams.get("roomsMin") || "0";
    const bathsMin = searchParams.get("bathsMin") || "0";
    const sort = searchParams.get("sort") || "price-desc";
    const areaMax = searchParams.get("areaMax") || "35000";
    const locationExternalIDs =
      searchParams.get("locationExternalIDs") || "5002";
    const categoryExternalID = searchParams.get("categoryExternalID") || "4";

      const propertiesData = await fetchApi(
        `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
      );
      setProperties(propertiesData?.hits);
    console.log(properties);
  };

  useEffect(() => {
    // getServerSideProps();
  }, []);

  return (
    <Box>
      <Flex
        cursor="pointer"
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
        onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
      >
        <Text>Search Property by Filters</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize="2xl" p="4" fontWeight="bolt">
        Properties {searchParams.get("purpose")}
      </Text>
      <Flex flexWrap="wrap">
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      {properties.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          marginTop="5"
          marginBottom="5"
        >
          <Image src={images.noresult} />
          <Text fontSize="xl" marginTop="3">
            No Result Found.
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default Search;
