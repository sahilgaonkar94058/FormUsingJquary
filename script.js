$("#submitBtn").click(function (e) {
  e.preventDefault();
});
let data_array = [];
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
// console.log(StatesCities.states);

state.forEach(
  (op) => (myStateList.innerHTML += `<option value="${op}">${op}</option>`)
);
StatesCities.city.forEach(
  (op) =>
    (myStateList.innerHTML += `
  <option value="${op}">${op}</option>`)
);

function getState() {
  let selectedState = $("#myStateList").find(":selected").val();
  // console.log(selectedState);

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

function submitData() {
  let my_obj = {
    firstName: $("#firstName").val(),
    lastName: $("#lastName").val(),
    dateOfBirth: $("#date").val(),
    address: $("#address").val(),
    state: $("#myStateList").find(":selected").val(),
    city: $("#myCityList").find(":selected").val(),
    gender: $(`input[type="radio"][name=gender]:checked`).val(),
  };
  data_array.push(my_obj);
  console.log(data_array);
  displayData(data_array);
}
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
  // close submitdata onclick event

  $("#submitBtn").prop("onclick", null);
  $("#submitBtn").attr("id", "updateData");
  $("#updateData").text("Update ");
  let editAttribute = this.getAttribute("data-test");
  console.log(" edit attribute :  ", editAttribute);
  const updateData = data_array[editAttribute];
  console.log("update data :", updateData);

  console.log("i am calling editData fun");

  editData(updateData, editAttribute);
  console.log("i am end editFun fun");
  // $("#submitBtn").addEventListener("click", submitData);
  // $("#submitBtn").prop("onclick", "submitData()");
  $("#updateData").prop("onclick", null);
});

function editData(setInput, editAttribute) {
  console.log("i am calling setInput fun");

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
  console.log(UpdatedForm);
  $("#updateData")
    .button()
    .click(function () {
      // let editAttribute = this.getAttribute("data-test");
      // $("#submitBtn").off("click");
      let my_UpdatedObj = {
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
        dateOfBirth: $("#date").val(),
        address: $("#address").val(),
        state: $("#myStateList").find(":selected").val(),
        city: $("#myCityList").find(":selected").val(),
        gender: $(`input[type="radio"][name=gender]:checked`).val(),
      };
      console.log("got it");
      console.log("index of edit  :", editAttribute);
      console.log("updated form value > > ", my_UpdatedObj);
      data_array[editAttribute] = my_UpdatedObj;

      $("#updateData").attr("id", "submitBtn");
      $("#submitBtn").text("Submit ");
      // $("#submitBtn").on("click", submitData());
      $("#updateData").prop("onclick", null);

      displayData(data_array);
    });
}
