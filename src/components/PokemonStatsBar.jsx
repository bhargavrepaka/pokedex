import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

const PokemonStatsBar = ({ label, value }) => {
    const getColorForValue = (value) => {
        // Logic to determine color based on stat value
        // Example: Green for high values, red for low values
        return value > 75 ? '#00FF00' : value > 50 ? '#FFFF00' : value > 25 ? '#FFA500' : '#FF0000';
    };

    return (
        <Box>
            <Typography variant="body2" color="textSecondary" align="right">{label}:</Typography>
            <Typography variant="body2" fontWeight="bold" align="right">{value}</Typography>
            <Box mb={1}>
                <LinearProgress
                    variant="determinate"
                    value={value}
                    sx={{ borderRadius: 4, height: 8, '& .MuiLinearProgress-bar': { borderRadius: 4 } }}
                    style={{ background: `linear-gradient(to right, ${getColorForValue(value)} ${value}%, #D3D3D3 0%)` }}
                />
            </Box>
        </Box>
    );
};

export default PokemonStatsBar;
