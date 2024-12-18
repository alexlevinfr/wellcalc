import { useState } from 'react';
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export function Modal() {
    /*const [selectedActivity, setSelectedActivity] = useState('Steps');
    const handleActivityChange = (event) => {
        setSelectedActivity(event.target.value);
      };*/

      const unit_types=["steps","miles","time","km"];
      const activity_names=["Archery","Badminton","Baseball/rounders/softball", "Basketball","Boxing","Canoeing/Kayaking",
      "Climbing",
      "Cricket",
      "Cross Country Skiing",
      "Crossfit/Cross Training",
      "Cycling (Distance)",
      "Cycling (Time)",
      "Dancing",
      "Elliptical",
      "Fencing",
      "Field Hockey",
      "Fishing",
      "Golf",
      "Handcycling",
      "HIIT",
      "Hiking",
      "Hunting",
      "Kite Boarding",
      "Martial Arts",
      "Other Movement",
      "Paddleboarding",
      "Pickleball",
      "Pilates",
      "Rowing",
      "Rugby",
      "Running (Distance)",
      "Running (Time)",
      "Sailing",
      "Scuba Diving",
      "Skateboarding",
      "Skateboarding",
      "Skiing/Snowboarding",
      "Snorkeling",
      "Snowshoeing",
      "Soccer",
      "Spinning",
      "Squash",
      "Stretching/Mobility",
      "Surfing",
      "Swimming",
      "Table Tennis",
      "Tai Chi",
      "Tennis",
      "Volleyball",
      "Walking (Distance)",
      "Walking (Steps)",
      "Walking (Time)",
      "Water Polo",
      "Weight Lifting",
      "Windsurfing",
      "Yoga",
      "Zumba",
]
      const [activities, setActivities] = useState({
        date:new Date().toJSON().slice(0, 10),
        type:'Walking (Steps)',
        unit:'steps',
        quantity:0.0,
      });

    const handleActivitiesChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name,value);
        setActivities(activities => ({...activities, [name]: value}))
    }

    function Opts(props) {
        return <option value={props.brand}>{props.brand}</option>;
    }

    const [activeJsons, setActiveJsons] = useState({myArray:[]});

    /*const handleActiveJsonsChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setActiveJsons(activeJsons => ({...activeJsons.m, [name]: value}));
    }*/
    
    function addActivityToLog(activities) {
        setActiveJsons(activeJsons => ({
            myArray:[...activeJsons.myArray, {"name": activities}]}));
        console.log(JSON.stringify(activeJsons));
      }
    
      function getLabelName(str) {
        if (str === "steps") {
            return "Number of steps";
        } else if (str ==="miles") {
            return "Number of miles";
        } else if (str ==="km") {
            return "Number of kms"
        } else {
            return "Time (mins)";
        }
      }

    const handleActivitiesSubmit = e => {
        var activityjson=JSON.stringify(activities);
        addActivityToLog(activities);
        e.preventDefault();
          console.log("Submitted the activities form.",activityjson);

      }

      return (<Popup trigger = { <button> Click to open modal </button>}
                modal nested>
                    {close => (
                        <div className='modal'>
                            <div className='content'>
                            Record a new activity.
                                <label>date<input type="date" name="date" value={activities.date} onChange={handleActivitiesChange}></input></label><br />
                                {<label>type<select value={activities.type} onChange={handleActivitiesChange} name="type">
                                {activity_names.map((option) => <Opts brand={option} />)
                                    };</select></label>
                                }
                                {<label>unit<select value={activities.unit} onChange={handleActivitiesChange} name="unit">
                                {unit_types.map((option) => <Opts brand={option} />)
                                    };</select></label>
                                }
                                {<form onSubmit={handleActivitiesSubmit}>
                                {
                                <label>{getLabelName(activities.unit)}<input type="number" name="quantity" value={activities.quantity} onChange={handleActivitiesChange} />
                                </label>
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