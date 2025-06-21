import React, { useState, useEffect } from 'react';
import { MapPin, Search, List, Map as MapIcon, Filter } from 'lucide-react';
import FieldCard from '../components/ui/FieldCard';
import Map from '../components/ui/Map';
import { fields } from '../data/fields';
import { Field } from '../types';

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filteredFields, setFilteredFields] = useState<Field[]>(fields);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique cities for filter
  const cities = Array.from(new Set(fields.map(field => field.city)));

  // Filter fields based on search query and selected city
  useEffect(() => {
    let result = fields;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(field => 
        field.name.toLowerCase().includes(query) || 
        field.address.toLowerCase().includes(query) ||
        field.city.toLowerCase().includes(query)
      );
    }
    
    if (selectedCity) {
      result = result.filter(field => field.city === selectedCity);
    }
    
    setFilteredFields(result);
  }, [searchQuery, selectedCity]);

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Rechercher un terrain</h1>
      
      {/* Search and filters section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, adresse..."
              className="input pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </button>
            
            <div className="hidden md:flex rounded-md border border-gray-300 overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 flex items-center ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
                aria-label="Vue liste"
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-2 flex items-center ${viewMode === 'map' ? 'bg-gray-100' : 'bg-white'}`}
                aria-label="Vue carte"
              >
                <MapIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Filter options */}
        {showFilters && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  Ville
                </label>
                <select
                  id="city"
                  className="input"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">Toutes les villes</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* More filters can be added here */}
            </div>
          </div>
        )}
      </div>

      {/* Mobile view toggle */}
      <div className="md:hidden flex rounded-md border border-gray-300 overflow-hidden mb-4">
        <button
          onClick={() => setViewMode('list')}
          className={`flex-1 py-2 flex items-center justify-center ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
        >
          <List className="w-5 h-5 mr-2" />
          Liste
        </button>
        <button
          onClick={() => setViewMode('map')}
          className={`flex-1 py-2 flex items-center justify-center ${viewMode === 'map' ? 'bg-gray-100' : 'bg-white'}`}
        >
          <MapIcon className="w-5 h-5 mr-2" />
          Carte
        </button>
      </div>
      
      {/* Results count */}
      <div className="mb-4">
        <p className="text-gray-600">
          {filteredFields.length} terrain{filteredFields.length !== 1 ? 's' : ''} trouvé{filteredFields.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      {/* Results display */}
      {viewMode === 'list' ? (
        // List view
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFields.length > 0 ? (
            filteredFields.map((field) => (
              <FieldCard key={field.id} field={field} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500 text-lg">
                Aucun terrain ne correspond à votre recherche.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCity('');
                }}
                className="mt-4 btn-secondary"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      ) : (
        // Map view
        <>
          <Map fields={filteredFields} height="600px" />
          
          {/* Field list below map on mobile */}
          <div className="md:hidden mt-6">
            <h2 className="text-xl font-semibold mb-4">Terrains disponibles</h2>
            <div className="space-y-4">
              {filteredFields.map((field) => (
                <div key={field.id} className="card p-4">
                  <h3 className="font-semibold">{field.name}</h3>
                  <div className="flex items-center text-gray-500 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{field.city}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-primary-700">
                      {field.price.toLocaleString()} Ar
                    </div>
                    <button className="btn-primary">Voir</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;