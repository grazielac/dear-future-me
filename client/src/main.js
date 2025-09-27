// custom code for frontend
const form = document.getElementById("letterForm");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  // clear previous errors
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";

  // collects the user's input from html form and turn it into a js object
  const formData = new FormData(form); // pass 'form' element and collects all input values inside that form

  // get the values from each input form
  const name = form.name.value.trim(); //trim remove extra spaces start and end
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  // VALIDATION ERROR
  let error = false; // use later to stop the form submission

  // FORM VALIDATION
  // must not be empty!
  if (name === "") {
    nameError.textContent = "Name is required.";
    error = true;
  }
  if (email === "") {
    emailError.textContent = "Email is required.";
    error = true;
  }

  // MESSAGE CHECK: min 20 words, max 100 words
  const words = message.split(" ").filter((word) => word !== "");
  // splits the mssage string intro an array of words using space as seperator
  if (words.length < 5) {
    // counts how many words are in the array
    messageError.textContent = "Write at least 20 words."; // if user wrote less than 5
    error = true;
  } else if (words.length > 100) {
    // checks if the user wrote more than 100 words
    messageError.textContent = "Max 100 words allowed."; // if yes, show error message
    error = true; // stop submission
  }
  //
  if (error) return;

  const data = { name, email, message };

  // sends a POST request to my express server
  try {
    const res = await fetch("http://localhost:3000/letters", {
      method: "POST", // send new data
      headers: { "Content-Type": "application/json" }, // tells the server that the body of the request is json
      body: JSON.stringify(data), // converts js object 'data; to a json string
    });

    const result = await res.json();
    console.log(result);

    if (res.ok) {
      alert("Letter sent!");
      form.reset();
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (err) {
    console.error(err);
    alert("Error sending letter");
  }
});
