describe("Pizza", function() {
  it('Can be assigned no/normal/extra cheese or sauce, can be assigned small, medium or large size', function() {
    var newPizza = new Pizza("extra", "normal", "large");
    expect(newPizza.cheese).to.equal("extra");
    expect(newPizza.sauce).to.equal("normal");
    expect(newPizza.size).to.equal("large");
  });
  it('Can be assigned toppings', function() {
    var newPizza = new Pizza("extra", "normal", "large");
    newPizza.toppings.push("pepperoni")
    newPizza.toppings.push("bacon")
    expect(newPizza.toppings[0]).to.equal("pepperoni");
    expect(newPizza.toppings[1]).to.equal("bacon");
  });
});
describe("getPrice", function() {
  it('Can determine the price of a pizza based on it\'s attributes', function() {
    var newPizza = new Pizza("extra", "normal", "large");
    newPizza.toppings.push("pepperoni")
    expect(newPizza.getPrice()).to.equal(13);
  });
});
