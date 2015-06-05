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
  // $("#topping").replaceWith(  '<div class="new-topping">' +
  //                                   '<label for="input-topping">What is a topping you would like on your pizza?</label>' +
  //                                   '<input type="text" class="input-topping form-control" style= "width:300">' +
  //                                   '<br>' +
  //                                 '</div>');

  $("#topping").replaceWith('<div id="topping">' +
                                '<div class="new-topping">' +
                                  '<div class="form-group"> ' +
                                    '<label for="input-topping">What is a topping you would like on your pizza?</label>' +
                                    '<input type="text" id="input-topping" class="input-topping form-control" style= "width:300">' +
                                  '</div>' +
                                '</div>' +
                              '</div>');
}

$(function() {
    $(".add-topping").click(function() {
      $("#topping").append('<div class="new-topping">' +
                                '<div class="form-group"> ' +
                                  '<input type="text" id="input-topping" class="input-topping form-control" style= "width:300">' +
                                '</div>' +
                              '</div>');
    });

    var totalCost = 0;
    $("form#pizza").submit(function(event) {
      //form input retrieval
      event.preventDefault();
      inputtedSize = $("#input-size").val();
      inputtedCheese = $("#input-cheese").val();
      inputtedSauce = $("#input-sauce").val();

      var newPizza = new Pizza(inputtedCheese, inputtedSauce, inputtedSize);

      $(".new-topping").each(function() {
        var inputtedTopping = $(this).find("input").val();
        newPizza.toppings.push(inputtedTopping);
      });
      var isCheese = ""
      if (newPizza.toppings[0] === ""){isCheese = "Cheese";}
      clearFields();
      //end of form input retrieval

      //Pizza list
      var toppingsList = newPizza.toppings.join(", ");
      totalCost += newPizza.getPrice();
      $("ul.pizza-list").append("<li>" + "<span class=pizza>" + isCheese + toppingsList  + " pizza. $" + newPizza.getPrice() + "</span>" + "</li>");
      $("#total-cost").text("Total Cost: " + totalCost);
      //end of pizza list

      //Pizza details
      $(".pizza").last().click(function() {
        $(".show-details").show();
        var toppingsList = newPizza.toppings.join(", ");
        var isCheese = ""
        if (newPizza.toppings[0] === ""){isCheese = "Cheese";}
        $(".show-details h3").text(toppingsList + isCheese + " pizza details");
        $("#size-details").text("size: " + newPizza.size);
        $("#cheese-details").text("cheese: " + newPizza.cheese);
        $("#sauce-details").text("sauce: " + newPizza.sauce);
      })
      //end of pizza details
      $(".show-pizzas").show();
      $(".alert-info").show();
    });
});
