/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+react_native
 * @flow strict-local
 * @format
 */

'use strict';

const FlowParser = require('../../index.js');
const fixtures = require('../__test_fixtures__/fixtures.js');
const failureFixtures = require('../__test_fixtures__/failures.js');
const util = require('util');
jest.mock('fs', () => ({
  readFileSync: filename => fixtures[filename] || failureFixtures[filename],
}));

describe('RN Codegen Flow Parser', () => {
  Object.keys(fixtures)
    .sort()
    .forEach(fixtureName => {
      it(`can generate fixture ${fixtureName}`, () => {
        const schema = FlowParser.parseFile(fixtureName);
        const serializedSchema = util.inspect(schema, {
          showHidden: false,
          depth: null,
        });
        expect(serializedSchema).toMatchSnapshot();
      });
    });

  Object.keys(failureFixtures)
    .sort()
    .forEach(fixtureName => {
      it(`Fails with error message ${fixtureName}`, () => {
        expect(() => {
          FlowParser.parseFile(fixtureName);
        }).toThrowErrorMatchingSnapshot();
      });
    });
});
