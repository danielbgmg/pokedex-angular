export interface IPokemonEvolutionRequest {
  chain: {
    evolves_to: [
      {
        evolves_to: [
          {
            species: {
              name: string;
            };
          },
        ];
        species: {
          name: string;
        };
      },
    ];
    species: {
      name: string;
    };
  };
}

export interface IPokemonEvolution {
  firstStage: string;
  secondStage: string;
  thirdStage: string;
}
