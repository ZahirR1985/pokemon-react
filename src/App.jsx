import './App.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import PokemonCard from './components/PokemonCard.jsx'
import Button from './components/Button.jsx'
import logo from './assets/logo.png'

function App() {
    const [pokemons, setPokemons] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [offset, setOffset] = useState(0)
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {

        const controller = new AbortController();

        async function getPokemon() {
            setLoading(true)
            setError(null);
            try {
                const response = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`,
                    {signal: controller.signal}
                );

                setTotalCount(response.data.count);

                const results = response.data.results;

                const detailedPokemons = [];

                for (const pokemon of results) {
                    const detailResponse = await axios.get(pokemon.url,
                        {signal: controller.signal}
                    );
                    detailedPokemons.push(detailResponse.data);
                }

                setPokemons(detailedPokemons);

            } catch (e) {
                if (axios.isCancel(e)) {
                    console.log("Request cancelled");
                } else {
                    console.error(e);
                    setError("Er ging iets mis bij het ophalen van data");
                }
            } finally {
                setLoading(false);
            }
        }


        getPokemon()

        return () => {
            controller.abort();
        };

    }, [offset]);

    return (
        <>
            <header className="app-header">
                <img src={logo} alt="Pokemon logo" className="app-logo"/>

                <section className="button-bar">
                    <Button
                        clickHandler={() => setOffset(prev => prev - 20)}
                        disabled={offset === 0}
                    >
                        Vorige
                    </Button>

                    <Button
                        clickHandler={() => setOffset(prev => prev + 20)}
                        disabled={offset + 20 >= totalCount}
                    >
                        Volgende
                    </Button>
                </section>
            </header>

            {loading && <p className="status-message">Loading...</p>}
            {error && <p className="status-message error">{error}</p>}

            <div className="pokemon-container">
                {pokemons.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                    />
                ))}
            </div>
        </>
    )
}

export default App
