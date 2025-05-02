import React from 'react';

interface FiltersProps {
  categories: string[];
  materials: string[];
  types: string[];
  selectedCategory: string | null;
  selectedMaterial: string | null;
  selectedType: string | null;
  onCategoryChange: (category: string | null) => void;
  onMaterialChange: (material: string | null) => void;
  onTypeChange: (type: string | null) => void;
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  materials,
  types,
  selectedCategory,
  selectedMaterial,
  selectedType,
  onCategoryChange,
  onMaterialChange,
  onTypeChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-primary mb-6">Filtros</h2>
      
      {/* Categorías */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-3">Categoría</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="category-all"
              name="category"
              checked={selectedCategory === null}
              onChange={() => onCategoryChange(null)}
              className="w-4 h-4 text-accent focus:ring-accent"
            />
            <label htmlFor="category-all" className="ml-2 text-gray-700">
              Todas
            </label>
          </div>
          
          {categories.map(category => (
            <div key={category} className="flex items-center">
              <input
                type="radio"
                id={`category-${category}`}
                name="category"
                checked={selectedCategory === category}
                onChange={() => onCategoryChange(category)}
                className="w-4 h-4 text-accent focus:ring-accent"
              />
              <label htmlFor={`category-${category}`} className="ml-2 text-gray-700">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Materiales */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-3">Material</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="material-all"
              name="material"
              checked={selectedMaterial === null}
              onChange={() => onMaterialChange(null)}
              className="w-4 h-4 text-accent focus:ring-accent"
            />
            <label htmlFor="material-all" className="ml-2 text-gray-700">
              Todos
            </label>
          </div>
          
          {materials.map(material => (
            <div key={material} className="flex items-center">
              <input
                type="radio"
                id={`material-${material}`}
                name="material"
                checked={selectedMaterial === material}
                onChange={() => onMaterialChange(material)}
                className="w-4 h-4 text-accent focus:ring-accent"
              />
              <label htmlFor={`material-${material}`} className="ml-2 text-gray-700">
                {material}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Tipos */}
      <div>
        <h3 className="text-md font-semibold mb-3">Tipo</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="type-all"
              name="type"
              checked={selectedType === null}
              onChange={() => onTypeChange(null)}
              className="w-4 h-4 text-accent focus:ring-accent"
            />
            <label htmlFor="type-all" className="ml-2 text-gray-700">
              Todos
            </label>
          </div>
          
          {types.map(type => (
            <div key={type} className="flex items-center">
              <input
                type="radio"
                id={`type-${type}`}
                name="type"
                checked={selectedType === type}
                onChange={() => onTypeChange(type)}
                className="w-4 h-4 text-accent focus:ring-accent"
              />
              <label htmlFor={`type-${type}`} className="ml-2 text-gray-700">
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;