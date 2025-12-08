import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePool } from "./usePool";
import { getNodesBounds, getViewportForBounds, Node as RFNode } from '@xyflow/react';
import { toPng } from 'html-to-image';


export const useConsole = () => {
    const [isFreeMode, setIsFreeMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");

    const { } = usePool();
    const changeIsFreeMode = () => {
        setIsFreeMode(!isFreeMode);
    };

    const navigate = useNavigate();
    const handleToBack = () => navigate("/dashboard")

    type ExportOptions = {
        nodes: RFNode[]; // passe os nodes do usePool
        width?: number; // padrão 1024
        height?: number; // padrão 768
        fileName?: string; // padrão 'reactflow.png'
        backgroundColor?: string; // padrão '#1a365d'
        padding?: number; // padding do fit (padrão 0.5)
        minZoom?: number; // use os mesmos do seu ReactFlow (padrão 0.2)
        maxZoom?: number; // use os mesmos do seu ReactFlow (padrão 2)
        pixelRatio?: number; // nitidez (padrão 2)
        viewportSelector?: string; // seletor da viewport (padrão '.react-flow__viewport')
    };

    async function handleDownload({
        nodes,
        width = 1024,
        height = 768,
        fileName = 'reactflow.png',
        backgroundColor = '#1a365d',
        padding = 0.5,
        minZoom = 0.2,
        maxZoom = 2,
        pixelRatio = 2,
        viewportSelector = '.react-flow__viewport',
    }: ExportOptions) {
        if (!nodes || nodes.length === 0) return;

        const viewportEl = document.querySelector(viewportSelector) as HTMLElement | null;
        if (!viewportEl) {
            console.warn(`Elemento ${ viewportSelector } não encontrado.`);
            return;
        }

        // Enquadra todos os nós no tamanho desejado
        const bounds = getNodesBounds(nodes);
        const viewport = getViewportForBounds(bounds, width, height, padding, minZoom, maxZoom);

        const dataUrl = await toPng(viewportEl, {
            backgroundColor,
            width,
            height,
            pixelRatio,
            cacheBust: true,
            style: {
                width: `${ width }px`,
                height: `${ height }px`,
                transform: `translate(${ viewport.x }px, ${ viewport.y }px) scale(${ viewport.zoom })`,
                transformOrigin: '0 0',
            },
    });

    const a = document.createElement('a');
        a.setAttribute('download', fileName);
        a.setAttribute('href', dataUrl);
        a.click();
    }


return { isFreeMode, changeIsFreeMode, handleToBack, handleDownload, title, setTitle };
} 