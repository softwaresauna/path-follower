# Path Follower

This is a solution of a [path-following problem](https://gist.github.com/tuomasj/8061c6940d74d3ab55bbea582e6c8f24).

It is done solely with test-driven development using acceptance & micro-tests to drive the implementation & design.

## Usage

`yarn`

`yarn test`

`yarn start`

## Actual Usage

This was done with Clean Code principles in mind. There is surely more to improve, but in general you can have a look around the code and notice the naming, structure, etc.

Also have a look at the tests (using Jest). They demontrate using JS & TS to achieve high readability (separation of test data and test methods, but still keeping them close). The `.spec` files (just one) contain acceptance tests and `.test` files contain microtests.

### TDD

Looking at the static code doesn't give you much insight into the process used to create it.

To see how TDD looks like look at the code through the Git commit history. Some commits are not as small as they should be, but in general each commit contains changes of only one thing.
