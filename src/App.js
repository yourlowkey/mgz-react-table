import React , {useState, useMemo, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './css/style.css';
import AddBillionares from './components/AddBillionare';
// import Pagination from './components/Pagination'
function App() {
  const [items, setItems] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  let PageSize  = 8;

  useEffect(() => {
    console.log('app useeffect!!');
    let url = 'https://62b049b8b0a980a2ef4f73a7.mockapi.io/billionares';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        console.log(data);
      }); 
  },[]); 
  const deleteUser = (id) => {
    fetch('https://62b049b8b0a980a2ef4f73a7.mockapi.io/billionares/' + id, {
      method: 'DELETE',
    }).then(() => {
      console.log('delete successful!!');
      let result = [...items];
      result = result.filter((item) => {
        return item.id != id;
      });
      setItems(result);
      
    });
    
  };
  // get search input
const searchBillionare = () => {
  var result = items;
  console.log(result)
  if (searchTerm.length >0) {
    result = items.filter((billionare) => {
      let name = billionare.name.toLowerCase();
      return name.indexOf(searchTerm.toLowerCase()) == 0;
    })
  }
  setItems(result);
  console.log(items)
}

const [sorting, setSorting]= useState('name - DESC');
const handleChangeButton = (event)=> {
  const target = event.target;
  const value = target.value;
  // const name = target.name;
  setSorting(value);
  console.log(value);
}
const handleChangeTablebySorting = ()=> {
  // const target = event.target;
    const sortData = [...items];
  if (items != null){
    if (sorting == "Name - ASC"){
      sortData.sort((a, b) => a["name"].localeCompare(b["name"]));
    }
    else if (sorting === "Name - DESC") {
      sortData.sort((a, b) => -1* a["name"].localeCompare(b["name"]));
    }
    else if (sorting === "Assets - ASC") {
      sortData.sort((a, b) =>  (a["assests"] - b["assests"]));
    }
    else if (sorting === "Assets - DESC") {
      sortData.sort((a, b) => -1 * (a["assests"] - b["assests"]));
    }
    setItems(sortData);
    console.log(sorting);
  }
  
}
   // pagination for table
  //  const currentTableData = useMemo(() => {
  //   const firstPageIndex = (currentPage - 1) * PageSize;
  //   const lastPageIndex = firstPageIndex + PageSize;
  //   return items.slice(firstPageIndex, lastPageIndex);
  //   }, [currentPage]);

  var item_list=[];
  if (items != null) {
    // item_list = currentTableData.map((item)=>(
    item_list = items.map((item)=>(
      <tr key={item.id}>
         <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.assests}</td>
          <td>{item.age}</td>
          <td>
           
              <Button type="button" className="btn btn-warning">
                Edit
              </Button>
           
            <Button
              type="button"
              className="btn btn-danger"
              onClick={() =>{if(window.confirm('Delete the item?')){deleteUser(item.id)};} }
            >
              Delete
              {/* <i className="fa fa-trash" aria-hidden="true"></i> */}
            </Button>
          </td>
      </tr>
    ))
  }
  
  
  return (
    <div className='app'>
      <h1> Data Table</h1>
       <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            <div className="input-group-append">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={searchBillionare}
              >Search
                {/* <i class="fa fa-search"></i> */}
              </button>
            </div>
            <select
              name="sorting"
              onChange={(e)=> handleChangeButton(e)}
            >
              <option>Name - ASC</option>
              <option >Name - DESC</option>
              <option >Assets - ASC</option>
              <option >Assets - DESC</option>
            </select>
            <span>
              <Button onClick={ handleChangeTablebySorting}>{sorting}</Button>
            </span>
          </div>
          <br />
          <AddBillionares></AddBillionares>
      <div className='table-container'>
      <Table striped>
        <thead>
          <tr className='table-head'>
            <th>#</th>
            <th>Name</th>
            <th>Assets</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {item_list}
        </tbody>
      </Table>
      {/* <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={items.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      /> */}
      </div>
    </div>
   
  );
}

export default App;
