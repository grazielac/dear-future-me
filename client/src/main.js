// custom code for frontend

import { response } from "express";

fetch("http://localhost:3000/letters")
  .then((res) => res.json())
  .then((data) => console.log(data));


  