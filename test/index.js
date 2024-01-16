const { traffic, R2 } = require("cloudflare-r2");
const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
try {
  /**
   * Building the R2 client Instance with the credentials provided
   */
  const x = new R2()
    .setSecret("xxxxxxxx")
    .setAccessKey("xxxxxxxxxxxx")
    .setId("xxxxxxxxxxxx")
    .build();

  /**
   * Using upload method to upload the files with traffic class
   */
  const Traffic = new traffic()
    .bucketName("vishal")
    
    .upload(["test/vishalOnlyy.png"]).then((x)=>{
      console.log({Uploaded: x, method: "default-upload"})
    })

  /**
   * Using the raw method to upload the raw data using traffic class
   */
  const filePath = "test/test.txt";
  async function z() {
    const Raw = await fs.promises.readFile(filePath, "utf8");
    if (!Raw) return console.error("Error reading the file:", err);
    const Traffic = new traffic().bucketName("vishal").uploadRaw([Raw, Raw]).then((x)=>{
      console.log({Uploaded: x, method: "raw-upload"})
    })
    
    // .then((x)=>{
    //   console.log({Uploaded: x, method: "raw-upload"})
    // });
  }
  z();
} catch (e) {
  console.log(e);
}
// console.log(x)
