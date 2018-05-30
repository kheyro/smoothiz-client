import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// export const WrapperBox = styled.div.attrs({
//   className: 'mb-4 p-3',
// })`
//   min-width: 0;
//   word-wrap: break-word;
//   background-color: #fff;
//   background-clip: border-box;
//   border: 1px solid rgba(0, 0, 0, 0.125);
//   border-radius: 0.25rem;
// `;

const theme = {
  smtBlue: '#3097d1',
};

export const NavBar = styled.nav`
  background-color: ${theme.smtBlue};
`;

export const NavBarLink = props => (
  <Link className="nav-link" {...props}>
    {props.children}
  </Link>
);

const BoxWrapperDiv = props => (
  <div className={`mb-4 p-3 border rounded ${props.className}`}>{props.children}</div>
);

export const BoxWrapper = styled(BoxWrapperDiv)`
  background-color: #fff;
`;

export const BoxLinkUl = props => (
  <ul className="list-group">{props.children}</ul>
);

export const BoxLinkLi = props => (
  <li className="list-group-item list-group-item-action">{props.children}</li>
);

export const ButtonAction = styled.button`
  border: none;
  background: none;
  font-size: 0.85rem;
  color: rgba(155, 155, 155, 0.5);
  cursor: pointer;
  padding: 0;
  &:hover {
    color: rgba(155, 155, 155, 0.75);
  }
  &:not(:first-child) {
    margin-left: 10px;
  }
  svg {
    margin-right: 2px;
  }
`;

export const CardTitleLink = styled(Link)`
  color: #212529;
  &:hover {
    color: #212529;
  }
`;
