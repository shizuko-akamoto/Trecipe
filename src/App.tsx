import React from "react";
import "./components/fontawesome";
import "./App.scss";
import ModalContainer from "./components/Modal/ModalContainer";
import { DestinationCard } from "./pages/Trecipe/DestinationCard/DestinationCard";
import SampleDestImage from "./pages/Trecipe/sample.jpg";

function App() {
  return (
    <div className="App">
      <DestinationCard
        destModel={{
          id: 0,
          name: "Destination Name",
          category: "Category",
          address: "City, Country",
          rating: 5,
          description: "Some overview on this destination.",
          imgSrc: SampleDestImage,
        }}
        index={1}
      />
      <ModalContainer />
    </div>
  );
}

export default App;
