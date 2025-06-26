import styled from "styled-components";
import Form from "../components/Form";

const PageWrap = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  width: 100vw;
`;

export default function SurveyPage() {
  return (
    <PageWrap>
      <Form>
      </Form>
    </PageWrap>
  )
}