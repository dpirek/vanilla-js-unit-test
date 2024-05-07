# Vanilla JS Unit Testing "framework"

This is a minimalistic "jest-style" unit testing framework.

## Example Usage

```
import { describe, test, expect } from './lib/test.js';

describe('sample test', () => {
  test('true equal to true', () => {
    expect(true).toEqual(true);
  });
})
```