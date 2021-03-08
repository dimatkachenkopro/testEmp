import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import axios from "axios";
import Counter from "./Counter";
import debounce from "lodash.debounce";
import { checkRequest } from "../../utils/utils";

const App = () => {
  const [state, setState] = useState([]);
  const [total, setTotal] = useState(0);

  const verify = useCallback(
    debounce((pid, value, updateStateToMin) => {
      checkRequest(pid, value, updateStateToMin);
    }, 600),
    [checkRequest]
  );

  const updateState = (value, index, pid, min) => {
    let newState = [...state];
    newState[index]["count"] = value;
    setState(newState);
    verify(pid, value, () => updateStateToMin(index, min));
  };

  const updateStateToMin = (index, min) => {
    let newState = [...state];
    newState[index]["count"] = min;
    setState(newState);
  };

  useEffect(() => {
    axios.get(`http://localhost:3030/api/cart`).then(function (response) {
      setState(response.data);
    });
  }, []);

  useEffect(() => {
    let temp = 0;
    state.map(item => {
      temp += Number(item.price) * (item.count ? item.count : 1);
    });
    setTotal(temp);
  }, [state]);

  return (
    <div className="container">
      <h3>Lista produktów</h3>
      <ul>
        {state &&
          state.map((item, index) => {
            return (
              <li className="row" key={index}>
                {item.name}, cena: {item.price}zł
                {
                  <Counter
                    min={item.min}
                    max={item.max}
                    isBlocked={item.isBlocked}
                    updateState={updateState}
                    index={index}
                    count={item.count}
                    pid={item.pid}
                  />
                }
              </li>
            );
          })}
      </ul>
      <h4>Sumy zamówienia: {total.toFixed(2)}zł</h4>
    </div>
  );
};

export { App };
