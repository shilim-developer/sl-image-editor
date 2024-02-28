import optimizer from "vite-plugin-optimizer";

const getReplacer = () => {
  const externalModels = ["os", "fs", "path", "events"];
  const result: any = {};
  for (const item of externalModels) {
    result[item] = () => ({
      find: new RegExp(`^${item}$`),
      code: `const ${item} = require('${item}');export { ${item} as default }`,
    });
  }
  return result;
};

export default function setupRequire() {
  return optimizer(getReplacer());
}
