// src/pages/DevelopPage.tsx
import { useState, FormEvent } from 'react';
import { useNavigate } from "react-router-dom";
import Pool from "@renderer/components/Pool";

const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('title') || 'Projeto Sem Título';

const initialData = {
  title: title,
  layers: [
    ["Frontend", "Backend", "Infraestrutura", "Banco de Dados"],
    ["React", "Vite", "CSS", "Node.js", "Express", "PostgreSQL", "Docker", "AWS"],
    [
      "Componentes", "Estado Global", "Rotas", "Autenticação", "API REST",
      "Migrations", "CI/CD", "S3 Bucket", "EC2 Instance", "Segurança", "Testes", "Deploy"
    ]
  ]
};

const MAX_ITEMS_PER_LAYER = 12; // Limite de itens por camada

const DevelopPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(initialData);
  const [newItemText, setNewItemText] = useState('');

  const handleDeleteItem = (layerIndex: number, itemIndex: number) => {
    // Cria uma cópia profunda para evitar mutação direta do estado
    const newLayers = JSON.parse(JSON.stringify(data.layers));
    
    // Remove o item
    newLayers[layerIndex].splice(itemIndex, 1);

    // Filtra para remover quaisquer camadas que ficaram vazias
    const filteredLayers = newLayers.filter(layer => layer.length > 0);

    setData({ ...data, layers: filteredLayers });
  };

  const handleAddItem = (e: FormEvent) => {
    e.preventDefault();
    const textToAdd = newItemText.trim();
    if (!textToAdd) return; // Não adiciona se o input estiver vazio

    let newLayers = JSON.parse(JSON.stringify(data.layers));
    
    // Se não houver nenhuma camada, cria a primeira
    if (newLayers.length === 0) {
      newLayers.push([]);
    }

    // Adiciona o novo item no início da primeira camada
    newLayers[0].unshift(textToAdd);

    // Lógica de cascata para reorganizar as camadas
    for (let i = 0; i < newLayers.length; i++) {
      if (newLayers[i].length > MAX_ITEMS_PER_LAYER) {
        // Pega o último item da camada atual para mover para a próxima
        const itemToMove = newLayers[i].pop();

        if (newLayers[i + 1]) {
          // Se a próxima camada existe, adiciona o item nela
          newLayers[i + 1].unshift(itemToMove!);
        } else {
          // Se não existe, cria uma nova camada com esse item
          newLayers.push([itemToMove!]);
        }
      }
    }

    setData({ ...data, layers: newLayers });
    setNewItemText(''); // Limpa o input
  };

  return (
    <div className="develop-page-container">
      <Pool 
        title={data.title} 
        layers={data.layers}
        onDeleteItem={handleDeleteItem}
      />
      <footer className="develop-footer">
        <button onClick={() => { if(window.confirm("Tem certeza que deseja voltar? Todo o progresso não salvo será perdido.")) navigate(-1); }}>
          Voltar
        </button>
        <form onSubmit={handleAddItem}>
          <input 
            type="text" 
            placeholder="Adicione uma nova palavra..." 
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
          />
          <button type="submit">Adicionar</button>
        </form>
        <button onClick={() => { if(window.confirm("Gerar novas palavras irá substituir o layout atual. Deseja continuar?")) return; }}>
          Gerar
        </button>
      </footer>
    </div>
  );
};

export default DevelopPage;