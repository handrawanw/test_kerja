import {baseApi,store} from "./store";

export async function WebpacketData({resolutions}){
    let res=await fetch(`${baseApi}/ticker`);
    let resp=await res.json();
    if(!resp.Error){
        let Data=resp.ticker;
        if(Data&&typeof Data==="object"&&Data.length>0){
            let Obj={
                DataApis:[],
                DateRange:[],
                Output:{},
                ConvertDate:[],
            },TimeFrame={
                _1days:8.64e+7,
                _1minutes:60000,
                _timeRange:0,
            };
            let StartTime=new Date(Data[Data.length-1].timestamps);
            let StartDate=new Date(StartTime.getFullYear(),StartTime.getMonth(),StartTime.getDate(),0,0,0,0e2);
            for(let i of Data){
                Obj.DateRange.push(new Date(StartDate.getTime()+TimeFrame._timeRange).getTime());
                TimeFrame._timeRange+=TimeFrame._1minutes*resolutions;
            }
            for(let i=0;i<Obj.DateRange.length;i++){
                let bool=(i>0&&Obj.DateRange[i+1]===undefined);
                if(!bool){ 
                    Obj.Output[Obj.DateRange[i]]=[];
                    Data.forEach((item,index)=>{
                        if(item.timestamps>=Obj.DateRange[i]&&item.timestamps<=Obj.DateRange[i+1]){
                            Obj.Output[Obj.DateRange[i]].push(item.price);
                            Data.splice(index,1);
                        }
                    }); 
                }
                if(Obj.Output[Obj.DateRange[i]]<=0){
                    delete Obj.Output[Obj.DateRange[i]];
                }
            }
            for(let [key,value] of Object.entries(Obj.Output)){
                Obj.ConvertDate.push({
                    x:new Date(Number(key)).toISOString(),
                    y:[value[0],Math.max(...value),Math.min(...value),value[value.length-1]]
                });
            }
            store.update((value)=>{
               return {
                   ...value,
                   DataChart:Obj.ConvertDate,
               }
            });
            return [];
        }else{
            return [];
        }
    }else{
        throw new Error(resp);
    }
}