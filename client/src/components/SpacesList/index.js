import React from 'react';
import { Link } from 'react-router-dom';

const SpacesList = () => {
  const spaces = [
    {
      name: 'Round Room',
      _id: 1,
    },
    {
      name: 'Round Room',
      _id: 2,
    },
  ];

  if (!spaces.length) {
    return <h3>You have no spaces created yet.</h3>;
  }
  return (
    <div>
      <h3>Your Current Spaces</h3>
      {spaces &&
        spaces.map((space) => {
          <div key={space.id} className="mb-3 col-6">
            {space.name}
          </div>;
        })}
    </div>
  );
};

export default SpacesList;
