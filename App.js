import './App.css';
import React, { useEffect, useState } from 'react';
import Movie from "./Movie"
import Filter from "./Filter";
import { motion, AnimatePresence } from "framer-motion";

function App() {

  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenere] = useState(0);
  useEffect(() => {
    fetchPopular();
  }, []);


  const fetchPopular = async () => {
    const data = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=a7aec237121ee4a63d0b26fa48a23c36&language=en-US&page=10");
    const movies = await data.json();
    setPopular(movies.results);
    setFiltered(movies.results);



  };
  return (
    <>
      <div className="App">
        <Filter
          popular={popular}
          setFiltered={setFiltered}
          activeGenre={activeGenre}
          setActiveGenere={setActiveGenere} />

        <motion.div layout className="popular-movies">
          <AnimatePresence>
            {filtered.map((movies) => {
              return (
                (<React.Fragment key={movies.id} >

                  <Movie movie={movies} />
                </React.Fragment>)



              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}

export default App;