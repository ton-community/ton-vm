import fs from 'fs';
import yaml from 'js-yaml';
let defs = yaml.load(fs.readFileSync(__dirname + '/../../reference/opcodes.yaml', 'utf-8')) as { opcodes: { [key: string]: ('int' | 'bigint' | 'bool' | 'cell' | 'string')[] | undefined } };

// Generate Defs
let opcodesDefs: string = 'import { Cell } from \'ton\';';
opcodesDefs += '\nimport BN from \'bn.js\';';
opcodesDefs += '\nexport type OpCodes = ';
for (let k of Object.keys(defs.opcodes)) {
    if (defs.opcodes[k] && defs.opcodes[k]!.length > 0) {
        let args = defs.opcodes[k]!;
        let mapped = args.map((v) => {
            if (v === 'int') {
                return 'number';
            }
            if (v === 'bigint') {
                return 'BN';
            }
            if (v === 'bool') {
                return 'boolean';
            }
            if (v === 'cell') {
                return 'Cell';
            }
            if (v === 'string') {
                return 'string';
            }
            throw Error('Unsupported arg: ' + v);
        })
        opcodesDefs += `\n    | { code: '${k}', args: [${mapped.join(', ')}] }`
    } else {
        opcodesDefs += `\n    | { code: '${k}' }`
    }
}
opcodesDefs += ';'

fs.writeFileSync(__dirname + '/opcodes.gen.ts', opcodesDefs);