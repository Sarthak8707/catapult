import { generateSDKKey } from '../src/utils/sdkKey'
import { createNewProjectService } from '../src/services/projects.service'
import { db } from '../src/db/client';
import { sdkKeys } from '../src/db/schema';

// Generate sdk keys

// const a = generateSDKKey();
// console.log(a);

// Create new project

// const createProjectTest = async () => {

//     try {
//         const r = createNewProjectService("Latest team", 29);
//         // console.log("Done", r);
//     }
//     catch (err) {
//         console.log("Error", err);

//     }
// }

// createProjectTest();


// Generate a sdk key and save it to db

// const giveSDKKeytoProject = async (projectID: number) => {

//     try {
//         const sdkKeyDev = generateSDKKey();
//         const sdkKeyStag = generateSDKKey();

//         await db.insert(sdkKeys).values([
//             { projectID: projectID, environment: "dev", value: sdkKeyDev },
//             { projectID: projectID, environment: "stag", value: sdkKeyStag }
//         ]);

//         console.log("Done successfully!");
//     }
//     catch (err) {
//         console.log("Error", err);
//     }

// }

// giveSDKKeytoProject(2);