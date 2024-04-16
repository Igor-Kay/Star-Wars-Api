import { useState, useEffect } from "react";
import { getApiResource } from "../../api/network";
import { API_PEOPLE } from "../../env/api";
import { getFilmId, getFilmImage } from "../../services/getFilmData";

interface Person {
    title: string;
    url: string;
    episode_id: number;
    characters: [string];
}

const PeoplePage = () => {

    const [people, setPeople] = useState<Person[] | null>(null);

    const getResource = async (url: string) => {
        const res = await getApiResource(url);
        const peopleList = res.results.map((element: Person) => {

            const id = getFilmId(element.episode_id.toString());
            const img = getFilmImage(id);
            
            console.log(img);
            
            return {
                episode_id: element.episode_id,
                title: element.title,
                url: element.url,
                characters: element.characters
            }
            
        });

        console.log(peopleList);
        
        setPeople(peopleList);

    }

    useEffect(() => {
        getResource(API_PEOPLE);
    }, []);

    return (
        <>
            {people && (
                <ul>
                {people.map(({title, url, episode_id}) => (
                    <li key = {title}>Эпизод {episode_id} {title}</li>
                ))}
                </ul>
            )} 
        </>
    )
}

export default PeoplePage;
