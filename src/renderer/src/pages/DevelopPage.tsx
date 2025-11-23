import { useState, FormEvent } from 'react';
import { useNavigate } from "react-router-dom";
import { useBranstormingStore } from "../store/BranstormingStore";
import Pool from "@renderer/components/Pool";
import TitleBar from '@renderer/layout/TitleBar';

import "@renderer/assets/stylesheets/pages/develope-page.css";



const DevelopPage = () => {

  const { title, setTitle } = useBranstormingStore();

  console.log("Título:", title);
  
  
  const initialData = {
    title: title || "Projeto Sem Título",
    layers: [] as string[][],
  };
  
  const MAX_ITEMS_PER_LAYER = 10; // Limite de itens por camada
  
  // let words: string[][] = [];
  const navigate = useNavigate();
  const [data, setData] = useState(initialData);
  const [newItemText, setNewItemText] = useState('');

  // async function fetchWords() {
  //   try{
  //     words = await window.api.createBrainstorm({ name: data.title, context: description, userId: 1 });
  //   }catch(error){
  //     console.error("Erro ao gerar palavras:", error);
  //     alert("Ocorreu um erro ao gerar novas palavras. Por favor, tente novamente.");
  //     return;
  //   }
  //   console.log(words);
  //   setData({ ...data, layers: words });
  // }

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
      <TitleBar />
      <Pool 
        title={title} 
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
        <button onClick={() => { alert("Função temporariamente desativada para evitar custos desnecessários. Entre em contato com o desenvolvedor para mais informações."); /* fetchWords() */ }}>
          Gerar
        </button>
      </footer>
    </div>
  );
};

export default DevelopPage;