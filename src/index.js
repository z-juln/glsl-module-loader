import fs from 'fs';
import { getOptions } from 'loader-utils';
import { validate } from 'schema-utils';
import schema from './options.json';

const parseInclude = (sourceCode, getModuleSourceCode) => {
  const includePattern = /^[ \t]*#include +<([\w\d./]+)>/gm;

  return sourceCode.replace(includePattern, (_, moduleName) => {
    const moduleCode = moduleMap[moduleName];
    if (!moduleCode) {
      throw new Error(`Can not resolve #include <${moduleName}>`);
    }
    return `\n// #include-start<${moduleName}>\n${getModuleSourceCode(moduleName)}\n// #include-end<${moduleName}>\n`;
  });
};

export default function glslModuleLoader(source) {
  const options = getOptions(this);

  validate(schema, options, {
    name: 'Glsl Module Loader',
    baseDataPath: 'options',
  });

  const parseSourceCode = parseInclude(
      source,
      (moduleName) => fs.readFileSync(moduleName, 'utf8')
    ).trimStart();

  const json = JSON.stringify(parseSourceCode)
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029');

  const esModule =
    typeof options.esModule !== 'undefined' ? options.esModule : true;

  return `${esModule ? 'export default' : 'module.exports ='} ${json};`;
}
