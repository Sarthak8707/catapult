import { FlagsResponse } from "./types";


export const fetchFlags = async (baseUrl: string, sdkKey: string): Promise<FlagsResponse> => {

    const res = await fetch(`${baseUrl}/sdk/flags`, {headers: {Authorization: `Bearer ${sdkKey}`}});
    if(!res.ok) throw new Error("Failed to fetch Flags");

    return res.json();

}