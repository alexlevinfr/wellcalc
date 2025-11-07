import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import 'reactjs-popup/dist/index.css';
import { Modal } from './Modal';




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


  return (
    <div className="container">
    <h2>Simple wellable calculator v0.4.1. Input your activity, see the wellable points.</h2>
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
    <p class="results">
    Wellable points: {JSON.stringify(points)}<br />points over 1500: {JSON.stringify(overspill)}
    <br />landsteps: {JSON.stringify(landsteps)}
      </p>
    <Modal />
    Activity log
    <p />
    {JSON.stringify(Modal.activeJsons)}
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyForm />);
