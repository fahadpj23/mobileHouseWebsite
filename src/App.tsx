import { ProductProvider } from "context/productContext";
import "./App.css";
import PageRoute from "./pageRoute";

function App() {
  return (
    <div>
      <ProductProvider>
        <PageRoute />
      </ProductProvider>
    </div>
  );
}

export default App;
