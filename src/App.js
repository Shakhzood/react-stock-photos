import "./App.css";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";

// const clintID =
//   "https://api.unsplash.com/photos/?client_id=9a_-yaBpIHAUdCmzGhJeV937rKzq3GsUTa2WqGfaKmM";
// const myAccountApi = "9a_-yaBpIHAUdCmzGhJeV937rKzq3GsUTa2WqGfaKmM";

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = "https://api.unsplash.com/photos";
const searchUrl = "https://api.unsplash.com/search/photos";

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const fetchImages = async () => {
    setLoading(true);
    let url;
    url = `${mainUrl}${clientID}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
  };

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scroll >=
        document.body.scrollHeight - 1
      ) {
        console.log("it worked");
      }
    });
    return () => window.removeEventListener("scroll", event);
  }, []);

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input type="text" placeholder="search" className="form-input" />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photo, index) => {
            console.log(photo);
            return <Photo key={photo.id} {...photo} />;
          })}
        </div>
        {loading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  );
}

export default App;
