<center><img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Cloudflare-R2&fontSize=70&fontAlignY=35&animation=twinkling&fontColor=gradient" /></center>

[![Version][version-github-shield]](version-url)

[![Forks][forks-github-shield]](https://github.com/vishal889/Cloudflare-R2/network/members)
[![Stargazers][stars-github-shield]](https://github.com/vishal889/Cloudflare-R2/stargazers)
[![Issues][issues-github-shield]](https://github.com/vishal889/Cloudflare-R2/issues)
[![MIT License][license-github-shield]](https://github.com/vishal889/Cloudflare-R2/blob/master/LICENSE)
[![Discord Support](https://discordapp.com/api/guilds/936226552256036926/widget.png?style=shield)](SupportServer)


[chat-discord=shield]: https://img.shields.io/discord/936226552256036926?style=for-the-badge
[version-github-shield]: https://img.shields.io/github/package-json/v/vishal889/Cloudflare-R2?style=for-the-badge
[forks-github-shield]: https://img.shields.io/github/forks/vishal889/Cloudflare-R2?style=for-the-badge
[stars-github-shield]: https://img.shields.io/github/stars/vishal889/Cloudflare-R2?style=for-the-badge
[issues-github-shield]: https://img.shields.io/github/issues/vishal889/Cloudflare-R2?style=for-the-badge
[license-github-shield]: https://img.shields.io/github/license/vishal889/Cloudflare-R2?style=for-the-badge

# Cloudflare R2 Client

Introducing Cloudflare-R2, a groundbreaking package designed to simplify image uploads to Cloudflare R2 servers with ease. With just under 10 lines of code, users can seamlessly manage their image hosting needs, streamlining the process and eliminating complexities. Say goodbye to convoluted setups and welcome a hassle-free solution to efficiently handle your image uploads.

## Why?

- **Streamlined Integration**: Say goodbye to the complexities of intricate API connections. [Project-Name] offers a straightforward and user-friendly approach to effortlessly upload your images directly to your Cloudflare R2 server.

- **Seamless Uploading Experience**: Enjoy a hassle-free process for sending images. Our solution ensures a smooth and intuitive uploading experience, enhancing the overall efficiency of your image handling.

- **Quick Setup**: Cut down on setup time with minimal code requirements. Connect to your Cloudflare R2 effortlessly, allowing you to spend more time refining your project features and less time on the setup process.

- **In-Depth Documentation**: Our comprehensive documentation acts as your guide through every integration step. Whether you're a seasoned developer or just starting out, find the resources you need to succeed at your fingertips.

- **Accelerate Development**: Don't let image uploading integration slow down your project. Experience the power of streamlined image uploading and revolutionize the development process for your projects.

## How does it work?

Cloudflare-R2 is a simple package that allows you to upload images to your Cloudflare R2 server with ease. The package is designed to simplify the process of image uploading, eliminating the complexities of API connections and allowing you to focus on your project. With just under 10 lines of code, you can seamlessly integrate your Cloudflare R2 server and begin uploading images in no time.
- This package is equipped with straightforward and pre-built features that simply require the image path or Base64 raw image data. Effortlessly upload your images to the server with ease.

### See below for guides on how to use [project-name] & integrate it into your project.

## Installation
```bash
npm i cloudflare-r2
------ or ---------------------
yarn add cloudflare-r2
```

## Setting up 
first of all, you would need to create a build process for our client to work.

### 1. Creating a client instance
```js
const { R2 } = require("cloudflare-r2");
  /**
   * Building the R2 client Instance with the credentials you got from the Cloudflare R2 dashboard
   */
const x = new R2()
  .setSecret("xxxxxxxxx") // Your Cloudflare-R2 Secret Key
  .setAccessKey("xxxxxxxxxx") // Your Cloudflare-R2 Access Key
  .setId("xxxxxxxxxx") // Your Cloudflare-R2 ID
  .build(); // Building the client in the end
```
**Build Options** - Should be used while building the client instance (You can use them in any order)
- `setRegion` - You can toogle between the regions of the Cloudflare R2 server. (Default: `auto`)
- `setSecret` - Your Cloudflare-R2 Secret Key
- `setAccessKey` - Your Cloudflare-R2 Access Key
- `setId` - Your Cloudflare-R2 ID
- `build` - Building the client in the end

**Extra Options** - Should not be used while building the client
- `getClient` - Returns the client instance
- `getLogs` - Returns the logs of the client instance so far (Useful for debugging)


### 2. Uploading an image
**Methods**
- We have two methods for uploading images to the Cloudflare R2 server
  - `upload` - Uploads the image to the Cloudflare R2 server (Accepts path to the image)
  - `uploadRaw` - Uploads the Base64 raw image data to the Cloudflare R2 server (Accepts Base64 raw image data)

**Method 1 - Uploading an image using (upload)**
```js
const { traffic } = require("cloudflare-r2");
  /**
   * Using upload method to upload the files to the Cloudflare R2 server
   */
const x = new traffic()
  .bucketName("xxxxx") // Your Cloudflare-R2 Bucket Name where you want to upload the image
  .upload(["test/test.png"]); // Your image path (Must use an array)
```

**Method 2 - Uploading an image using (uploadRaw)**
```js
const { traffic } = require("cloudflare-r2");
  /**
   * Using uploadRaw method to upload the files to the Cloudflare R2 server
   */
const x = new traffic()
  .bucketName("xxxxx") // Your Cloudflare-R2 Bucket Name where you want to upload the image
  .uploadRaw(["Base64Data"]); // Your Base64 raw image data (Must use an array)
```

**Upload Options** - Should be used while uploading the image (You can use both the methods together)

- `bucketName` - Your Cloudflare-R2 Bucket Name where you want to upload the image `⚠️ Required`
- `upload` - Uploads the image to the Cloudflare R2 server (Accepts path to the image)
- `uploadRaw` - Uploads the Base64 raw image data to the Cloudflare R2 server (Accepts Base64 raw image data)

**Extra Options** - Should not be used while uploading the image
- `getUploadedFiles` - Returns the uploaded files so far (Useful for debugging)
- `getbucketName` - Returns the bucket name being used by the Instance (Useful for debugging)

**Aceessing the response**
- You can access the response of the `upload` or `uploadRaw` methods by using the `then` method
- `⚠️ if you are using both the methods together then you can only access the response of the last method`
- `📢 Suggested to use anyone method at a time while acessing the response`
```js
const { traffic } = require("cloudflare-r2");
  /**
   * Using upload method to upload the files toth e Cloudflare R2 server
   */
const x = new traffic()
  .bucketName("xxxxx") // Your Cloudflare-R2 Bucket Name where you want to upload the image
  .upload(["test/test.png"]) // Your image path (Must use an array)
  .then((res) => {
    console.log(res);
  });
```
**Response**
```js
{
     state: "suceess" | "failed";
     data: string of<Uploded FileName>; 
}
```
## Examples
[Basic Use-Case Example]()
