import { useState } from 'react';
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export function Modal() {
    /*const [selectedActivity, setSelectedActivity] = useState('Steps');
    const handleActivityChange = (event) => {
        setSelectedActivity(event.target.value);
      };*/

      const [activities, setActivities] = useState({
        runkm:'0.0',
        runmiles:'0.0',
        walkkm:'0.0',
        walkmiles:'0.0',
        cyclekm:'0.0',
        cyclemiles:'0.0',
        activitymins:'0',
        steps:'0',
        type:'Steps',
        unit:'miles'
      });

    const handleActivitiesChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name,value);
        setActivities(activities => ({...activities, [name]: value}))
    }


    const handleActivitiesSubmit = e => {
        var activityjson=JSON.stringify(activities);
        e.preventDefault();
          console.log("Submitted the activies form.",activityjson);

      }
      return (<Popup trigger = { <button> Click to open modal </button>}
                modal nested>
                    {close => (
                        <div className='modal'>
                            <div className='content'>
                                Record a new activity.
                                {<label>type<select value={activities.type} onChange={handleActivitiesChange} name="type">
                                <option value="Run">Run</option>
                                <option value="Walkd">Walk distance</option>
                                <option value="Steps">Walk steps</option>
                                <option value="Cycle">Cycle distance</option>
                                <option value="Activitymins">Activity minutes</option>
                                </select></label>
                                }
                                {
                                <label>unit<select value={activities.unit} onChange={handleActivitiesChange} name="unit">
                                <option value="miles">Miles</option>
                                <option value="km">Kms</option>
                                </select></label>}
                                {<form onSubmit={handleActivitiesSubmit}>
                                {activities.type === "Steps" ? 
                                <label>number of steps:<input type="number" name="steps" value={activities.steps} onChange={handleActivitiesChange} />
                                </label> : null}
                                {activities.type === "Run" ? 
                                <label>Run:<input type="number" name={activities.unit==="miles"? "runmiles": "runkm"} value={activities.unit==="miles" ? activities.runmiles : activities.runkm} onChange={handleActivitiesChange} />
                                </label> : null}
                                {activities.type === "Walkd" ? 
                                <label>Walk distance:<input type="number" name={activities.unit==="miles"? "walkmiles": "walkkm"} value={activities.unit === "miles" ? activities.walkmiles : activities.walkkm} onChange={handleActivitiesChange} />
                                </label> : null}
                                {activities.type === "Cycle"  ? 
                                <label>Cycle distance:<input type="number" name={activities.unit==="miles"? "cyclemiles": "cyclekm"} value={activities.unit === "miles" ? activities.cyclemiles : activities.cyclekm} onChange={handleActivitiesChange} />
                                </label> : null
                                }
                                {activities.type === "Activitymins"  ? 
                                <label>Activity minutes:<input type="number" name="activitymins" value={activities.activitymins} onChange={handleActivitiesChange} />
                                </label> : null
                                }

                                <input type="submit" />
                                </form> }
                            </div>

                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close modal
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>
    )
}