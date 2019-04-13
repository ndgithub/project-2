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
      console.log('1');
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
