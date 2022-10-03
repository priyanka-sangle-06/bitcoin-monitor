import { useEffect, useState, useRef } from "react";
import uniqueId from "lodash.uniqueid";
import styles from "./App.module.scss";
import PriceCard from "./Components/price-card/price-card";
import { getCurrentPrice } from "./services/coindesk";

function App() {
  const [coinData, setCoinData] = useState([]);
  let timer = useRef();

  useEffect(() => {
    const fetchCurrentPrice = async () => {
      let currentData = await getCurrentPrice();

      if (currentData) {
        setCoinData((prevData) => {
          if (prevData.length) {
            const recent = prevData[0];
            let { bpi } = recent;
            currentData = {
              ...currentData,
              isIncreased: bpi.USD.rate <= currentData.bpi.USD.rate,
            };
          }

          currentData = {
            ...currentData,
            key: uniqueId(),
          };

          const newData = [currentData, ...prevData];
          if (newData.length > 15) {
            newData.pop();
          }
          return newData;
        });
      }
    };

    fetchCurrentPrice();
    timer.current = setInterval(() => {
      fetchCurrentPrice();
    }, 60000);

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, []);

  return (
    <div className={styles.App}>
      <div className={styles.title}>Bitcoin Price Monitor</div>
      <div className={styles.tableContainer}>
        {coinData.map((data, index) => (
          <PriceCard
            key={data.key}
            data={data}
            length={coinData.length}
            index={index}
          />
        ))}
      </div>
      {coinData.length && (
        <div className={styles.footer}>
          Disclaimer: {coinData[0].disclaimer}
        </div>
      )}
    </div>
  );
}

export default App;
