var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];
      var hasMushrooms = function (ingredient) { return ingredient === "mushrooms"};
      /* solve using filter() & all() / any() */

      productsICanEat = products.filter(function (product){
        return !_(product.ingredients).any(hasMushrooms)&&!product.containsNuts;
      });
     
      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });


  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var num = _.range(0,1000);
    var sum = _(num).reduce(function(a, b){
      if (b%3 === 0 || b%5 === 0){
       return a + b;
      }
      return a;
    },0);;
    expect(233168).toBe(sum);

  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = _(products).chain()
      .map(function(product){
      return product.ingredients;
    })
      .flatten()
      .reduce(function(ingredientCount, ingredient){
      ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + 1;
      return ingredientCount;
    }, [])
      .value();

    /* chain() together map(), flatten() and reduce() */

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
    var findLargestPrimeFactor = function (num) {
      var largestFactor = 1;

      while (num%2 === 0){
        largestFactor = 2;
        num = num/2;
      }

      for (var i = 3; i <= Math.sqrt(num); i = i + 2){
        while (num%i === 0){
          largestFactor = i;
          num = num/i;
        }
      }

      return num>largestFactor? num: largestFactor;
    };
    expect(findLargestPrimeFactor(99)).toBe(11);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    var findLargestPalindromeProduct = function () {
      
      var isPalindrome = function (num){
        return num === parseInt(num.toString().split("").reverse().join(""));
      }

      var maxPalindrome = 0;

      for (var num1 = 999; num1 >=100 ; num1--){
        for (var num2 = 999; num2 >= 100; num2--){
          var product = num1*num2;
          if (isPalindrome (product) && (product)>maxPalindrome){
            maxPalindrome = num1*num2;
          }
        }
      }
  
      return maxPalindrome;
    };

    expect(findLargestPalindromeProduct()).toBe(906609);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      //I'm not sure I understand the objective of this function...
    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var compareSums = function (){
      var nums = [...arguments];
  
      var squareOfSum = Math.pow(nums.reduce(function (total, num){
        return total+num
      },0),2);
      var sumOfSquares = nums.map(function(num){ 
        return Math.pow(num,2);
      }).reduce(function(total, num){
          return total+num;
      },0);

       return sumOfSquares - squareOfSum;
      }

      expect(compareSums(1,2,3)).toBe(-22);
  });

  it("should find the 10001st prime", function () {
    var findNthPrime = function(num) {
      var memo = [2,3];
      var isPrime = function (n){
        return memo.every(function(prime){
          return n%prime != 0; 
        });
      };

      while (!memo[num-1]){
        var currentNumber = memo[memo.length-1];
        while (!isPrime (currentNumber)){
          currentNumber = currentNumber + 2;
        }
        memo.push(currentNumber);
      }

      return memo.pop();
    }

    expect(findNthPrime(10001)).toBe(104743);

  });
  
});
