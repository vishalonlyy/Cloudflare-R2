const { traffic, R2 } = require("cloudflare-r2");
const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
try {
  const x = new R2()
    .setSecret(
      "fd34076db2c4f889d92ced47fd28487a758fecbb132efca1b1a5ed65d7b700a2"
    )
    .setAccessKey("262602be54c896d7820c9e9f278a73d0")
    .setId("530420ee13768d7553f2e57c64d36d33")
    .build();

    
  const filePath = "test/test.txt";
 async function z(){
  const Raw = await fs.promises.readFile(filePath, 'utf8');
  if (!Raw) return console.error("Error reading the file:", err);
      // console.log({ Raw });
      // const BufferedArray = Buffer.from(Raw);
      // console.log(BufferedArray)

      const Traffic = new traffic()
      .bucketName("vishal")
      .uploadRaw([Raw])
 }

 z();
  // const y = new traffic()
  // .bucketName("vishal")
  // .uploadRaw([""])
  // .upload(["test/image.png"]);
} catch (e) {
  console.log(e);
}
// console.log(x)
