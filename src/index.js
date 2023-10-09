import fs from 'fs';
import path from 'path';
import { getOptions } from 'loader-utils';

const parseInclude = (sourceCode, getModuleSourceCode) => {
  const includePattern = /^[\s\t]*#include +<(.*?)>/gm;

  return sourceCode.replace(includePattern, (_, moduleName) => {
    const moduleCode = getModuleSourceCode(moduleName);
    if (!moduleCode) {
      throw new Error(`Can not resolve #include <${moduleName}>`);
    }
    const moduleParsedCode = parseInclude(moduleCode, getModuleSourceCode);
    return `\n// #include-start<${moduleName}>\n${moduleParsedCode}\n// #include-end<${moduleName}>\n`;
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
      (moduleName) => {
        const modulePath = path.resolve(this.resourcePath, '../', moduleName);
        return fs.readFileSync(modulePath, 'utf8');
      },
    ).trimStart();
  
    callback(null, output);
  } catch (error) {
    callback(error, null);
  }
}
