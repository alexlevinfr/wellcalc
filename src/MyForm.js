import React, { useState, useCallback } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Modal } from './Modal';


export default MyForm

function MyForm() {
  const [inputs, setInputs] = useState({
                                          runkm:'0.0',
                                          runmiles:'0.0',
                                          walkkm:'0.0',
                                          walkmiles:'0.0',
                                          cyclekm:'0.0',
                                          cyclemiles:'0.0',
                                          activitymins:'0',
                                          steps:'0'
                                        });


  function calcPoints(inputs) {
    var landmiles=parseFloat(inputs.runmiles);
    landmiles +=parseFloat(inputs.runkm)*5/8;
    landmiles +=parseFloat(inputs.walkmiles);
    landmiles +=parseFloat(inputs.walkkm)*5/8;
    var points =parseFloat(inputs.cyclemiles)*30;
    points +=parseFloat(inputs.cyclekm)*30*5/8;
    points +=parseInt(inputs.activitymins)*5;
    
    var calcSteps = parseInt(inputs.steps);
    var landSteps = landmiles*2000;
    if (landSteps>calcSteps) {
      calcSteps = landSteps;
    }
    points +=calcSteps*5/100;
    return points;
  }

  const points=Math.floor(calcPoints(inputs));
  const overspill= points >1500 ?points-1500 :0;
  const landsteps = Math.floor((parseFloat(inputs.runmiles)+parseFloat(inputs.walkmiles)+((parseFloat(inputs.runkm)+parseFloat(inputs.walkkm))*5/8))*2000);
  

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  



  const handleSubmit = e => {
    e.preventDefault();
      console.log("Submitted the wellable form. No one is listening");
      alert("daily wellables:"+points+", overspill:"+overspill, JSON.stringify(Modal.activeJsons));
  };

  const [activeJsons, setActiveJsons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  /*const [activities, setActivities] = useState({
          date:new Date().toJSON().slice(0, 10),
          type:'Walking (Steps)',
          unit:'steps',
          quantity:0.0,
        });*/

  // called from the modal on submit
  const addActivityToLog = useCallback((activities) => {
        setActiveJsons(prevArray => [
          ...prevArray, activities
        ]);
        if(activities.type === 'Walking (Steps)') {
          setInputs(values => ({...values, steps: parseInt(values.steps) + parseInt(activities.quantity)}))
        } else if (activities.type === 'Running (Distance)' && activities.unit === 'miles') {
          setInputs(values => ({...values, runmiles: parseFloat(values.runmiles) + parseFloat(activities.quantity)}))
        }  else if (activities.type === 'Running (Distance)' && activities.unit === 'km') {
          setInputs(values => ({...values, runkm: parseFloat(values.runkm) + parseFloat(activities.quantity)}))
        }  else if (activities.type === 'Walking (Distance)' && activities.unit === 'miles') {
          setInputs(values => ({...values, walkmiles: parseFloat(values.walkmiles) + parseFloat(activities.quantity)}))
        }  else if (activities.type === 'Walking (Distance)' && activities.unit === 'km') {
          setInputs(values => ({...values, walkkm: parseFloat(values.walkkm) + parseFloat(activities.quantity)}))
        }  else if (activities.type === 'Cycling (Distance)' && activities.unit === 'miles') {
          setInputs(values => ({...values, cyclemiles: parseFloat(values.cyclemiles) + parseFloat(activities.quantity)}))
        }  else if (activities.type === 'Cycling (Distance)' && activities.unit === 'km') {
          setInputs(values => ({...values, cyclekm: parseFloat(values.cyclekm) + parseFloat(activities.quantity)}))
        }  else if (activities.unit === 'time') {
          setInputs(values => ({...values, activitymins: parseInt(values.activitymins) + parseInt(activities.quantity)}))
        }
        console.log(JSON.stringify(activeJsons));
        setIsModalOpen(false)
  }, [activeJsons]);
  
  


  return (
    <div className="container">
    <h2>Simple wellable calculator v0.4.4. Input your activity, see the wellable points.</h2>
    <form onSubmit={handleSubmit}>
      <p>
      <label>Number of miles run:
      <input
        type="number"
        name="runmiles"
        value={inputs.runmiles || ""}
        onChange={handleChange}
      />
      </label></p>
      <p><label>Number of km run:
      <input
        type="number"
        name="runkm"
        value={inputs.runkm || ""}
        onChange={handleChange}
      />
      </label>
      </p>
      <p><label>Number of miles walked:
      <input
        type="number"
        name="walkmiles"
        value={inputs.walkmiles || ""}
        onChange={handleChange}
      />
      </label></p>
      <p><label>Number of km walked:
      <input
        type="number"
        name="walkkm"
        value={inputs.walkkm || ""}
        onChange={handleChange}
      />
      </label>
      </p>
      <p><label>Number of miles cycled:
      <input
        type="number"
        name="cyclemiles"
        value={inputs.cyclemiles || ""}
        onChange={handleChange}
      />
      </label></p>
      <p><label>Number of km cycled:
      <input
        type="number"
        name="cyclekm"
        value={inputs.cyclekm || ""}
        onChange={handleChange}
      />
      </label>
      </p><p><label>Duration of other activity (mins):
      <input
        type="number"
        name="activitymins"
        value={inputs.activitymins || ""}
        onChange={handleChange}
      />
      </label></p>
      <p><label>steps:
      <input
        type="number"
        name="steps"
        value={inputs.steps || ""}
        onChange={handleChange}
      />
      </label>
      </p>
        <input type="submit"/>
    </form>
    <p className="results">
    Wellable points: {JSON.stringify(points)}<br />points over 1500: {JSON.stringify(overspill)}
    <br />landsteps: {JSON.stringify(landsteps)}
      </p>
    <button onClick={() =>setIsModalOpen(true)}> Click to open modal </button>

    <Popup open={isModalOpen} onClose={() =>setIsModalOpen(false)}modal>
      <Modal onSubmit={addActivityToLog} onClose={() => setIsModalOpen(false)}
      />
    </Popup>

    Activity log
    <p />

    {JSON.stringify(activeJsons)}
    </div>
  )
}

