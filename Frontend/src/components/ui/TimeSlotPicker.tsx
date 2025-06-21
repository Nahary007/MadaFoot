import React from 'react';
import { TimeSlot } from '../../types';

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedSlot: string | null;
  setSelectedSlot: (id: string | null) => void;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({ 
  slots, 
  selectedSlot, 
  setSelectedSlot 
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {slots.map((slot) => (
        <button
          key={slot.id}
          onClick={() => setSelectedSlot(slot.id)}
          disabled={!slot.available}
          className={`
            py-2 px-4 rounded-md border transition-colors text-center
            ${slot.available 
              ? selectedSlot === slot.id
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white text-black border-gray-300 hover:bg-gray-100'
              : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
            }
          `}
        >
          {slot.startTime} - {slot.endTime}
        </button>
      ))}
    </div>
  );
};

export default TimeSlotPicker;