### Description
The reposotory has a code for article of Yury Strozhevsky [**Представление произвольных полиномов в виде конечных разностей с произвольным шагом**](). Main difference from already known ways of using `finite differences` is having any step between `differences`, not only one. Also the code proves that **any** polinom with degree `n` could be calculated using `n+1` values in sequence.
 
### Installation
The repository has everything you need. Just clone/download it and run the server:
```command
node app.js
```
After that you only need to open your browser with address:
```text
localhost:8080
```
Since all the code made using ES6 scripts I do recommend to use latest Chrome for correct representation and calculations.

### Usage
On the web page user need to input initial data for calculation. The `Degree` value is a degree of polinom which will be calculated. The `Step` value is a step for `x` variable in the polinom. The `Count` value represents how many values will be calculated for the polinom. The `Start position of x` is a literaly start position of `x` variable.

User has two options: calculate using formula for differences on real data, or perform the same calculations using generated random data. For example, in case of polinom with `degree = 2` it is enough to have three first values for the polinom - remainign values would be calculated via algorithm. And in case of random initial data code would generate `degree + 1` initial random values and remaining would be calculated by regular algorithm.

Inside `Common Formula For Polinom` text area code would represent common formula for polinom with specified degree. Inside `Formula In Differences` text area the same polinom would be represented in `finite differences` formula. The `Real Polinom Values` text area would has value, calculated using `Common Formula For Polinom`. The `Calculated Via Differences Values` text area would has values, calculated using `Formula In Differences`.

One remark: the user set `Count` value manually, but in order to have correct results all the time code itself changed the `Count` to `Count + Degree + 1` in order to have enough values for calculations in `finite differences`.