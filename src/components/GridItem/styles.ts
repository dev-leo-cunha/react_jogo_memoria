import styled from "styled-components";

type ContainerProps = {
    showBackground:boolean
}
type IconProps = {
    opacity?:number
    showBackground:boolean
}

export const Container = styled.div<ContainerProps>`
    background-color: ${props => props.showBackground ? 'white' : '#E2E3E3'};
    height: 100px;
    border: 1px solid #dd7739;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export const Icon = styled.img<IconProps>`
    width: ${props => props.showBackground ? '94px' : '40px'};
    height: ${props => props.showBackground ? '100px' : '40px'};
    border-radius: ${props => props.showBackground ? '20px' : '0px'};
    opacity: ${props => props.opacity ?? 1};
`;