// custom code for frontend
const form = document.getElementById("letterForm");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  // collects the user's input from html form and turn it into a js object
  const formData = new FormData(form); // pass 'form' element and collects all input values inside that form
  const data = {
    // creates a plain js object and turn into json for sending to the server
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

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
      form.reset();
      alert("Letter sent!");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
});
