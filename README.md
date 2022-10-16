# TDD with Express

### Dependencies configurations

- `"test": "jest --watch",`
  - This option in the **package.json** file makes sure that in we test only the changes in each commit. This will keep monitoring the changes in each commit.
  - There is also **--watchAll** flag, which will watch and test all the changes that we made starting from the beginning of the app till now
- `"lint": "eslint ."`
  - Running the command **yarn test** will check for all the eslint issues in the app
  - We can also fix those issues if present with **eslint . --fix** or if we want to pass it from the yarn, then **yarn test -- --fix**
- `"supertest": "^6.3.0"`
  - This package is used for testing HTTP calls
- `npx http-server -c-1 -p 8080 -P http://localhost:3000`
  - We used the build folder of a React app to serve as a frontend
  - We used **http-server** package to serve it in the port **8080** and all the api calls made by the app which it makes to the same port 8080 to proxy it to **http://localhost:3000**
  - We are running our backend on port **3000**, so all the api calls are coming to our backend only
  - **-c-1** flag is used to not to store cache as **http-server** keeps the cache by default
  - All other details regarding **http-server** can be known at **https://www.npmjs.com/package/http-server**

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
- ![Synchronize Models](/readme_assets/synchronize_models.png)
