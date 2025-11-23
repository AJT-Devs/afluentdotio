import React, { useEffect, useState } from "react";

const Initializer = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento (ex: animação, fetch, etc)
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="initializer">
        {/* Coloque sua animação ou logo aqui */}
        <h2>Carregando...</h2>
      </div>
    );
  }

  return <>{children}</>;
};

export default Initializer;