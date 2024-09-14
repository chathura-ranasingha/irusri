import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("onClick increment by 1", () => {
  render(<App />);
  const button = screen.getByText("Click");
  const countText = screen.getByText("Count: 0");
  fireEvent.click(button);
  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});

test("onClick increment by 2", () => {
  render(<App />);
  const button = screen.getByText("Click");
  const countText = screen.getByText("Counters: 0");
  fireEvent.mouseEnter(button);
  expect(screen.getByText("Counters: 2")).toBeInTheDocument();
});
