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
                <Paper sx={style} >
                    <Typography mb={3} variant='h5'>Stats</Typography>

                    <Grid container direction={'column'} display={'flex'} gap={2} >
                        <Grid item >
                            <Grid container gap={1}>
                                <Grid xs={2} item><Typography color={"#D3D3D3"} fontWeight={'bolder'} align='right'>HP:</Typography></Grid>
                                <Grid xs={1}  item><Typography fontWeight={'bolder'} >{pokemon.stats.hp}</Typography></Grid>
                                <Grid xs={12} md={6}  alignItems={'center'} item>
                                    <Box mb={1} sx={{
                                        height: 20, width: '400px',
                                        background: ` linear-gradient(to right,
                                        ${pokemon.stats.hp > 75 ? '#00FF00' : pokemon.stats.hp > 50 ? '#FFFF00' : pokemon.stats.hp > 25 ? '#FFA500' : '#FF0000'} 
                                        ${pokemon.stats.hp}%, #D3D3D3 0%)`,
                                        borderRadius: 4
                                    }}></Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item >
                            <Grid container gap={1}>
                                <Grid xs={2} item><Typography color={"#D3D3D3"} fontWeight={'bolder'} align='right'>Attack:</Typography></Grid>
                                <Grid xs={1} item><Typography fontWeight={'bolder'} >{pokemon.stats.attack}</Typography></Grid>
                                <Grid xs={12} md={6}  alignItems={'center'} item>
                                    <Box mb={1} sx={{
                                        height: 20, width: '400px',
                                        background: ` linear-gradient(to right,
                                        ${pokemon.stats.attack > 75 ? '#00FF00' : pokemon.stats.attack > 50 ? '#FFFF00' : pokemon.stats.attack > 25 ? '#FFA500' : '#FF0000'} 
                                        ${pokemon.stats.attack}%, #D3D3D3 0%)`,
                                        borderRadius: 4
                                    }}></Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item >
                            <Grid container gap={1}>
                                <Grid xs={2} item><Typography color={"#D3D3D3"} fontWeight={'bolder'} align='right'>Defense:</Typography></Grid>
                                <Grid xs={1} item><Typography fontWeight={'bolder'} >{pokemon.stats.defense}</Typography></Grid>
                                <Grid xs={12} md={6}  alignItems={'center'} item>
                                    <Box mb={1} sx={{
                                        height: 20, width: '400px',
                                        background: ` linear-gradient(to right,
                                        ${pokemon.stats.defense > 75 ? '#00FF00' : pokemon.stats.defense > 50 ? '#FFFF00' : pokemon.stats.defense > 25 ? '#FFA500' : '#FF0000'} 
                                        ${pokemon.stats.defense}%, #D3D3D3 0%)`,
                                        borderRadius: 4
                                    }}></Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item >
                            <Grid container gap={1}>
                                <Grid xs={2} item><Typography color={"#D3D3D3"} fontWeight={'bolder'} align='right'>Speed:</Typography></Grid>
                                <Grid xs={1} item><Typography fontWeight={'bolder'} >{pokemon.stats.speed}</Typography></Grid>
                                <Grid xs={12} md={6}  alignItems={'center'} item>
                                    <Box mb={1} sx={{
                                        height: 20, width: '400px',
                                        background: ` linear-gradient(to right,
                                        ${pokemon.stats.speed > 75 ? '#00FF00' : pokemon.stats.speed > 50 ? '#FFFF00' : pokemon.stats.speed > 25 ? '#FFA500' : '#FF0000'} 
                                        ${pokemon.stats.speed}%, #D3D3D3 0%)`,
                                        borderRadius: 4
                                    }}></Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item >
                            <Grid container gap={1}>
                                <Grid xs={2} item><Typography color={"#D3D3D3"} fontWeight={'bolder'} align='right'>Sp. Attack:</Typography></Grid>
                                <Grid xs={1} item><Typography fontWeight={'bolder'} >{pokemon.stats.special_attack}</Typography></Grid>
                                <Grid xs={12} md={6}  alignItems={'center'} item>
                                    <Box mb={1} sx={{
                                        height: 20, width: '400px',
                                        background: ` linear-gradient(to right,
                                        ${pokemon.stats.special_attack > 75 ? '#00FF00' : pokemon.stats.special_attack > 50 ? '#FFFF00' : pokemon.stats.special_attack > 25 ? '#FFA500' : '#FF0000'} 
                                        ${pokemon.stats.special_attack}%, #D3D3D3 0%)`,
                                        borderRadius: 4
                                    }}></Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item >
                            <Grid container gap={1}>
                                <Grid xs={2} item><Typography color={"#D3D3D3"} fontWeight={'bolder'} align='right'>Sp. Defense:</Typography></Grid>
                                <Grid xs={1} item><Typography fontWeight={'bolder'} >{pokemon.stats.special_defense}</Typography></Grid>
                                <Grid xs={12} md={6}  alignItems={'center'} item>
                                    <Box mb={1} sx={{
                                        height: 20, width: '400px',
                                        background: ` linear-gradient(to right,
                                        ${pokemon.stats.special_defense > 75 ? '#00FF00' : pokemon.stats.special_defense > 50 ? '#FFFF00' : pokemon.stats.special_defense > 25 ? '#FFA500' : '#FF0000'} 
                                        ${pokemon.stats.special_defense}%, #D3D3D3 0%)`,
                                        borderRadius: 4
                                    }}></Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>
        </>
    )
}


export default PokemonCard