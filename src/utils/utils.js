import axios from "axios";

const checkRequest = (pid, value, updateStateToMin) => {
  axios
    .post(`http://localhost:3030/api/product/check`, {
      pid: pid,
      quantity: value
    })
    .then(function () {})
    .catch(function () {
      updateStateToMin();
    });
};

export { checkRequest };
