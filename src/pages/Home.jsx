import { Grid, ListItem, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { usePokemon } from '../context/PokemonContext';
import PokemonCard from '../components/PokemonCard';
import Nav from '../components/Nav';
import useInfiniteScroll from 'react-infinite-scroll-hook';

const Home = () => {
    const { filteredPokemons, loading, nextPage, getPokemons, hasNextPage, error } = usePokemon();

    const [sentryRef] = useInfiniteScroll({
        loading,
        hasNextPage,
        onLoadMore: () => getPokemons(nextPage),
        disabled: !!error,
        rootMargin: '0px 0px 100px 0px',
    });

    const renderPokemonCards = () => {
        return filteredPokemons.map((pokemon, index) => (
            <Grid item key={index}>
                <PokemonCard pokemon={pokemon} />
            </Grid>
        ));
    };

    return (
        <Grid container direction="column" gap={2}>
            <Grid item xs={12}>
                <Nav />
            </Grid>
            <Grid container direction="row" gap={2} justifyContent="center" alignItems="center">
                {filteredPokemons.length > 0 ? (
                    renderPokemonCards()
                ) : (
                    <Typography variant="h3" color="white">
                        No Pokemons Found...
                    </Typography>
                )}
            </Grid>
            <ListItem ref={sentryRef}>
                {loading && <Typography textAlign="center" color="white">Loading...</Typography>}
            </ListItem>
        </Grid>
    );
};

export default Home;
