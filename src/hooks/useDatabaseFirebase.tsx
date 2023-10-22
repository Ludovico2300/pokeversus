import { useEffect, useState } from "react";
import { databaseData } from "../firebase";
import { ref, onValue, set, update } from "firebase/database";
import useAuthFirebase from "./useAuthFirebase";
import { User } from "../types/users";

export default function useDatabaseFirebase() {
  const { currentUser } = useAuthFirebase();
  const [hs, setHs] = useState<number>(0);
  const [favPokemon, setFavPokemon] = useState<string[] | number[]>([]);
  const [uid, setUid] = useState<string | undefined>(currentUser?.uid);
  const [user, setUser] = useState<User>();
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    if (uid) {
      const userRef = ref(databaseData, `users/${uid}`);

      onValue(userRef, (snapshot: any) => {
        const userData = snapshot.val();
        if (userData) {
          setUser(userData);
          setHs(userData.hs || 0);
          setFavPokemon(userData.favPokemon || []);
        }
      });
    }
  }, [uid]);

  useEffect(() => {
    if (uid) {
      const usersRef = ref(databaseData, `users/`);

      onValue(usersRef, (snapshot: any) => {
        const usersData = snapshot.val();
        if (usersData) {
          setUsers(usersData);
        }
      });
    }
  }, [uid]);

  //WRITE DATABASE
  const writeToDatabase = async (
    database: any,
    endpoint: string,
    identifierEndpoint: any,
    newData: any
  ) => {
    if (uid) {
      set(ref(database, endpoint + identifierEndpoint), {
        id: newData.id,
        source: newData.source,
        tag: newData.tag,
        date: newData.date,
        title: newData.title,
        content: newData.content,
        author: currentUser?.displayName,
      });
    }
  };

  // UPDATE HS
  const updateHs = async (newHs: number) => {
    if (uid) {
      update(ref(databaseData, `users/${uid}`), { hs: newHs })
        .then(() => {})
        .catch((error) => {
          console.error("Error updating HS:", error);
        });
    } else {
      console.error("Invalid user, cannot update HS");
    }
  };

  // Add a new function to toggle Pokémon in the user's favorites list
  const toggleFavorite = async (pokemonId: number) => {
    if (uid) {
      const userRef = ref(databaseData, `users/${uid}`);
      onValue(userRef, (snapshot: any) => {
        const userData = snapshot.val();
        if (userData) {
          const userFavPokemon = userData.favPokemon || [];

          const updatedFavPokemon = userFavPokemon.includes(pokemonId)
            ? userFavPokemon.filter((id: string) => id !== String(pokemonId))
            : [...userFavPokemon, pokemonId];

          // Update the user's favPokemon in the database
          update(ref(databaseData, `users/${uid}`), {
            favPokemon: updatedFavPokemon,
          })
            .then(() => setFavPokemon(updatedFavPokemon))
            .catch((error) => {
              console.error("Error updating favPokemon:", error);
            });
        }
      });
    } else {
      console.error("Invalid user, cannot update favPokemon");
    }
  };

  // Function to update the database for new user
  const updateDBNewUser = async () => {
    if (currentUser) {
      // Check if the user already exists in the 'users' array
      if (users && !users.some((u) => u.uid === currentUser.uid)) {
        const newUser = {
          hs: 0,
          favPokemon: [],
          uid: currentUser.uid,
        };
        setUid(newUser.uid);
        set(ref(databaseData, `users/${newUser.uid}`), newUser)
          .then(() => {
            console.log("New user added to the database.");
          })
          .catch((error) => {
            console.error("Error updating DB for new user:", error);
          });
      } else {
        console.log("User already exists in the 'users' array.");
      }
    } else {
      console.error("Invalid user, cannot update DB for new user");
    }
  };

  return {
    user,
    users,
    hs,
    favPokemon,
    writeToDatabase,
    updateHs,
    toggleFavorite,
    updateDBNewUser,
  };
}
