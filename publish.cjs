const fs = require("fs-extra");
const path = require("path");
const spawn = require("cross-spawn");
const which = require("which");
fs.removeSync(path.join(process.cwd(), ".npmrc"));
const npmStr =
  "strict-ssl=false\nregistry=http://nas.minss.com.cn:3000/api/packages/MinssDevelopment/npm/\n//nas.minss.com.cn:3000/api/packages/MinssDevelopment/npm/:_authToken=7162ca2520015bc30f9d3943f507875a3277e72b";
fs.writeFileSync(path.join(process.cwd(), ".npmrc"), npmStr);

const npm = which.sync("npm");
const command = spawn(npm, [
  "publish",
  "--userconfig",
  path.join(process.cwd(), ".npmrc"),
]);
command.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});
command.stderr.on("data", (data) => {
  fs.removeSync(path.join(process.cwd(), ".npmrc"));
  console.error(`stderr: ${data}`);
});
command.on("close", (code) => {
  fs.removeSync(path.join(process.cwd(), ".npmrc"));
});
