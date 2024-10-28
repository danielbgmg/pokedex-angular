export interface IPokemonInfo {
  id: string;
  name: string;
  sprites: {
    other: {
      //Forma correta de tipar uma propiedade que tenha -
      ['official-artwork']: {
        front_default: string;
      };
    };
  };
  stats?: [
    {
      base_stat: number;
      stat: {
        name: string;
      };
    },
    {
      base_stat: number;
      stat: {
        name: string;
      };
    },
    {
      base_stat: number;
      stat: {
        name: string;
      };
    },
    {
      base_stat: number;
      stat: {
        name: string;
      };
    },
    {
      base_stat: number;
      stat: {
        name: string;
      };
    },
    {
      base_stat: number;
      stat: {
        name: string;
      };
    },
  ];
  types: {
    type: {
      name: string;
    };
  }[];
  description?: string;
  imgPoke: string;
}
