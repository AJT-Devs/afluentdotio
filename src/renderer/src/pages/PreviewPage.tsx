import Pool from "@renderer/components/Pool";
import FooterPreview from "@renderer/layout/FooterPreview";

const PreviewPage = () => {

  const res = {
    title: "Projeto Principal",
    layers: [
      // Camada 0: A mais próxima do centro
      ["Frontend", "Backend", "Infraestrutura", "Banco de Dados"],
      
      // Camada 1: Em volta da camada 0
      ["React", "Vite", "CSS", "Node.js", "Express", "PostgreSQL", "Docker", "AWS"],

      // Camada 2: A mais externa
      [
        "Componentes", "Estado Global", "Rotas", "Autenticação", "API REST",
        "Migrations", "CI/CD", "S3 Bucket", "EC2 Instance", "Segurança", "Testes", "Deploy"
      ]
    ]
  }

  return <>
      <Pool title={res.title} layers={res.layers}/>
      <FooterPreview/>
  </>;
}

export default PreviewPage;