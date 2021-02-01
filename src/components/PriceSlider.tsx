import React, { useState, useEffect } from "react";
//import logo from './logo.svg';
import "./PriceSlider.css";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";

const Range = Slider.Range;

//const style = { width: '100%', padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' };
type PriceRange = {
  myMin: number;
  myMax: number;
};

type PriceSliderProps = {
  addPrice: (priceRange: PriceRange) => void;
  min: number;
  max: number;
};

const PriceSlider = (props: PriceSliderProps) => {
  const [priceRange, setPriceRange] = useState<PriceRange>();
  const [loaded, setLoaded] = useState(false);
  const [steps, setSteps] = useState({});

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
    addPrice({ myMin: priceRange.myMin, myMax: priceRange.myMax });
  });

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
};
// class PriceSlider extends Component {
// constructor(props) {
//     super(props);
//     this.state = {
//         isLoggedIn: false,
//         priceRange: {
//             myMin: this.min,
//             myMax: this.max
//         },
//         loaded: false
//     }
// }
// onSliderChange = (value) => {
//     this.addPrice({ myMin: value[0], myMax: value[1] })
//     this.setState({ priceRange: {myMin: value[0], myMax: value[1] }})
// }
// updateLoadState = () => {
//     this.setState({loaded: true})
//   }
// getSteps = () => {
//     let callback = (object) =>{
//         this.setState({ marks: object, priceRange: {myMin: this.min, myMax: this.max}}
//         ,this.updateLoadState)
//     }
//     let total = this.max - this.min;
//     let portion = total / 10;
//     let object = {}
//     let min = this.min;
//     object[min] = ''
//     for (let i = 0; i < 10; i++) {
//         min += portion;
//         object[min] = '';
//     }
//     callback(object)
// }
// async componentDidMount() {
//     await this.getSteps();
//     this.addPrice({priceRange: {myMin: this.state.myMin, myMax: this.state.myMax}});
// }
// render() {
//   const labelStyle = {
//     display: "block",
//     margin: "0 0 .28571429rem 0",
//     color: "rgba(0,0,0,.87)",
//     fontSize: " .92857143em",
//     fontWeight: "700",
//     textTransform: "none",
//   };
//   return (
//     <div
//       style={{
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-around",
//         alignItems: "center",
//       }}
//     >
//       {this.state.loaded ? (
//         <div>
//           <label style={labelStyle}>Price range</label>
//           <div
//             style={{
//               marginTop: "10px",
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "space-around",
//               alignItems: "center",
//             }}
//           >
//             {this.state.priceRange.myMin}
//             <Range
//               marks={this.state.marks}
//               allowCross={false}
//               step={1}
//               min={this.min}
//               max={this.max}
//               defaultValue={[this.min, this.max]}
//               style={{
//                 minWidth: "300px",
//                 width: "auto",
//                 marginLeft: 20,
//                 marginRight: 20,
//               }}
//               onChange={this.onSliderChange}
//               trackStyle={[
//                 { backgroundColor: "white" },
//                 { backgroundColor: "white" },
//               ]}
//               handleStyle={[
//                 { backgroundColor: "#99ff99" },
//                 { backgroundColor: "#ffcc00" },
//               ]}
//               railStyle={{ backgroundColor: "gray" }}
//             />
//             {this.state.priceRange.myMax}
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// }
// }

export default PriceSlider;
