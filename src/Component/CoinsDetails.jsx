import { Container ,  RadioGroup, HStack, Radio, VStack, Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress,Box, Button } from '@chakra-ui/react'
import React from 'react'
import { useState  , useEffect } from 'react';
import Loder from './Loder';
import { server } from '../index';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import Error from './Error';
import  Chart  from './Chart';

const CoinsDetails = () => {
  const [Coin, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currency , setCurrency] = useState('inr');
    const [days , setDays] = useState('24h');
    const [ chartArray , setChartArray] = useState([]);


    const currencySymbol = 
    currency === 'inr'? '₹' :currency === 'usd'? '$':'&'

    const parms=useParams();

      const btns=["24h" ,"7d" ,"14d" , "30d" ,  "60d" ,"200d" ,"1y" , "Max"]
    
        const switchChartStats=(key)=>{
               switch (key) {
                case "24h":
                  setDays('24h');
                  setLoading(true);
                  break;

                  case "7d":
                    setDays('7d');
                    setLoading(true);
                    break;

                    case "14d":
                      setDays('14d');
                      setLoading(true);
                      break;

                      case "30d":
                        setDays('30d');
                        setLoading(true);
                        break;

                        case "60d":
                        setDays('60d');
                        setLoading(true);
                        break;

                        
                        case "200d":
                        setDays('200d');
                        setLoading(true);
                        break;

                         
                        case "1y":
                          setDays('1y');
                          setLoading(true);
                          break;
               
                          
                        case "Max":
                          setDays('Max');
                          setLoading(true);
                          break;
                default:
                  break;
               }
                  
        }

      
    useEffect(() => {
      const featchCoins = async () => {
            
         try{
          const { data } = await axios.get(`${server}/coins/${parms.id}`);
          const { data: chartData } = await axios.get(
            `${server}/coins/${parms.id}/market_chart?vs_currency=${currency}&days=${days}`
          );

          setCoins(data);
          setChartArray(chartData.prices)

          setLoading(false);
         }catch(error){
           setError(true);
           setLoading(false);
         }
          
      };

      featchCoins();
    },[parms.id , currency , days]);

    if(error) return <Error message={'Error While Factching Coins '} />

  return (
    <Container maxW={"container.xl"}>
    {loading ? (
      <Loder />
    ) : (
      <>
         <Box w={'full'} borderWidth={1} >
                <Chart arr={chartArray} currency={currencySymbol} days={days} />
         </Box>
    
       <HStack p={'4'} wrap={'wrap'}>
             
             {
                btns.map((i)=>(
                     <Button key={i} onClick={()=>switchChartStats(i)} >{i} </Button>
                ))
             }
             
       </HStack>



        <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
          <HStack spacing={"4"}>
            <Radio value={"inr"}>INR</Radio>
            <Radio value={"usd"}>USD</Radio>
            <Radio value={"eur"}>EUR</Radio>
          </HStack>
        </RadioGroup>

        <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
          <Text fontSize={"small"} alignSelf="center" opacity={0.7}>
            Last Updated On{" "}
            {Date(Coin.market_data.last_updated).split("G")[0]}
          </Text>

          <Image
            src={Coin.image.large}
            w={"16"}
            h={"16"}
            objectFit={"contain"}
          />

          <Stat>
            <StatLabel>{Coin.name}</StatLabel>
            <StatNumber>
              {currencySymbol}
              {Coin.market_data.current_price[currency]}
            </StatNumber>
            <StatHelpText>
              <StatArrow
                type={
                  Coin.market_data.price_change_percentage_24h > 0
                    ? "increase"
                    : "decrease"
                }
              />
              {Coin.market_data.price_change_percentage_24h}%
            </StatHelpText>
          </Stat>

           <Badge fontSize={'2xl'} bgColor={'blackAlpha.800'} color={'white'} >
              {`#${Coin.market_cap_rank}`}
           </Badge>

             <CustomBar high={212} low={40} />

               <Box w={'full'} p='4'>
                       
                    <Item title={'MAx Supply'} value={Coin.market_data.max_supply} />
                    <Item title={'Circulating Supply'} value={Coin.market_data.circulating_supply} />
                    <Item title={'Market Cap'} value={`${currencySymbol}${Coin.market_data.market_cap[currency]} ` } />
                    <Item title={'All Time Low'} value={`${currencySymbol}${Coin.market_data.atl[currency]} ` } />
                    <Item title={'All Time High'} value={`${currencySymbol}${Coin.market_data.ath[currency]} ` } />


                        
               </Box>
      </VStack>

                  
                </>
             )}

           </Container>
  )
}

  const Item =({title , value})=>{
    return(
          
           <HStack  justifyContent={'center'}  w={'full'}  my={'4'} >

            <Text  fontFamily={'Bebas Neue'} letterSpacing={'widest'} >{title} </Text>
            <Text>{value} </Text>

           </HStack>
    );
  }



 const CustomBar =({high , low})=>{
     return(
      <VStack w={'full'}>
     <Progress value={50} colorScheme={'teal'}  w={'full'} />
      <HStack justifyContent={'space-between'} w={'full'} >
        <Badge children={low}  colorScheme={'red'} />
        <Text fontSize={'sm'}> 24H Range</Text>
        <Badge children={high}  colorScheme={'red'} />


      </HStack>

      </VStack>  
     );
 }

export default CoinsDetails