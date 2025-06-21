import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { Field } from '../../types';

interface FieldCardProps {
  field: Field;
}

const FieldCard: React.FC<FieldCardProps> = ({ field }) => {
  return (
    <Link to={`/field/${field.id}`} className="card group hover:shadow-lg">
      <div className="relative overflow-hidden h-48">
        <img 
          src={field.image} 
          alt={field.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white font-medium">{field.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 group-hover:text-primary-600 transition-colors">
          {field.name}
        </h3>
        <div className="flex items-center text-gray-500 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{field.city}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-primary-700">
            {field.price.toLocaleString()} Ar
            <span className="text-sm font-normal text-gray-500">/2h</span>
          </div>
          <button className="btn-primary">Réserver</button>
        </div>
      </div>
    </Link>
  );
};

export default FieldCard;