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
    .upload(["test/VishalOnlyy.png"])
    .then((x) => {
      console.log({ Uploaded: x, method: "default-upload" });
    });
  /**
   * Using delete method to delete the files with traffic class which were uploaded
   */
  const Files = ["test/VishalOnlyy.png"];
  const UploadedFiles = new traffic()
    .bucketName("vishal")
    .delete(Files)
    .then((x) => {
      console.log({ Deleted: x, method: "default-delete" });
    });
  /**
   * Using getFiles method to get the files which were uploaded and are **Present** in the bucket
   */
  const Objs = new traffic().getFiles("vishal").then((x) => {
    console.log({ Files: x, method: "default-getFiles" });
  });
  /**
   * Using the raw method to upload the raw data using traffic class
   */
  const filePath = "test/test.txt";
  async function z() {
    const Raw = await fs.promises.readFile(filePath, "utf8");
    if (!Raw) return console.error("Error reading the file:", err);
    const Traffic = new traffic()
      .bucketName("vishal")
      .uploadRaw([Raw, Raw])
      .then((x) => {
        console.log({ Uploaded: x, method: "raw-upload" });
      });
  }
  z();
} catch (e) {
  console.log(e);
}
// console.log(x)
