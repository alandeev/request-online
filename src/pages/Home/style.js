import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  justify-content: center;
`;

const BaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  width: 40%;
  padding: 20px;
  height: 80%;
  background: #ccc;
  border: solid 1px #ccc;
`;

export const ContainerTitle = styled.h2``;
export const ContainerResponseCode = styled.pre`
  height: 100%;
  background: white;
`;

export const RequestContainer = styled(BaseContainer)``;

export const ResponseContainer = styled(BaseContainer)``;
export const ResponseLine = styled.li``;

export const Row = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
`;

export const MethodRequestList = styled.select``;
export const MethodRequestOption = styled.option``;

export const URLRequestParam = styled.input`
  width: 100%;
`;

export const BaseButton = styled.button``;

export const InputBodyParam = styled.textarea`
  width: 100%;
  height: 100%;
`;
