import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
    Container,
    ResetForm,
    Title,
    InputGroup,
    Label,
    Input,
    ResetButton,
    ErrorMessage,
    SuccessMessage
} from "./PasswordReset.style";

const PasswordReset = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // 이전 페이지에서 넘어온 데이터 확인
    if (location.state && location.state.email && location.state.verified) {
      setEmail(location.state.email);
    } else {
      // 인증 과정 없이 직접 접근한 경우 처리
      setError("인증되지 않은 접근입니다. 비밀번호 찾기 과정을 진행해주세요.");
    }
  }, [location.state]);

  // 새 비밀번호 입력
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };


  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // 비밀번호 재설정
  const handleResetPassword = async () => {
    // 유효성 검사
    if (!newPassword) {
      setError("새 비밀번호를 입력해주세요.");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:80/members/password/reset", {
        userEmail: email,
        newPassword: newPassword
      });
      
      setSuccess("비밀번호가 성공적으로 재설정되었습니다.");
      setError("");
      
      // 3초 후 로그인 페이지로 이동
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("비밀번호 재설정 중 오류가 발생");
      }
    }
  };

  return (
    <Container>
      <ResetForm>
        <Title>비밀번호 변경하기</Title>
        
        <InputGroup>
          <Label>새로운 비밀번호</Label>
          <Input type="password" value={newPassword} onChange={handleNewPasswordChange} placeholder="새로운 비밀번호를 입력하세요"/>
        </InputGroup>
        
        <InputGroup>
          <Label>비밀번호 확인</Label>
          <Input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="비밀번호를 다시 입력하세요"/>
        </InputGroup>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        <ResetButton onClick={handleResetPassword}>확인</ResetButton>
      </ResetForm>
    </Container>
  );
};



export default PasswordReset;