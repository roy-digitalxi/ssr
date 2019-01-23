import styled, { keyframes } from 'styled-components';

const fade = keyframes`
	from {
		transform: translateY(20px);
		opacity: 0;
	}

	to {
		transform: translateY(0px);
		opacity: 1;
	}
`;

export const FadeInDiv = styled.div`
  animation: ${fade} 0.4s linear;
`;
