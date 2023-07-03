import Table from "react-bootstrap/Table";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import Spinner from "react-bootstrap/Spinner";

const Home = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const response = await axios.get("https://dummyjson.com/products");
    setData(response.data.products);
    console.log(data[0]);
  };  

  useEffect(() => {
    getData();
  },[]);

  const handleNext = () =>{
    alert('next')
  }

  const handlePrevious = () =>{
    alert('previous')
  }

  return (
    <>
      <div className="container">
        <h3>Products</h3>
        <div className="table_container mt-6">
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Serial</th>
                <th>Name</th>
                <th>Price</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              { data.length > 0 ? (
                data.map((product) => {
                  return (
                    <>
                      <tr>
                        <td>{product.id}</td>
                        <td>{product.title}</td>
                        <td>${product.price}</td>
                        <td>
                          <img
                            height="70px"
                            width="70px"
                            src={`${product.thumbnail}`}
                            alt=""
                          ></img>
                        </td>
                      </tr>
                    </>
                  );
                })
              ) : (
                <div className="container d-flex justify-content-end">
                  <span>Loading..... </span>{" "}
                  <Spinner animation="border" variant="primary" />
                  <br />
                </div>
              )}
            </tbody>
          </Table>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev onClick={handlePrevious} />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Next onClick={handleNext} />
        </Pagination>
      </div>
    </>
  );
};

export default Home;
