import axios from "axios";

export async function getPresets(){
    const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/broadcaster/fetchpreset`,{
        headers:{
            "authToken":localStorage.getItem("broadcaster_token") ?? ""
        }
    })
    return data.presets ?? [];
}