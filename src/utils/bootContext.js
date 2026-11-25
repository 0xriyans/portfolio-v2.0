import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const BootContext = createContext({ bootDone: true });

export const BootProvider = ({ bootDone, children }) => (
  <BootContext.Provider value={{ bootDone }}>{children}</BootContext.Provider>
);

BootProvider.propTypes = {
  bootDone: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export const useBootStatus = () => useContext(BootContext);

export default BootContext;
