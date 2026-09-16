import { FlagClient } from "../src/client"; 

const client = new FlagClient("YOUR_SDK_KEY");

async function main() {


console.log(`Loading data, please wait...`);
    
await client.init();

//console.log(client.testSomething()) ;

 const att = { age: 25, plan: "platinum", device: "android" };

 {
    console.log("test results:", client.evaluate("greeting", {userId: 414, attributes: att}));
 }

//console.log("data:::::", client.isEnabled("greeting", "dev"));

}

main();