import styled from "styled-components";

// Used for wrapping a page component
export const Screen = styled.div`
  background-color: var(--primary);
  display: flex;
`;

// Used for providing space between components
export const SpacerXSmall = styled.div`
  height: 0px;
`;

// Used for providing space between components
export const SpacerSmall = styled.div`
  height: 0px;

`;

// Used for providing space between components
export const SpacerMedium = styled.div`
  height: 0px;
`;

// Used for providing space between components
export const SpacerLarge = styled.div`
  height: 0px;
`;

// Used for providing a wrapper around a component
export const Container = styled.div`

  border: none;
`;

export const TextTitle = styled.p`

  font-weight: 500;
`;

export const TextSubTitle = styled.p`
  color: var(--primary-text);
`;

export const TextDescription = styled.p`
  color: var(--primary-text);
`;

export const StyledClickable = styled.div`
  :active {
    opacity: 0.6;
  }
`;
