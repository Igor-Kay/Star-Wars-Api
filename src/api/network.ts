export const getApiResource = async(url : string) => {

    try{

        const res = await fetch(url);
        return await res.json();

    } catch(error) {
        
        console.error('Не получилось');
        return false;
   
    }
};





