import styled from "styled-components";

const MileageForm = () => {
  return (
    <MileageFormLayout>
      <FormTop>마일리지 적립 신청</FormTop>
      <FormBody>
        <RowHorizontal>
          <Column>
            <Label>제목</Label>
            <Input type="text" placeholder="제목을 입력하세요" />
          </Column>
          <Column>
            <Label>카테고리</Label>
            <Select>
              <option value="">카테고리</option>
              <option value="bicycle">자전거</option>
              <option value="container">다회용기</option>
            </Select>
          </Column>
        </RowHorizontal>

        <Row>
          <Label>설명</Label>
          <Textarea placeholder="환경 보호를 위한 행동을 작성해주세요." />
        </Row>

        <Row>
          <Label>인증 사진</Label>
          <Textarea placeholder="사진이 잘 안보일 경우를 대비해서 사진에 대한 간단한 설명을 작성해주세요." />
        </Row>

        <Row>
          <Label>파일 업로드</Label>
          <Input type="file" />
        </Row>
      </FormBody>
      <ButtonLayout>
        <SubmitButton>등록하기</SubmitButton>
      </ButtonLayout>
    </MileageFormLayout>
  );
};

export default MileageForm;

// styled-components

const MileageFormLayout = styled.div`
  margin: 57px 0;
`;

const FormTop = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
`;

const FormBody = styled.div`
  background-color: #e4f2cd;
  padding: 40px;
  border-radius: 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RowHorizontal = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  font-weight: bold;
  background-color: #d3d3d3;
  padding: 0 8px;
  border-radius: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 10px;
  height: 30px;
  border: none;
  background-color: #ffffff;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 10px;
  background-color: #ffffff;
  border: none;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border-radius: 10px;
  height: 100px;
  resize: none;
  background-color: #ffffff;
  border: none;
`;

const ButtonLayout = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 12px;
  border-radius: 16px;
  background: #408c70;
  width: 140px;
  height: 50px;
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #3b835f;
  }
`;
