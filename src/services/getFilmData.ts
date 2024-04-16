import { HTTP, SWAPI_ROOT, SWAPI_FILM, GUIDE_IMG_EXTENTIOON, URL_IMG_FILM} from "../env/api";


const getId = (url: string, categories: string) =>{
    const id = url.replace(HTTP+SWAPI_ROOT+categories, '')
    .replace(/\//g, '');
    return id;
}

export const getFilmId = (url: string) => getId(url, SWAPI_FILM);

export const getFilmImage = (id: string)  => `${URL_IMG_FILM}/${id+GUIDE_IMG_EXTENTIOON}`;