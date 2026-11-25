import { FlagClient } from "../src/client";

const client = new FlagClient("YOUR_SDK_KEY");

async function main() {


   console.log(`Loading data, please wait...`);

   try {
      await client.init();

      //console.log(client.testSomething()) ;

      const att = { age: 25, plan: "platinum", device: "android", usage: 10};

      {
         console.log("test results:", client.evaluate("f2", { userId: 414, attributes: att }));
      }

      //console.log("data:::::", client.isEnabled("greeting", "dev"));
   }
   catch (err) {
      console.log("Error Occurred", err);
   }

}

main();