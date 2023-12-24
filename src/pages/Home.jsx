import { Grid, ListItem, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {usePokemon} from '../hooks/usePokemons'
import PokemonCard from '../components/PokemonCard'
import Nav from '../components/Nav'
import useInfiniteScroll from 'react-infinite-scroll-hook';

const Home = () => {
    const {filteredPokemons, loading,nextPage,getPokemons,hasNextPage,error} = usePokemon()
    const [sentryRef] = useInfiniteScroll({
        loading,
        hasNextPage,
        onLoadMore:()=>getPokemons(nextPage),
        // When there is an error, we stop infinite loading.
        // It can be reactivated by setting "error" state as undefined.
        disabled: !!error,
        // `rootMargin` is passed to `IntersectionObserver`.
        // We can use it to trigger 'onLoadMore' when the sentry comes near to become
        // visible, instead of becoming fully visible on the screen.
        rootMargin: '0px 0px 100px 0px',
      });
  return (
    <Grid container direction={'column'} gap={2}>
        <Grid item xs={12}>
            <Nav></Nav>
        </Grid>
        <Grid container direction={"row"} gap={2}  justifyContent={"center"} alignItems={'center'} >
        {   
            filteredPokemons && filteredPokemons.map((pokemon, index)=>{
                return (
                    <Grid item    key={index}>
                        <PokemonCard pokemon={pokemon}/>
                    </Grid>
                )
            })
        }
        {filteredPokemons.length===0 && <Typography variant='h3' color={'white'}>No Pokemons Found...</Typography>}

        </Grid>
        <ListItem ref={sentryRef}>
            {loading && <Typography>Loading...</Typography>}
        </ListItem>
        

    </Grid>
  )
}

export default Home