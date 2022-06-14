import axios from "axios";
import { useState } from "react";
import {
  BaseButton,
  HomeContainer,
  MethodRequestOption,
  MethodRequestList,
  RequestContainer,
  ResponseContainer,
  Row,
  URLRequestParam,
  ContainerTitle,
  InputBodyParam,
  ContainerResponseCode,
} from "./style";

const stringToJsonRequest = (data) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
};

const requestConverters = {
  json: stringToJsonRequest,
};

const jsonToLinesResponse = (content) => {
  const convertedValue = JSON.stringify(content, null, 2);

  return convertedValue;
};

const responseConverters = {
  json: jsonToLinesResponse,
};

const ToolResponseContainer = ({
  status_message,
  status_code,
  content,
  convert_type,
}) => {
  if (!content) {
    return (
      <ResponseContainer>
        <ContainerTitle>Response</ContainerTitle>
        <Row>
          [ {status_message} ] CODE: {status_code || ""}
        </Row>
        <ContainerResponseCode>{content}</ContainerResponseCode>
      </ResponseContainer>
    );
  }

  const convertFunction = responseConverters[convert_type];
  if (!convertFunction) {
    return (
      <ResponseContainer>
        <ContainerTitle>Response</ContainerTitle>
        <Row>
          [ {status_message} ] CODE: {status_code || ""}
        </Row>
        <ContainerResponseCode>{content}</ContainerResponseCode>
      </ResponseContainer>
    );
  }

  const newContentConverted = convertFunction(content);

  return (
    <ResponseContainer>
      <ContainerTitle>Response</ContainerTitle>
      <Row>
        [ {status_message} ] CODE: {status_code || ""}
      </Row>
      <ContainerResponseCode>{newContentConverted}</ContainerResponseCode>
    </ResponseContainer>
  );
};

const Home = () => {
  const defaultRequestParams = {
    method: "GET",
    url: "",
    request_method: "json",
  };

  const [requestParams, setRequestParams] = useState(defaultRequestParams);
  const [requestResponse, setRequestResponse] = useState();

  const convertRequestParams = (params) => {
    const newObjectResponse = {
      ...params,
    };

    const bodyConvertor = requestConverters[params.request_method];
    if (bodyConvertor) {
      newObjectResponse.data = bodyConvertor(requestParams.data);
    }

    return newObjectResponse;
  };

  const onSubmitSearch = async () => {
    try {
      const requestParamsConverted = convertRequestParams(requestParams);

      const response = await axios(requestParamsConverted);

      const requestResponseObject = {
        convert_type: "json",
        status_message: "OK",
        content: response.data,
        status_code: response.status,
      };

      setRequestResponse(requestResponseObject);
    } catch (error) {
      const requestResponseObject = {
        content: error.message,
        status_message: "ERROR",
      };

      setRequestResponse(requestResponseObject);
    }
  };

  const changeRequestParams = (value, path) => {
    setRequestParams((oldParams) => ({
      ...oldParams,
      [path]: value,
    }));
  };

  return (
    <HomeContainer>
      <RequestContainer>
        <ContainerTitle>Request</ContainerTitle>
        <Row>
          <MethodRequestList
            defaultValue={requestParams.method}
            onChange={(input) =>
              changeRequestParams(input.target.value, "method")
            }
          >
            <MethodRequestOption>GET</MethodRequestOption>
            <MethodRequestOption>POST</MethodRequestOption>
            <MethodRequestOption>PUT</MethodRequestOption>
            <MethodRequestOption>DELETE</MethodRequestOption>
          </MethodRequestList>
          <URLRequestParam
            onChange={(input) => changeRequestParams(input.target.value, "url")}
            value={requestParams.url}
          />
          <BaseButton onClick={onSubmitSearch}>Send</BaseButton>
        </Row>
        <Row>
          <MethodRequestList
            defaultValue={defaultRequestParams.request_method}
            onChange={(input) =>
              changeRequestParams(input.target.value, "request_method")
            }
          >
            <MethodRequestOption>json</MethodRequestOption>
            <MethodRequestOption>no body</MethodRequestOption>
          </MethodRequestList>
        </Row>
        <InputBodyParam
          onChange={(input) => changeRequestParams(input.target.value, "data")}
        />
      </RequestContainer>
      <ToolResponseContainer
        status_message={requestResponse?.status_message}
        status_code={requestResponse?.status_code}
        convert_type={requestResponse?.convert_type}
        content={requestResponse?.content}
      />
    </HomeContainer>
  );
};

export default Home;
