import fs from 'fs';
import path from 'path';
import { getOptions } from 'loader-utils';

const parseInclude = (sourceCode, getModuleSourceCode) => {
  const includePattern = /^[\s\t]*#include +<(.*?)>/gm;

  return sourceCode.replace(includePattern, (_, filePath) => {
    const moduleCode = getModuleSourceCode(filePath);
    if (!moduleCode) {
      throw new Error(`Can not resolve #include <${filePath}>`);
    }
    const moduleParsedCode = parseInclude(moduleCode, getModuleSourceCode);
    return `\n// #include-start<${filePath}>\n${moduleParsedCode}\n// #include-end<${filePath}>\n`;
  });
};

export default function glslModuleLoader(source) {
  this.cacheable?.();

  // Setup options
  const options = {
    ...getOptions(this),
  };
  
  const callback = this.async();

  try {
    const output = parseInclude(
      source,
      (_filePath) => {
        const filePath = /\.glsl$/i.test(_filePath) ? _filePath : `${_filePath}.glsl`;
        const isFromPackage = !filePath.startsWith('.') && !filePath.startsWith('/');
        let modulePath;
        if (isFromPackage) {
          const moduleName = path.normalize(filePath).match(/^(.*?)[\\//]/)[1];
          const nodeModulesPath = path.resolve(require.resolve(`${moduleName}/package.json`), '../../');
          modulePath = path.resolve(nodeModulesPath, filePath);
        } else {
          modulePath = path.resolve(this.resourcePath, '../', filePath);
        }
        return fs.readFileSync(modulePath, 'utf8');
      },
    ).trimStart();
  
    callback(null, output);
  } catch (error) {
    callback(error, null);
  }
}
