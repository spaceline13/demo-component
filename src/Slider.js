import React from 'react'
import * as FEAAS from "@sitecore-feaas/clientside/react"
import {fetchData} from "./fetchData";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.items.map(item=>item.description),
      title: this.props.items.map(item=>item.title),
      image: this.props.items.map(item=>item.image1)
    }
  }
  render() {
    const className = 'item level' + this.props.level;
    const item = this.props.id;
    const id = "slide" + this.props.id.toString();

    if (this.props.variant !== 'secondary') {
      return (
          <div className={className} id={id} style={{
            color:'white',
            display:'flex', flexDirection:'column', justifyContent: 'center',
            backgroundSize: '100%',
            backgroundPosition: 'center',
            backgroundImage: `url("${this.state.image[item]?.results?.[0]?.fileUrl}")`
          }}>
            <h1 style={{marginTop:'2px', padding:'0px 50px', fontSize:'35px'}}>{this.state.title[item]}</h1>
            <p style={{marginTop:0, fontSize: '25px', fontWeight:400, padding:'0px 60px'}}>
              {this.state.content[item]}
              {this.props.noButtons !== 'true' && (<div>
                <button style={{
                  marginTop: '18px',
                  display: 'inline',
                  top: '0',
                  position: 'relative',
                  background: '#4A37D5',
                  borderRadius: '4px',
                  color: 'white',
                  padding: '12px',
                  fontSize: '14px'
                }}>Click me
                </button>
              </div>)}
            </p>
          </div>
      );
    } else {
      return (
          <div className={className} id={id}  style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{width:'50%', display:'flex', flexDirection:'column', alignSelf: 'center'}}>
              <h1 style={{marginTop:'2px', fontSize:'35px'}}>{this.state.title[item]}</h1>
              <p style={{marginTop:0, fontSize: '25px', fontWeight:400, padding:'10px'}}>
                {this.state.content[item]}
                {this.props.noButtons !== 'true'  && (<div>
                  <button style={{
                    marginTop: '18px',
                    display: 'inline',
                    top: '0',
                    position: 'relative',
                    background: '#4A37D5',
                    borderRadius: '4px',
                    color: 'white',
                    padding: '12px',
                    fontSize: '14px'
                  }}>Click me
                  </button>
                </div>)}
              </p>
            </div>
          <div style={{width:'50%',
            backgroundSize: '1000px',
            backgroundPosition: 'center',
            backgroundImage: `url("${this.state.image[item]?.results?.[0]?.fileUrl}")` }}>
          </div>
          </div>
      );
    }
  }
}

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
    console.log(this.state)
    const index = this.state.active;
    const level = index - 1;
    if (!this.state.items.length) return (<div>loading</div>)
    return (
        <div id="container">
          {this.generateItems()}
          <button id="left" style={{background: 'rgba(0, 0, 0, 0.3)', borderRadius: '50%', padding: '0px 5px'}} onClick={this.moveLeft}>
            <div style={{
              fontSize: '18px',
              padding: '5px 6px 3px 3px'
            }}>
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
            </div>
          </button>
          <button id="right" style={{background: 'rgba(0, 0, 0, 0.3)', borderRadius: '50%', padding: '0px 5px'}} onClick={this.moveRight}>
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
