import React, { useEffect } from "react";

export default function Home() {
  const fetchData = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const data = await response.json();
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return <div className="bg-gray-300">Home</div>;
}
