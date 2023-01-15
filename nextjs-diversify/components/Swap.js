import classes from "../styles/CoinData.module.css";
import { useRef, useState } from "react";

const Swap = (props) => {
  const inputRef = useRef();
  const [error, setError] = useState(false);
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const inputSwaploss = inputRef.current.value;
    console.log(inputSwaploss);
    props.onAddSwaploss(inputSwaploss);
    inputRef.current.value = "";
    if (inputSwaploss > 100 || inputSwaploss < 0) {
      setError(true);
      return;
    } else {
      setError(false);
    }
  };
  let max = [];
  if (props.data) {
    const priceData = props.data.map((data) => {
      return data.market_data.price_change_percentage_24h;
    });
    const maxPrice = Math.max(priceData[0], priceData[1], priceData[2]);
    max = props.data.filter(
      (data) => data.market_data.price_change_percentage_24h == maxPrice
    );
  }

  console.log(max);
  return (
    <div className={classes.swap}>
      <h1>Highest Rise</h1>
      <div className={classes.inputAndBtn}>
        <input
          type="text"
          disabled
          value={`${max[0].name} ${
            max[0].market_data.price_change_percentage_24h > 0 ? "up" : "down"
          } by ${max[0].market_data.price_change_percentage_24h.toFixed(2)} %`}
        ></input>

        <form onSubmit={formSubmitHandler} className={classes.form}>
          <div className={classes.inputFields}>
            <input ref={inputRef} type="number" placeholder="Amount to swap" />
            <button type="submit" className={classes.button}>
              Swap
            </button>
          </div>
          {error && <p style={{ color: "red" }}>Specify between 0 and 100</p>}
        </form>
      </div>
    </div>
  );
};
export default Swap;
