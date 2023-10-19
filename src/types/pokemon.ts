interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface Version {
  name: string;
  url: string;
}

interface VersionDetail {
  rarity: number;
  version: Version;
}

interface HeldItem {
  item: {
    name: string;
    url: string;
  };
  version_details: VersionDetail[];
}

interface Move {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
}

interface Form {
  name: string;
  url: string;
}

interface GameIndex {
  game_index: number;
  version: Version;
}

interface Sprite {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string;
      front_female: string | null;
    };
    home: {
      front_default: string;
      front_female: string | null;
      front_shiny: string;
      front_shiny_female: string | null;
    };
    official_artwork: {
      front_default: string;
      front_shiny: string;
    };
  };
  versions: {
    [key: string]: {
      back_default: string;
      back_gray?: string;
      back_transparent?: string;
      front_default: string;
      front_gray?: string;
      front_transparent?: string;
    };
  };
}

interface Stats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  forms: Form[];
  game_indices: GameIndex[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: any[]; // You can provide a more specific type if needed
  past_types: any[]; // You can provide a more specific type if needed
  species: {
    name: string;
    url: string;
  };
  sprites: Sprite;
  stats: Stats[];
  types: Type[];
  weight: number;
}
