function Pizza(cheese, sauce, size) {
  this.cheese = cheese;
  this.sauce = sauce;
  this.size = size;
  this.toppings = [];
}

Pizza.prototype.getPrice = function() {
  var price = 5; //starting price of small cheese (no topping) pizza
  if(this.cheese == "extra") {price += 1;}

  if(this.sauce == "extra") {price += 1;}

  if(this.size == "medium") {price += 3;}
  else if(this.size == "large") {price += 6;}

  this.toppings.forEach(function() {
    price += 1;
  })
  return price;
}

function clearFields() {
  $("#input-size").val("small");
  $("#input-cheese").val("normal");
  $("#input-sauce").val("normal");
  $("#topping").replaceWith(  '<div class="new-topping">' +
                                    '<label for="input-topping">What is a topping you would like on your pizza?</label>' +
                                    '<input type="text" class="input-topping form-control" style= "width:300">' +
                                    '<br>' +
                                  '</div>');
}

$(function() {
    $(".add-topping").click(function() {
      $("#topping").append( '<div class="new-topping">' +
                                  '<input type="text" class="input-topping form-control" style= "width:300">' +
                                  '<br>' +
                                '</div>');
    });

    var totalCost = 0;
    $("form#pizza").submit(function(event) {
      event.preventDefault();
      inputtedSize = $("#input-size").val();
      inputtedCheese = $("#input-cheese").val();
      inputtedSauce = $("#input-sauce").val();

      var newPizza = new Pizza(inputtedCheese, inputtedSauce, inputtedSize);

      $(".new-topping").each(function() {
        var inputtedTopping = $(this).find("input").val();
        newPizza.toppings.push(inputtedTopping);
      })
      //end of form input retrieval
      var toppingsList = newPizza.toppings.join(", ");
      totalCost += newPizza.getPrice();
      $("ul.pizza-list").append("<li>" + "<span class=pizzas>" + toppingsList  + " pizza. $" + newPizza.getPrice() + "</span>" + "</li>");
      $("#total-cost").replaceWith("Total Cost: " + totalCost);

      $(".pizza").last().click(function() {
        $("display-details").show();
        var toppingsList = newPizza.toppings.join(", ");
        $(".show-details h3").text(toppingsList + " pizza details")

      })
      clearFields();
      $(".show-pizzas").show();
      //debugger
    })
})
