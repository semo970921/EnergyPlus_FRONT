import React, {useState} from "react"

const PasswordRecovery = () => {
    const [email, setEmail] = useState;
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [error, setError] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [code, setCode] = useState("");
    

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleCode = (e) => {
        setCode(e.target.value);
    }

    const handleEmailSubmit = async () => {
        try{
            const response = await axios.post("http://localhost:80/members/password/request-reset", {
                email: email,
        });

        setIsEmailSent(true);
        setError("");

    }catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError("이메일 전송 중 오류가 발생");
        }
      }

    return(
        <Container>
            <RecoveryForm>
                <Title>비밀번호 찾기</Title>

                <InputGroup>
                    <Label>이메일</Label>
                    <InputWrapper>
                        <Input type="email" value={email}  onChange={handleEmail} placeholder="이메일을 입력해주세요."/>
                        <EmailButton onClick={handleEmailSubmit}>이메일 인증</EmailButton>
                    </InputWrapper>
                </InputGroup>

                <InputGroup>
                    <Label>인증 번호</Label>
                    <InputWrapper>
                        <Input type="text" value={code} onChange={handleCode} placeholder="인증번호를 입력하세요." />
                        <VerifyButton onClick={handleVerifyCode}>확인하기</VerifyButton>
                    </InputWrapper>
                </InputGroup>


            </RecoveryForm>
        </Container>
    );
}


export default PasswordRecovery;