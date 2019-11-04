import React from 'react';
import Elevator from './Elevator';
import Button from './Button';
import { AST_True } from 'terser';


export default class ElevatorContainer extends React.Component {
    state = {
      buttons: 5,
      clickedButtons: [],
      prevTop: 0,
      top: 0,
      difference: 0,
      open: false,
      isMoving: false
    }
  
    addClickedButton = (x) => {
      var clickedButtons = this.state.clickedButtons
      clickedButtons.push(x)
      this.setState({
           clickedButtons,
           isMoving: true 
      }, ()=>{
        if (this.state.clickedButtons.length <= 1) {
            debugger
          var num = this.state.clickedButtons.length === 0
            ? 0
            : this.state.clickedButtons[0]
          this.setState({
            isMoving: true,
            difference: num > 0 ? num * 2000 : 2000,
            top: num * 50
          }, ()=>{
            setTimeout(()=>{
              this.openDoor()
              this.setState({
                isMoving: false
              })
            }, this.state.difference)
            this.removeButton(this.state.clickedButtons)
          })
        }
      })
    }

    onMouseEnter = () =>{
        if (!this.state.isMoving){
            debugger
        }
    }

    onMouseLeave = () =>{
        // if (this.state.moving){
        //     debugger
        // }
    }
    
    openDoor = () =>{
      this.setState({
        isMoving: false,
        open: true
      },()=>{
        setTimeout(()=>{
          this.setState({
             open: false
          })
        }, 3000)
      })
    }
    
   removeButton = (clickedButtons) => {
     setTimeout(()=>{
       this.openDoor()
     }, this.state.difference)
     setTimeout(()=>{
        this.setState({
         isMoving: true
        })
       clickedButtons.shift();
       this.setState({
         prevTop: this.state.top,
         clickedButtons, 
         difference: this.calcDifference().difference,
         top: this.calcDifference().num * 50
       }, ()=>{
         if (this.state.clickedButtons.length > 0){
           this.removeButton(this.state.clickedButtons)
         } else {
           this.setState({
             prevTop: this.state.top
           }, ()=>{
             this.setState({
                top: 0,
                moving: true
              })
           })
         }
       })
     }, this.state.difference + 5000)
   };
    
    calcDifference = () =>{
      var num = this.state.clickedButtons.length === 0
            ? this.state.top/50
            : this.state.clickedButtons[0]
     
      var difference = num > 0 ? num * 2000 : 2000
      return {difference, num}
    }
  
   render() {
     
     // GROUND FLOOR
     var buttons = [<Button index={-1}
                      backgroundColor={backgroundColor}
                      addClickedButton={this.addClickedButton}
                      />]
     
     //REVERSE BUTTONS ARRAY IN DESCENDING ORDER, 
     //START WITH GROUND FLOOR
     var cheese = [-1]
     
     for (var i = 0; i < this.state.buttons; i++){
       var backgroundColor = this.state.clickedButtons.includes(i + 1) ? 'yellow' : 'white'
       buttons.push(<Button index={i}
                      backgroundColor={backgroundColor}
                      addClickedButton={this.addClickedButton}
                      />)
       cheese.push(i)
     };
  
      cheese.sort((a, b)=>{return b - a})

      buttons.reverse()
      
     var floors = cheese.map((x, i)=>{
       return <div style={{height: 50, display: 'flex', alignItems: 'center', marginLeft: 40}}>{x === -1 ? 'L' : x + 2}</div>
     })
     
      return (
        <div className="elevatorContainerOuter">
        <div className="buttonContainer">{buttons}</div>
        
          <div className="elevatorContainer" style={{height: (this.state.buttons * 50) + 50}}>
          <Elevator top={this.state.top} duration={this.state.difference} open={this.state.open}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
            />
            {floors}
          </div>
        </div>
      );
    }
  }; 