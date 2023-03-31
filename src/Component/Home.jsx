import { Box, Image,Text} from '@chakra-ui/react'
import React from 'react'
import img from '../assate/btc.png'


const Home = () => {
  return (
      <Box bgColor={'blackAlpha.900'} w={'full'} h={'85vh'} >
        <Image src={img}  w={'full'} h={'full'} objectFit={'contain'} mt={'-10'}  /> 
        <Text fontSize={'6xl'} color={'goldenrod'} textAlign={'center'}  mt={'-20'} >
           CryptoCurrencY
        </Text>
      </Box>
  )
}

export default Home