import './PokemonCard.css'

function PokemonCard({pokemon}) {
    return (

        <div className="pokemon-card">
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default}
                 alt={pokemon.name}/>
            <p><strong>Moves:</strong> {pokemon.moves.length}</p>
            <p><strong>Weight:</strong> {pokemon.weight}</p>
            <p><strong>Abilities:</strong></p>
            <ul>
                {pokemon.abilities.map(item => (
                    <li key={item.ability.name}>
                        {item.ability.name}

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PokemonCard