import { Box, Card, CardActionArea, CardMedia, Grid, Modal, Paper, Typography } from '@mui/material';
import { FastAverageColor } from 'fast-average-color';
import React, { useEffect, useState } from 'react'
import bgitem from '../PngItem_1653395.png'
import { LinearProgress } from '@mui/material';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    opacity: 0.99,
    p: 4,
    borderRadius: 4

};

const PokemonCard = ({ pokemon }) => {
    const [showModal, setShowModal] = useState(false)
    const handleClose = () => setShowModal(false)
    return (
        <>
            {pokemon &&
                <Card raised sx={{
                    backgroundColor: pokemon.bgColor,
                    width: "390px",
                    height: "250px",
                    position: 'relative',
                    '&:hover': {
                        '& .pokemonImage': {
                            transform: 'scale(1.2)',
                        },
                    },
                }}
                    onClick={() => setShowModal(true)}
                >
                    <CardActionArea sx={{ p: 2 }}>
                        <Grid container direction={'row'}  >
                            <Grid item xs={7} display={'flex'} justifyContent={"center"} alignItems={'center'}>
                                <Box>
                                    <Typography variant='h5' sx={{ fontWeight: 'bolder', color: 'white', textTransform: 'capitalize' }}>{pokemon.name} </Typography>
                                    <Box mt={2} display={'flex'} flexDirection={'column'} gap={1}>
                                        {pokemon.types.map((type, index) => {
                                            return <Typography align='center' variant='p' key={index} sx={{
                                                fontWeight: 'bolder',
                                                backgroundColor: 'white', opacity: 0.4, px: 2, py: 1, backdropFilter: "blur(100px)", borderRadius: 3, textTransform: 'capitalize'
                                            }}>{type}</Typography>
                                        })}
                                    </Box>

                                </Box>

                            </Grid>
                            <Grid item xs={5}>
                                <Typography variant='h6' sx={{ fontWeight: 'bolder', opacity: 0.4 }} align='right'>#{pokemon.id}</Typography>
                                <CardMedia component={'img'} src={bgitem} sx={{ zIndex: 1, opacity: 0.1, position: 'absolute', width: "310px", right: -100, bottom: -110 }} />
                                <CardMedia className="pokemonImage" sx={{ height: "200px", objectFit: 'contain', zIndex: 2, position: 'relative', transition: 'transform 0.3s ease-in-out', }} component={'img'} image={pokemon.img} src={pokemon.img} />
                            </Grid>

                        </Grid>

                    </CardActionArea>

                </Card>
            }
            <Modal
            open={showModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, p: 4 }}>
                <Typography variant="h4" mb={2} align="center">Stats</Typography>
                <Grid container direction="column" spacing={2}>
                    <StatBar label="HP" value={pokemon.stats.hp} />
                    <StatBar label="Attack" value={pokemon.stats.attack} />
                    <StatBar label="Defense" value={pokemon.stats.defense} />
                    <StatBar label="Speed" value={pokemon.stats.speed} />
                    <StatBar label="Sp. Attack" value={pokemon.stats.special_attack} />
                    <StatBar label="Sp. Defense" value={pokemon.stats.special_defense} />
                </Grid>
            </Paper>
        </Modal>

        </>
    )
}

const StatBar = ({ label, value }) => {
    const getColorForValue = (value) => {
        return value > 75 ? '#00FF00' : value > 50 ? '#FFFF00' : value > 25 ? '#FFA500' : '#FF0000';
    };

    return (
        <Grid container alignItems="center">
            <Grid item xs={4}>
                <Typography variant="body1" fontWeight="bold">{label}</Typography>
            </Grid>
            <Grid item xs={8}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ flexGrow: 1, height: 8, borderRadius: 4, bgcolor: 'background.default', marginRight: 1 }}>
                        <Box sx={{ borderRadius: 4, height: '100%', width: `${value}%`, bgcolor: getColorForValue(value) }} />
                    </Box>
                    <Typography variant="body2" color="textSecondary">{value}</Typography>
                </Box>
            </Grid>
        </Grid>
    );
};


export default PokemonCard