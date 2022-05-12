$("#submitBtn").click(function (e) {
  e.preventDefault();
});

var data_array = [];

var updateData;

const StatesCities = {
  states: ["West Bengal", "Maharashtra", "Delhi"],
  city: [
    {
      state: "Maharashtra",
      cities: [
        "Ahmednagar",
        "Akola",
        "Amravati",
        "Aurangabad",

        "Raigad",
        "Ratnagiri",
        "Sindhudurg",

        "Washim",
        "Yavatmal",
      ],
    },
    {
      state: "Delhi",
      cities: ["Central Delhi", "East Delhi", "West Delhi"],
    },

    {
      state: "West Bengal",
      cities: [
        "Birbhum",
        "Bankura",
        "Bardhaman",
        "Darjeeling",
        "Dakshin Dinajpur",
        "Hooghly",
        "Howrah",
        "Jalpaiguri",
        "Cooch Behar",
        "Kolkata",
        "Maldah",
        "Paschim Medinipur",
        "Purba Medinipur",
        "Murshidabad",
        "Nadia",
        "North 24 Parganas",
        "South 24 Parganas",
        "Purulia",
        "Uttar Dinajpur",
      ],
    },
  ],
};

let state = StatesCities.states;

state.map(
  (op) => (myStateList.innerHTML += `<option value="${op}" >${op}</option>`)
);

// this function for get State and add cities of state to cityList
function getState() {
  let selectedState = $("#myStateList").find(":selected").val();

  $("#myCityList").empty();
  myCityList.innerHTML = `<option value="" value="" selected disabled hidde>select city </option>`;

  for (let i = 0; i < StatesCities.city.length; i++) {
    if (StatesCities.city[i].state == selectedState) {
      StatesCities.city[i].cities.forEach(
        (op) =>
          (myCityList.innerHTML += `
          
        <option value="${op}">${op}</option>`)
      );
    }
  }
}

var selectedRow = null;   //set index to null of selcted table row


// for submit Button
function submitData() {
  if (validateForm() == true) {
    console.log("valdate is true");
    if (selectedRow == null) {
      console.log("add new data");
      readFormData();

      displayData(data_array);
    } else {
      if (validateForm() == true) {
        console.log("updated data");
        editData(updateData, selectedRow);
      }
    }
  }
}

function readFormData() {
  var my_obj = {
    firstName: $("#firstName").val(),
    lastName: $("#lastName").val(),
    dateOfBirth: $("#date").val(),
    address: $("#address").val(),
    state: $("#myStateList").find(":selected").val(),
    city: $("#myCityList").find(":selected").val(),
    gender: $(`input[type="radio"][name=gender]:checked`).val(),
  };
 
  console.log("before =>", my_obj.firstName);
 
  const userExists = data_array.some(
  
    (data_array) => data_array.firstName+data_array.lastName === my_obj.firstName+my_obj.lastName
  );
  if (userExists) {
    alert("User Already Exites Please Try with Another Username");
  }
  else{

    data_array.push(my_obj);
  }

}

console.log(data_array);

function displayData(data) {
  $("#myTable").empty();
  // $("#myCityList").empty();
  for (let i = 0; i < data.length; i++) {
    var tableData = `
    <tr>
      <td>${data[i].firstName}</td>
      <td>${data[i].lastName}</td>
      <td>${data[i].gender}</td>
      <td>${data[i].dateOfBirth}</td>
      <td>${data[i].state}</td>
      <td>${data[i].city}</td>
      <td>${data[i].address}</td>
      <td><button id="editBtn" class="btn btn-primary me-3"data-test="${i}">Edit</button><button id="deleteBtn" class="btn btn-danger " data-id="${i}">Delete</button></td>
    </tr>
    `;
    $("#myForm")[0].reset();
    $("#myTable").append(tableData);
  }
}

$("#myTable").on("click", "#deleteBtn", function () {
  let deleteAttribute = this.getAttribute("data-id");
  console.log("attribute :  ", deleteAttribute);

  console.log("data array before ", data_array);
  data_array.splice(deleteAttribute, 1);
  displayData(data_array);
  console.log("data array after", data_array);
});


// to get data of user on form to Update Data or edit data
$("#myTable").on("click", "#editBtn", function () {
  selectedRow = this.getAttribute("data-test");

  $("#submiBtn").text("Update ");

  setInput = data_array[selectedRow];

  let UpdatedForm = {
    firstName: $("#firstName").val(setInput.firstName),
    lastName: $("#lastName").val(setInput.lastName),
    dateOfBirth: $("#date").val(setInput.dateOfBirth),
    address: $("#address").val(setInput.address),
    state: $("#myStateList").val(setInput.state),
    city: $("#myCityList").val(setInput.city),

    gender: $("input[name=gender][value=" + setInput.gender + "]").attr(
      "checked",
      "checked"
    ),
  };
});

function editData(setInput, editAttribute) {
  console.log("i am calling setInput fun");

  let my_UpdatedObj = {
    firstName: $("#firstName").val(),
    lastName: $("#lastName").val(),
    dateOfBirth: $("#date").val(),
    address: $("#address").val(),
    state: $("#myStateList").find(":selected").val(),
    city: $("#myCityList").find(":selected").val(),
    gender: $(`input[type="radio"][name=gender]:checked`).val(),
  };

  const userExists = data_array.some(
  
    (data_array) => data_array.firstName+data_array.lastName === my_UpdatedObj.firstName+my_UpdatedObj.lastName
  );
  if (userExists) {
    alert("User Already Exites Please Try with Another Username");
    UpdatedForm
  }
  else{

    data_array[editAttribute] = my_UpdatedObj;
  }

  console.log("updated form value > > ", my_UpdatedObj);


  displayData(data_array);
  // $("#myCityList").empty();
  selectedRow = null;
}

// check Validation of Form
function validateForm() {
  var names = [
    "firstName",
    "lastName",
    "gender",
    "date",
    "myStateList",
    "myCityList",
  ];
  var errCount = 0;

  names.forEach(function (el) {
    var val = document.forms["myForm"][el].value;
    if (el == "firstName" && val.match(/[1-9]/g) != null) {
  
      $("#" + el + "Err").text("--< plase enter a valid name >--");
      $("#" + el + "Err").css("visibility", "visible");
      $("#"+el).css("border-color","red");
      ++errCount;
    } else if (el == "lastName" && val.match(/[1-9]/g) != null) {
    
      $("#" + el + "Err").text("--< Please enter valid Last Name >--");
      $("#" + el + "Err").css("visibility", "visible");
      $("#"+el).css("border-color","red");

      ++errCount;
    } else if (val == null || val == "") {
    

      $("#" + el + "Err").text("--< "+ el + " must be filled"+" >--");
      $("#" + el + "Err").css("visibility", "visible");
      $("#"+el).css("border-color","red");

      ++errCount;
    } else {
      $("#"+el).css("border-color","grey");

      $("#" + el + "Err").css("visibility", "hidden");
    }
  });
  if (errCount) {
    return false;
  } else {
    return true;
  }
}


// $("." + el + "Border").css("border", "1px solid red");