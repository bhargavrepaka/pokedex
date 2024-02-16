
import axios from 'axios'
import { FastAverageColor } from 'fast-average-color'
import React, { createContext, useContext, useEffect, useState } from 'react'
export const PokemonContext=createContext(null)

export const PokemonContextProvider = ({children}) => {
    const [pokemons, setPokemons] = useState([])
    const [filteredPokemons, setFilteredPokemons] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [hasNextPage, setHasNextPage] = useState(false)
    const [nextPage, setNextPage] = useState('null')
    const [search, setSearch] = useState('')
    const [type, setType] = useState('all')

    useEffect(()=>{
        try {
            getPokemons()
        } catch (err) {
            console.log(err)
        }
    },[])
    useEffect(()=>{
        if(pokemons){
            FilterPokemons(pokemons)
        }
        
    },[search,type])

    async function getPokemons(url='https://pokeapi.co/api/v2/pokemon?limit=21'){
        setLoading(true)
        const response = await axios.get(url)
        if (response.data.next){
            setHasNextPage(true)
        }
        else{
            setHasNextPage(false)
        }
        setNextPage(response.data.next)

        let result = response.data.results
        result=result.map((pokemon)=>{
            const id = pokemon.url.split('/')[6]
            const img=`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`
            return {
                ...pokemon,
                id,
                img,

            }
        })

        const promises = result.map((pokemon)=>{
            return getPokemonDetails(pokemon.url)
        })
        const backgroundPromises = result.map((pokemon)=>{
            return getPokemonBackground(pokemon.img)
        })


        const pokeData = await Promise.all(promises)
        const pokeBackground = await Promise.all(backgroundPromises)

        const finalResult = result.map((pokemon, index)=>{
            return {
                ...pokemon,
                ...pokeData[index],
                ...pokeBackground[index]
                
            }
        })
        const allPokemons = [...pokemons,...finalResult]
        FilterPokemons(allPokemons)
        setPokemons(allPokemons) 
        setLoading(false)
    }

    function FilterPokemons(pokes){
        setLoading(true)    
        const filteredPokes = pokes.filter((pokemon)=>{
            if ((pokemon.name.includes(search.toLowerCase()) || search=='' || pokemon.id==search )&& (type==='all' || pokemon.types.includes(type))){
                return true
            }
            return false
        })
        setFilteredPokemons((prev)=>{return [...filteredPokes]})
        setLoading(false)
    }


    async function getPokemonDetails(url){
        const response = await axios.get(url)
        const pokeTypes=response.data.types.map((type)=>{
            return type.type.name
        })
        return {
            stats:
                {hp: response.data.stats[0].base_stat,
                attack: response.data.stats[1].base_stat,
                defense: response.data.stats[2].base_stat,
                speed: response.data.stats[5].base_stat,
                special_attack: response.data.stats[3].base_stat,
                special_defense: response.data.stats[4].base_stat,},
            types: pokeTypes
        }
    }

    async function getPokemonBackground(url) {
        const fac = new FastAverageColor();
        const color = await fac.getColorAsync(url);
        return {bgColor:color.hex}
    }
    

  return (
    <PokemonContext.Provider value={{
        pokemons,
        filteredPokemons,
        loading,
        setLoading,
        error,
        hasNextPage,
        nextPage,
        getPokemons,
        setPokemons,
        setSearch,
        search,
        setType,
        type}}
    >
        {children}
    </PokemonContext.Provider>
    
  )
}

export const usePokemon=()=>{
    return useContext(PokemonContext)
}

