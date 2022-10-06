// import { render, screen } from "@testing-library/react";
// import App from "./App";
import { getCurrentPrice } from "./services/coindesk";

test("calls coindesk's current price api", () => {
  expect.assertions(3);
  return getCurrentPrice().then((data) => {
    expect(data).toHaveProperty("time");
    expect(data).toHaveProperty("bpi");
    expect(data).toHaveProperty("disclaimer");
  });
});
