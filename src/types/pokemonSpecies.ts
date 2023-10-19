interface Color {
  name: string;
  url: string;
}

interface EggGroup {
  name: string;
  url: string;
}

interface EvolutionChain {
  url: string;
}

interface EvolvesFromSpecies {
  name: string;
  url: string;
}

interface Language {
  name: string;
  url: string;
}

interface Version {
  name: string;
  url: string;
}

interface FlavorTextEntry {
  flavor_text: string;
  language: Language;
  version: Version;
}

interface FormDescription {
  description: string;
  language: Language;
}

interface Genera {
  genus: string;
  language: Language;
}

interface Generation {
  name: string;
  url: string;
}

interface GrowthRate {
  name: string;
  url: string;
}

export interface PokemonFull {
  base_happiness: number;
  capture_rate: number;
  color: Color;
  egg_groups: EggGroup[];
  evolution_chain: EvolutionChain;
  evolves_from_species: EvolvesFromSpecies;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: FormDescription[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genera[];
  generation: Generation;
  growth_rate: GrowthRate;
  habitat: any;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Language[];
}
