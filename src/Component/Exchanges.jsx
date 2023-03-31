import {
  Container,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index";
import Loder from "./Loder";
import Error from "./Error";


const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)


  useEffect(() => {
    const featchExchanges = async () => {
          
       try{
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
       }catch(error){
         setError(true);
         setLoading(false);
       }
        
    };

    featchExchanges();
  }, []);
      if(error) return <Error message={'Error While Factching Time '} />

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loder />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={'space-evenly'} >
            {exchanges.map((i) => (
              <ExchangeCard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, img, rank, url }) => {
  return (
    <a href={url} target="blank">
      <VStack
        w={"52"}
        shadow={"lg"}
        p={"8"}
        borderRadius={"8"}
        transition={"all 0.3s "}
        margin={"4"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image
          src={img}
          w={"10"}
          h={"10"}
          objectFit={"contain"}
          alt={"Exchange"}
        />

        <Heading size={"md"} noOfLines={1}>
          {rank}{" "}
        </Heading>
        <Text noOfLines={1}> {name} </Text>
      </VStack>
    </a>
  );
};

export default Exchanges;
