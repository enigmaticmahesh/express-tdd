# TDD with Express

### Dependencies configurations

- `"test": "jest --watch",`
  - This option in the **package.json** file makes sure that we test only the changes in each commit. This will keep monitoring the changes in each commit.
  - There is also **--watchAll** flag, which will watch and test all the changes that we made starting from the beginning of the app till now
- `"lint": "eslint ."`
  - Running the command **yarn test** will check for all the eslint issues in the app
  - We can also fix those issues if present with **eslint . --fix** or if we want to pass it from the yarn, then **yarn test -- --fix**
- `"supertest": "^6.3.0"`
  - This package is used for testing HTTP calls

### ESLint configurations

```
  "eslintConfig": {
    "parserOptions": {
      "ecmaVersion": 6
    },
    "extends": [
      "eslint:recommended",
      "plugin:prettier/recommended"
    ],
    "plugins": [
      "prettier"
    ],
    "env": {
      "node": true,
      "es6": true,
      "jest": true
    },
    "rules": {
      "semi": "warn",
      "quotes": [
        "warn",
        "single"
      ],
      "eqeqeq": "warn"
    }
  },
```

- **parserOptions --> ecmaVersion**: This lets the eslint to know that we are using ECMA v6
- **extends**: This will extend the features of the mentioned values and add it to the configuration as well
- **plugins**: As we are extending prettier configurations as well in the application, so we have to add it in here
- **env**: Let ESLint know, which environment it is checking for. Here, we are using node with es6 and jest for testing the app
- **rules**: These are the rules that we have applied in the app to avoid some common mistakes we make

### References

- ![Asynchronous Test](/readme_assets/asynchronous_test.png)
