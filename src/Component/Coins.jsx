import {
    Container,
    HStack,
    Button,
    RadioGroup,
    Radio,
  } from "@chakra-ui/react";
  import axios from "axios";
  import React, { useEffect, useState } from "react";
  import { server } from "../index";
  import Loder from "./Loder";
  import Error from "./Error";
import CoinCard from "./CoinCard";
  
  
  const Coins = () => {
    const [Coin, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPages] = useState(1);
    const [currency , setCurrency] = useState('inr');
      const currencySymbol = 
      currency === 'inr'? '₹' :currency === 'usd'? '$':'&'
   
      const changePage =(page)=>{
          setPages(page);
          setLoading(true);
              
      }
   
      const btn =new Array(132).fill(1)



    useEffect(() => {
      const featchCoin = async () => {
            
         try{
          const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page${page}`);
          setCoins(data);
          setLoading(false);
         }catch(error){
           setError(true);
           setLoading(false);
         }
          
      };
  
      featchCoin();
    }, [currency ,page]);
        if(error) return <Error message={'Error While Factching Coins '} />
  
    return (
      <Container maxW={"container.xl"}>
        {loading ? (
          <Loder />
        ) : (
          <>
             <RadioGroup  value={currency}  onChange={setCurrency} p={'8'}>
           <HStack>
         <Radio value={'inr'}>INR </Radio>
         <Radio value={'usd'}>USD </Radio>
         <Radio value={'eur'}>EUR </Radio>
           </HStack>
             </RadioGroup>
            <HStack wrap={"wrap"} >
              {Coin.map((i) => (
                <CoinCard
                 id={i.id}
                  key={i.id}
                  name={i.name}
                  price={i.current_price}
                  img={i.image}
                  symbol={i.symbol}
                  rank={i.trust_score_rank}
                 currencySymbol={currencySymbol}
                />
              ))}
            </HStack>

            <HStack w={'fill'} overflow={'auto'} p={'8'} >
            {
                  btn.map((item , index)=>(
                    <Button  color={'white'} bgColor={'blackAlpha.900'} onClick={()=>changePage(index+1)} >
                      {index+1}
                 </Button>
                  ))
            }

            </HStack>
          </>
        )}
      </Container>
    );
  };
  
 
  

  

export default Coins