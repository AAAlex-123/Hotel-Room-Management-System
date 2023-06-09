import React, { useState, useEffect } from 'react';
import { Room, Status } from './Room';

interface FilterProps {
  onFilter: (filter: Partial<Room>) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const initialFilterOptions: Partial<Room> = {
    room_id: '',
    occupied: undefined,
    cleaning_state: undefined ,
    service: undefined,
    out_of_order: undefined,
    roomType: '',
    roomClass: '',
    floor: undefined,
  };

  const [filterOptions, setFilterOptions] = useState<Partial<Room>>(
    initialFilterOptions
  );

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const checked = event.target.checked;
  
    setFilterOptions((prevFilterOptions) => ({
      ...prevFilterOptions,
      [name]: checked ? true : undefined,
    }));
  };
  

  const handleOccChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    let fieldValue: boolean | undefined;
  
    if (value === 'true') {
      fieldValue = true;
    } else if (value === 'false') {
      fieldValue = false;
    } else {
      fieldValue = undefined;
    }
  
    setFilterOptions((prevFilterOptions) => ({
      ...prevFilterOptions,
      [name]: fieldValue,
    }));
  };

  
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = event.target;
      if (type === 'text') {
        setFilterOptions((prevFilterOptions) => ({
          ...prevFilterOptions,
          [name]: value,
        }));
      }
    
      if (type === 'select-one') {
        setFilterOptions((prevFilterOptions) => ({
          ...prevFilterOptions,
          [name]: value !== '' ? value : undefined,
        }));
      }

      if (type === 'checkbox') {
        const checked = (event.target as HTMLInputElement).checked;
        setFilterOptions((prevFilterOptions) => ({
          ...prevFilterOptions,
          [name]: checked ? true : undefined,
        }));
      }
    };
    

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = event.target.value as Status | '';

    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      cleaning_state: selectedStatus !== '' ? (selectedStatus as Status) : undefined,
    }));
  };

  useEffect(() => {
    onFilter(filterOptions);
  }, [filterOptions, onFilter]);

  

  const handleFilterSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (Object.keys(filterOptions).length === 0) {
      onFilter({});
    } else {
      onFilter(filterOptions);
    }
  };

  const handleFilterReset = () => {
    setFilterOptions(initialFilterOptions);
    onFilter(initialFilterOptions);
  };

  const handleRoomIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilterOptions((prevFilterOptions) => ({
      ...prevFilterOptions,
      room_id: value,
    }));
  };

  return (
    <div className='filter-container'>

      <form onSubmit={handleFilterSubmit}>

          <label>
            Number:
            <input
              type="text"
              name="room_id"
              value={filterOptions.room_id || ''}
              onChange={handleRoomIdChange}
            />
          </label>

          <label>
            Occupied:
            <select
              name="occupied"
              value={filterOptions.occupied === undefined ? '' : String(filterOptions.occupied)}
              onChange={handleOccChange}
            >
              <option value="">All</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>

          <label>
            State:
            <select
              name="cleaning_state"
              value={filterOptions.cleaning_state || ''}
              onChange={handleStatusChange}
            >
              <option value="">All</option>
              <option value={Status.DIRTY}>DIRTY</option>
              <option value={Status.CLEAN}>CLEAN</option>
              <option value={Status.INSPECTED}>INSPECTED</option>
            </select>
          </label>

        <label>
        Out of Service:
        <input
          type="checkbox"
          name="service"
          checked={filterOptions.service || false}
          onChange={handleCheckboxChange}
        />
      </label>

      <label>
        Out of Order:
        <input
          type="checkbox"
          name="out_of_order"
          checked={filterOptions.out_of_order || false}
          onChange={handleCheckboxChange}
        />
      </label>

      <label>
      Type:
        <input
          type="text"
          name="roomType"
          value={filterOptions.roomType || ''}
          onChange={handleFilterChange}
        />
      </label>

      <label>
        Class:
        <input
          type="text"
          name="roomClass"
          value={filterOptions.roomClass || ''}
          onChange={handleFilterChange}
        />
      </label>

      <label>
        Floor:
        <input
          type="text"
          name="floor"
          value={filterOptions.floor || ''}
          onChange={handleFilterChange}
        />
      </label>
        <div>
          <button className="blueButton" onClick={handleFilterReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
