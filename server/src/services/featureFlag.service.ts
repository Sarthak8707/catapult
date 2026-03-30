export const featureFlags = [
    { id: 1, name: "theme", state: true },
    { id: 2, name: "product search", state: false }
]



export const getFeatureFlag = (id: Number) => {

    for(let i=0; i<featureFlags.length; i++){
        if(featureFlags[i].id == id){
            return featureFlags[i];
        }
    }

    return {};
}

export const addfeatureFlag = (name: string, state: boolean) => {

    const newId = featureFlags[featureFlags.length - 1].id + 1 ;
    featureFlags.push({id: newId, name, state});
    return newId;
}