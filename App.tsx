
import React, { useState, useMemo } from 'react';
import Header from './components/Header.tsx';
import OperationForm from './components/OperationForm.tsx';
import OperationsTable from './components/OperationsTable.tsx';
import FilterControls from './components/FilterControls.tsx';
import Summary from './components/Summary.tsx';
import OperatorChart from './components/OperatorChart.tsx';
import useOperations from './hooks/useOperations.ts';
import { Operation } from './types.ts';

export default function App() {
  const { operations, addOperation, clearOperations, loading: isSubmitting, error } = useOperations();
  const [filter, setFilter] = useState<{ month: number; year: number } | null>(null);

  const filteredOperations = useMemo(() => {
    if (!filter) {
      return operations;
    }
    return operations.filter(op => {
      const [, opMonth, opYear] = op.data.split('/').map(Number);
      return opMonth === filter.month && opYear === filter.year;
    });
  }, [operations, filter]);

  const handleFilterChange = (month: number, year: number) => {
    if (month && year) {
      setFilter({ month, year });
    } else {
      setFilter(null);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-1">
            <OperationForm 
              onAddOperation={addOperation} 
              onClearHistory={clearOperations}
              isSubmitting={isSubmitting}
            />
          </div>
          <div className="lg:col-span-2 space-y-8">
            <div>
              <FilterControls onFilterChange={handleFilterChange} onShowAll={() => setFilter(null)} />
              {error && <div className="mt-4 p-3 bg-red-800/50 text-red-300 border border-red-700 rounded-lg">{error}</div>}
              <OperationsTable operations={filteredOperations} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <Summary operations={operations} filteredOperations={filteredOperations} isFiltered={!!filter} />
              <OperatorChart operations={filteredOperations} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
