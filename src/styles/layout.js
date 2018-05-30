import React from 'react';

export const SidebarLeft = props => (
  <div className="col-3">{props.children}</div>
);
export const SidebarContent = props => (
  <div className="col-9">{props.children}</div>
);
export const FullWidth = props => (
  <div className="row">
    <div className="col">{props.children}</div>
  </div>
);
export const Centered = props => (
  <div className="row">
    <div className="col-4 offset-4">{props.children}</div>
  </div>
);