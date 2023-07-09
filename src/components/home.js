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
    console.log(response.data.products);
  };

  const [pageData, setPageData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [gap, setGap] = useState(5);
  const [totalPage, setTotalPage] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const _pageData = data.slice(skip, gap);
    const _totalPage = data.length / 5;
    setTotalPage(_totalPage);
    setPageData(_pageData);
  }, [data, page]);

  const handleNext = () => {
    setSkip(skip + 5);
    setGap(gap + 5);
    setPage(page + 1);
    const _pageData = data.slice(skip, gap);
    setPageData(_pageData);
  };

  const handlePrevious = () => {
    setSkip(skip - 5);
    setGap(gap - 5);
    setPage(page - 1);
    const _pageData = data.slice(skip, gap);
    setPageData(_pageData);
  };

  const handlePageSelection = (index) => {
    let _gap = (index+1)*5;
    let _skip = _gap - 5;
    let _page = index + 1;

    // setting values 
    setGap(_gap);
    setSkip(_skip);
    setPage(_page);
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
              {pageData.length > 0 ? (
                pageData.map((product) => {
                  return (
                    <>
                      <tr key={product.description}>
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
                  <span>Loading..... </span>
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
          <Pagination.Prev onClick={handlePrevious} disabled={skip === 0} />
          {/* <Pagination.Item>{page}/{totalPage}</Pagination.Item> */}
          {
          Array(totalPage)
            .fill(null)
            .map((element, index) => {
              return (
                <>
                  <Pagination.Item onClick={ ()=>{ handlePageSelection(index) } } active={page === index + 1}>
                    {index + 1}
                  </Pagination.Item>
                </>
              );
            })
          }
          <Pagination.Next onClick={handleNext} disabled={page === totalPage} />
        </Pagination>
      </div>
    </>
  );
};

export default Home;
