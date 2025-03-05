import './Filter.scss';
import React, { useState } from 'react';
import { Ifilter } from '../../types/Ifilter';
interface Props {
  handleFilterChange: (filter: Ifilter) => void;
}
export const Filter: React.FC<Props> = (props) => {
  const [filter, setFilter] = useState<Ifilter>(Ifilter.ACTIVE);
  const { handleFilterChange } = props;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value as Ifilter;
    setFilter(selectedFilter);
    handleFilterChange(selectedFilter);
  };
  return (
    <div className="filter">
      <h3 className="filter__title">Filter:</h3>
      <select className="filter__select" value={filter} onChange={(event) => handleChange(event)}>
        <option value={Ifilter.ALL}>All</option>
        <option value={Ifilter.ACTIVE}>Active</option>
        <option value={Ifilter.DEACTIVATED}>Deactivated</option>
      </select>
    </div>
  );
};
