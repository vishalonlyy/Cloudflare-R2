const { R2, traffic } = require("cloudflare-r2");
const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path  = require("path");

try {
  //  const z = new EmbedBuilder()
  //  .addFields({name: "test", value: "test"})
  const x = new R2()
    .setSecret(
      "5491e3a3c0ec2def42d6ea721efe87bae04071af492540a02367da962eeb0a49"
    )
    .setAccessKey("2ea6c4096c9f29f3baceba5e7cd5ca85")
    .setId("530420ee13768d7553f2e57c64d36d33")
    .build()
  function convertImageToBase64(filePath, callback) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return;
      }

      const extension = path.extname(filePath).substr(1);
      const base64Data = data.toString("base64");
      const dataUrl = `data:image/${extension};base64,${base64Data}`;
      console.log(extension)
    //   console.log(dataUrl)
      callback(dataUrl);
    });
  }
  convertImageToBase64("test/test.png", function (base64Data) {
    const z = base64Data;
    // console.log(z)
    console.log(z)
    // const tra = new traffic()
    // .bucketName("arizeclub")
    // .upload(z)



  })
  
  


  // const tra = new traffic()
  // .bucket("vishal")
  // .upload("")

  console.log({ g: x.getClient(), z: x });

  // console.log(x)
} catch (e) {
  console.log(e);
}
