
import React from 'react';

const Select = ({ children, ...props }) => <select {...props}>{children}</select>;
const SelectContent = ({ children, ...props }) => <div {...props}>{children}</div>;
const SelectItem = ({ children, ...props }) => <option {...props}>{children}</option>;
const SelectTrigger = ({ children, ...props }) => <div {...props}>{children}</div>;
const SelectValue = ({ children, ...props }) => <div {...props}>{children}</div>;

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
