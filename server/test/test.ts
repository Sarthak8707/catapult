import {generateSDKKey} from '../src/utils/sdkKey'
import {createNewProjectService} from '../src/services/projects.service'

// Generate sdk keys

// const a = generateSDKKey();
// console.log(a);

// Create new project

const createProjectTest = async () =>  {

    try{
      const r =  createNewProjectService("Latest team", 29);
     // console.log("Done", r);
    }
    catch(err){
        console.log("Error", err);

    }
}

createProjectTest();