import { useState, useEffect } from "react";
import { getApiResource } from "../../api/network";
import { API_PEOPLE } from "../../env/api";
import { getFilmId, getFilmImage } from "../../services/getFilmData";
import CharacterPage from "../CharacterPage/CharacterPage";
import { Film } from "../../interfaces/filmIF";



const FilmPage = () => {
    const [film, setFilm] = useState<Film[] | null>(null);
    const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
    const [showCharacters, setShowCharacters] = useState(false);

  const getResource = async (url: string) => {
    const res = await getApiResource(url);
    const filmList = res.results.map((element: Film) => {
      const id = getFilmId(element.episode_id.toString());
      const img = getFilmImage(id);
      console.log(img);
      return {
        img,
        episode_id: element.episode_id,
        title: element.title,
        url: element.url,
        characters: element.characters,
      };
    });
    console.log(filmList);
    setFilm(filmList);
  };

  const handleFilmClick = (filmUrl: string) => {
    const selectedFilm = film?.find((f) => f.url === filmUrl);
    if (selectedFilm) {
      setSelectedFilm(selectedFilm);
      setShowCharacters(true);
    }
  };

  useEffect(() => {
    getResource(API_PEOPLE);
  }, []);

  return (
    <>
      {film && (
        <ul>
          {film.map(({ title, url, episode_id, img }) => (
            <li key={episode_id} onClick={() => handleFilmClick(url)}>
              <p>{title}</p>
              <img src={img} alt={title} />
            </li>
          ))}
        </ul>
      )}
      {selectedFilm && showCharacters && (
        <CharacterPage characterUrls={selectedFilm.characters} />
      )}
    </>
  );
};

export default FilmPage;