import React, { useState, useEffect } from "react";
import "./PriceSlider.css";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";

const labelStyle = {
  display: "block",
  margin: "0 0 .28571429rem 0",
  color: "rgba(0,0,0,.87)",
  "font-size": " .92857143em",
  "font-weight": "700",
  "text-transform": "none",
};

const wrapperStyle = {
  height: "100%",
  display: "flex",
  "flex-direction": "column",
  "justify-content": "space-around",
  "align-items": "center",
};

const Range = Slider.Range;

type PriceRange = {
  myMin: number;
  myMax: number;
};

type PriceSliderProps = {
  addPrice: (priceRange: PriceRange) => void;
  min: number;
  max: number;
};

export default function(props: PriceSliderProps) {
  const [priceRange, setPriceRange] = useState<PriceRange>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [steps, setSteps] = useState<{ [id: number]: string }>({});

  const { min, max, addPrice } = props;

  const onSliderChange = (value: number) => {
    addPrice({ myMin: value[0], myMax: value[1] });
    setPriceRange({ myMin: value[0], myMax: value[1] });
  };

  const getSteps = () => {
    let nextStep = min;
    const total = max - min;
    const portion = total / 10;
    for (let i = 0; i < 10; i++) {
      nextStep += portion;
      setSteps({ ...steps, [nextStep]: "" });
    }
    setPriceRange({ myMin: min, myMax: max });
    setLoaded(true);
  };

  useEffect(() => {
    getSteps();
    addPrice(priceRange);
  }, []);

  return (
    <div style={wrapperStyle}>
      {loaded ? (
        <div>
          <label style={labelStyle}>Price range</label>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {priceRange.myMin}
            <Range
              marks={steps}
              allowCross={false}
              step={1}
              min={min}
              max={max}
              defaultValue={[min, max]}
              style={{
                minWidth: "300px",
                width: "auto",
                marginLeft: 20,
                marginRight: 20,
              }}
              onChange={onSliderChange}
              trackStyle={[
                { backgroundColor: "white" },
                { backgroundColor: "white" },
              ]}
              handleStyle={[
                { backgroundColor: "#99ff99" },
                { backgroundColor: "#ffcc00" },
              ]}
              railStyle={{ backgroundColor: "gray" }}
            />
            {priceRange.myMax}
          </div>
        </div>
      ) : null}
    </div>
  );
}
