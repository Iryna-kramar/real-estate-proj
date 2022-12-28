import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Flex, Box, Text, Avatar } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import { images } from "../constants";

const Property = ({
  property: {
    coverPhoto,
    price,
    rentFreguency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  },
}) => {
  return (
    <Link href={`/property/${externalID}`} passHref>
      <Flex
        flexWrap="wrap"
        w="420px"
        p="5"
        paddingTop="0"
        justifyContent="flex-start"
        cursor="pointer"
      >
        <img
          src={coverPhoto ? coverPhoto.url : images.DefaultImage}
          width={400}
          height={260}
          alt="house"
        />
      </Flex>
    </Link>
  );
};

export default Property;
