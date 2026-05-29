---
title: "Easing"
source: https://www.remotion.dev/docs/easing
---

# Easing

The `Easing` module implements common easing functions. You can use it with the [`interpolate()`](/docs/interpolate) API.

You can find a visualization of some common easing functions at <http://easings.net/>

### Predefined animations[​](#predefined-animations "Direct link to Predefined animations")

The `Easing` module provides several predefined animations through the following methods:

- [`back`](/docs/easing#back) provides a basic animation where the object goes slightly back before moving forward
- [`bounce`](/docs/easing#bounce) provides a bouncing animation
- [`ease`](/docs/easing#ease) provides a basic inertial animation
- [`elastic`](/docs/easing#elastic) provides a basic spring interaction

### Standard functions[​](#standard-functions "Direct link to Standard functions")

Three standard easing functions are provided:

- [`linear`](/docs/easing#linear)
- [`quad`](/docs/easing#quad)
- [`cubic`](/docs/easing#cubic)

The [`poly`](/docs/easing#poly) function can be used to implement quartic, quintic, and other higher power functions.

### Additional functions[​](#additional-functions "Direct link to Additional functions")

Additional mathematical functions are provided by the following methods:

- [`bezier`](/docs/easing#bezier) provides a cubic bezier curve
- [`circle`](/docs/easing#circle) provides a circular function
- [`sin`](/docs/easing#sin) provides a sinusoidal function
- [`exp`](/docs/easing#exp) provides an exponential function

The following helpers are used to modify other easing functions.

- [`in`](/docs/easing#ineasing) runs an easing function forwards
- [`inOut`](/docs/easing#inout) makes any easing function symmetrical
- [`out`](/docs/easing#out) runs an easing function backwards

## Example[​](#example "Direct link to Example")

```tsx
import { Easing, interpolate } from "remotion";

const MyVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const interpolated = interpolate(frame, [0, 100], [0, 1], {
    easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        transform: `scale(${interpolated})`,
        backgroundColor: "red",
      }}
    />
  );
};Copy
```

---

# Reference

## Methods[​](#methods "Direct link to Methods")

### `step0`[​](#step0 "Direct link to step0")

```tsx
static step0(n): numberCopy
```

A stepping function, returns 1 for any positive value of `n`.

---

### `step1`[​](#step1 "Direct link to step1")

```tsx
static step1(n): numberCopy
```

A stepping function, returns 1 if `n` is greater than or equal to 1.

---

### `linear`[​](#linear "Direct link to linear")

```tsx
static linear(t): numberCopy
```

A linear function, `f(t) = t`. Position correlates to elapsed time one to one.

<http://cubic-bezier.com/#0,0,1,1>

---

### `ease`[​](#ease "Direct link to ease")

```tsx
static ease(t): numberCopy
```

A basic inertial interaction, similar to an object slowly accelerating to speed.

<http://cubic-bezier.com/#.42,0,1,1>

---

### `quad`[​](#quad "Direct link to quad")

```tsx
static quad(t): numberCopy
```

A quadratic function, `f(t) = t * t`. Position equals the square of elapsed time.

<http://easings.net/#easeInQuad>

---

### `cubic`[​](#cubic "Direct link to cubic")

```tsx
static cubic(t): numberCopy
```

A cubic function, `f(t) = t * t * t`. Position equals the cube of elapsed time.

<http://easings.net/#easeInCubic>

---

### `poly()`[​](#poly "Direct link to poly")

```tsx
static poly(n): (t) => numberCopy
```

A power function. Position is equal to the Nth power of elapsed time.

n = 4: <http://easings.net/#easeInQuart> n = 5: <http://easings.net/#easeInQuint>

---

### `sin`[​](#sin "Direct link to sin")

```tsx
static sin(t): numberCopy
```

A sinusoidal function.

<http://easings.net/#easeInSine>

---

### `circle`[​](#circle "Direct link to circle")

```tsx
static circle(t): numberCopy
```

A circular function.

<http://easings.net/#easeInCirc>

---

### `exp`[​](#exp "Direct link to exp")

```tsx
static exp(t): numberCopy
```

An exponential function.

<http://easings.net/#easeInExpo>

---

### `elastic()`[​](#elastic "Direct link to elastic")

```tsx
static elastic(bounciness): (t) =>  numberCopy
```

A basic elastic interaction, similar to a spring oscillating back and forth.

Default bounciness is 1, which overshoots a little bit once. 0 bounciness doesn't overshoot at all, and bounciness of N > 1 will overshoot about N times.

<http://easings.net/#easeInElastic>

---

### `back()`[​](#back "Direct link to back")

```tsx
static back(s): (t) => numberCopy
```

Use with `Animated.parallel()` to create a basic effect where the object animates back slightly as the animation starts.

---

### `bounce`[​](#bounce "Direct link to bounce")

```tsx
static bounce(t): numberCopy
```

Provides a basic bouncing effect.

<http://easings.net/#easeInBounce>

See an example of how you might use it below

```tsx
interpolate(0.5, [0, 1], [0, 1], {
  easing: Easing.bounce,
});Copy
```

---

### `bezier()`[​](#bezier "Direct link to bezier")

```tsx
static bezier(x1, y1, x2, y2) => (t): numberCopy
```

Provides a cubic bezier curve, equivalent to CSS Transitions' `transition-timing-function`.

A useful tool to visualize cubic bezier curves can be found at <http://cubic-bezier.com/>

```tsx
interpolate(0.5, [0, 1], [0, 1], {
  easing: Easing.bezier(0.5, 0.01, 0.5, 1),
});Copy
```

---

### `in(easing)`[​](#ineasing "Direct link to ineasing")

```tsx
static in(easing: (t: number) => number): (t: number) => number;Copy
```

Runs an easing function forwards.

```tsx
{
  easing: Easing.in(Easing.ease);
}Copy
```

---

### `out()`[​](#out "Direct link to out")

```tsx
static out(easing: (t: number) => number): (t: number) => number;Copy
```

Runs an easing function backwards.

```tsx
{
  easing: Easing.out(Easing.ease);
}Copy
```

---

### `inOut()`[​](#inout "Direct link to inout")

```tsx
static inOut(easing: (t: number) => number): (t: number) => number;Copy
```

```tsx
{
  easing: Easing.inOut(Easing.ease);
}Copy
```

Makes any easing function symmetrical. The easing function will run forwards for half of the duration, then backwards for the rest of the duration.

## Credits[​](#credits "Direct link to Credits")

The Easing API is the exact same as the one from [React Native](https://reactnative.dev/docs/easing) and the documentation has been copied over. Credit goes to them for this excellent API.

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Servers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  Node.js  Bun  Serverless Functions  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this helper](https://github.com/remotion-dev/remotion/blob/main/packages/core/src/easing.ts)

CONTRIBUTORS

[**kaf-lamed-beyt**

Improved function signatures](https://github.com/kaf-lamed-beyt)
