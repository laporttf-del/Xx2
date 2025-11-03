
export interface Operation {
  id: string;
  data: string; // "dd/MM/yyyy"
  operador: string;
  maquina: string;
  horaLigou: string; // "HH:mm"
  horaDesligou: string; // "HH:mm"
  dieselInicial: number;
  dieselFinal: number;
  precoDiesel: number;
  litrosHora: number; // Expected consumption
  usado: number; // Calculated diesel used
  gasto: number; // Calculated cost
  horasTrabalhadas: number;
  nota: number; // Original score calculation
  aiAnalysis: string;
  aiAnalysisLoading: boolean;
}
