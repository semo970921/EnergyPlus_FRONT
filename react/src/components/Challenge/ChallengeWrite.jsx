import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('challengeTitle', title);
    formData.append('challengeContent', content);
    if (file) {
      formData.append('file', file);
    }

    try {
      await axios.post('http://localhost/challenges', formData, {
       
        header: {
          'Content-Type' : 'multipart/form-data',
        },
      });
      
      alert('챌린지가 등록되었습니다.');
      navigate('/challenges');
    } catch (err) {
      console.error('챌린지 등록 실패', err);
      alert('등록 중 오류가 발생했습니다.');
    }

  };

  return (
    <Wrapper as = "form" onSubmit={handleSubmit}>
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
