import { FlagsResponse } from "./types";


// export const fetchFlags = async (baseUrl: string, sdkKey: string): Promise<any> => {

//     const res = await fetch(`http://localhost:3000/flags/17`);
//    // console.log(res);
//     if(!res.ok) throw new Error("Failed to fetch Flags");

//     return res.json();

// }

export const fetchFlags = async (): Promise<any> => {

    const res = await fetch(`http://localhost:3000/flags/17`);
   // console.log(res);
    if(!res.ok) throw new Error("Failed to fetch Flags");

    return res.json();

}