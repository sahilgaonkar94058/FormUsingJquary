$("#submitBtn").click(function (e) {
  e.preventDefault();
});
let data_array = [];
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
  (op) => (myStateList.innerHTML += `<option value="${op}">${op}</option>`)
);
StatesCities.city.forEach(
  (op) =>
    (myStateList.innerHTML += `
  <option value="${op}">${op}</option>`)
);

function getState() {
  let selectedState = $("#myStateList").find(":selected").val();

  $("#myCityList").empty();
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
var selectedRow = null;

function submitData() {
  if (selectedRow == null) {
    console.log("add new data");
    readFormData();
    displayData(data_array);
  } else {
    console.log("updated data");
    editData(updateData, selectedRow);
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
  data_array.push(my_obj);
}
console.log(data_array);

function displayData(data) {
  $("#myTable").empty();
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
      <td><button id="editBtn" data-test="${i}">Edit</button><button id="deleteBtn" data-id="${i}">Delete</button></td>
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

  console.log("updated form value > > ", my_UpdatedObj);
  data_array[editAttribute] = my_UpdatedObj;

  displayData(data_array);
  selectedRow = null;
}
