import axios from "axios";

export default function useValorantAPI() {
  const fetchWeapons = async () => {
    try {
      const { data } = await axios('https://valorant-api.com/v1/weapons');

      if(data.status === 200){
        return data.data;
      }else{
        throw new Error('Se produjo un error al recuperar las armas.');
      }
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  };

  const getWeaponById = async (id) => {
    try{
      const { data } = await axios(`https://valorant-api.com/v1/weapons/${id}`);

      if(data.status === 200){
        return data.data;
      }else{
        throw new Error('Se produjo un error al recuperar el detalle del armamento solicitado.')
      }
    } catch (error){
      console.error('Error - getWeaponById: ', error.message);
      throw error;
    }
  }

  return {
    fetchWeapons,
    getWeaponById
  };
}
