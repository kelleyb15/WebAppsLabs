# Web Applications Course, lab 2

In this lab we will go through the steps to build the stack class one step at a time, with tests along the way. It may feel slow at times, but please do not skip steps. This is about getting used to the practice of following these steps.

Roughly the steps are:

1. Create an issue.
2. Create a test for the issue. Watch it fail.
3. Commit the test. Reference the issue.
4. Write the code that addresses the issue. Watch the tests succeed.
5. Commit the code. Reference and close the issue at the same time.

We will repeat these steps over and over again until completion.

This lab has 2 main parts and an optional part:

1. Follow along with the instructions below to write tests for a stack implementation.
2. Implement a map/"associative array" structure along with its tests. Instructions near the bottom of this page.
3. An optional extra credit portion asks you to add iterator methods like `forEach`, `filter` and `map` to this "map" structure.

## Implementing and Testing a Stack

### Step 1: Make sure a function is created

The first thing we want to make sure is that our code creates a `makeStack` function, which would mean two things:

- That there is a `makeStack` defined.
- That it is a function.

We will do them both, so create two separate issues in your repository's issues page. Create a new label "Lab2" and assign that label to both issues.

We will address the first issue first. If you look in `tests.spec.js`, you will find a "define", and in it there is an "it" block, like so:

```javascript
describe('Your code for stacks', function() {
   it('defines a variable makeStack', function() {

   });
   // Add more "it" sections below
});
```

We'll need to add in that line a test that tests if something called `makeStack` exists. This is a bit tricky: The only way to do that is basically to try to access it, and get an error if we fail. There is a standard way to test if a statement fails. Put it as the body of a function, and expect that function to not throw an error:

```javascript
expect(function() { makeStack; }).to.not.throw(Error);
```

So put that line inside that "it". Save and open the `index.html` file. You should see that test fail.

Now that we have a failing test, make a commit, and reference the issue in it (#1 or something like that, whatever number the corresponding test has). You should use something like this for the message: "Add test that makeStack exists (#1)".

Now that we have that test going, we need to add the code that makes it pass. So edit the code file (`yourCode.js`) to have a line that declares a `makeStack` variable. Don't give it value, just declare it.

Save, and run your test again. It should now pass. Make a new commit, with a message something along the lines of "declare makeStack. Close #..." with the correct number instead of the dots.

This will probably not close the issue, so you'll need to got to GitHub and manually close it. It does add a link between the issue and the commit though.

Ok, ready for the next step?

We will now make sure it is actually a function. You already created an issue for that hopefully. Let's write a test.

This will be a new "it" section. Still within the "describe". So something like:

```javascript
it('actually defines a function makeStack', function() {
    expect(makeStack).to.be.a('function');
});
```

You see here we ask it to make sure that "makeStack" is of type function. We could have omitted the "to" and "be" parts, and said `expect(makeStack).a('function')`, but it reads more natural this way (these are the chainable words I mentioned earlier).

So save and run your tests again, the second one should fail. And you should note the actual error message: "expected undefined to be a function". That is because `makeStack` is undefined, and we said it should have been a function.

Make a commit, referencing the second issue we made.

Now we should add the code that addresses the problem. Instead of just declaring `makeStack`, set it equal to a function that takes no arguments and for now has no code in it, just returns.

This should make the test pass. Commit and close the issue.

## Implementing and Testing a Stack

### Step 2: makeStack returns an object with certain keys.

Now that `makeStack` is a function, the next thing to set up is that it is returning the right sort of thing, namely an object with 3 keys, and further these keys being functions.

It is important at this point to focus on testing the interface of your application. We don't really need to know how `makeStack` is implemented internally, as that might change with iterations of the application. We should make sure that the provided "external interface", the stuff that callers of `makeStack` can rely of, is consistent.

Start by making two new issues on GitHub, one for the return value being an object and one for the return value containing the three keys "push", "pop", "isEmpty".

For this we will create a new "describe", as we would like the test to start by saying "Your makeStack function". So add a describe after the other one finishes, like this:

```javascript
describe('Your makeStack function', function() {

});
```

In it we will place the new "it"s. Since all tests will need to look at the result of calling "makeStack", we will create a local variable in "describe" to hold that call. So in that describe, put:

```javascript
var stack = makeStack();
```

All the "it"s in this describe will be able to see this variable.

Okay now let's add some "it"s. First off, let's add an "it" to test that the result is an object:

```javascript
it('returns an object', function() {
    expect(stack).to.be.a('object');
});
```

Save and watch it fail.

Commit and reference the issue you made. Then change your code so that your makeStack function returns an object, it can be just an empty object for now.

Make sure the test passes, then commit, reference and close the issue.

Now we will set up a test that the returned object has three keys, and that they are functions. Since we ask the same thing from all three keys, this is a good opportunity to do an array forEach. One final detail: We don't really care whether the functions are actually properties of the object, but simply that we could call them as "stack.push" etc. We will see later that objects can inherit properties from other objects. so we will simply check that "stack.push" is indeed a function, and so on.

So put this in our second describe:

```javascript
it('returns an object with methods push, pop and isEmpty', function() {
    ['push', 'pop', 'isEmpty'].forEach(function(key) {
        expect(stack[key]).to.be.a('function');
    });
});
```

Watch it fail, then commit.

Now you will need to add the code to fix this test. We saw two slightly different ways of implementing stacks, and you can pick whichever you like, but you need to end up with adding 3 new properties to this object you return, and those properties must be functions. You can either define them right there in the returned object, or create them as local functions before the return, then add their variable names into the object values.

In any case the functions you add at this point should just do nothing, just empty functions to pass this part of the test.

You might want to run the tests after you add each function, to see how the error message changes.

Once you got enough code to pass this test, commit and close the corresponding issue.

At this point we have the skeleton of our data structure in place. Next step would be to write the actual code.

## Implementing and Testing a Stack

### Step 3: Methods do the right thing

Let's start by listing some tests we would like to do at this point, to test our implementation works. This is a mental process you need to go through before you write your code for your own projects and problems as well:

1. Figure out all the behavior your objects will need to have.
2. Document it in issues (one or many, up to you).
3. Create tests for these issues.
4. Start addressing each issue at a time, closing them with commits as you move along.

So here is what our stack objects should do:

- `push` should return the object itself to allow for chaining.
- A stack should be `isEmpty` when it starts.
- A stack should no longer be `isEmpty` after a `push`.
- A `pop` should produce an error on an empty stack.
- A `pop` that follows a `push` should return the pushed element.
- A stack should be `isEmpty` after a series of pushes followed by an equal series of pops, and not otherwise.
- Pushed elements should be returned by `pop` in the same order.
- Popped elements are identical to those that were inserted (not clones).

Notice once again that we are testing behavior, not implementation. We don't test for example whether the stack object maintains the elements in an array or something like that, only that it returns them to us in the opposite order and intact. We don't test if `pop` internally uses `isEmpty` or not. Those are implementation details.

> Test functionality, not implementation

You should now create an issue for each of the items in the list above. Don't forget the labels.

Let us start writing tests. We should start a new describe, we will title it "Stack methods:", and in it we will add refined describes. To expedite matters a tad at this point, we will group the providing of the code for some tests. Just commit those bigger chunks, referencing the numbers of all the tests they relate to. But when adding the code to satisfy the tests, commit one piece at a time closing issues as you go along.

So first we add tests if `isEmpty`. It needs two kinds of tests. Basically, that it returns `true` for a freshly initialized stack, but `false` if a push has occured. Later on we will create a randomized test where we perform series of pushes and pops and observe the results.

Each of these tests will need to have its own fresh copy of a stack. We will therefore declare a `stack` variable within the describe, to hold this stack, and we will use a `beforeEach` call to tell it to reset that variable to a fresh stack before each test.

This will be a new "top-level" describe, so place it below the makeStack describe.

```javascript
describe('Stack methods:', function() {
    var stack;
    beforeEach(function() {
        // This ensures every test sees a fresh empty stack
        stack = makeStack();
    });
    it('isEmpty returns true for a new stack', function() {
        expect(stack.isEmpty()).to.equal(true);
    });
    it('isEmpty returns false if an element is pushed', function() {
        stack.push(2);
        expect(stack.isEmpty()).to.equal(false);
    });
});
```

Save and look in the browser, you should be seeing two failing tests. Commit.

At this point it is hard to add code to satisfy both tests, without effectively doing a full implementation. This often happens the first time you implement a structure. At some point you just:

- write all the tests you can think of
- watch them all fail
- implement as much of the structure as you need, possibly all of it
- see which tests still fail. If you got some passing, commit
- find the errors in the code, correct, see more tests pass, commit, repeat

So let us keep adding tests. Next we look at `push`- and `pop`-related tests. Add them inside that "stack-methods" describe. Make sure to read them and understand how they work.

```javascript
it('push returns the stack object', function() {
    expect(stack.push()).to.equal(stack);
});
it('pop should error on empty stack', function() {
    expect(function() { stack.pop(); }).to.throw(Error);
});
it('pop should not error on nonempty stack', function() {
    stack.push(2);
    expect(function() { stack.pop(); }).to.not.throw(Error);
});
it('a pop following a push should return the pushed element', function() {
    // we generate a random number to use as element.
    var v = Math.random();
    stack.push(v);
    expect(stack.pop()).to.equal(v);
});
it('consecutive pops return elements in reverse order to the pushes', function() {
   var v1 = Math.random(), v2 = Math.random();
   stack.push(v1);
   stack.push(v2);
   expect(stack.pop()).to.equal(v2);
   expect(stack.pop()).to.equal(v1);
});
```

Notice that in the later tests we did not use the "push-chaining" techniques that the fact that "`push` returns the object" would allow us to do, i.e. `stack.push(v1).push(v2)`. This was in order to isolate the tests: If a test fails, ideally it should be for the reason that this test is testing for, not for something an earlier test was looking for. This is not always possible, but it is a goal to aim for.

Save and make sure all these new tests fail. Then commit.

At this point you have a reasonable set of tests. We will add one more "stress-test" in a moment, but for now you should fill in the stack implementation and make sure your tests pass, then commit and close the corresponding issues.

## Implementing and Testing a Stack

### Step 4: Stress-test

After you have a basic implementation going, you will want to perform a tougher test, to make sure all components interact correctly. In this case the idea of the test would be to perform a randomized series of pushes and pops, and on each step to test that the system behaves properly.

- We will use an index to keep a net track of how many entries have been pushed and/or popped.
- We will use for the pushes entries related to that index, but with a randomized part.
- A parameter determines how many steps to take.
- Another parameter determines how many iterations of this process to perform.
- At every step we randomly choose to push or pop.

Here is the test, add it to the last describe we've been working with:

```javascript
   it('a randomized set of pushes and pops should behave properly', function() {
      var iters = 10, steps = 200, iter, step;
      var noItems, randomNum;
      for (iter = 0; iter < 10; iter += 1) {
         stack = makeStack();
         randomNum = Math.random();
         noItems = 0;
         for (step = 0; step < 200; step += 1) {
            if (Math.random() > 0.5) { // 50-50 do a push
               noItems += 1;
               stack.push(noItems + randomNum);
            } else { // or do a pop
               if (noItems === 0) {
                  expect(function() { stack.pop(); }).to.throw(Error);
               } else {
                  expect(stack.pop()).to.equal(noItems + randomNum);
                  noItems -= 1;
               }
            }
         }
      }
   });
```

Study this code and make sure you understand what it is doing. Then run the test and make sure it passes. If you are anything like me, there should be a sense of immense gratification that this fairly complicated test worked.

## Assignment: Implementing a map structure.

A **map**, or associative array, is a structure that efficiently holds key-value pairs, where they keys are typically strings. Javascript objects are a good example of this, and you can internally use a Javascript object to implement the structure.

You will find all the files you need inside the `map` folder. It has a test file and a code file for you to fill in, and an html file that shows you the test results.

> It is important to keep in mind that your code will be tested using my tests, and not only the tests you create. It is your responsibility to work hard in creating your tests, to ensure that you have accounted for all the behavior you were expected to implement.

Here is the interface you must implement (and your tests need to test this):

- Your code must be creating a `makeMap` function that takes no arguments and creates a new "empty map".
- The object that `makeMap` returns must contain exactly the following methods, that are used to interface with the map:

    `has`: Calling`theMap.has(key)` should return a boolean saying if your map has a key that equals the passed argument.

    `lookup`: Calling `theMap.lookup(key)` should return the value stored in that key. It should throw an error if the key does not exist.

    `add`: Calling `theMap.add(key, value)` should add the key-value pair to the map and return `theMap` (so that calls can be chained). It should throw an error if the key already exists.

    `update`: Calling `theMap.update(key, value)` should update the value associated with the key. It should return `theMap` to allow chaining. If the key does not already exist in the map, it should throw an error.

    `remove`: Calling `theMap.remove(key)` should remove the pair stored in that key. It should throw an error if the key does not exist in the map.

- You are free to add other local functions that are not exported. But keep them local and do NOT expose them by including them in the returned object.
- Your methods must make a distinction between "having a key with corresponding value `undefined/null`" and "not having the key at all". Using "`hasOwnProperty" at appropriate places should do this for you. Make sure your tests test for this.
- The messages for the errors you throw should include in their text enough information to know that it is regarding the "map" structure, which method had problems, and what the key was. This will not be checked in our tests however, we will only test that an error happens.
- The test file provides you with a function `randomString` that you can use to generate random strings for your tests. It takes as input the length of the resulting string, defaulting to 5.

## Optional Assignment: Collection methods on map structure

This optional assignment will carry some extra credit, but it will require disproportionately more work than the credit it carries. Think of it as a challenge problem.

Should you choose to undertake this part, you should copy the entire map directory into a new directory "mapExtra", then add your extensions to the test and code files there.

This optional assignment asks you to implement collection methods on your map. Here are the methods and what they should do:

`forEach`: Called like so: `theMap.forEach(function(val, key) { ... })`. Calls the function for each key-value pair. Should return `theMap`. Note that in the provided function the first argument must be the value and the second the key.

`map`: Called like so: `theMap.map(function(val, key) { ... })`. For each key-value pair calls the function to obtain a "new value". It returns a new map, that contains the same keys but now associated with these new values. It should keep the old map intact.

`filter`: Called like so: `theMap.filter(function(val, key) { ... })`. It creates a new map that contains only those key-value pairs for which the provided function returns `true`. It should keep the old map intact.

`reduce`: Called like so: `theMap.reduce(function(acc, val, key) { ... }, initValue)`. It should accumulate the results of the function calls in much the same way that the array reduce does.

- You will find the call `Object.keys(anObject)` handy for this most of these questions.
- Use the above-mentioned `Object.keys` and a normal `for` loop or `forEach` on the resulting array, rather than trying to use `for...in`.
- You may find it convenient to use the corresponding array collection methods along the way.
