import {baseApi,store} from "./store";

export async function GetApiTicker(){
    let res=await fetch(`${baseApi}/ticker`);
    let resp=await res.json();
    if(!resp.Error){
        store.update((value)=>{
            return {
                ...value,
                DataChart:resp.ticker,
            }
        })
        return resp;
    }else{
        throw new Error(resp);
    }
}