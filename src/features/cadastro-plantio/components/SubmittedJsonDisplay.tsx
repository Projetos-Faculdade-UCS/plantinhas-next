'use client';

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
// Remover a importação da biblioteca React, já que usaremos CDN/classes CSS
// import { Copy, CheckCircle } from "@phosphor-icons/react"; 
import { useState } from "react";

interface SubmittedJsonDisplayProps {
  jsonString: string | null;
}

export function SubmittedJsonDisplay({ jsonString }: SubmittedJsonDisplayProps) {
  const [copied, setCopied] = useState(false);

  if (!jsonString) {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString)
      .then(() => {
        setCopied(true);
        // Idealmente, aqui iria um toast de sucesso.
        console.log("JSON copiado para a área de transferência!");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Falha ao copiar JSON: ', err);
        // Idealmente, aqui iria um toast de erro.
      });
  };

  return (
    <Card className="mt-8 w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>JSON Gerado</CardTitle>
            <CardDescription>Este é o payload JSON que seria enviado.</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={handleCopy} aria-label="Copiar JSON">
            {/* Usar classes CSS do Phosphor Icons via CDN */}
            {copied ? (
              <i className="ph-check-circle text-green-500 text-base"></i> // Ajustar text-base se necessário
            ) : (
              <i className="ph-copy text-base"></i> // Ajustar text-base se necessário
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="whitespace-pre-wrap break-all text-sm bg-muted p-4 rounded-md">
          {jsonString}
        </pre>
      </CardContent>
    </Card>
  );
} 