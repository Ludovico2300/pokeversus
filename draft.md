import MoveCard from "../components/MoveCard";
import { Move } from "../types/pokemon";

const [searchTerm, setSearchTerm] = useState<string>("");
const [searchResults, setSearchResults] = useState<Move[]>([]);

<div className="flex-1 flex-col items-center justify-start h-full w-full ">
  {/* MOVE */}
  <div className="mt-4 p-4 w-full ">
    <h3 className="text-lg font-semibold mb-2">Check Moves</h3>
    <p className="text-sm font-semibold mb-2">(type min. 3chr)</p>
    <input
      className="border-2 border-black rounded-md p-2 text-black my-2 w-full"
      type="text"
      placeholder="Search for a move"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <div className="flex flex-col w-full items-center">
      {searchResults?.map((move) => (
        <MoveCard move={move} key={move.move.name} />
      ))}
    </div>
  </div>
</div>;
