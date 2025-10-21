
import React from 'react';

const Card = ({ children, ...props }) => <div {...props}>{children}</div>;
const CardContent = ({ children, ...props }) => <div {...props}>{children}</div>;
const CardDescription = ({ children, ...props }) => <p {...props}>{children}</p>;
const CardHeader = ({ children, ...props }) => <div {...props}>{children}</div>;
const CardTitle = ({ children, ...props }) => <h3 {...props}>{children}</h3>;

export { Card, CardContent, CardDescription, CardHeader, CardTitle };
