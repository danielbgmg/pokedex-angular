export interface IPokemonInfo {
  name: string;
  sprites: {
    front_default: string;
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
}
