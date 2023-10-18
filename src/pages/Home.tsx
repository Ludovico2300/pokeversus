import React, { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import usePokeApi from "../hooks/usePokeApi";
import { Pokemon } from "../type.def";

//this component will be PokeVerus
export default function Home() {
  const { loading, fetchData } = usePokeApi();
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [firstPokemon, setFirstPokemon] = useState<Pokemon>({
    name: "null",
    stats: [{ base_stat: 0, stat: { name: "null" } }],
    sprites: { front_default: "null" },
  });
  const [firstPokemonBST, setFirstPokemonBST] = useState<number>(0);
  const [firstPokemonSelected, setFirstPokemonSelected] =
    useState<boolean>(false);
  const [secondPokemon, setSecondPokemon] = useState<Pokemon>({
    name: "null",
    stats: [{ base_stat: 0, stat: { name: "null" } }],
    sprites: { front_default: "null" },
  });
  const [secondPokemonBST, setSecondPokemonBST] = useState<number>(0);
  const [secondPokemonSelected, setSecondPokemonSelected] =
    useState<boolean>(false);
  const [showBST, setShowBST] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<string>("");

  const startRound = () => {
    setShowResult("");
    setShowBST(false);
    setFirstPokemonSelected(false);
    setSecondPokemonSelected(false);

    fetchData(Math.floor(Math.random() * 1010) + 1).then((data) =>
      setFirstPokemon(data)
    );

    fetchData(Math.floor(Math.random() * 1010) + 1).then((data) =>
      setSecondPokemon(data)
    );
  };

  useEffect(() => {
    setFirstPokemonBST(
      firstPokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0)
    );
    setSecondPokemonBST(
      secondPokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0)
    );
  }, [firstPokemon, secondPokemon]);

  const winHandler = () => {
    setScore(score + 1);
    setShowBST(true);
    setShowResult("won");
    setTimeout(() => {
      setShowBST(false);
      startRound();
    }, 3000);
  };

  const loseHandler = () => {
    setScore(0);
    setShowBST(true);
    setShowResult("lost");
    setTimeout(() => {
      setShowBST(false);
      startRound();
    }, 3000);
  };

  const handleResult = (isWin: boolean) => {
    if (isWin) {
      winHandler();
    } else {
      loseHandler();
    }
  };

  useEffect(() => {
    if (score >= highScore) {
      setHighScore(score);
    }
  }, [score]);

  const roundHandler = () => {
    if (firstPokemonSelected) {
      handleResult(firstPokemonBST >= secondPokemonBST);
    }
    if (secondPokemonSelected) {
      handleResult(secondPokemonBST >= firstPokemonBST);
    }
  };

  useEffect(() => {
    startRound();
  }, []);

  useEffect(() => {
    roundHandler();
  }, [firstPokemonSelected, secondPokemonSelected]);

  return (
    <div
      className="h-[80vh] w-full flex flex-col justify-around items-center"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/pokeball.webp)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-black text-white text-xl h-[10%] w-[30%] border-white border-4 rounded-xl flex flex-col items-center justify-center font-bold">
        <div>Your Score is: {score}</div>
        <div> Your Highscore is: {highScore}</div>
      </div>

      <div className="flex flex-row h-[50%] w-full justify-around items center">
        <PokemonCard
          loading={loading}
          showBst={showBST}
          pokemonSprite={firstPokemon.sprites.front_default}
          pokemonName={firstPokemon.name}
          pokemonBST={firstPokemonBST}
          onClick={() => [
            setFirstPokemonSelected(true),
            setSecondPokemonSelected(false),
          ]}
        />

        <PokemonCard
          loading={loading}
          showBst={showBST}
          pokemonSprite={secondPokemon.sprites.front_default}
          pokemonName={secondPokemon.name}
          pokemonBST={secondPokemonBST}
          onClick={() => [
            setSecondPokemonSelected(true),
            setFirstPokemonSelected(false),
          ]}
        />
      </div>
      <div className="bg-[#FD0001] text-xl h-[10%] w-[30%] border-black border-4 rounded-xl flex flex-col items-center justify-center font-bold">
        {showResult === "won" && "Round won!"}
        {showResult === "lost" && "Round lost!"}
        {showResult === "" && "Make a choice"}
      </div>
    </div>
  );
}