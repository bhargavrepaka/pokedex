import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../pokeball.png'
import { Checkbox, FormControl, InputLabel, MenuItem } from '@mui/material';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { usePokemon } from '../hooks/usePokemons';
import { Divider, Input } from '@mui/joy';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
const pokemon_types = [
    'all',
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy"
]
function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}






export default function Nav(props) {
    const { setSearch, setType, type, search } = usePokemon()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <React.Fragment>
            <HideOnScroll {...props}>
                <AppBar>
                    <Box display={'flex'} p={1} backgroundColor={'#BF3131'} justifyContent={'space-between'} >
                        <Box display={'flex'} alignItems={'center'}>
                            {matches && <img src={logo} width={40}  />}
                            <Typography fontWeight={"bolder"} ml={2} variant="h5" component="div">
                                Pokédex
                            </Typography>
                        </Box>

                        <Input
                            placeholder="Name or Id..."
                            startDecorator={<SearchIcon />}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            endDecorator={
                                <React.Fragment>
                                    <Divider orientation="vertical" />
                                    <Select
                                        variant="plain"
                                        value={type}
                                        onChange={(_, value) => setType(value)}
                                        slotProps={{
                                            listbox: {
                                                variant: 'outlined',
                                            },
                                        }}
                                        sx={{ mr: -1.5, '&:hover': { bgcolor: 'transparent' } }}
                                    >
                                        {pokemon_types.map((type) =>{
                                            return <Option key={type} value={type}>{type}</Option>
                                        })}
                                    </Select>
                                </React.Fragment>
                            }
                            sx={{ width: {
                                xs: '250px',
                                sm: '350px',
                            } }}
                        />

                    </Box>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </React.Fragment>
    );
}