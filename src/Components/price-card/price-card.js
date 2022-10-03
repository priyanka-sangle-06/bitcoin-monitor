import React from "react";
import {
  ArrowDropDown,
  ArrowDropUp,
  AttachMoneyRounded,
  CurrencyPoundRounded,
  EuroRounded,
} from "@mui/icons-material";
import styles from "./price-card.module.scss";

function PriceCard(props) {
  const { data, length, index } = props;
  const {
    bpi: {
      USD: { rate: USDRate = "" },
      GBP: { rate: GBPRate = "" },
      EUR: { rate: EURRate = "" },
    },
    isIncreased,
  } = data;

  return (
    <div className={styles.card}>
      <div className={styles.priceContainer}>
        <div className={styles.price}>
          <AttachMoneyRounded
            className={styles.price_icon}
            sx={{ fontSize: { xs: 12, sm: 16 } }}
          />
          {USDRate}
        </div>
        <div className={styles.price}>
          <CurrencyPoundRounded
            className={styles.price_icon}
            sx={{ fontSize: { xs: 12, sm: 16 } }}
          />
          {GBPRate}
        </div>
        <div className={styles.price}>
          <EuroRounded
            className={styles.price_icon}
            sx={{ fontSize: { xs: 12, sm: 16 } }}
          />
          {EURRate}
        </div>
      </div>
      {!(index === length - 1) ? (
        <div className={styles.arrow_icon}>
          {isIncreased ? (
            <ArrowDropUp className={styles.riseIcon} />
          ) : (
            <ArrowDropDown className={styles.fallIcon} />
          )}
        </div>
      ) : (
        <div className={styles.arrow_icon} />
      )}
    </div>
  );
}

export default PriceCard;
