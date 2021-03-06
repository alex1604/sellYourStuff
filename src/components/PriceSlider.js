import React, { Component } from 'react'
//import logo from './logo.svg';
import './PriceSlider.css';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

const Range = Slider.Range;

//const style = { width: '100%', padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' };

class PriceSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            priceRange: {
                myMin: this.props.min,
                myMax: this.props.max
            },
            loaded: false
        }
    }
    onSliderChange = (value) => {
        this.props.addPrice({ myMin: value[0], myMax: value[1] })
        this.setState({ priceRange: {myMin: value[0], myMax: value[1] }})
    }
    updateLoadState = () => {
        this.setState({loaded: true})
      }
    getSpots = () => {
        let callback = (object) =>{
            this.setState({ marks: object, priceRange: {myMin: this.props.min, myMax: this.props.max}}
            ,this.updateLoadState)
        }
        let total = this.props.max - this.props.min;
        let portion = total / 10;
        let object = {}
        let min = this.props.min;
        object[min] = ''
        for (let i = 0; i < 10; i++) {
            min += portion;
            object[min] = '';
        }
        callback(object)
    }
    async componentDidMount() { 
        await this.getSpots();
        this.props.addPrice({priceRange: {myMin: this.state.myMin, myMax: this.state.myMax}});
    }
    render() {
        const labelStyle = {
            display: 'block',
            margin: '0 0 .28571429rem 0',
            color: 'rgba(0,0,0,.87)',
            fontSize: ' .92857143em',
            fontWeight: '700',
            textTransform: 'none',
          }
        return (
            <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
                {this.state.loaded ? (
                <div>
                <label style={labelStyle}>
                    Price range
                </label>
                <div style={{marginTop: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                {this.state.priceRange.myMin}
                <Range marks={this.state.marks} allowCross={false} step={1} min={this.props.min} max={this.props.max}
                defaultValue={[this.props.min, this.props.max]} style={{minWidth:'300px', width: 'auto', marginLeft: 20, marginRight: 20}}
                onChange={this.onSliderChange} trackStyle={[{ backgroundColor: 'white' }, { backgroundColor: 'white' }]}
                handleStyle={[{ backgroundColor: '#99ff99' }, { backgroundColor: '#ffcc00' }]}
                railStyle={{ backgroundColor: 'gray' }}/>
                {this.state.priceRange.myMax}</div>
            </div>) : null }
            </div>
        )

    }
}


export default PriceSlider