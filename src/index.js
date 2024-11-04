import { useState } from 'react';
import ReactDOM from 'react-dom/client';

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
    var points=parseFloat(inputs.runmiles)*100;
    points = points + parseFloat(inputs.runkm)*100*5/8;

    points +=parseFloat(inputs.walkmiles)*100;
    points +=parseFloat(inputs.walkkm)*100*5/8;
    points +=parseFloat(inputs.cyclemiles)*30;
    points +=parseFloat(inputs.cyclekm)*30*5/8;
    points +=parseInt(inputs.activitymins)*3;
    //remove double counted steps later.
    const landmiles=parseFloat(inputs.runmiles)+parseFloat(inputs.walkmiles)+(parseFloat(inputs.runkm)+parseFloat(inputs.walkkm))*5/8;
    var calcSteps = inputs.steps;
    if ((parseInt(inputs.steps)>0 && landmiles >0 && landmiles*2000<=inputs.steps)) {
      calcSteps -= landmiles*2000;
    }
    points +=calcSteps*5/100;
    return points;
  }

  const points=calcPoints(inputs);
  const overspill= points >1500 ?points-1500 :0;
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }


  const handleSubmit = e => {
    e.preventDefault();
      console.log("Submitted the wellable form. No one is listening");

      alert("daily wellables:"+points+", overspill:"+overspill);
  };

  return (
    <div className="container">
    <h2>Simple wellable calculator. Input your activity, see the wellable points.</h2>
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
        type="text"
        name="runkm"
        value={inputs.runkm || ""}
        onChange={handleChange}
      />
      </label>
      </p>
      <p><label>Number of miles walked:
      <input
        type="text"
        name="walkmiles"
        value={inputs.walkmiles || ""}
        onChange={handleChange}
      />
      </label></p>
      <p><label>Number of km walked:
      <input
        type="text"
        name="walkkm"
        value={inputs.walkkm || ""}
      />
      </label>
      </p>
      <p><label>Number of miles cycled:
      <input
        type="text"
        name="cyclemiles"
        value={inputs.cyclemiles || ""}
        onChange={handleChange}
      />
      </label></p>
      <p><label>Number of km cycled:
      <input
        type="text"
        name="cyclekm"
        value={inputs.cyclekm || ""}
        onChange={handleChange}
      />
      </label>
      </p><p><label>Duration of other activity (mins):
      <input
        type="text"
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
    <p>
    Wellable points: {JSON.stringify(points)}, points over 1500: {JSON.stringify(overspill)} <br />
      </p>
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyForm />);
