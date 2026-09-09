import { FlagClient } from "../src/client"; 

const client = new FlagClient("YOUR_SDK_KEY");

async function main() {


console.log(`Loading data, please wait...`);
    
await client.init();

console.log("data:::::", client.testSomething());

}

main();