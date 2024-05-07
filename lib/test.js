const list = [];
let count = 0;
let setupFunction = () => {};
let teardownFunction = () => {};
let currentSweet = null;
let assertCount = 0;

function describe(description, testFunction) {
  //console.log(description);
  currentSweet = description;
  testFunction();
}

async function test(testName, testFunction) {
  await setupFunction();
  count++;
  //console.log(description);
  try {
    await testFunction();
    //console.log('PASSED');
    list.push({ 
      description: currentSweet,
      test: testName, 
      passed: true,
      assertCount: assertCount
    });
  } catch (e) {
    //console.error('FAILED');
    list.push({
      description: currentSweet,
      test: testName,
      passed: false,
      assertCount: assertCount
    });
    console.error(e);
  }

  teardownFunction();
  assertCount = 0;
}

function expect(value) {
  assertCount++;
  return {
    toBe(expected) {
      if (value !== expected) {
        throw new Error(`${value} is not equal to ${expected}`);
      }
    },
    toBeTruthy() {
      if (!value) {
        throw new Error(`${value} is not truthy`);
      }
    },
    toBeFalsy() {
      if (value) {
        throw new Error(`${value} is not falsy`);
      }
    },
    toEqual(expected) {
      if (value !== expected) {
        throw new Error(`${value} is not equal to ${expected}`);
      }
    },
    toBeGreaterThan(expected) {
      if (value <= expected) {
        throw new Error(`${value} is not greater than ${expected}`);
      }
    },
    toBeLessThan(expected) {
      if (value >= expected) {
        throw new Error(`${value} is not less than ${expected}`);
      }
    },
    toBeGreaterThanOrEqual(expected) {
      if (value < expected) {
        throw new Error(`${value} is not greater than or equal to ${expected}`);
      }
    },
    toBeLessThanOrEqual(expected) {
      if (value > expected) {
        throw new Error(`${value} is not less than or equal to ${expected}`);
      }
    },
    toBeNull() {
      if (value !== null) {
        throw new Error(`${value} is not null`);
      }
    },
    toBeUndefined() {
      if (value !== undefined) {
        throw new Error(`${value} is not undefined`);
      }
    },
    toBeInstanceOf(expected) {
      if (!(value instanceof expected)) {
        throw new Error(`${value} is not an instance of ${expected}`);
      }
    },
    toContain(expected) {
      if (!value.includes(expected)) {
        throw new Error(`${value} does not contain ${expected}`);
      }
    },
    toHaveLength(expected) {
      if (value.length !== expected) {
        throw new Error(`${value} does not have length of ${expected}`);
      }
    },
    toHaveProperty(expected) {
      if (!value.hasOwnProperty(expected)) {
        throw new Error(`${value} does not have property ${expected}`);
      }
    },
    toHaveAttribute(expected) {
      if (!value.hasAttribute(expected)) {
        throw new Error(`${value} does not have attribute ${expected}`);
      }
    },
    toHaveValue(expected) {
      if (value.value !== expected) {
        throw new Error(`${value} does not have value ${expected}`);
      }
    },
    toHaveClass(expected) {
      if (!value.classList.contains(expected)) {
        throw new Error(`${value} does not have class ${expected}`);
      }
    },
    toHaveStyle(expected) {
      if (value.style !== expected) {
        throw new Error(`${value} does not have style ${expected}`);
      }
    },
    toHaveTextContent(expected) {
      if (value.textContent !== expected) {
        throw new Error(`${value} does not have text content ${expected}`);
      }
    },
    toHaveInnerHTML(expected) {
      if (value.innerHTML !== expected) {
        throw new Error(`${value} does not have inner HTML ${expected}`);
      }
    },
    toHaveOuterHTML(expected) {
      if (value.outerHTML !== expected) {
        throw new Error(`${value} does not have outer HTML ${expected}`);
      }
    },
    toHaveLength(expected) {
      if (value.length !== expected) {
        throw new Error(`${value} does not have length ${expected}`);
      }
    },
    toBeDisabled() {
      if (!value.disabled) {
        throw new Error(`${value} is not disabled`);
      }
    },
    toBeEnabled() {
      if (value.disabled) {
        throw new Error(`${value} is not enabled`);
      }
    },
    toBeVisible() {
      if (value.style.display === 'none') {
        throw new Error(`${value} is not visible`);
      }
    },
    toBeHidden() {
      if (value.style.display !== 'none') {
        throw new Error(`${value} is not hidden`);
      }
    },
    toBeSelected() {
      if (!value.selected) {
        throw new Error(`${value} is not selected`);
      }
    },
    toBeChecked() {
      if (!value.checked) {
        throw new Error(`${value} is not checked`);
      }
    },
    toBeFocused() {
      if (!value === document.activeElement) {
        throw new Error(`${value} is not focused`);
      }
    },
    toBeInstanceOf(expected) {
      if (!(value instanceof expected)) {
        throw new Error(`${value} is not an instance of ${expected}`);
      }
    },
    toBeArray() {
      if (!Array.isArray(value)) {
        throw new Error(`${value} is not an array`);
      }
    },
    toBeObject() {
      if (typeof value !== 'object') {
        throw new Error(`${value} is not an object`);
      }
    },
    toBeFunction() {
      if (typeof value !== 'function') {
        throw new Error(`${value} is not a function`);
      }
    },
    toBeString() {
      if (typeof value !== 'string') {
        throw new Error(`${value} is not a string`);
      }
    },
    toBeNumber() {
      if (typeof value !== 'number') {
        throw new Error(`${value} is not a number`);
      }
    },
    toBeBoolean() {
      if (typeof value !== 'boolean') {
        throw new Error(`${value} is not a boolean`);
      }
    },
    toBeNull() {
      if (value !== null) {
        throw new Error(`${value} is not null`);
      }
    },
    toHaveBeenCalled(expected) {
      if (value.mock.calls.length !== expected) {
        throw new Error(`${value} has not been called ${expected} times`);
      }
    }
  };
}

function fn() {
  const mock = (...args) => {
    mock.mock.calls.push(args);
  };

  mock.mock = { calls: [] };
  return mock;
}

function spyOn(obj, method) {
  const mock = fn();
  obj[method] = mock;
  return mock;
}

function beforeEach(sf) {
  setupFunction = sf;
}

function afterEeach(tf) {
  teardownFunction = tf;
} 

async function wait(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function report() {
  console.table(list);
}

function render(targetElement) {
  console.log(list)
  const message = ({passed, assertCount}) => `<div style="margin: 0; padding: 5px 10px; display: inline;" class="${passed ? 'alert alert-success' : 'alert alert-danger'}">
    ${passed ? 'passed' : 'failed'}</div>`;

  targetElement.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Test</th>
          <th>Status</th>
          <th>Asserts</th>
        </tr>
      </thead>
      <tbody>
      ${list.map(item => `<tr>
        <td>${item.description}</td>
        <td>${item.test}</td>
        <td>${message(item)} </td>
        <td>${item.assertCount}</td>
      </tr>`).join('')}
      </tbody>
    </table>`;
}

export { describe, test, expect, spyOn, fn, beforeEach, afterEeach, wait, report, render, count, list };