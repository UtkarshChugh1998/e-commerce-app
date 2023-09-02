import React from 'react';
import { ProductCheckoutForm } from './components/ProductCheckoutForm';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <ProductCheckoutForm />
      </ErrorBoundary>
    </div>
  );
}

export default App;
