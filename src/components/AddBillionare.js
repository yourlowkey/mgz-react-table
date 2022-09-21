import React from 'react';
import { Button } from "react-bootstrap";
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function AddBillionares(){
    // let navigate = useNavigate();
    const [item, setItem] = useState(
      {
        "name": "",
        "assests": "",
        "age": null,
      }
    );
    const handleOnChange = (e) => {
      const target = e.target;
      const value = target.value;
      const name = target.name;
      console.log(name);
      let data = { ...item };
      data[name] = value;
      if (name == "age") {
        data[name]= parseInt(value);
      }
      setItem(data);
    }
    const saveUser = () => {
      let myMethod = 'POST';
      let id = '';
      // if (props.id) {
      //   myMethod = 'PUT';
      //   id = billionare.id;
      // }
      const requestOptions = {
        method: myMethod,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      };
      fetch(
        'https://62b049b8b0a980a2ef4f73a7.mockapi.io/billionares',
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          window.location.reload(false);
        });
        
      };
    return (
        <div className="addBillionares_container">  
                <label >Name</label>
                <input 
                type = "text"
                value = {item.name}
                name = "name"
                onChange={(e) => handleOnChange(e)}
                ></input>
                
                <label >Assets</label>
                <input
                type = "text"
                value = {item.assests}
                name = "assests"
                onChange={(e) => handleOnChange(e)}
                ></input>
                <label
                type = "number"
                value = {item.age}
                name = "age"
                onChange={(e) => handleOnChange(e)}
                 >Age</label>
                <input type="number"></input>
                <Button type="submit" className="btn btn-primary"
                      onClick={() => saveUser()}>
                      ADD NEW
                </Button>       
        </div>
    )
}
export default AddBillionares;