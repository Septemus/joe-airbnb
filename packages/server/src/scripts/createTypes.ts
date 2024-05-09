import { generateNamespace } from '@gql2ts/from-schema';
import * as fs from 'fs';
import * as path from 'path';

import { genSchema } from '../utils/genSchema';

const typescriptTypes: Promise<string> = generateNamespace(
  'GQL',
  genSchema()
) as any;

typescriptTypes.then(res => {
  fs.writeFile(path.join(__dirname, '../types/schema.d.ts'), res, err => {
    console.log(err);
  });
});
