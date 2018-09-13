import * as _ from "lodash";

const argv = require('argv');

class ArgvParser {
  private config: any;
  private argvConfig: any[];

  constructor(defaultConfig: any) {
    this.config = _.cloneDeep(defaultConfig);
    this.argvConfig = [];
    this.build(this.config);
  }

  private build(defaultObj: any, prefix: string = "") {
    for (let key in defaultObj) {
      let value: any = defaultObj[key];
      if (_.isObject(value)) {
        this.build(value, prefix + key + '_');
      } else {
        this.argvConfig.push({
          name: prefix + key,
          type: _.isString(value) ? 'string' : 'int',
          description: `default ${prefix + key} = ${value}`
        })
      }
    }
  }

  parse(): any {
    argv.option(this.argvConfig);
    const program: any = argv.run().options;
    for (let key in program) {
      _.set(this.config, key.split('_'), program[key]);
    }
  }

  getConf() {
    return _.cloneDeep(this.config);
  }
}

export function getConfigByArgv(defaultConfig: any): any {
  let argv: ArgvParser = new ArgvParser(defaultConfig);
  argv.parse();
  return argv.getConf();
}


