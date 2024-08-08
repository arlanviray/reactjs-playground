import { useEffect, useState } from "react";
import "./styles.scss";

function LoadmoreData({ url }) {
  const [products, setProducts] = useState([]);
  const [loadCount, setLoadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const maxShowItems = 100;

  const getProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${url}&skip=${loadCount * 20}`);
      const data = await response.json();

      if (data && data.products) {
        if (loadCount === 0) {
          setProducts(data.products);
        } else {
          setProducts((prevData) => [...prevData, ...data.products]);
        }
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setErrMessage("An error occurred while fetching data...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [loadCount]);

  // console.log(products);

  const handleLoadMore = () => {
    setLoadCount((prevState) => prevState + 1);
  };

  return (
    <>
      <div className="loadmore-data">
        {errMessage && <div className="center">{errMessage}</div>}
        {loading && <div className="center">Loading...</div>}

        {products.length > 0 && (
          <>
            <div className="products maxwidth mwlarge">
              {products.map((item) => (
                <div className="item" key={item.id}>
                  <img src={item.thumbnail} />
                  <p className="center">{item.title}</p>
                </div>
              ))}
            </div>
            <div className="total center">
              Products <span>{products.length}</span> OF {maxShowItems}
            </div>
            {products.length !== maxShowItems && (
              <div className="button center">
                <button onClick={handleLoadMore}>Load More Products!!!</button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default LoadmoreData;
