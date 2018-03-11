import React, {Component} from 'react'

import Hammer from 'react-hammerjs';

import sizeMe from 'react-sizeme';
import {scale, translate, transform, toCSS} from 'transformation-matrix';

import Floor from './Floor';

function clampScale(value, min, max) {
  return Math.min(Math.max(min, value), max);
}

function clampPan(value, range) {
  let clampedValue = value;
  if (range > 0) {
    clampedValue = Math.min(Math.max(0 - range, value), 0);
  } else
    clampedValue = Math.abs(range / 2)
  return clampedValue;
}

function getTransformation({x, y, elementScale}) {
  return toCSS(transform(translate(x, y), scale(elementScale, elementScale)));
}

function floorCompare(a, b) {
  if (a['title'] < b['title'])
    return -1;
  if (a['title'] > b['title'])
    return 1;
  return 0;
}

function getMinScale({
  height: mapHeight,
  width: mapWidth
}, {
  height: containerHeight,
  width: containerWidth
}) {
  return (mapHeight < mapWidth)
    ? containerWidth / mapWidth
    : containerHeight / mapHeight;
}

function fitToContainer(mapSize, containerSize) {
  let scaleValue = getMinScale(mapSize, containerSize);
  let {height: mapHeight, width: mapWidth} = mapSize;
  let {height: containerHeight, width: containerWidth} = containerSize;
  let x = (containerWidth - mapWidth * scaleValue) / 2;
  let y = (containerHeight - mapHeight * scaleValue) / 2;
  return {elementX: x, elementY: y, elementScale: scaleValue};
}

class InteractiveSvg extends Component {

  constructor(props) {
    super(props);

    let dimensions = this.props.data[0]['@attributes']['viewBox'].split(' ');
    let mapSize = {
      height: (Number)(dimensions[3]),
      width: (Number)(dimensions[2])
    };
    let containerSize = this.props.size;
    let {elementX, elementY, elementScale} = fitToContainer(mapSize, containerSize);
    let minScale = getMinScale(mapSize, containerSize);
    this.state = {
      resistance: 0.95,
      floors: this.props.data,
      mapSize: mapSize,
      containerSize: containerSize,
      elementScale: elementScale,
      currentScale: elementScale,
      minScale: minScale,
      maxScale: 4,
      rangeX: 0,
      rangeY: 0,
      elementX: elementX,
      elementY: elementY,
      currentX: 0,
      currentY: 0,
      pan: false,
      pinch: false
    };
    this.handlePan = this.handlePan.bind(this);
    this.handlePanStart = this.handlePanStart.bind(this);
    this.handlePanEnd = this.handlePanEnd.bind(this);
    this.handlePanCancel = this.handlePanCancel.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.handlePinchStart = this.handlePinchStart.bind(this);
    this.handlePinchEnd = this.handlePinchEnd.bind(this);
    this.handlePinch = this.handlePinch.bind(this);
  }

  componentDidMount() {
    this.updateRange();
  }

  updateRange() {
    let {height: mapHeight, width: mapWidth} = this.state.mapSize;
    let {height: containerHeight, width: containerWidth} = this.state.containerSize;
    let elementScale = this.state.elementScale;
    let rangeX = mapWidth * elementScale - containerWidth;
    let rangeY = mapHeight * elementScale - containerHeight;
    this.setState({rangeX, rangeY});
  }

  moveTo({elementX, elementY}) {
    let {rangeX, rangeY} = this.state;
    this.setState({
      elementX: clampPan(elementX, rangeX),
      elementY: clampPan(elementY, rangeY)
    });
  }

  braking(velocityX, velocityY, resistance) {
    // console.log({velocityX,velocityY});
    let factor = 15;
    let {elementX, elementY} = this.state;
    if (!(this.state.pan)) {
      this.moveTo({
        elementX: this.state.elementX + velocityX * factor,
        elementY: this.state.elementY + velocityY * factor
      })
      // console.log({velocity:velocity,resistance:resistance});
      if ((Math.abs(velocityX * resistance * factor) > 0.5) && (Math.abs(velocityY * resistance * factor) > 0.5)) {
        setTimeout(() => {
          this.braking(velocityX * resistance, velocityY * resistance, resistance)
        }, 10);
      }
    }
  }

  handlePan(ev) {
    ev.preventDefault();
    let {elementX, elementY, rangeX, rangeY} = this.state;
    this.setState({
      currentX: clampPan(elementX + ev.deltaX, rangeX),
      currentY: clampPan(elementY + ev.deltaY, rangeY)
    });
  }

  handlePanStart(ev) {
    ev.preventDefault();
    this.setState({pan: true})
  }

  handlePanEnd(ev) {
    ev.preventDefault();
    let {currentX, currentY} = this.state;
    this.setState({pan: false, elementX: currentX, elementY: currentY});

    this.braking(ev.velocityX, ev.velocityY, this.state.resistance);
  }

  handlePanCancel(ev) {
    ev.preventDefault();
    let {currentX, currentY} = this.state;
    this.setState({pan: false, elementX: currentX, elementY: currentY});
  }

  handleWheel(ev) {
    ev.preventDefault();
    let deltaY = ev.deltaY;
    let {
      elementScale,
      minScale,
      maxScale,
      elementX,
      elementY,
      rangeX,
      rangeY,
      mapSize
    } = this.state;
    let centerPoint = {
      x: elementX + mapSize.width * elementScale / 2,
      y: elementY + mapSize.height * elementScale / 2
    }
    elementScale = clampScale(elementScale + deltaY / 100, minScale, maxScale);
    let currentX = centerPoint.x - mapSize.width * elementScale / 2;
    let currentY = centerPoint.y - mapSize.height * elementScale / 2;
    this.setState({elementScale: elementScale});
    this.updateRange();
    this.setState({
      elementX: clampPan(currentX, rangeX),
      elementY: clampPan(currentY, rangeY)
    });
  }

  handlePinchStart(ev) {
    console.log(ev.type);
    this.setState({pinch:true});
  }

  handlePinchEnd(ev) {
    console.log(ev.type);
    let {currentScale,minScale,maxScale} = this.state;

    this.setState({elementScale:clampScale(currentScale,minScale,maxScale)});
    this.updateRange();
  }

  handlePinch(ev) {
    ev.preventDefault();

    let {elementScale,minScale,maxScale} = this.state;
    let currentScale = ev.scale*elementScale;
    this.setState({currentScale:clampScale(currentScale,minScale,maxScale)});


  }

  render() {
    var options = {
      touchAction: 'compute',
      recognizers: {
        tap: {
          time: 600,
          threshold: 100
        },
        pinch: {
          enable: true
        }
      }
    };

    let {mapSize, containerSize} = this.state;
    let {elementX, elementY, currentX, currentY, elementScale,currentScale} = this.state;
    let floors = this.state.floors;

    floors.sort(floorCompare);
    return (<div style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}>
      <Hammer options={options}
        onWheel={this.handleWheel}
        onPanStart={this.handlePanStart}
        onPanEnd={this.handlePanEnd}
        onPanCancel={this.handlePanCancel}
        onPan={this.handlePan}
        onPinchStart={this.handlePinchStart}
        onPinchEnd={this.handlePinchEnd}
        onPinch={this.handlePinch}
        >
        <div>
          <svg id='interactiveSvg' height={mapSize.height} width={mapSize.width} viewBox={'0 0 3500 1400'} preserveAspectRatio='xMidYMid meet'>
            <rect fill={'#fff'} x={0} y={0} height={containerSize.height} width={containerSize.width}/>
            <g className='controlGroup' transform={getTransformation({
                x: (!(this.state.pan))
                  ? elementX
                  : currentX,
                y: (!(this.state.pan))
                  ? elementY
                  : currentY,
                elementScale: (this.state.pinch)?currentScale:elementScale
              })}>
              <rect fill={'#ccc'} x={0} y={0} height={mapSize.height} width={mapSize.width}/> {
                floors.map((floor, index) => {
                  return <Floor key={floor['title']} index={index} data={floor['g']}/>;
                })
              }
            </g>
          </svg>
        </div>
      </Hammer>
    </div>);
  }
}

const config = {
  monitorHeight: true,
  monitorWidth: true
};
const sizeMeHOC = sizeMe(config);

export default sizeMeHOC(InteractiveSvg);
