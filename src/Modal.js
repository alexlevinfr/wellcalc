import { useState } from 'react';
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export function Modal() {
    const [selectedActivity, setSelectedActivity] = useState('Steps');
    const handleActivityChange = (event) => {
        setSelectedActivity(event.target.value);
      };

      const [activities, setActivities] = useState({
        runkm:'0.0',
        runmiles:'0.0',
        walkkm:'0.0',
        walkmiles:'0.0',
        cyclekm:'0.0',
        cyclemiles:'0.0',
        activitymins:'0',
        steps:'0'
      });

    const handleActivitiesChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name,value);
        setActivities(activities => ({...activities, [name]: value}))
    }


    const handleActivitiesSubmit = e => {
        e.preventDefault();
          console.log("Submitted the activies form. No one is listening");

      }
      return (<Popup trigger = { <button> Click to open modal </button>}
                modal nested>
                    {close => (
                        <div className='modal'>
                            <div className='content'>
                                Record a new activity.
                                {<select value={selectedActivity} onChange={handleActivityChange}>
                                <option value="Run">Run</option>
                                <option value="Walkd">Walk distance</option>
                                <option value="Steps">Walk steps</option>
                                <option value="Cycle">Cycle distance</option>
                                <option value="Activitymins">Activity minutes</option>
                                </select>}
                                {<form onSubmit={handleActivitiesSubmit}>
                                
                                <label>number of steps:<input type="number" name="steps" value={activities.steps} onChange={handleActivitiesChange} />
                                </label>
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