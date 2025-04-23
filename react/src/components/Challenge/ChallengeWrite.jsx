import React, { useState } from 'react';
import {
  Wrapper,
  TitleInput,
  ContentTextarea,
  DescriptionTextarea,
  FileInputWrapper,
  FileInput,
  Label,
  SubmitButton,
} from './ChallengeWrite.style';

const ChallengeWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: form 데이터 서버로 전송
    console.log({ title, content, description, file });
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <Label>제목</Label>
      <TitleInput
        type="text"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <Label>내용</Label>
      <ContentTextarea
        placeholder="환경 보호를 위한 행동을 작성해주세요."
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <Label>인증 사진 설명</Label>
      <DescriptionTextarea
        placeholder="사진이 잘 안 보일 경우를 대비한 설명을 작성해주세요."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <Label>이미지 파일 업로드</Label>
      <FileInputWrapper>
        <FileInput
          type="file"
          accept="image/*"
          onChange={e => setFile(e.target.files[0])}
        />
      </FileInputWrapper>

      <SubmitButton type="submit">등록하기</SubmitButton>
    </Wrapper>
  );
};

export default ChallengeWrite;
