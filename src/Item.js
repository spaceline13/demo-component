import React from "react";

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.items.map(item=>item.description),
            title: this.props.items.map(item=>item.title),
            buttonLabel: this.props.items.map(item=>item.buttonLabel),
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
                    <h2 style={{marginTop:'2px'}}>{this.state.title[item]}</h2>
                    <p style={{marginTop:0}}>
                        {this.state.content[item]}
                        {!this.props.noButtons  && (<div>
                            <button style={{
                                marginTop: '18px',
                                display: 'inline',
                                top: '0',
                                position: 'relative',
                            }}>{this.state.buttonLabel[item]}
                            </button>
                        </div>)}
                    </p>
                </div>
            );
        } else {
            return (
                <div className={className} id={id}  style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{width:'50%', display:'flex', flexDirection:'column', alignSelf: 'center'}}>
                        <h2 style={{marginTop:'2px'}}>{this.state.title[item]}</h2>
                        <p style={{marginTop:0, padding:'10px'}}>
                            {this.state.content[item]}
                            {!this.props.noButtons && (<div>
                                <button style={{
                                    marginTop: '18px',
                                    display: 'inline',
                                    top: '0',
                                    position: 'relative',
                                }}>{this.state.buttonLabel[item]}
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

export default Item