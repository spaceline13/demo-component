import React from 'react'
import * as FEAAS from "@sitecore-feaas/clientside/react"
import {fetchData} from "./fetchData";
import Item from "./Item";

class Slider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      active: 1,
      direction: ''
    }
    this.moveRight = this.moveRight.bind(this)
    this.moveLeft = this.moveLeft.bind(this);
  }

  componentDidMount() {
    fetchData().then(res=>this.setState(res))
  }

  generateItems() {
    var items = [];
    var level;
    for (var i = this.state.active -1; i < this.state.active + 2; i++) {
      var index = i;

      if (i < 0) {
        index = this.state.items.length + i;
      } else if (i >= this.state.items.length) {
        index = i % this.state.items.length;
      }

      level = -(this.state.active - i);

      items.push(<Item key={index} id={index} level={level} items={this.state.items} variant={this.props.variant} noButtons={this.props.noButtons} />);

    }
    return items;
  }

  moveLeft(){
    var index = this.state.active;
    index < 1 ? index = this.state.items.length - 1 : index--;
    this.setState({
      active:index,
      direction: 'left'
    });
  }

  moveRight(){
    var index = this.state.active;
    index >= 3 ? index = 0 : index++;
    this.setState({
      active:index,
      direction: 'right'
    });
  }

  render(){
    const index = this.state.active;
    const level = index - 1;
    if (!this.state.items.length) return (<div>loading</div>)
    return (
        <div id="container">
          {this.generateItems()}
          <button id="left" style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '50%',
            padding: '0px 5px',
            position: 'absolute',
            top: '225px'
          }} onClick={this.moveLeft}>
            <div style={{
              fontSize: '18px',
              padding: '5px 6px 3px 3px'
            }}>
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
            </div>
          </button>
          <button id="right" style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '50%',
            padding: '0px 5px',
            position: 'absolute',
            top: '225px'
          }} onClick={this.moveRight}>
            <div style={{
              fontSize: '18px',
              padding: '5px 4px 3px 6px'
            }}>
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </div>
          </button>
        </div>
    );
  }
}

const schema = {
  title: 'Slider',
  description: 'Edit slider options:',
  type: 'object',
  required: [],
  properties: {
    noButtons: {
      title: 'Hide button',
      type: 'boolean',
      default: false,
    },
    variant: {
      title: 'Layout variant',
      type: 'string',
      default: 'primary',
      oneOf: [
        {
          const: 'primary',
          title: 'Primary'
        },
        {
          const: 'secondary',
          title: 'Secondary'
        }
      ]
    }
  }
}
FEAAS.External.registerComponent(Slider, schema)

export default Slider
