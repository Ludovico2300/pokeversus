import React from "react";

type TypeIconProp = {
  typeName: string;
};

// Define a mapping of Pokémon types to colors
const typeColors: { [key: string]: string } = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

export default function TypeIcon(props: TypeIconProp) {
  const { typeName } = props;

  // Get the color for the given type from the mapping, defaulting to gray if not found
  const typeColor = typeColors[typeName] || "#808080";

  return (
    <div
      className="flex items-center justify-center text-sm font-bold text-white rounded px-2 py-1 border m-4 w-16"
      style={{
        backgroundColor: typeColor,
      }}
    >
      {typeName.toUpperCase()}
    </div>
  );
}
