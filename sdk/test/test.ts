import { FlagClient } from "../src/client"; 

const client = new FlagClient("YOUR_SDK_KEY");

async function main() {


console.log(`Loading data, please wait...`);
    
await client.init();

console.log(client.testSomething()) ;

// const att = { age: 25, region: "Germany" };

// console.log("data::::", client.evaluate("greeting", {userId: 43, attributes: att}));

//console.log("data:::::", client.isEnabled("greeting", "dev"));

}

main();