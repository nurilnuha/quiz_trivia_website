//to deal w api in this file
import axios from "axios";
// change API here

var baseURL = "https://opentdb.com/api.php?amount=10";

export default axios.create({
  baseURL,
});
