# JavaScript/TypeScript Foundations for Angular — Study Notes

---

## Module 1: Functional Array Methods & Immutability

### The core idea
You have a list. You almost always need to do one of three things to it:
1. **Transform** every item into something else → `map`
2. **Select** only some items → `filter`
3. **Collapse** the whole list into one value → `reduce`

All three are just named shortcuts for loops you'd otherwise write by hand.

### `map()` — transform every item, get a new array back
```javascript
const prices = [10, 20, 30];
const withTax = prices.map(price => price * 1.1);
// withTax: [11, 22, 33]
// prices is untouched
```
- Same number of items in as out — each one transformed.
- Never modifies the original array.

### `filter()` — keep only items that pass a test
```javascript
const ages = [12, 25, 17, 30, 8];
const adults = ages.filter(age => age >= 18);
// adults: [25, 30]
```
- The callback returns `true`/`false`. `true` keeps the item, `false` drops it.
- Can be shorter than or equal to the original array — never longer.

### `reduce()` — collapse the whole array into one value
```javascript
const cart = [10, 20, 30];
const total = cart.reduce((sum, price) => sum + price, 0);
// total: 60
```
Signature: `.reduce((accumulator, currentItem) => newAccumulator, initialValue)`

| round | sum (in) | price | sum (out) |
|---|---|---|---|
| 1 | 0 | 10 | 10 |
| 2 | 10 | 20 | 30 |
| 3 | 30 | 30 | 60 |

- The **initial value** is the *second argument* to `.reduce()`, not part of the callback.
- Whatever the callback returns becomes the accumulator for the *next* round.
- Can build anything as output — a number, a string, an object, another array (e.g. "group by" logic).

**Common mistake:** declaring an outer variable with the same name as the accumulator parameter (e.g. `let sum = 0;` outside, then `sum` again as a parameter inside `.reduce()`). The parameter *shadows* the outer variable — they are unrelated. The outer one becomes dead code.

**Common mistake:** chaining `.filter().map()` when the task actually needs two *independent* results — both derived from the *original* array, not from each other's output.

---

### Immutability & the Spread Operator

**The problem — mutation is invisible to reference checks:**
```javascript
const user = { name: "Alice", age: 30 };
const updated = user;      // NOT a copy — same object in memory
updated.age = 31;
console.log(user.age);       // 31 — the "original" changed too
console.log(user === updated); // true — same reference
```

**Mutating methods to avoid vs. immutable alternatives:**

| Mutates original (avoid) | Returns new copy (prefer) |
|---|---|
| `.push()`, `.pop()`, `.shift()`, `.unshift()` | `[...arr, item]` |
| `.splice()` | `.filter()`, `.slice()` |
| `.sort()`, `.reverse()` (mutate in place!) | `[...arr].sort()` |
| `obj.prop = x` | `{...obj, prop: x}` |

**Spread operator `...`** — unpacks the contents of an array/object into a new one.
```javascript
// Arrays
const items = [1, 2, 3];
const withNew = [...items, 4];              // [1,2,3,4], items untouched
const withoutFirst = items.filter((_, i) => i !== 0); // immutable removal

// Objects
const user = { name: "Alice", age: 30 };
const updated = { ...user, age: 31 };        // new object, age overwritten
```

**⚠️ Spread is only a SHALLOW copy — the #1 trap:**
```javascript
const user = { name: "Alice", age: 30, address: { city: "Boston" } };
const updated = { ...user, age: 31 };
updated.address.city = "NYC";
console.log(user.address.city); // "NYC" — nested object was still shared!
```
Fix: spread at every level you're modifying.
```javascript
const updated = {
  ...user,
  address: { ...user.address, city: "NYC" }
};
```

### Why this matters in Angular
1. **`OnPush` change detection** — Angular decides whether to re-render largely by checking `===` (reference equality) on `@Input()` values. Mutating in place keeps the same reference, so Angular may not notice the change. You must produce a *new* reference.
2. **RxJS state streams** (`BehaviorSubject`, NgRx) — idiomatic pattern is always `state$.next({ ...current, updated })`, never mutating `current` directly.
3. **Signals** — `mySignal.update(list => [...list, newItem])`, not `list.push(newItem)`.

**Golden rule: never mutate, always spread.**

---

## Module 2: `this`, the Event Loop, and Async

### Part A — `this` keyword

**Core rule:** `this` behaves differently for regular `function(){}` vs arrow `()=>{}`.

- **Regular function:** `this` is decided **fresh, at call time**, based on what's to the left of the dot when the function is *called*.
- **Arrow function:** has no `this` of its own — it **inherits** `this` from the surrounding code, fixed permanently at the moment it was *written* (defined). Calling style never affects it.

**Regular function — calling style matters:**
```javascript
const counter = {
  count: 0,
  increment: function() {
    console.log(this.count);
  }
};

counter.increment();              // 0 — "counter." is left of the dot, so this = counter

const grabbed = counter.increment; // just copies the function reference
grabbed();                          // undefined — bare call, nothing left of the dot, this is lost
```
This "grabbed and called bare" pattern is exactly what happens when you pass a method as a callback:
```typescript
document.getElementById('btn').addEventListener('click', this.increment); // this gets lost later
```

**Arrow function — definition location matters, not call style:**
```javascript
const counter = {
  count: 0,
  increment: () => {
    console.log(this.count);
  }
};
counter.increment(); // undefined — this arrow was written at the top level of the file,
                        // so its `this` = top-level (window), not `counter`,
                        // regardless of how it's called.
```
**Important nuance:** arrow functions as object-literal properties (`{ }`) do NOT fix the `this` problem, because at that point in the file `this` isn't the object yet.

**Arrow functions DO fix the problem inside a `class`:**
```typescript
class Counter {
  count = 0;
  increment = () => {          // arrow function as a class field
    console.log(this.count);
  }
}
const c = new Counter();
const grabbed = c.increment;
grabbed(); // 0 — works! Because at the moment this arrow was defined (during construction),
             // `this` was already locked to the instance, permanently.
```
This is why Angular component methods that get passed around as callbacks are often written as arrow class fields.

**`.bind()` — the manual alternative fix**
```javascript
const boundIncrement = counter.increment.bind(counter);
boundIncrement(); // works, this permanently welded to counter
```
- `.bind(obj)` returns a **brand new function** with `this` permanently forced to `obj`.
- Does **not** call the function, and does **not** modify the original function.
```typescript
class Counter {
  count = 0;
  constructor() {
    this.increment = this.increment.bind(this); // manual fix, same effect as arrow field
  }
  increment() { console.log(this.count); }
}
```

**Summary table:**

| | called as `obj.method()` | called bare `grabbed()` |
|---|---|---|
| regular `function()` | `this` = obj | `this` = undefined |
| arrow `() =>` | `this` = wherever defined | same — calling style irrelevant |

---

### Part B — The Event Loop

**Base rule:** JS is single-threaded and synchronous. Async tasks (like `setTimeout`) get pulled out of the normal flow and parked in a **queue**, only running once the main call stack is completely empty. A `0ms` delay doesn't mean "instant" — it means "queue immediately, run after all sync code finishes."

```javascript
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
// Output: 1, 3, 2
```

**The twist: there are TWO separate queues, not one.**

- **Microtask queue** (Promises, `.then()`) — high priority, always **fully drains** before anything else runs next.
- **Macrotask queue** (`setTimeout`, `setInterval`, UI events) — lower priority, only checked once the microtask queue is completely empty. One macrotask runs at a time.

```javascript
console.log("1");
setTimeout(() => console.log("2"), 0);       // macrotask queue
Promise.resolve().then(() => console.log("3")); // microtask queue
console.log("4");
// Output: 1, 4, 3, 2
```
Order of operations: all sync code runs first (`1`, `4`) → microtask queue drains (`3`) → macrotask queue runs (`2`).

**Key subtlety: microtasks added *during* draining still go before macrotasks.**
```javascript
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => {
  console.log("C");
  Promise.resolve().then(() => console.log("D")); // new microtask added mid-drain
});
console.log("E");
// Output: A, E, C, D, B
```
The microtask queue doesn't just run once — it keeps draining until totally empty, even if new microtasks get added while it's draining. Only after it's *fully* empty does the engine check the macrotask queue.

**Mental model recap:**
1. Run all synchronous code, top to bottom.
2. Fully drain the microtask queue (Promises) — including any new microtasks added along the way.
3. Run one macrotask (`setTimeout`, etc.).
4. Repeat step 2 before the next macrotask.

---

### Promises vs. RxJS Observables

**Promise:** represents a value that resolves **exactly once**. Once it delivers, it's done forever — can't reset, can't get a second value.
```javascript
const fetchUser = fetch('/api/user').then(res => res.json());
```

**Problem:** a Promise can't represent something that happens repeatedly (e.g., button clicks) — it only has one delivery slot.

**Observable (RxJS):** like a Promise, but can deliver 0, 1, many, or infinite values over time.
```typescript
import { fromEvent } from 'rxjs';
const clicks$ = fromEvent(button, 'click');
clicks$.subscribe(() => console.log('clicked!'));
```
- `.subscribe()` is the Observable version of `.then()`, but it keeps firing on every new value instead of stopping after one.
- `$` suffix is just a naming convention meaning "this holds an Observable" — not functional syntax.

**Comparison table:**

| | Promise | Observable |
|---|---|---|
| How many values? | Exactly 1 | 0, 1, many, or infinite, over time |
| Eager or lazy? | Runs immediately on creation | Does nothing until `.subscribe()` is called |
| Cancellable? | No | Yes — `.unsubscribe()` |
| Consumed via | `.then()` | `.subscribe()` |
| Typical use | One-off HTTP request | Clicks, form changes, WebSockets, HTTP too |

- **Lazy** means: an Observable's code doesn't run at all until something subscribes. No subscribe → nothing happens, ever.
- **Cancellable** matters a lot in Angular: if a user navigates away mid-request, `.unsubscribe()` stops Angular from caring about a response that's no longer needed. Promises have no such off-switch.

Angular's `HttpClient` returns Observables (even for single one-off requests) for consistency and cancellability; plain `fetch()` + `async/await` uses Promises.

---

## Module 3: TypeScript

### Why TypeScript exists
Plain JS doesn't check what type a variable holds — mistakes surface silently, often at runtime, far from the source of the bug.
```typescript
function double(x: number) {
  return x * 2;
}
double("hello"); // ERROR caught immediately in the editor, before running anything
```
`variableName: Type` is a **type annotation**.

**Convention:** always use lowercase primitive types — `string`, `number`, `boolean` — never the capitalized object-wrapper versions (`String`, `Number`, `Boolean`), which refer to rarely-used boxed objects.

---

### Structural Typing ("duck typing")
TypeScript checks the **shape** of an object, not its name, declared type, or where it came from.

**Rule:** an object satisfies an interface if it has **at least** every required property, with the **correct type** for each. Extra properties are always allowed and ignored.

```typescript
interface Point {
  x: number;
  y: number;
}
function printPoint(p: Point) {
  console.log(`(${p.x}, ${p.y})`);
}

const weirdObject = { x: 10, y: 20, z: 30, label: "hi" };
printPoint(weirdObject); // OK — has x and y, extra props ignored

const incomplete = { x: 10 };
printPoint(incomplete); // ERROR — missing required property 'y'

const wrongType = { x: 10, y: "20" };
printPoint(wrongType); // ERROR — y is present but wrong type (string, not number)
```

Analogy: extra items in your bag are fine; missing a required item, or having the wrong "type" of required item, is not.

---

### Generics

**The problem `any` creates:**
```typescript
function firstElement(arr: any[]) {
  return arr[0];
}
const result = firstElement([1, 2, 3]); // result is typed `any`
result.toUpperCase(); // NO error shown, but crashes at runtime — number has no .toUpperCase()
```
`any` turns off type-checking entirely for that value, and that "off switch" spreads to everything derived from it. It defeats the purpose of using TypeScript.

**The fix — generics:**
```typescript
function firstElement<T>(arr: T[]) {
  return arr[0];
}
const a = firstElement([1, 2, 3]);       // T = number → a: number
const b = firstElement(["x", "y"]);       // T = string → b: string
a.toUpperCase(); // ERROR — correctly caught, TS knows `a` is a number
```
- `<T>` is a **placeholder type** — like a variable, but for types. TypeScript infers it automatically from what you actually pass in.
- `T` = the element type; `T[]` = array of that type (T itself is never "an array" — the `[]` supplies the array-ness).

**Real-world Angular-relevant pattern — generic wrapper types:**
```typescript
interface ApiResponse<T> {
  data: T;
  success: boolean;
}
function fetchData<T>(data: T): ApiResponse<T> {
  return { data, success: true };
}
```
Reusable "envelope" that keeps full type accuracy regardless of what shape of data it wraps (`User`, `Product`, `Order[]`, etc.) — extremely common in Angular services calling `HttpClient`.

---

### Union Types

`A | B` means "this value can be either type."
```typescript
function printId(id: string | number) {
  console.log(id);
}
printId(101);       // OK
printId("abc123");  // OK
printId(true);        // ERROR — boolean not part of the union
```

**You cannot use type-specific methods without narrowing first:**
```typescript
function printId(id: string | number) {
  console.log(id.toUpperCase()); // ERROR — number doesn't have toUpperCase()
}
```
TypeScript must guarantee the code is safe for **every** type the union allows — not just the one you expect at runtime. Since `number` is a legal value here and has no `.toUpperCase()`, the line is rejected outright.

**Fix — narrowing with a type guard (`typeof`):**
```typescript
function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // safe — TS knows id is a string here
  } else {
    console.log(id.toFixed(2));      // safe — TS knows id is a number here (by elimination)
  }
}
```
Inside each branch, TypeScript **narrows** the type based on the check, and only allows methods valid for that specific branch.

---

## Quick-Reference Cheat Sheet

| Concept | One-line summary |
|---|---|
| `map` | Transform every item → same-length new array |
| `filter` | Keep items passing a test → new array, ≤ original length |
| `reduce` | Collapse array into one value, using an accumulator + initial value |
| Spread `...` | Shallow copy an array/object; nested objects still shared by reference |
| Regular `function` `this` | Decided at call time, based on what's left of the dot |
| Arrow `() =>` `this` | Locked at definition time, from surrounding code — calling style irrelevant |
| `.bind(obj)` | Returns a new function with `this` permanently forced to `obj` |
| Microtask queue | Promises — fully drains before any macrotask runs |
| Macrotask queue | `setTimeout` etc. — one runs at a time, only after microtasks are empty |
| Promise | Resolves once, eager, not cancellable |
| Observable | 0/1/many values over time, lazy (needs `.subscribe()`), cancellable (`.unsubscribe()`) |
| Structural typing | Shape matters, not name — must have all required props with correct types (extras OK) |
| Generics `<T>` | Placeholder type, inferred per call — preserves real type info, unlike `any` |
| Union types `A \| B` | Value could be either type; must narrow (e.g. `typeof`) before using type-specific methods |
