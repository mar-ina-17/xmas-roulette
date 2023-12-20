"use client";
import { ChakraProvider } from '@chakra-ui/react'
import HomeInit from './roulette/home';
import { AnimatePresence } from 'framer-motion';
import Snowfall from 'react-snowfall'

export default function Home() {
  const snowflake1 = document.createElement('img')
  snowflake1.src = '/snow.png'
  const images = [snowflake1]

  return (

    <AnimatePresence>
      <Snowfall
        radius={[5, 20.0]}
        images={images}
        wind={[-1, 0.5]}
        speed={[0.5, 1]}
      />
      <ChakraProvider>
        <HomeInit />
      </ChakraProvider>
    </AnimatePresence>
  );
}


