document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);
});

$("#new-account").on("submit", function (event) {
  event.preventDefault();
  checkEmail();
  //$(".uk-search-input").val("");
});

$(".new-email").on("submit", function (event) {
  event.preventDefault();
  checkEmail();
  //$(".uk-search-input").val("");
});


function checkEmail() {
  // set endpoint and your access key
  var access_key = 'd7776dbdfffeef43337896d2150a5ce9';
  var email_address = $("#account-email").val().trim();

  // verify email address via AJAX call
  $.ajax({
    url: 'http://apilayer.net/api/check?access_key=' + access_key + '&email=' + email_address,
    dataType: 'jsonp',
    success: function (json) {
      if (json.format_valid == true && json.smtp_check == true) {
        setSpinner();
        console.log("valid email");
      } else {
        $("#not-valid").removeClass("hidden");
      }
    }
  });
};

function setSpinner() {
  $(".remove-button").addClass("hidden");
  console.log("Should be hidden");
  $(".preloader-wrapper").addClass("active");
  setTimeout(function () {
    $(".preloader-wrapper").removeClass("active");
    $("#new-account").addClass("hidden");
    $(".modal-header").addClass("hidden");
    $(".account-created").removeClass("hidden");
    addToDB();
  }, 2000);
}

function addToDB() {
  var firstDeposit = $("#deposit").val().trim();
  $.post("/api/users",
    {
      "firstName": $("#first_name").val().trim(),
      "lastName": $("#last_name").val().trim(),
      "email": $("#account-email").val().trim(),
      "username": $("#username-add").val().trim(),
      "password": $("#password-add").val().trim(),
    }, function (data, textStatus, jqXHR) {
      $.post("/api/transactions",
        {
          "user_ID": $("#username-add").val().trim(),
          "type": "deposit",
          "amount": firstDeposit,
          "categories": ""
        }, function (data, textStatus, jqXHR) {
          console.log(data);
        })
    })
}

$(".login-btn").on("click", function (event) {
  event.preventDefault();
  console.log('clicked');
  $.post("/auth",
    {
      "username": $("#username").val().trim(),
      "password": $("#password").val().trim(),
    },
    function (data, textStatus, jqXHR) {
      var data = JSON.parse(data);
      if (data.authorized === true) {
        console.log('let them in');
        localStorage.setItem("username", $("#username").val().trim());
        window.location.replace("main.html");
      } else {
        $(".login-error").css("display", "block")
      }
    },
    "html"
  );
})

















// Get references to page elements
//var $exampleText = $("#example-text");
//var $exampleDescription = $("#example-description");
//var $submitBtn = $("#submit");
//var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
// var API = {
//   addTransaction: function (transactionObj) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/transaction",
//       data: JSON.stringify(transactionObj)
//     });
//   },
//   getUserTransactions: function () {
//     return $.ajax({
//       url: "/api/:id",
//       type: "GET",
//       success: function (results) {
//         console.log('success');
//       }
//     });
//   },
//   deleteExample: function (id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };


// var transactionsArray = [
//   {
//     id: 1,
//     type: 'withdrawl',
//     amount: 100,
//     categories: '',
//     user_ID: '1'
//   }, {
//     id: 2,
//     type: 'withdrawl',
//     amount: 200,
//     categories: '',
//     user_ID: '1'
//   }, {
//     id: 3,
//     type: 'deposit',
//     amount: 400,
//     categories: '',
//     user_ID: '1'
//   }, {
//     id: 4,
//     type: 'deposit',
//     amount: 25,
//     categories: '',
//     user_ID: '2'
//   }
//   , {
//     id: 5,
//     type: 'deposit',
//     amount: 10,
//     categories: '',
//     user_ID: '2'
//   }
//   , {
//     id: 5,
//     type: 'withdrawl',
//     amount: 10,
//     categories: '',
//     user_ID: '2'
//   }];

// function getUserBalance(transactionObj) {
//   var balance = 0;
//   for (let i = 0; i < transactionObj.length; i++) {
//     var transaction = transactionObj[i];
//     if (transaction.type === 'withdrawl') {
//       balance -= transaction.amount;
//     } else if (transaction.type === 'deposit') {
//       balance += transaction.amount;
//     }
//   }
//   return balance;
// }

// refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
