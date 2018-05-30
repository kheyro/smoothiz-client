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

export const BoxWrapper = props => (
  <div className="mb-4 border rounded">{props.children}</div>
);

export const BoxLinkUl = props => (
  <ul className="list-group">{props.children}</ul>
);

export const BoxLinkLi = props => (
  <li className="list-group-item list-group-item-action">{props.children}</li>
);

export const NavBar = styled.nav`
  background-color: #3097d1;
`;

const NavLinkWrapper = props => (
  <Link {...props} className={`nav-link ${props.className}`}>
    {props.children}
  </Link>
);

export const NavBarLink = styled(NavLinkWrapper)`
  color: rgba(255, 255, 255, 0.5);
  &:hover {
    color: rgba(255, 255, 255, 0.75);
  }
  &.active {
    color: #fff;
  }
`;
