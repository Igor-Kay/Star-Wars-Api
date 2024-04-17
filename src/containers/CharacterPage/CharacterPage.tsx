import { useState, useEffect } from "react";
import { getApiResource } from "../../api/network";
import { Character } from "../../interfaces/CharacterIF";

interface CharacterPageProps {
  characterUrls: string[];
}

const CharacterPage: React.FC<CharacterPageProps> = ({ characterUrls }) => {
  const [characters, setCharacters] = useState<Character[] | null>(null);

  const getCharacters = async () => {
    const characterPromises = characterUrls.map(async (url) => {
      const res = await getApiResource(url);
      return {
        name: res.name,
        image: res.image,
      };
    });
    const characterData = await Promise.all(characterPromises);
    setCharacters(characterData);
  };

  useEffect(() => {
    getCharacters();
  }, [characterUrls]);

  return (
    <>
      {characters && (
        <ul>
          {characters.map(({ name, image }) => (
            <li key={name}>
              <img src={image} alt={name} />
              <p>{name}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CharacterPage;